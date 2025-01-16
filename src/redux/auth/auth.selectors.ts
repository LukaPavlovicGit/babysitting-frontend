import { RootState } from '@/redux/store/rootReducer'

export const authSelectors = {
  getToken: (state: RootState) => state.auth.token,
  getIsLoggedIn: (state: RootState) => state.auth.isLoggedIn,
  getIsAccountCompleted: (state: RootState) => state.auth.isAccountCompleted,
  getFirstName: (state: RootState) => state.auth.firstName,
  getEmail: (state: RootState) => state.auth.email,
}
