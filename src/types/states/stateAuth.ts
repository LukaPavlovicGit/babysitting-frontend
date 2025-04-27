export interface AuthState {
  token: string | null
  firstName: string | null
  email: string | null
  isAccountCompleted: boolean
  isLoggedIn: boolean
}
