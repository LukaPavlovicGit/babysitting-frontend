import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { accountReducer } from '../auth/account.reducers'

const combinedReducers = combineReducers({
  account: accountReducer,
})

const store = configureStore({
  reducer: combinedReducers,
  devTools: process.env.NODE_ENV !== 'production',
})

export type AccountState = ReturnType<typeof accountReducer>
export type AppDispatch = typeof store.dispatch

export { store }
