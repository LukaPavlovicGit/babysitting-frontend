'use client' // Ensure this is a client component

import { useSelector } from 'react-redux'
import { selectors } from '../redux/selectors'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isLoggedIn = useSelector(selectors.getIsLoggedIn)
  const router = useRouter()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/')
    }
  }, [isLoggedIn, router])

  if (!isLoggedIn) {
    return <ClipLoader color="#000" size={10} />
  }

  return <>{children}</>
}
