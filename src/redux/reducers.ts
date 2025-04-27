import { AuthState, DataState, EVENT_TYPES, State } from '@/types'
import {} from '@/types'
import { ActionTypes } from './actions'

const initialAuthState: AuthState = {
  token: null,
  firstName: null,
  email: null,
  isAccountCompleted: false,
  isLoggedIn: false,
}

const InitialDataState: DataState = {
  accounts: [],
  offers: [],
}

const InitialState: State = {
  authState: initialAuthState,
  dataState: InitialDataState,
}

export const reducer = (state: State = InitialState, action: ActionTypes): State => {
  switch (action.type) {
    case EVENT_TYPES.LOGIN_OR_SIGNUP_REQUEST:
      return { ...state, authState: { ...state.authState, isLoggedIn: false } }
    case EVENT_TYPES.LOGIN_OR_SIGNUP_SUCCESS:
      return {
        ...state,
        authState: { ...state.authState, firstName: action.payload.firstName, email: action.payload.email },
      }
    case EVENT_TYPES.LOGIN_REQUEST:
      return {
        ...state,
        authState: { ...state.authState, isLoggedIn: false },
      }
    case EVENT_TYPES.SIGNUP_REQUEST:
      return { ...state, authState: { ...state.authState, isLoggedIn: false } }
    case EVENT_TYPES.ACCOUNT_COMPLETION_REQUEST:
      return { ...state, authState: { ...state.authState, isAccountCompleted: false } }
    case EVENT_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        authState: {
          ...state.authState,
          token: action.payload.token,
          isAccountCompleted: action.payload.isAccountCompleted,
          isLoggedIn: true,
        },
      }
    case EVENT_TYPES.SIGNUP_SUCCESS:
      return { ...state, authState: { ...state.authState, isLoggedIn: false } }
    case EVENT_TYPES.ACCOUNT_COMPLETION_SUCCESS:
      return { ...state, authState: { ...state.authState, isAccountCompleted: true } }
    case EVENT_TYPES.LOGIN_OR_SIGNUP_FAILURE:
    case EVENT_TYPES.LOGIN_FAILURE:
    case EVENT_TYPES.SIGNUP_FAILURE:
      return { ...state, authState: { ...state.authState, isLoggedIn: false } }
    case EVENT_TYPES.ACCOUNT_COMPLETION_FAILURE:
      return { ...state, authState: { ...state.authState, isAccountCompleted: false } }
    case EVENT_TYPES.DATA_FAILURE:
      return { ...state, dataState: InitialDataState }
    case EVENT_TYPES.DATA_SUCCESS:
      return { ...state, dataState: { ...state.dataState, ...action.payload } }

    default:
      return state
  }
}
