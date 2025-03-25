'use client' // Ensure this is a client component

import { useSelector } from 'react-redux'
import { accountSelectors } from '../redux/auth/account.selectors'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = useSelector(accountSelectors.getIsLoggedIn)
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login-or-signup')
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return <ClipLoader color="#000" size={10} />
  }

  return <>{children}</>
}
