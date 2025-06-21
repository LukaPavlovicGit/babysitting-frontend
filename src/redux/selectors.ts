import { RootState } from '@/redux/store/store'
import { createSelector } from 'reselect'

const getState = (state: RootState) => state.app

export const selectors = {
  getToken: createSelector([getState], (state) => state.authState.token),
  getIsLoggedIn: createSelector([getState], (state) => state.authState.isLoggedIn),
  getIsAccountCompleted: createSelector([getState], (state) => state.authState.isAccountCompleted),
  getFirstName: createSelector([getState], (state) => state.authState.firstName),
  getUserId: createSelector([getState], (state) => state.authState.userId),
  getEmail: createSelector([getState], (state) => state.authState.email),
  getAccounts: createSelector([getState], (state) => state.dataState.accounts),
  getOffers: createSelector([getState], (state) => {
    const result = state.dataState.offers
    console.log('SELECTOR - returning:', result)
    console.log('SELECTOR - isArray:', Array.isArray(result))
    return result
  }),
}
