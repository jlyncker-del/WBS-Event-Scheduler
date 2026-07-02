import { clearStoredToken, getStoredToken } from './storage'
import type { ApiErrorOptions, ApiErrorPayload, ApiRequestOptions } from '../types/api'

const FALLBACK_API_BASE_URL = 'http://localhost:3001'

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || FALLBACK_API_BASE_URL
).replace(/\/$/, '')

const isDevelopment = import.meta.env.DEV

if (isDevelopment) {
  console.info('[Events API] Resolved API base URL:', API_BASE_URL)
}

let handleUnauthorized: (() => void) | null = null

export class ApiError extends Error {
  status: number | undefined
  details: unknown
  code: string | undefined

  constructor(message: string, { status, details, code }: ApiErrorOptions = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
    this.code = code
  }
}

export function setUnauthorizedHandler(handler: (() => void) | null): void {
  handleUnauthorized = handler
}

function buildRequestUrl(path: string): string {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`

  if (API_BASE_URL.endsWith('/api') && normalizedPath.startsWith('/api/')) {
    return `${API_BASE_URL}${normalizedPath.slice('/api'.length)}`
  }

  return `${API_BASE_URL}${normalizedPath}`
}

async function parseResponse(response: Response): Promise<unknown> {
  const text = await response.text()

  if (!text) {
    return null
  }

  const contentType = response.headers.get('content-type') || ''
  const expectsJson = contentType.includes('application/json')

  try {
    return JSON.parse(text)
  } catch {
    if (expectsJson) {
      throw new ApiError('The Events API returned invalid JSON. Check the backend response.', {
        status: response.status,
        details: text,
        code: 'invalid_json',
      })
    }

    return text
  }
}

function isApiErrorPayload(payload: unknown): payload is ApiErrorPayload {
  return typeof payload === 'object' && payload !== null
}

function getErrorMessage(payload: unknown, response: Response): string {
  const apiMessage = getApiMessage(payload)

  if (response.status === 401 || response.status === 403) {
    return apiMessage || 'You are not authorized. Please sign in again.'
  }

  if (response.status === 404) {
    return apiMessage || 'The requested API endpoint was not found. Check the API URL and path.'
  }

  if (response.status >= 500) {
    return apiMessage || 'The Events API returned a server error. Check the backend terminal logs.'
  }

  if (response.status >= 400) {
    return apiMessage || 'The request was rejected by the Events API. Check the submitted data.'
  }

  return apiMessage || response.statusText || 'The request failed.'
}

function getApiMessage(payload: unknown): string | null {
  if (!payload) {
    return null
  }

  if (typeof payload === 'string') {
    return payload
  }

  if (!isApiErrorPayload(payload)) {
    return null
  }

  return (
    ('message' in payload && typeof payload.message === 'string' ? payload.message : null) ||
    ('error' in payload && typeof payload.error === 'string' ? payload.error : null) ||
    ('title' in payload && typeof payload.title === 'string' ? payload.title : null) ||
    ('detail' in payload && typeof payload.detail === 'string' ? payload.detail : null) ||
    null
  )
}

export async function apiRequest<TResponse = unknown, TBody = unknown>(
  path: string,
  options: ApiRequestOptions<TBody> = {},
): Promise<TResponse> {
  const {
    auth = false,
    body,
    headers = {},
    method = body ? 'POST' : 'GET',
    ...rest
  } = options
  const token = getStoredToken()

  if (auth && !token) {
    throw new ApiError('Please sign in before continuing.', { status: 401 })
  }

  const requestHeaders: Record<string, string> = {
    Accept: 'application/json',
  }

  new Headers(headers).forEach((value, key) => {
    requestHeaders[key] = value
  })

  if (body !== undefined) {
    requestHeaders['Content-Type'] = 'application/json'
  }

  if (auth && token) {
    requestHeaders.Authorization = `Bearer ${token}`
  }

  const requestUrl = buildRequestUrl(path)

  if (isDevelopment) {
    console.info('[Events API] Request:', method, requestUrl)
  }

  let response: Response

  try {
    const fetchOptions: RequestInit = {
      method,
      headers: requestHeaders,
      ...rest,
    }

    if (body !== undefined) {
      fetchOptions.body = JSON.stringify(body)
    }

    response = await fetch(requestUrl, fetchOptions)
  } catch (err: unknown) {
    if (isDevelopment) {
      console.error('[Events API] Network error:', {
        url: requestUrl,
        method,
        error: err instanceof Error ? err.message : String(err),
      })
    }

    throw new ApiError(
      `Unable to reach the Events API at ${API_BASE_URL}. Start the backend with npm run dev and verify http://localhost:3001/api-docs.`,
      { status: 0, code: 'network_error' },
    )
  }

  const payload = await parseResponse(response)

  if (isDevelopment) {
    console.info('[Events API] Response:', {
      url: requestUrl,
      method,
      status: response.status,
    })
  }

  if (!response.ok) {
    if (isDevelopment) {
      console.error('[Events API] Failed response body:', {
        url: requestUrl,
        method,
        status: response.status,
        body: payload,
      })
    }

    if (auth && (response.status === 401 || response.status === 403)) {
      clearStoredToken()
      handleUnauthorized?.()
    }

    throw new ApiError(getErrorMessage(payload, response), {
      status: response.status,
      details: payload,
    })
  }

  return payload as TResponse
}
