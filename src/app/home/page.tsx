'use client'

import dynamic from 'next/dynamic'
import ProtectedRoute from '@/components/ProtectedRoute'

const Map = dynamic(() => import('../../components/Map'), {
  loading: () => <p>Loading map...</p>,
  ssr: false,
})

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center px-12 gap-4 justify-top min-h-screen w-screen z-0">
        <Map />
        <h2 className="text-2xl font-bold">Welcome to the Home Page</h2>
      </div>
    </ProtectedRoute>
  )
}
