import { AccountState } from '@/redux/store/store'
import { createSelector } from 'reselect'

interface RootState {
  account: AccountState
}

const getAccountState = (state: RootState) => state.account

export const selectors = {
  getToken: createSelector([getAccountState], (account) => account.token),
  getIsLoggedIn: createSelector([getAccountState], (account) => account.isLoggedIn),
  getIsAccountCompleted: createSelector([getAccountState], (account) => account.isAccountCompleted),
  getFirstName: createSelector([getAccountState], (account) => account.firstName),
  getEmail: createSelector([getAccountState], (account) => account.email),
}
