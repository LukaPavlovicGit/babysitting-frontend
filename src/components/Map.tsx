'use client'

import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import { LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'

const center: LatLngTuple = [43.898356, 20.352036]

export type MapConfig = {
  center: [number, number] | [43.898356, 20.352036]
  zoom: number | 13
  scrollWheelZoom: boolean | false
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  myMarker: [number, number]
  markers: [number, number][]
}

export default function Map() {
  const config: MapConfig = {
    center: [43.898356, 20.352036],
    zoom: 13,
    scrollWheelZoom: false,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    markers: [],
    myMarker: [43.898356, 20.352036],
  }

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
      {config.markers.map((markerPosition, index) => (
        <Marker key={index} position={markerPosition}>
          <Popup>POPUPP</Popup>
        </Marker>
      ))}
      <CircleMarker center={center} radius={20}>
        <Popup>Circle marker</Popup>
      </CircleMarker>
    </MapContainer>
  )
}
