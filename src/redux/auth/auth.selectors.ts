import { RootReducerState } from '@/redux/store/rootReducer'

export const authSelectors = {
  getToken: (state: RootReducerState) => state.auth.token,
  getIsLoggedIn: (state: RootReducerState) => state.auth.isLoggedIn,
  getIsAccountCompleted: (state: RootReducerState) => state.auth.isAccountCompleted,
  getFirstName: (state: RootReducerState) => state.auth.firstName,
  getEmail: (state: RootReducerState) => state.auth.email,
}
