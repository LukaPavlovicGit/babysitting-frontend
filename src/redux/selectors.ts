import { State } from '@/redux/store/store'
import { createSelector } from 'reselect'

interface RootState {
  state: State
}

const getState = (state: RootState) => state.state

export const selectors = {
  getToken: createSelector([getState], (state) => state.authState.token),
  getIsLoggedIn: createSelector([getState], (state) => state.authState.isLoggedIn),
  getIsAccountCompleted: createSelector([getState], (state) => state.authState.isAccountCompleted),
  getFirstName: createSelector([getState], (state) => state.authState.firstName),
  getEmail: createSelector([getState], (state) => state.authState.email),
  getAccounts: createSelector([getState], (state) => state.dataState.accounts),
  getOffers: createSelector([getState], (state) => state.dataState.offers),
}
