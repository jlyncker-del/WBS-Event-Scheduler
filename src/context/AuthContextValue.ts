import { createContext } from 'react'
import type { AuthContextValue } from '../types/auth'

const AuthContext = createContext<AuthContextValue | null>(null)

export default AuthContext
