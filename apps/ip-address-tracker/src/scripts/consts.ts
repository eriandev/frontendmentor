import L from 'leaflet'

export const INITIAL_LNG = 34.0658
export const INITIAL_LAT = -118.0853

export const BASE_MAPS = {
  OpenStreetMaps: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom: 2,
    maxZoom: 19,
    id: 'osm.streets'
  }),
  'Google-Map': L.tileLayer('https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
    minZoom: 2,
    maxZoom: 19,
    id: 'google.street'
  }),
  'Google-Satellite': L.tileLayer('https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    minZoom: 2,
    maxZoom: 19,
    id: 'google.satellite'
  }),
  'Google-Hybrid': L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    minZoom: 2,
    maxZoom: 19,
    id: 'google.hybrid'
  })
}
