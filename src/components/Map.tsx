'use client'

import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import L, { LatLngTuple } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import { useSelector } from 'react-redux'
import { selectors } from '@/redux/selectors'
import { RoleEnum } from '@/types'

const createMarkerIcon = (type: string) => {
  const iconMap = {
    parent: '👤',
    babysitter: '🧑‍🍼',
    me: '📍',
  }

  return L.divIcon({
    html: `<div style="font-size: 24px; text-align: center;">${iconMap[type]}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    className: 'custom-div-icon',
  })
}

const center: LatLngTuple = [43.898356, 20.352036]

export type MapConfig = {
  center: [number, number] | [43.898356, 20.352036]
  zoom: number | 13
  scrollWheelZoom: boolean | false
  attribution: string
  url: string
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

  const offers = useSelector(selectors.getOffers)
  const longitude = useSelector(selectors.getLongitude)
  const latitude = useSelector(selectors.getLatitude)

  return (
    <MapContainer
      className="h-[60vh] w-screen"
      center={config.center}
      zoom={config.zoom}
      scrollWheelZoom={config.scrollWheelZoom}
    >
      <TileLayer attribution={config.attribution} url={config.url} />
      {offers.map((offer) => (
        <Marker
          key={offer.id}
          position={[offer.addressLatitude, offer.addressLongitude]}
          icon={createMarkerIcon(offer.createdByRole)}
        >
          <Popup>
            <div>
              <strong>{offer.createdByRole === RoleEnum.PARENT ? '👨‍👩 Parent' : '👩‍🏫 Babysitter'}</strong>
              <br />
              <strong>{offer.firstName}</strong>
              <br />
              {offer.addressName}
              <br />
              Rate: ${offer.rate}/hour
            </div>
          </Popup>
        </Marker>
      ))}
      {latitude && longitude && (
        <Marker position={[latitude, longitude]} icon={createMarkerIcon('me')}>
          <Popup>
            <div>
              <strong>You</strong>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}
