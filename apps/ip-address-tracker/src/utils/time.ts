export function getUTCFromTimezone (timeZone: string): string {
  // Crear un objeto Date con la hora actual en la zona horaria dada
  const dateFormat = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'short' })

  console.log({ dateFormat })

  // Obtener las partes formateadas de la fecha y hora
  const dateParts = dateFormat.formatToParts(new Date())

  console.log({ dateParts })

  // Buscar la parte que contiene la diferencia con UTC
  const dateGMT = dateParts.find(part => part.type === 'timeZoneName')?.value ?? 'unknown'

  console.log({ dateGMT })

  return dateGMT.replace('GMT', 'UTC')
}
