import { combineReducers } from 'redux'
import { authReducer } from '@/redux/auth/auth.reducers'

export const rootReducer = combineReducers({
  auth: authReducer,
})

export type RootState = ReturnType<typeof rootReducer>
