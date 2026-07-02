import type { User } from './user'

export type AuthToken = string

export interface LoginRequest {
  email: string
  password: string
}

export interface SignUpRequest {
  name?: string | undefined
  email: string
  password: string
}

export interface LoginResponse {
  token?: string
  accessToken?: string
  jwt?: string
  user?: Pick<User, 'id' | 'email'>
  data?: {
    token?: string
    accessToken?: string
  }
}

export interface SignInResult {
  token: AuthToken
  payload: LoginResponse
}

export interface AuthContextValue {
  isAuthenticated: boolean
  token: AuthToken | null
  signIn(credentials: LoginRequest): Promise<SignInResult>
  signOut(): void
}
