import { LatLngTuple } from 'leaflet'

export type MarkerConfig = {
  position: LatLngTuple
  popup: string
  icon: L.Icon
}

export type MapConfig = {
  center: LatLngTuple | [43.898356, 20.352036]
  zoom: number | 13
  scrollWheelZoom: boolean | false
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  myMarker: MarkerConfig
  markers: MarkerConfig[]
}
