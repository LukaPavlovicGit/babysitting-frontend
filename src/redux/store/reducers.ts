import { AuthState } from '@/types'
import { EVENT_TYPES } from '@/types'
import { ActionTypes } from './actions'

const initialState: AuthState = {
  token: null,
  firstName: null,
  email: null,
  isAccountCompleted: false,
  longitude: null,
  latitude: null,
  isLoggedIn: false,
}

export const accountReducer = (state: AuthState = initialState, action: ActionTypes): AuthState => {
  switch (action.type) {
    case EVENT_TYPES.LOGIN_OR_SIGNUP_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
      }
    case EVENT_TYPES.LOGIN_OR_SIGNUP_SUCCESS:
      return {
        ...state,
        firstName: action.payload.firstName,
        email: action.payload.email,
      }

    case EVENT_TYPES.LOGIN_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
      }
    case EVENT_TYPES.SIGNUP_REQUEST:
      return {
        ...state,
        isLoggedIn: false,
      }
    case EVENT_TYPES.ACCOUNT_COMPLETION_REQUEST:
      return {
        ...state,
        isAccountCompleted: false,
      }
    case EVENT_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        isAccountCompleted: action.payload.isAccountCompleted,
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
        isLoggedIn: true,
      }
    case EVENT_TYPES.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      }
    case EVENT_TYPES.ACCOUNT_COMPLETION_SUCCESS:
      return {
        ...state,
        isAccountCompleted: true,
      }
    case EVENT_TYPES.LOGIN_OR_SIGNUP_FAILURE:
    case EVENT_TYPES.LOGIN_FAILURE:
    case EVENT_TYPES.SIGNUP_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
      }
    case EVENT_TYPES.ACCOUNT_COMPLETION_FAILURE:
      return {
        ...state,
        isAccountCompleted: false,
      }
    default:
      return state
  }
}
