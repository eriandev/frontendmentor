export type Coords = { latitude: number; longitude: number }
export type Result = Pick<
  GeocodingResponse['results'][number],
  'id' | 'name' | 'admin1' | 'country' | 'country_code' | 'latitude' | 'longitude'
>
export type TempKey = 'c' | 'f'
export type LengthKey = 'mm' | 'in'
export type SpeedKey = 'km/h' | 'mph'

export interface Option {
  value: string
  label: string
  disabled?: boolean
}

export interface ForecastResponse {
  current?: Current
  hourly?: Hourly[]
  daily?: Daily[]
}

export interface Current {
  time: Date
  code?: number
  temp?: number
  feelsLike?: number
  humidity?: number
  precipitation?: number
  windSpeed?: number
}

export interface Hourly {
  date?: string
  hours?: Hour[]
}

export interface Hour {
  time?: Date
  temp?: number
  code?: number
}

export interface Daily {
  time?: Date
  code?: number
  tempMax?: number
  tempMin?: number
}

export interface GeocodingResponse {
  generationtime_ms: number
  results: Array<{
    id: number
    name: string
    latitude: number
    longitude: number
    elevation: number
    feature_code: string
    country_code: string
    admin1_id: number
    admin2_id?: number
    admin3_id?: number
    admin4_id?: number
    timezone: string
    population?: number
    postcodes?: string[]
    country_id: number
    country: string
    admin1: string
    admin2?: string
    admin3?: string
    admin4?: string
  }>
}
