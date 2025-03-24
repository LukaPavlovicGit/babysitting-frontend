import { NextRequest, NextResponse } from 'next/server'
import { store } from './redux/store/store'
import { accountSelectors } from './redux/auth/account.selectors'

const protectedRoutes = ['/']

export default function middleware(request: NextRequest) {
  const isLoggedIn = accountSelectors.getIsLoggedIn(store.getState())
  const { pathname } = request.nextUrl
  const isProtectedRoute = protectedRoutes.includes(pathname)

  if (!isLoggedIn && isProtectedRoute) {
    return NextResponse.redirect(new URL('/login-or-signup', request.url))
  }
}
