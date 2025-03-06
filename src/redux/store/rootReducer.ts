import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from '@/utils/customStorage'
import { accountReducer } from '@/redux/auth/account.reducers'

const userPersistConfig = {
  key: 'auth',
  storage,
  // without whitelist, it will persist all the state
  // whitelist: ['token', 'firstName', 'email', 'isAccountCompleted', 'isLoggedIn'],
}

const persistedAccountReducer = persistReducer(userPersistConfig, accountReducer)

export const rootReducer = combineReducers({
  account: persistedAccountReducer,
})

export type RootReducerState = ReturnType<typeof rootReducer>
