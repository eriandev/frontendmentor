import { inList, inRange } from '@/utils/validate'
import type { LengthKey, SpeedKey, TempKey } from '@/utils/types'

export const trunc = (val: number | undefined) => (typeof val === 'number' ? Math.trunc(val) : val)

export const tempValue = (temp: number, tempKey: TempKey) =>
  tempKey === 'c' ? `${temp}°` : `${trunc(temp * 1.8 + 32)}°`

export const speedValue = (speed: number, speedKey: SpeedKey) =>
  speedKey === 'km/h' ? `${speed} km/h` : `${(speed * 0.621371).toFixed(2)} mph`

export const lengthValue = (length: number, lengthKey: LengthKey) =>
  lengthKey === 'mm' ? `${length} mm` : `${(length * 0.0393701).toFixed(2)} in`

export const weekdayName = (date: Date, { format = 'long' }: { format?: 'short' | 'long' } = {}) =>
  new Intl.DateTimeFormat('en-US', {
    weekday: format,
  }).format(date)

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)

export const formatTime = (date: Date): string =>
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(date)

// eslint-disable-next-line complexity --- Necessary complexity
export const weatherIconByCode = (code?: number) => {
  if (typeof code !== 'number') return

  if (code === 0) return 'sunny'
  if (inRange(code, 1, 3)) return 'partly-cloudy'
  if (inRange(code, 4, 5)) return 'overcast'

  if (code === 28 || inRange(code, 40, 49)) return 'fog'
  if (inList(code, [20, 24]) || inRange(code, 50, 59)) return 'drizzle'
  if (inList(code, [21, 25, 27]) || inRange(code, 60, 69) || inRange(code, 80, 92)) return 'rain'
  if (inList(code, [22, 23, 26]) || inRange(code, 70, 79) || inRange(code, 93, 94)) return 'snow'
  if (code === 29 || inRange(code, 95, 99)) return 'storm'

  return 'default'
}
