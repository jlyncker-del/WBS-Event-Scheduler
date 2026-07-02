export const TOKEN_STORAGE_KEY = 'events_api_token'

export function getStoredToken(): string | null {
  try {
    return window.localStorage.getItem(TOKEN_STORAGE_KEY)
  } catch {
    return null
  }
}

export function storeToken(token: string): void {
  try {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
  } catch {
    throw new Error('Unable to persist your session in this browser.')
  }
}

export function clearStoredToken(): void {
  try {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY)
  } catch {
    // The in-memory auth state will still be cleared if storage is unavailable.
  }
}
