import L from 'leaflet'

import { getIpInfo } from '@/scripts/api.ts'
import { validateIP } from '@/scripts/validation.ts'
import { $button, $form, $input, $ipAddress, $isp, $location, $timezone, locationIcon, myMap } from '@/scripts/declareRefs.ts'

$button?.addEventListener('click', (event) => {
  void formAction(event)
})

async function formAction (event: MouseEvent): Promise<void> {
  event.preventDefault()

  const formData = new FormData($form ?? undefined)
  const inputValue = formData.get('ip-value')?.toString().trim()

  const { isValid, message } = validateIP(inputValue ?? '')

  if (!isValid || inputValue == null) {
    $input?.setCustomValidity(message)
    $input?.reportValidity()
    return
  }

  $input?.setCustomValidity('')

  const { error, ipAddress, isp, lat, lng, location, timezone } = await getIpInfo(inputValue)

  if (error != null) return

  if ($ipAddress != null) {
    $ipAddress.textContent = ipAddress ?? '-'
    $ipAddress.setAttribute('title', ipAddress ?? '-')
  }
  if ($location != null) {
    $location.textContent = location ?? '-'
    $location.setAttribute('title', location ?? '-')
  }
  if ($timezone != null) {
    $timezone.textContent = timezone ?? '-'
    $timezone.setAttribute('title', timezone ?? '-')
  }
  if ($isp != null) {
    $isp.textContent = isp ?? '-'
    $isp.setAttribute('title', isp ?? '-')
  }

  moveMarker(lat, lng)
}

function moveMarker (lat?: number, lng?: number): void {
  if (lng == null || lat == null) return

  myMap.setView(new L.LatLng(lat, lng))

  const marker = L.marker([lng, lat], { icon: locationIcon }).addTo(myMap)
  marker.bindPopup("<b>It's here!</b>").openPopup()
}
