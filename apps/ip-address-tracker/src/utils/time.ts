export function getUTCFromTimezone(timeZone: string): string {
  // Create a Date object with the current time in the given time zone
  const dateFormat = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'short' })

  // Obtain the formatted parts of the date and time
  const dateParts = dateFormat.formatToParts(new Date())

  // Find the part that contains the difference from UTC
  const dateGMT = dateParts.find((part) => part.type === 'timeZoneName')?.value ?? 'unknown'

  return dateGMT.replace('GMT', 'UTC')
}
