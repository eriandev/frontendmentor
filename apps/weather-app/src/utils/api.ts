import { fetchWeatherApi } from 'openmeteo'
import type { WeatherApiResponse } from '@openmeteo/sdk/weather-api-response'
import { trunc } from '@/utils/format'
import type { Current, Daily, Hourly, ForecastResponse, GeocodingResponse, Coords, Hour } from '@/utils/types'

export async function getGeocoding(name: string): Promise<GeocodingResponse> {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${name}&count=10&language=en&format=json`,
  )

  return (await response.json()) as GeocodingResponse
}

export async function getWeather({ latitude, longitude }: Coords): Promise<ForecastResponse> {
  const responses = await fetchWeatherApi('https://api.open-meteo.com/v1/forecast', {
    hourly: ['temperature_2m', 'weather_code'],
    daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min'],
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'precipitation',
      'wind_speed_10m',
      'weather_code',
      'apparent_temperature',
    ],
    latitude,
    longitude,
  })

  return {
    current: normalizeCurrent(responses[0]),
    hourly: normalizeHourly(responses[0]),
    daily: normalizeDaily(responses[0]),
  }
}

function normalizeCurrent(response: WeatherApiResponse): Current | undefined {
  const currentData = response.current()
  const utcOffsetSeconds = response.utcOffsetSeconds()

  return currentData === null
    ? undefined
    : {
        time: new Date((Number(currentData.time()) + utcOffsetSeconds) * 1000),
        temp: trunc(currentData.variables(0)?.value()),
        humidity: trunc(currentData.variables(1)?.value()),
        precipitation: trunc(currentData.variables(2)?.value()),
        windSpeed: trunc(currentData.variables(3)?.value()),
        code: currentData.variables(4)?.value(),
        feelsLike: trunc(currentData.variables(5)?.value()),
      }
}

function normalizeHourly(response: WeatherApiResponse): Hourly[] | undefined {
  const hourlyData = response.hourly()
  const utcOffsetSeconds = response.utcOffsetSeconds()

  const hourlyMapped =
    hourlyData === null
      ? undefined
      : {
          time: Array.from(
            { length: (Number(hourlyData.timeEnd()) - Number(hourlyData.time())) / hourlyData.interval() },
            (_, i) => new Date((Number(hourlyData.time()) + i * hourlyData.interval() + utcOffsetSeconds) * 1000),
          ),
          temperature_2m: hourlyData.variables(0)?.valuesArray(),
          weather_code: hourlyData.variables(1)?.valuesArray(),
        }

  const hourlyByDay = hourlyMapped?.time.reduce(
    (acc, time, i) => {
      const dateKey = time.toISOString().split('T')[0]

      // eslint-disable-next-line logical-assignment-operators, @typescript-eslint/no-unnecessary-condition, @typescript-eslint/strict-boolean-expressions --- Necessary
      if (!acc[dateKey]) acc[dateKey] = []

      acc[dateKey].push({
        time,
        code: hourlyMapped.weather_code?.[i],
        temp: trunc(hourlyMapped.temperature_2m?.[i]),
      })

      return acc
    },
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions --- Necessary
    {} as Record<string, Hour[]>,
  )

  return Object.entries(hourlyByDay ?? {}).map(([date, hours]) => ({
    date,
    hours,
  }))
}

function normalizeDaily(response: WeatherApiResponse): Daily[] | undefined {
  const daily = response.daily()
  const utcOffsetSeconds = response.utcOffsetSeconds()

  if (daily === null) return undefined

  const times = Array.from(
    { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() },
    (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000),
  )
  const code = daily.variables(0)?.valuesArray()
  const tempMax = daily.variables(1)?.valuesArray()
  const tempMin = daily.variables(2)?.valuesArray()

  return times.map((time, index) => ({
    time,
    code: code?.[index],
    tempMax: trunc(tempMax?.[index]),
    tempMin: trunc(tempMin?.[index]),
  }))
}
