'use client'

import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import { LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import { MapConfig } from '@/types/map'

const center: LatLngTuple = [43.898356, 20.352036]

export default function Map(config: MapConfig) {
  return (
    <MapContainer
      className="h-[60vh] w-screen"
      center={config.center}
      zoom={config.zoom}
      scrollWheelZoom={config.scrollWheelZoom}
    >
      <TileLayer attribution={config.attribution} url={config.url} />
      <Marker position={center}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <CircleMarker center={center} radius={20}>
        <Popup>Circle marker</Popup>
      </CircleMarker>
    </MapContainer>
  )
}
