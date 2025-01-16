import { Dispatch } from 'redux'
import { useRouter } from 'next/navigation'
import {
  AUTH_TYPES,
  LoginOrSignupResponse,
  LoginResponse,
  SignupResponse,
} from './auth.types'
import { LoginData, SignupData } from '@/schemas/auth'
import { api } from '@/endpoints'
import { LoginOrSignupData } from '@/schemas/auth/loginOrSignupSchema'

interface LoginOrSignupRequestAction {
  type: typeof AUTH_TYPES.LOGIN_OR_SIGNUP_REQUEST
}

interface LoginOrSignupSuccessAction {
  type: typeof AUTH_TYPES.LOGIN_OR_SIGNUP_SUCCESS
  payload: LoginOrSignupResponse
}

interface LoginOrSignupFailureAction {
  type: typeof AUTH_TYPES.LOGIN_OR_SIGNUP_FAILURE
  payload: string
}

interface LoginRequestAction {
  type: typeof AUTH_TYPES.LOGIN_REQUEST
}

interface LoginSuccessAction {
  type: typeof AUTH_TYPES.LOGIN_SUCCESS
  payload: LoginResponse
}

interface LoginFailureAction {
  type: typeof AUTH_TYPES.LOGIN_FAILURE
  payload: string
}

interface SignupRequestAction {
  type: typeof AUTH_TYPES.SIGNUP_REQUEST
}

interface SignupSuccessAction {
  type: typeof AUTH_TYPES.SIGNUP_SUCCESS
  payload: SignupResponse
}

interface SignupFailureAction {
  type: typeof AUTH_TYPES.SIGNUP_FAILURE
  payload: string
}

export type AuthActionTypes =
  | LoginOrSignupRequestAction
  | LoginOrSignupSuccessAction
  | LoginOrSignupFailureAction
  | LoginRequestAction
  | LoginSuccessAction
  | LoginFailureAction
  | SignupRequestAction
  | SignupSuccessAction
  | SignupFailureAction

export const authActions = {
  loginOrSignupRequest: (): LoginOrSignupRequestAction => ({
    type: AUTH_TYPES.LOGIN_OR_SIGNUP_REQUEST,
  }),

  loginOrSignupSuccess: (
    data: LoginOrSignupResponse
  ): LoginOrSignupSuccessAction => ({
    type: AUTH_TYPES.LOGIN_OR_SIGNUP_SUCCESS,
    payload: data,
  }),

  loginOrSignupFailure: (error: string): LoginOrSignupFailureAction => ({
    type: AUTH_TYPES.LOGIN_OR_SIGNUP_FAILURE,
    payload: error,
  }),

  loginRequest: (): LoginRequestAction => ({
    type: AUTH_TYPES.LOGIN_REQUEST,
  }),

  loginSuccess: (data: LoginResponse): LoginSuccessAction => ({
    type: AUTH_TYPES.LOGIN_SUCCESS,
    payload: data,
  }),

  loginFailure: (error: string): LoginFailureAction => ({
    type: AUTH_TYPES.LOGIN_FAILURE,
    payload: error,
  }),

  signupRequest: (): SignupRequestAction => ({
    type: AUTH_TYPES.SIGNUP_REQUEST,
  }),

  signupSuccess: (data: SignupResponse): SignupSuccessAction => ({
    type: AUTH_TYPES.SIGNUP_SUCCESS,
    payload: data,
  }),

  signupFailure: (error: string): SignupFailureAction => ({
    type: AUTH_TYPES.SIGNUP_FAILURE,
    payload: error,
  }),

  loginOrSignup: (loginOrSignupData: LoginOrSignupData) => {
    return async (dispatch: Dispatch<AuthActionTypes>) => {
      try {
        dispatch(authActions.loginOrSignupRequest())
        const response =
          await api.endpoints.account.getByEmail(loginOrSignupData)

        if (!response.ok) throw new Error('Failed to check email')

        const data = (await response.json()) as LoginOrSignupResponse
        dispatch(authActions.loginOrSignupSuccess(data))
        return data
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Login or signup failed'
        dispatch(authActions.loginOrSignupFailure(errorMessage))
        throw error
      }
    }
  },

  login: (loginData: LoginData) => {
    return async (dispatch: Dispatch<AuthActionTypes>) => {
      try {
        dispatch(authActions.loginRequest())
        const response = await api.endpoints.account.login(loginData)

        if (!response.ok) throw new Error('Failed to login')

        const data = (await response.json()) as LoginResponse
        dispatch(authActions.loginSuccess(data))
        return data
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Login failed'
        dispatch(authActions.loginFailure(errorMessage))
        throw error
      }
    }
  },

  signup: (signupData: SignupData) => {
    return async (dispatch: Dispatch<AuthActionTypes>) => {
      try {
        dispatch(authActions.signupRequest())
        const response = await api.endpoints.account.signup(signupData)

        if (!response.ok) throw new Error('Failed to signup')

        const data = (await response.json()) as SignupResponse
        dispatch(authActions.signupSuccess(data))
        return data
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Registration failed'
        dispatch(authActions.signupFailure(errorMessage))
        throw error
      }
    }
  },
}
