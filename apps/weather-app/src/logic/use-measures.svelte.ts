import { atom } from 'nanostores'
import type { LengthKey, SpeedKey, TempKey } from '@/utils/types'

interface MeasuresState {
  temp: TempKey
  length: LengthKey
  speed: SpeedKey
}

const baseStore = atom<MeasuresState>({
  temp: 'c',
  length: 'mm',
  speed: 'km/h',
})

const update = (key: string, value: string) => {
  baseStore.set({
    ...baseStore.get(),
    [key]: value,
  })
}

export const measures = {
  subscribe: baseStore.subscribe,
  update,
}
