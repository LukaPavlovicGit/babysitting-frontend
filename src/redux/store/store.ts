import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { reducer } from '../reducers'

const combinedReducers = combineReducers({
  app: reducer,
})

const store = configureStore({
  reducer: combinedReducers,
  devTools: process.env.NODE_ENV !== 'production',
})

export type RootState = ReturnType<typeof combinedReducers>
export type AppDispatch = typeof store.dispatch
export type State = ReturnType<typeof reducer>

export { store }
