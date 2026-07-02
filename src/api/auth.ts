import { apiRequest } from './client'
import { storeToken } from './storage'
import type { LoginRequest, LoginResponse, SignInResult, SignUpRequest } from '../types/auth'
import type { User } from '../types/user'

function extractToken(payload: LoginResponse): string | null {
  return (
    payload?.token ||
    payload?.accessToken ||
    payload?.jwt ||
    payload?.data?.token ||
    payload?.data?.accessToken ||
    null
  )
}

export async function signIn(credentials: LoginRequest): Promise<SignInResult> {
  const payload = await apiRequest<LoginResponse, LoginRequest>('/api/auth/login', {
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

export function signUp(user: SignUpRequest): Promise<User> {
  return apiRequest<User, SignUpRequest>('/api/users', {
    method: 'POST',
    body: user,
  })
}
