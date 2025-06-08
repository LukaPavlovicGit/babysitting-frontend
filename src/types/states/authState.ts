export interface AuthState {
  token: string | null
  firstName: string | null
  email: string | null
  isAccountCompleted: boolean
  longitude: number | null
  latitude: number | null
  isLoggedIn: boolean
}
