export interface LoginResponse {
  token: string
  isAccountCompleted: boolean
  longitude: number | null
  latitude: number | null
  email: string
}
