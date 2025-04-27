import { selectors } from '@/redux/selectors'
import { jwtDecode } from 'jwt-decode'
import { useSelector } from 'react-redux'

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
  const token = useSelector(selectors.getToken) || ''
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
