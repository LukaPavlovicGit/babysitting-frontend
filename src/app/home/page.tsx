'use client'

import dynamic from 'next/dynamic'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useEffect } from 'react'
import { actions } from '@/redux/actions'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '@/redux/store/store'

const Map = dynamic(() => import('../../components/Map'), {
  loading: () => <p>Loading map...</p>,
  ssr: false,
})

export default function Home() {
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(actions.getData())
  })

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center px-12 gap-4 justify-top min-h-screen w-screen z-0">
        <Map />
        <h2 className="text-2xl font-bold">Welcome to the Home Page</h2>
      </div>
    </ProtectedRoute>
  )
}
