export const AUTH_TYPES = {
  LOGIN_OR_SIGNUP_REQUEST: 'auth/loginOrSignupRequest',
  LOGIN_OR_SIGNUP_SUCCESS: 'auth/loginOrSignupSuccess',
  LOGIN_OR_SIGNUP_FAILURE: 'auth/loginOrSignupFailure',
  LOGIN_REQUEST: 'auth/loginRequest',
  LOGIN_SUCCESS: 'auth/loginSuccess',
  LOGIN_FAILURE: 'auth/loginFailure',
  SIGNUP_REQUEST: 'auth/signupRequest',
  SIGNUP_SUCCESS: 'auth/signupSuccess',
  SIGNUP_FAILURE: 'auth/signupFailure',
} as const

export interface AuthState {
  token: string | null
  firstName: string | null
  email: string | null
  isAccountCompleted: boolean
  isLoggedIn: boolean
}

export interface LoginOrSignupResponse {
  firstName: string
  email: string
  userId: string
  lastName: string
}

export interface LoginResponse {
  token: string
  isAccountCompleted: boolean
}

export interface SignupResponse {
  firstName: string
  email: string
