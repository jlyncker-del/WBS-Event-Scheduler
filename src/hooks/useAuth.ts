import { useContext } from 'react'
import AuthContext from '../context/AuthContextValue'
import type { AuthContextValue } from '../types/auth'

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider.')
  }

  return context
}
