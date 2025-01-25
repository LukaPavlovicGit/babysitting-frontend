import { Dispatch } from 'redux'
import {
  ACCOUNT_TYPES,
  AccountCompletionResponse,
  LoginOrSignupResponse,
  LoginResponse,
  SignupResponse,
} from './account.types'
import { LoginData, SignupData } from '@/schemas/auth'
import { api } from '@/endpoints'
import { LoginOrSignupData } from '@/schemas/auth/loginOrSignupSchema'
import { ParentAccountCompletionData } from '@/schemas/parentAccountCompletionSchema'
import { BabysitterAccountCompletionData } from '@/schemas/babysitterAccountCompletionSchema'

interface LoginOrSignupRequestAction {
  type: typeof ACCOUNT_TYPES.LOGIN_OR_SIGNUP_REQUEST
}

interface LoginOrSignupSuccessAction {
  type: typeof ACCOUNT_TYPES.LOGIN_OR_SIGNUP_SUCCESS
  payload: LoginOrSignupResponse
}

interface LoginOrSignupFailureAction {
  type: typeof ACCOUNT_TYPES.LOGIN_OR_SIGNUP_FAILURE
  payload: string
}

interface LoginRequestAction {
  type: typeof ACCOUNT_TYPES.LOGIN_REQUEST
}

interface LoginSuccessAction {
  type: typeof ACCOUNT_TYPES.LOGIN_SUCCESS
  payload: LoginResponse
}

interface LoginFailureAction {
  type: typeof ACCOUNT_TYPES.LOGIN_FAILURE
  payload: string
}

interface SignupRequestAction {
  type: typeof ACCOUNT_TYPES.SIGNUP_REQUEST
}

interface SignupSuccessAction {
  type: typeof ACCOUNT_TYPES.SIGNUP_SUCCESS
  payload: SignupResponse
}

interface SignupFailureAction {
  type: typeof ACCOUNT_TYPES.SIGNUP_FAILURE
  payload: string
}

interface ParentAccountCompletionRequestAction {
  type: typeof ACCOUNT_TYPES.PARENT_ACCOUNT_COMPLETION_REQUEST
}

interface ParentAccountCompletionSuccessAction {
  type: typeof ACCOUNT_TYPES.PARENT_ACCOUNT_COMPLETION_SUCCESS
  payload: AccountCompletionResponse
}

interface ParentAccountCompletionFailureAction {
  type: typeof ACCOUNT_TYPES.PARENT_ACCOUNT_COMPLETION_FAILURE
  payload: string
}

interface BabysitterAccountCompletionRequestAction {
  type: typeof ACCOUNT_TYPES.BABYSITTER_ACCOUNT_COMPLETION_REQUEST
}

interface BabysitterAccountCompletionSuccessAction {
  type: typeof ACCOUNT_TYPES.BABYSITTER_ACCOUNT_COMPLETION_SUCCESS
  payload: AccountCompletionResponse
}

interface BabysitterAccountCompletionFailureAction {
  type: typeof ACCOUNT_TYPES.BABYSITTER_ACCOUNT_COMPLETION_FAILURE
  payload: string
}

export type AccountActionTypes =
  | LoginOrSignupRequestAction
  | LoginOrSignupSuccessAction
  | LoginOrSignupFailureAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | SignupRequestAction
  | SignupSuccessAction
  | SignupFailureAction
  | ParentAccountCompletionRequestAction
  | ParentAccountCompletionSuccessAction
  | ParentAccountCompletionFailureAction
  | BabysitterAccountCompletionRequestAction
  | BabysitterAccountCompletionSuccessAction
  | BabysitterAccountCompletionFailureAction

export const accountActions = {
  loginOrSignupRequest: (): LoginOrSignupRequestAction => ({
    type: ACCOUNT_TYPES.LOGIN_OR_SIGNUP_REQUEST,
  }),

  loginOrSignupSuccess: (data: LoginOrSignupResponse): LoginOrSignupSuccessAction => ({
    type: ACCOUNT_TYPES.LOGIN_OR_SIGNUP_SUCCESS,
    payload: data,
  }),

  loginOrSignupFailure: (error: string): LoginOrSignupFailureAction => ({
    type: ACCOUNT_TYPES.LOGIN_OR_SIGNUP_FAILURE,
    payload: error,
  }),

  loginRequest: (): LoginRequestAction => ({
    type: ACCOUNT_TYPES.LOGIN_REQUEST,
  }),

  loginSuccess: (data: LoginResponse): LoginSuccessAction => ({
    type: ACCOUNT_TYPES.LOGIN_SUCCESS,
    payload: data,
  }),

  loginFailure: (error: string): LoginFailureAction => ({
    type: ACCOUNT_TYPES.LOGIN_FAILURE,
    payload: error,
  }),

  signupRequest: (): SignupRequestAction => ({
    type: ACCOUNT_TYPES.SIGNUP_REQUEST,
  }),

  signupSuccess: (data: SignupResponse): SignupSuccessAction => ({
    type: ACCOUNT_TYPES.SIGNUP_SUCCESS,
    payload: data,
  }),

  signupFailure: (error: string): SignupFailureAction => ({
    type: ACCOUNT_TYPES.SIGNUP_FAILURE,
    payload: error,
  }),

  parentAccountCompletionRequest: (): ParentAccountCompletionRequestAction => ({
    type: ACCOUNT_TYPES.PARENT_ACCOUNT_COMPLETION_REQUEST,
  }),

  parentAccountCompletionSuccess: (data: AccountCompletionResponse): ParentAccountCompletionSuccessAction => ({
    type: ACCOUNT_TYPES.PARENT_ACCOUNT_COMPLETION_SUCCESS,
    payload: data,
  }),

  parentAccountCompletionFailure: (error: string): ParentAccountCompletionFailureAction => ({
    type: ACCOUNT_TYPES.PARENT_ACCOUNT_COMPLETION_FAILURE,
    payload: error,
  }),

  babysitterAccountCompletionRequest: (): BabysitterAccountCompletionRequestAction => ({
    type: ACCOUNT_TYPES.BABYSITTER_ACCOUNT_COMPLETION_REQUEST,
  }),

  babysitterAccountCompletionSuccess: (data: AccountCompletionResponse): BabysitterAccountCompletionSuccessAction => ({
    type: ACCOUNT_TYPES.BABYSITTER_ACCOUNT_COMPLETION_SUCCESS,
    payload: data,
  }),

  babysitterAccountCompletionFailure: (error: string): BabysitterAccountCompletionFailureAction => ({
    type: ACCOUNT_TYPES.BABYSITTER_ACCOUNT_COMPLETION_FAILURE,
    payload: error,
  }),

  loginOrSignup: (loginOrSignupData: LoginOrSignupData) => {
    return async (dispatch: Dispatch<AccountActionTypes>) => {
      try {
        dispatch(accountActions.loginOrSignupRequest())
        const response = await api.endpoints.account.getByEmail(loginOrSignupData)

        if (!response.ok) throw new Error('Failed to check email')

        const data = (await response.json()) as LoginOrSignupResponse
        dispatch(accountActions.loginOrSignupSuccess(data))
        return data
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Login or signup failed'
        dispatch(accountActions.loginOrSignupFailure(errorMessage))
        throw error
      }
    }
  },

  login: (loginData: LoginData) => {
    return async (dispatch: Dispatch<AccountActionTypes>) => {
      try {
        dispatch(accountActions.loginRequest())
        const response = await api.endpoints.account.login(loginData)

        if (!response.ok) throw new Error('Failed to login')

        const data = (await response.json()) as LoginResponse
        dispatch(accountActions.loginSuccess(data))
        return data
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Login failed'
        dispatch(accountActions.loginFailure(errorMessage))
        throw error
      }
    }
  },

  signup: (signupData: SignupData) => {
    return async (dispatch: Dispatch<AccountActionTypes>) => {
      try {
        dispatch(accountActions.signupRequest())
        const response = await api.endpoints.account.signup(signupData)

        if (!response.ok) throw new Error('Failed to signup')

        const data = (await response.json()) as SignupResponse
        dispatch(accountActions.signupSuccess(data))
        return data
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Registration failed'
        dispatch(accountActions.signupFailure(errorMessage))
        throw error
      }
    }
  },

  completeParentAccount: (parentAccountCompletionData: ParentAccountCompletionData) => {
    return async (dispatch: Dispatch<AccountActionTypes>) => {
      dispatch(accountActions.parentAccountCompletionRequest())
      const response = await api.endpoints.account.completeParentAccount(parentAccountCompletionData)

      if (!response.ok) throw new Error('Failed to complete parent account')

      const data = (await response.json()) as AccountCompletionResponse
      dispatch(accountActions.parentAccountCompletionSuccess(data))
      return data
    }
  },

  completeBabysitterAccount: (babysitterAccountCompletionData: BabysitterAccountCompletionData) => {
    return async (dispatch: Dispatch<AccountActionTypes>) => {
      dispatch(accountActions.babysitterAccountCompletionRequest())
      const response = await api.endpoints.account.completeBabysitterAccount(babysitterAccountCompletionData)

      if (!response.ok) throw new Error('Failed to complete babysitter account')

      const data = (await response.json()) as AccountCompletionResponse
      dispatch(accountActions.babysitterAccountCompletionSuccess(data))
      return data
    }
  },
}
