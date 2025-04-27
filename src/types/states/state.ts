import { AuthState } from './authState'
import { DataState } from './dataState'

export interface State {
  authState: AuthState
  dataState: DataState
}
