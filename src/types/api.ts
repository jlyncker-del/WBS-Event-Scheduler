export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface ApiRequestOptions<TBody = unknown> extends Omit<RequestInit, 'body' | 'method'> {
  auth?: boolean
  body?: TBody
  method?: HttpMethod
}

export interface ApiErrorOptions {
  status?: number
  details?: unknown
  code?: string
}

export interface ApiErrorPayload {
  message?: string
  error?: string
  title?: string
  detail?: string
}
