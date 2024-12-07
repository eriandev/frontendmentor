import L from 'leaflet'
import { BASE_MAPS, INITIAL_LAT, INITIAL_LNG } from '@/scripts/consts.ts'

import { $ } from 'shared/utils/dom.ts'

export const $form = $<HTMLFormElement>('form')
export const $input = $<HTMLInputElement>('input')
export const $button = $<HTMLButtonElement>('button')

export const $ipAddress = $<HTMLSpanElement>('#ip-address')
export const $location = $<HTMLSpanElement>('#location')
export const $timezone = $<HTMLSpanElement>('#timezone')
export const $isp = $<HTMLSpanElement>('#isp')

export const myMap = L.map('map', {
  zoom: 10,
  zoomControl: true,
  attributionControl: false,
  layers: [BASE_MAPS['Google-Map']],
  center: [INITIAL_LNG, INITIAL_LAT],
})

export const locationIcon = L.icon({
  iconUrl: '/frontendmentor/ip-address-tracker/images/icon-location.svg',

  iconSize: [38, 48],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
})
