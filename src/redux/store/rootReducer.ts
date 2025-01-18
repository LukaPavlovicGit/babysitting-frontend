import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { authReducer } from '@/redux/auth/auth.reducers'

const userPersistConfig = {
  key: 'auth',
  storage: storage,
  // without whitelist, it will persist all the state
  // whitelist: ['token', 'firstName', 'email', 'isAccountCompleted', 'isLoggedIn'],
}

const persistedAuthReducer = persistReducer(userPersistConfig, authReducer)

export const rootReducer = combineReducers({
  auth: persistedAuthReducer,
})

export type RootReducerState = ReturnType<typeof rootReducer>
