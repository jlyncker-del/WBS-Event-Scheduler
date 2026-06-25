import { clearStoredToken, getStoredToken } from './storage'

const FALLBACK_API_BASE_URL = 'http://localhost:3001'

export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || FALLBACK_API_BASE_URL
).replace(/\/$/, '')

let handleUnauthorized = null

export class ApiError extends Error {
  constructor(message, { status, details } = {}) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.details = details
  }
}

export function setUnauthorizedHandler(handler) {
  handleUnauthorized = handler
}

async function parseResponse(response) {
  const text = await response.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

function getErrorMessage(payload, response) {
  if (!payload) {
    return response.statusText || 'The request failed.'
  }

  if (typeof payload === 'string') {
    return payload
  }

  return (
    payload.message ||
    payload.error ||
    payload.title ||
    payload.detail ||
    'The request failed. Please try again.'
  )
}

export async function apiRequest(path, options = {}) {
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

  const requestHeaders = {
    Accept: 'application/json',
    ...headers,
  }

  if (body !== undefined) {
    requestHeaders['Content-Type'] = 'application/json'
  }

  if (auth && token) {
    requestHeaders.Authorization = `Bearer ${token}`
  }

  let response

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: requestHeaders,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      ...rest,
    })
  } catch {
    throw new ApiError(
      'Unable to reach the Events API. Check that the server is running and the API URL is correct.',
      { status: 0 },
    )
  }

  const payload = await parseResponse(response)

  if (!response.ok) {
    if (auth && (response.status === 401 || response.status === 403)) {
      clearStoredToken()
      handleUnauthorized?.()
    }

    throw new ApiError(getErrorMessage(payload, response), {
      status: response.status,
      details: payload,
    })
  }

  return payload
}
