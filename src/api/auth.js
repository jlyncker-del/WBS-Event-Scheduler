import { apiRequest } from './client'
import { storeToken } from './storage'

function extractToken(payload) {
  return (
    payload?.token ||
    payload?.accessToken ||
    payload?.jwt ||
    payload?.data?.token ||
    payload?.data?.accessToken ||
    null
  )
}

export async function signIn(credentials) {
  const payload = await apiRequest('/api/auth/login', {
    method: 'POST',
    body: credentials,
  })
  const token = extractToken(payload)

  if (!token) {
    throw new Error('The login response did not include an authentication token.')
  }

  storeToken(token)

  return { token, payload }
}

export function signUp(user) {
  return apiRequest('/api/users', {
    method: 'POST',
    body: user,
  })
}
