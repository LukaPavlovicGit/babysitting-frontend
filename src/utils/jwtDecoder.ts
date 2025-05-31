import { jwtDecode } from 'jwt-decode'

interface JwtCustomPayload {
  sub: string
  role: string
  email: string
  exp: number
}

export function checkTokenValidity(jwt = '') {
  if (jwt && jwt.trim() !== '') {
    try {
      const decoded = jwtDecode<JwtCustomPayload>(jwt)
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
  const jwt = localStorage.getItem('jwt') || ''
  return checkTokenValidity(jwt) ? jwtDecode<JwtCustomPayload>(jwt) : null
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
