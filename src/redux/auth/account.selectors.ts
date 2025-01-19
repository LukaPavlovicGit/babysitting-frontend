import { RootReducerState } from '@/redux/store/rootReducer'

export const accountSelectors = {
  getToken: (state: RootReducerState) => state.account.token,
  getIsLoggedIn: (state: RootReducerState) => state.account.isLoggedIn,
  getIsAccountCompleted: (state: RootReducerState) => state.account.isAccountCompleted,
  getFirstName: (state: RootReducerState) => state.account.firstName,
  getEmail: (state: RootReducerState) => state.account.email,
}
