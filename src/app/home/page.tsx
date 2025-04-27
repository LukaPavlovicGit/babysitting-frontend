'use client'

import { MapConfig } from '@/types/map'
import dynamic from 'next/dynamic'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useEffect } from 'react'
import { selectors } from '@/redux/selectors'
import { store } from '@/redux/store/store'

const Map = dynamic(() => import('../../components/Map'), {
  loading: () => <p>Loading map...</p>,
  ssr: false,
})

export default function Home() {
  useEffect(() => {})

  const mapConfig: MapConfig = {
    center: [43.898356, 20.352036],
    zoom: 13,
    scrollWheelZoom: false,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    markers: [],
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col items-center p-12 gap-4 justify-top min-h-screen w-screen">
        <h2 className="text-2xl font-bold">Welcome to the Home Page</h2>
        <Map {...mapConfig} />
      </div>
    </ProtectedRoute>
  )
}
