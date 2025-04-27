import { Dispatch } from 'redux'
import { EVENT_TYPES, AccountCompletionResponse, LoginOrSignupResponse, LoginResponse, SignupResponse } from '@/types'
import { LoginData, SignupData } from '@/schemas/auth'
import { api } from '@/endpoints'
import { LoginOrSignupData } from '@/schemas/auth/loginOrSignupSchema'
import { AccountCompletionData } from '@/schemas/accountCompletionSchema'

interface LoginOrSignupRequestAction {
  type: typeof EVENT_TYPES.LOGIN_OR_SIGNUP_REQUEST
}

interface LoginOrSignupSuccessAction {
  type: typeof EVENT_TYPES.LOGIN_OR_SIGNUP_SUCCESS
  payload: LoginOrSignupResponse
}

interface LoginOrSignupFailureAction {
  type: typeof EVENT_TYPES.LOGIN_OR_SIGNUP_FAILURE
  payload: string
}

interface LoginRequestAction {
  type: typeof EVENT_TYPES.LOGIN_REQUEST
}

interface LoginSuccessAction {
  type: typeof EVENT_TYPES.LOGIN_SUCCESS
  payload: LoginResponse
}

interface LoginFailureAction {
  type: typeof EVENT_TYPES.LOGIN_FAILURE
  payload: string
}

interface SignupRequestAction {
  type: typeof EVENT_TYPES.SIGNUP_REQUEST
}

interface SignupSuccessAction {
  type: typeof EVENT_TYPES.SIGNUP_SUCCESS
  payload: SignupResponse
}

interface SignupFailureAction {
  type: typeof EVENT_TYPES.SIGNUP_FAILURE
  payload: string
}

interface AccountCompletionRequestAction {
  type: typeof EVENT_TYPES.ACCOUNT_COMPLETION_REQUEST
}

interface AccountCompletionSuccessAction {
  type: typeof EVENT_TYPES.ACCOUNT_COMPLETION_SUCCESS
  payload: AccountCompletionResponse
}

interface AccountCompletionFailureAction {
  type: typeof EVENT_TYPES.ACCOUNT_COMPLETION_FAILURE
  payload: string
}

export type ActionTypes =
  | LoginOrSignupRequestAction
  | LoginOrSignupSuccessAction
  | LoginOrSignupFailureAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | SignupRequestAction
  | SignupSuccessAction
  | SignupFailureAction
  | AccountCompletionRequestAction
  | AccountCompletionSuccessAction
  | AccountCompletionFailureAction

export const accountActions = {
  loginOrSignupRequest: (): LoginOrSignupRequestAction => ({
    type: EVENT_TYPES.LOGIN_OR_SIGNUP_REQUEST,
  }),

  loginOrSignupSuccess: (data: LoginOrSignupResponse): LoginOrSignupSuccessAction => ({
    type: EVENT_TYPES.LOGIN_OR_SIGNUP_SUCCESS,
    payload: data,
  }),

  loginOrSignupFailure: (error: string): LoginOrSignupFailureAction => ({
    type: EVENT_TYPES.LOGIN_OR_SIGNUP_FAILURE,
    payload: error,
  }),

  loginRequest: (): LoginRequestAction => ({
    type: EVENT_TYPES.LOGIN_REQUEST,
  }),

  loginSuccess: (data: LoginResponse): LoginSuccessAction => ({
    type: EVENT_TYPES.LOGIN_SUCCESS,
    payload: data,
  }),

  loginFailure: (error: string): LoginFailureAction => ({
    type: EVENT_TYPES.LOGIN_FAILURE,
    payload: error,
  }),

  signupRequest: (): SignupRequestAction => ({
    type: EVENT_TYPES.SIGNUP_REQUEST,
  }),

  signupSuccess: (data: SignupResponse): SignupSuccessAction => ({
    type: EVENT_TYPES.SIGNUP_SUCCESS,
    payload: data,
  }),

  signupFailure: (error: string): SignupFailureAction => ({
    type: EVENT_TYPES.SIGNUP_FAILURE,
    payload: error,
  }),

  accountCompletionRequest: (): AccountCompletionRequestAction => ({
    type: EVENT_TYPES.ACCOUNT_COMPLETION_REQUEST,
  }),

  accountCompletionSuccess: (data: AccountCompletionResponse): AccountCompletionSuccessAction => ({
    type: EVENT_TYPES.ACCOUNT_COMPLETION_SUCCESS,
    payload: data,
  }),

  accountCompletionFailure: (error: string): AccountCompletionFailureAction => ({
    type: EVENT_TYPES.ACCOUNT_COMPLETION_FAILURE,
    payload: error,
  }),

  loginOrSignup: (loginOrSignupData: LoginOrSignupData) => {
    return async (dispatch: Dispatch<ActionTypes>) => {
      try {
        dispatch(accountActions.loginOrSignupRequest())
        const response = await api.endpoints.account.getByEmail(loginOrSignupData)

        if (response.status === 200) {
          const data = (await response.json()) as LoginOrSignupResponse
          dispatch(accountActions.loginOrSignupSuccess(data))
          return data
        } else if (response.status === 404) {
          throw new Error('User not found')
        } else {
          throw new Error('Failed to check email')
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Login or signup failed'
        dispatch(accountActions.loginOrSignupFailure(errorMessage))
        throw error
      }
    }
  },

  login: (loginData: LoginData) => {
    return async (dispatch: Dispatch<ActionTypes>) => {
      try {
        dispatch(accountActions.loginRequest())
        const response = await api.endpoints.account.login(loginData)

        if (response.status === 200) {
          const data = (await response.json()) as LoginResponse
          dispatch(accountActions.loginSuccess(data))
          return data
        } else if (response.status === 404) {
          throw new Error('User not found')
        } else {
          throw new Error('Failed to login')
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Login failed'
        dispatch(accountActions.loginFailure(errorMessage))
        throw error
      }
    }
  },

  signup: (signupData: SignupData) => {
    return async (dispatch: Dispatch<ActionTypes>) => {
      try {
        dispatch(accountActions.signupRequest())
        const response = await api.endpoints.account.signup(signupData)

        if (response.status === 200) {
          const data = (await response.json()) as SignupResponse
          dispatch(accountActions.signupSuccess(data))
          return data
        } else if (response.status === 409) {
          throw new Error('User already exists')
        } else {
          throw new Error('Failed to signup')
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Registration failed'
        dispatch(accountActions.signupFailure(errorMessage))
        throw error
      }
    }
  },

  completeAccount: (accountCompletionData: AccountCompletionData) => {
    return async (dispatch: Dispatch<ActionTypes>) => {
      try {
        dispatch(accountActions.accountCompletionRequest())
        const response = await api.endpoints.account.completeAccount(accountCompletionData)

        if (!response.ok) throw new Error('Failed to complete account')

        const data = (await response.json()) as AccountCompletionResponse
        dispatch(accountActions.accountCompletionSuccess(data))
        return data
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to complete account'
        dispatch(accountActions.accountCompletionFailure(errorMessage))
        throw error
      }
    }
  },
}
