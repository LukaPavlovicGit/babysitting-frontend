import { AccountState } from '@/redux/store/store'

export const accountSelectors = {
  getToken: (state: AccountState) => state.token,
  getIsLoggedIn: (state: AccountState) => state.isLoggedIn,
  getIsAccountCompleted: (state: AccountState) => state.isAccountCompleted,
  getFirstName: (state: AccountState) => state.firstName,
  getEmail: (state: AccountState) => state.email,
}
