import { useEffect, useState } from 'react'
import { MapConfig } from '@/types/map'

const useGetMapConfig = () => {
  const [mapConfig, setMapConfig] = useState<MapConfig>()

  return mapConfig
}

export default useGetMapConfig
