import { Dispatch } from 'redux'
import {
  EVENT_TYPES,
  AccountCompletionResponse,
  LoginOrSignupResponse,
  LoginResponse,
  SignupResponse,
  DataResponse,
} from '@/types'
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

interface DataRequestAction {
  type: typeof EVENT_TYPES.DATA_REQUEST
}

interface DataSuccessAction {
  type: typeof EVENT_TYPES.DATA_SUCCESS
  payload: DataResponse
}

interface DataFailureAction {
  type: typeof EVENT_TYPES.DATA_FAILURE
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
  | DataRequestAction
  | DataSuccessAction
  | DataFailureAction

export const actions = {
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

  dataRequest: (): DataRequestAction => ({
    type: EVENT_TYPES.DATA_REQUEST,
  }),

  dataSuccess: (data: DataResponse): DataSuccessAction => ({
    type: EVENT_TYPES.DATA_SUCCESS,
    payload: data,
  }),

  dataFailure: (error: string): DataFailureAction => ({
    type: EVENT_TYPES.DATA_FAILURE,
    payload: error,
  }),

  loginOrSignup: (loginOrSignupData: LoginOrSignupData) => {
    return async (dispatch: Dispatch<ActionTypes>) => {
      try {
        dispatch(actions.loginOrSignupRequest())
        const response = await api.endpoints.account.getByEmail(loginOrSignupData)

        if (response.status === 200) {
          const data = (await response.json()) as LoginOrSignupResponse
          dispatch(actions.loginOrSignupSuccess(data))
          return data
        } else if (response.status === 404) {
          throw new Error('User not found')
        } else {
          throw new Error('Failed to check email')
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Login or signup failed'
        dispatch(actions.loginOrSignupFailure(errorMessage))
        throw error
      }
    }
  },

  login: (loginData: LoginData) => {
    return async (dispatch: Dispatch<ActionTypes>) => {
      try {
        dispatch(actions.loginRequest())
        const response = await api.endpoints.account.login(loginData)

        if (response.status === 200) {
          const data = (await response.json()) as LoginResponse
          dispatch(actions.loginSuccess(data))
          return data
        } else if (response.status === 404) {
          throw new Error('User not found')
        } else {
          throw new Error('Failed to login')
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Login failed'
        dispatch(actions.loginFailure(errorMessage))
        throw error
      }
    }
  },

  signup: (signupData: SignupData) => {
    return async (dispatch: Dispatch<ActionTypes>) => {
      try {
        dispatch(actions.signupRequest())
        const response = await api.endpoints.account.signup(signupData)

        if (response.status === 200) {
          const data = (await response.json()) as SignupResponse
          dispatch(actions.signupSuccess(data))
          return data
        } else if (response.status === 409) {
          throw new Error('User already exists')
        } else {
          throw new Error('Failed to signup')
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Registration failed'
        dispatch(actions.signupFailure(errorMessage))
        throw error
      }
    }
  },

  completeAccount: (accountCompletionData: AccountCompletionData) => {
    return async (dispatch: Dispatch<ActionTypes>) => {
      try {
        dispatch(actions.accountCompletionRequest())
        const response = await api.endpoints.account.completeAccount(accountCompletionData)

        if (!response.ok) throw new Error('Failed to complete account')

        const data = (await response.json()) as AccountCompletionResponse
        dispatch(actions.accountCompletionSuccess(data))
        return data
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to complete account'
        dispatch(actions.accountCompletionFailure(errorMessage))
        throw error
      }
    }
  },

  getData: () => {
    return async (dispatch: Dispatch<ActionTypes>) => {
      try {
        dispatch(actions.dataRequest())
        const response = await api.endpoints.data.getData()

        if (response.status === 200) {
          const data = (await response.json()) as DataResponse
          dispatch(actions.dataSuccess(data))
          return data
        } else {
          throw new Error('Failed to fetch data')
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to complete account'
        dispatch(actions.dataFailure(errorMessage))
        throw error
      }
    }
  },
}
