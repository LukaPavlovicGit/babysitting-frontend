import { store } from '@/redux/store/store'
import { accountSelectors } from '@/redux/auth/account.selectors'
import { jwtDecode } from 'jwt-decode'
import { RootReducerState } from '@/redux/store/rootReducer'

interface JwtCustomPayload {
  sub: string
  role: string
  email: string
  exp: number
}

export function checkTokenValidity(token = '') {
  if (token && token.trim() !== '') {
    try {
      const decoded = jwtDecode<JwtCustomPayload>(token)
      if (!decoded?.exp) {
        return false
      }
      if (Date.now() < decoded.exp * 1000) {
        return true
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      return false
    }
  }
  return false
}

export const JwtDecodeAttempt = () => {
  const token = accountSelectors.getToken(store.getState() as RootReducerState) || ''
  return checkTokenValidity(token) ? jwtDecode<JwtCustomPayload>(token) : null
}

export const getUserIdFromJwt = () => {
  const decoded = JwtDecodeAttempt()
  return decoded?.sub
}

export const getUserTypeFromJwt = () => {
  const decoded = JwtDecodeAttempt()
  return decoded?.role
}

export const getUserEmailFromJwt = () => {
  const decoded = JwtDecodeAttempt()
  return decoded?.email
}
