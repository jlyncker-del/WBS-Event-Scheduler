import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { signIn as signInRequest } from '../api/auth'
import { setUnauthorizedHandler } from '../api/client'
import { clearStoredToken, getStoredToken } from '../api/storage'
import type { AuthContextValue } from '../types/auth'
import AuthContext from './AuthContextValue'

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [token, setToken] = useState(() => getStoredToken())
  const navigate = useNavigate()

  useEffect(() => {
    setUnauthorizedHandler(() => {
      setToken(null)
      navigate('/signin', {
        replace: true,
        state: { message: 'Your session expired. Please sign in again.' },
      })
    })

    return () => setUnauthorizedHandler(null)
  }, [navigate])

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated: Boolean(token),
      token,
      async signIn(credentials) {
        const result = await signInRequest(credentials)
        setToken(result.token)
        return result
      },
      signOut() {
        clearStoredToken()
        setToken(null)
      },
    }),
    [token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
