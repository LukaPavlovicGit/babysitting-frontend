import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { reducer } from '../reducers'

const combinedReducers = combineReducers({
  account: reducer,
})

const store = configureStore({
  reducer: combinedReducers,
  devTools: process.env.NODE_ENV !== 'production',
})

export type AccountState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch

export { store }
