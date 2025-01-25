import { AuthState } from './account.types'
import { AccountActionTypes } from './account.actions'
import { ACCOUNT_TYPES } from './account.types'

const initialState: AuthState = {
  token: null,
  firstName: null,
  email: null,
  isAccountCompleted: false,
  isLoggedIn: false,
}

export const accountReducer = (state: AuthState = initialState, action: AccountActionTypes): AuthState => {
  switch (action.type) {
    case ACCOUNT_TYPES.LOGIN_OR_SIGNUP_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
      }
    case ACCOUNT_TYPES.LOGIN_OR_SIGNUP_SUCCESS:
      return {
        ...state,
        firstName: action.payload.firstName,
        email: action.payload.email,
      }

    case ACCOUNT_TYPES.LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
      }
    case ACCOUNT_TYPES.SIGNUP_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
      }
    case ACCOUNT_TYPES.PARENT_ACCOUNT_COMPLETION_REQUEST:
    case ACCOUNT_TYPES.BABYSITTER_ACCOUNT_COMPLETION_REQUEST:
      return {
        ...state,
        isAccountCompleted: false,
      }
    case ACCOUNT_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isAccountCompleted: action.payload.isAccountCompleted,
        isLoggedIn: true,
      }
    case ACCOUNT_TYPES.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      }
    case ACCOUNT_TYPES.PARENT_ACCOUNT_COMPLETION_SUCCESS:
    case ACCOUNT_TYPES.BABYSITTER_ACCOUNT_COMPLETION_SUCCESS:
      return {
        ...state,
        isAccountCompleted: true,
      }
    case ACCOUNT_TYPES.LOGIN_OR_SIGNUP_FAILURE:
    case ACCOUNT_TYPES.LOGIN_FAILURE:
    case ACCOUNT_TYPES.SIGNUP_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
      }
    case ACCOUNT_TYPES.BABYSITTER_ACCOUNT_COMPLETION_FAILURE:
    case ACCOUNT_TYPES.PARENT_ACCOUNT_COMPLETION_FAILURE:
      return {
        ...state,
        isAccountCompleted: false,
      }
    default:
      return state
  }
}
