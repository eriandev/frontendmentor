import { atom } from 'nanostores'
import { getGeocoding } from '@/utils/api'
import type { Result } from '@/utils/types'

let term = $state('')
let results = $state<Result[]>([])

interface SearchState {
  loading: boolean
  selected?: Result
}

const baseStore = atom<SearchState>({
  loading: false,
})

const updateResults = async () => {
  baseStore.set({
    ...baseStore.get(),
    loading: true,
  })

  try {
    const response = await getGeocoding(term)

    results = response.results.map(({ id, name, admin1, country, country_code, latitude, longitude }) => ({
      id,
      name,
      admin1,
      country,
      latitude,
      longitude,
      country_code,
    }))
  } catch (error) {
    console.error(error)
  } finally {
    baseStore.set({
      ...baseStore.get(),
      loading: false,
    })
  }
}

const updateSelected = (selected: Result) => {
  results = []
  baseStore.set({
    ...baseStore.get(),
    selected,
  })
  term = `${selected.name} (${selected.admin1}), ${selected.country_code}`
}

const submit = async (e: SubmitEvent) => {
  e.preventDefault()

  if (term.length <= 2) return

  await updateResults()
}

export const search = {
  get term() {
    return term
  },
  set term(val) {
    term = val
    results = []
  },

  get results() {
    return results
  },

  submit,
  updateResults,
  updateSelected,
  subscribe: baseStore.subscribe,
}
