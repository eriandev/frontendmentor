import { atom } from 'nanostores'
import { getWeather } from '@/utils/api'
import type { Coords, Current, Daily, Hourly } from '@/utils/types'

interface WeatherState {
  loading: boolean
  current?: Current
  daily?: Daily[]
  hourly?: Hourly[]
}

const baseStore = atom<WeatherState>({
  loading: false,
})

const update = async ({ latitude, longitude }: Coords) => {
  baseStore.set({
    ...baseStore.get(),
    loading: true,
  })

  try {
    const response = await getWeather({ latitude, longitude })

    baseStore.set({
      loading: false,
      current: response.current,
      daily: response.daily,
      hourly: response.hourly,
    })
  } catch (error) {
    console.error(error)
  } finally {
    baseStore.set({
      ...baseStore.get(),
      loading: false,
    })
  }
}

export const weather = {
  subscribe: baseStore.subscribe,
  update,
}
