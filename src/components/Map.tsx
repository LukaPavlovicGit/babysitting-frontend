'use client'

import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import 'leaflet-defaulticon-compatibility'
import { useSelector } from 'react-redux'
import { selectors } from '@/redux/selectors'
import { Offer, RoleEnum } from '@/types'

const createMarkerIcon = (type: RoleEnum | 'ME') => {
  const iconMap: Record<RoleEnum | 'ME', string> = {
    [RoleEnum.PARENT]: '👤',
    [RoleEnum.BABYSITTER]: '🧑‍🍼',
    ME: '📍',
  }

  return L.divIcon({
    html: `<div style="font-size: 24px; text-align: center;">${iconMap[type]}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    className: 'custom-div-icon',
  })
}

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
    myMarker: [43.89835, 20.35204],
  }

  const offers: Offer[] = useSelector(selectors.getOffers)
  const currentUserId = useSelector(selectors.getUserId)

  return (
    <MapContainer
      className="h-[60vh] w-screen"
      center={config.center}
      zoom={config.zoom}
      scrollWheelZoom={config.scrollWheelZoom}
    >
      <TileLayer attribution={config.attribution} url={config.url} />
      {offers.map((offer) => {
        const isMyOffer = offer.createdByUserId === currentUserId

        if (isMyOffer) {
          return (
            <Marker
              key={offer.id}
              position={[offer.addressLongitude, offer.addressLatitude]}
              icon={createMarkerIcon('ME')}
            >
              <Popup>
                <div>
                  <strong>You</strong>
                </div>
              </Popup>
            </Marker>
          )
        } else {
          return (
            <Marker
              key={offer.id}
              position={[offer.addressLongitude, offer.addressLatitude]}
              icon={
                offer.createdByRole === 1 ? createMarkerIcon(RoleEnum.PARENT) : createMarkerIcon(RoleEnum.BABYSITTER)
              }
            >
              <Popup>
                <div>
                  <strong>{offer.createdByRole === 1 ? '👨‍👩‍👧‍👦 Parent' : '👶 Babysitter'}</strong>
                  <br />
                  <strong>{offer.firstName}</strong>
                  <br />
                  {offer.addressName}
                  <br />
                  Rate: ${offer.rate}/hour
                </div>
              </Popup>
            </Marker>
          )
        }
      })}
    </MapContainer>
  )
}
