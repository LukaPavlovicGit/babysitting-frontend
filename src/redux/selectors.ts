import { RootState } from '@/redux/store/store'
import { createSelector } from 'reselect'

const getState = (state: RootState) => state.app

export const selectors = {
  getToken: createSelector([getState], (state) => state.authState.token),
  getIsLoggedIn: createSelector([getState], (state) => state.authState.isLoggedIn),
  getIsAccountCompleted: createSelector([getState], (state) => state.authState.isAccountCompleted),
  getFirstName: createSelector([getState], (state) => state.authState.firstName),
  getEmail: createSelector([getState], (state) => state.authState.email),
  getAccounts: createSelector([getState], (state) => state.dataState.accounts),
  getOffers: createSelector([getState], (state) => state.dataState.offers),
  getLongitude: createSelector([getState], (state) => state.authState.longitude),
  getLatitude: createSelector([getState], (state) => state.authState.latitude),
}
