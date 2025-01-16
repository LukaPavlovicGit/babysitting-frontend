import { AuthState } from './auth.types'
import { AuthActionTypes } from './auth.actions'
import { AUTH_TYPES } from './auth.types'

const initialState: AuthState = {
  token: null,
  firstName: null,
  email: null,
  isAccountCompleted: false,
  isLoggedIn: false,
}

export const authReducer = (
  state: AuthState = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case AUTH_TYPES.LOGIN_OR_SIGNUP_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
      }
    case AUTH_TYPES.LOGIN_OR_SIGNUP_SUCCESS:
      return {
        ...state,
        firstName: action.payload.firstName,
        email: action.payload.email,
      }

    case AUTH_TYPES.LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
      }
    case AUTH_TYPES.SIGNUP_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
      }
    case AUTH_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isAccountCompleted: action.payload.isAccountCompleted,
        isLoggedIn: true,
      }
    case AUTH_TYPES.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      }
    case AUTH_TYPES.LOGIN_OR_SIGNUP_FAILURE:
    case AUTH_TYPES.LOGIN_FAILURE:
    case AUTH_TYPES.SIGNUP_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
      }

    default:
      return state
  }
}
