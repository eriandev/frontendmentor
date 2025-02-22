import L from 'leaflet'

import { getIpInfo } from '@/scripts/api.ts'
import { validateIP } from '@/scripts/validation.ts'
import {
  $button,
  $form,
  $input,
  $ipAddress,
  $isp,
  $location,
  $timezone,
  locationIcon,
  myMap,
} from '@/scripts/declareRefs.ts'

$button?.addEventListener('click', (event) => {
  void formAction(event)
})

async function formAction(event: MouseEvent): Promise<void> {
  event.preventDefault()

  const formData = new FormData($form ?? undefined)
  const possibleValue = formData.get('ip-value')
  const inputValue = typeof possibleValue === 'string' ? possibleValue.toString().trim() : null

  const { isValid, message } = validateIP(inputValue ?? '')

  if (!isValid || inputValue == null) {
    $input?.setCustomValidity(message)
    $input?.reportValidity()
    return
  }

  $input?.setCustomValidity('')

  const { error, ipAddress, isp, lat, lng, location, timezone } = await getIpInfo(inputValue)

  if (error != null) return

  const elements = [
    { element: $ipAddress, value: ipAddress, title: ipAddress },
    { element: $location, value: location, title: location },
    { element: $timezone, value: timezone, title: timezone },
    { element: $isp, value: isp, title: isp },
  ]

  elements.forEach(({ element, value, title }) => {
    if (element != null) {
      element.textContent = value ?? '-'
      element.setAttribute('title', title ?? '-')
    }
  })

  moveMarker(lat, lng)
}

function moveMarker(lat?: number, lng?: number): void {
  if (lng == null || lat == null) return

  myMap.setView(new L.LatLng(lat, lng))

  const marker = L.marker([lng, lat], { icon: locationIcon }).addTo(myMap)
  marker.bindPopup("<b>It's here!</b>").openPopup()
}
