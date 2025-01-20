export const ACCOUNT_TYPES = {
  LOGIN_OR_SIGNUP_REQUEST: 'account/loginOrSignupRequest',
  LOGIN_OR_SIGNUP_SUCCESS: 'account/loginOrSignupSuccess',
  LOGIN_OR_SIGNUP_FAILURE: 'account/loginOrSignupFailure',
  LOGIN_REQUEST: 'account/loginRequest',
  LOGIN_SUCCESS: 'account/loginSuccess',
  LOGIN_FAILURE: 'account/loginFailure',
  SIGNUP_REQUEST: 'account/signupRequest',
  SIGNUP_SUCCESS: 'account/signupSuccess',
  SIGNUP_FAILURE: 'account/signupFailure',
  ACCOUNT_COMPLETION_REQUEST: 'account/partialAccountCompletionRequest',
  ACCOUNT_COMPLETION_SUCCESS: 'account/partialAccountCompletionSuccess',
  ACCOUNT_COMPLETION_FAILURE: 'account/partialAccountCompletionFailure',
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
}

export interface AccountCompletionResponse {
  isAccountCompleted: boolean
}
