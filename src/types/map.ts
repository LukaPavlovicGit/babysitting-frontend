export type MapConfig = {
  center: [number, number] | [43.898356, 20.352036]
  zoom: number | 13
  scrollWheelZoom: boolean | false
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  myMarker: [number, number]
  markers: [number, number][]
}
