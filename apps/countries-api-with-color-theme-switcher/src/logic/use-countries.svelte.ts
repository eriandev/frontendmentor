import { atom } from 'nanostores'
import { SvelteSet } from 'svelte/reactivity'
import { getCountries } from '@/data/countries'
import type { Country } from '@/utils/types'

interface CountriesStore {
  regions: string[]
  currentList: Country[]
}

let searchText = $state('')
let countryList: Country[] = []
let appliedFilter = $state<string | null>(null)

const countriesStore = atom<CountriesStore>({
  regions: [],
  currentList: [],
})

export function useCountries() {
  const getList = async () => {
    if (countryList.length > 0) return countryList

    countryList = await getCountries()
    const regions = [...new SvelteSet(countryList.map((c) => c.region.toLocaleLowerCase()))].sort()
    countriesStore.set({ currentList: countryList, regions })
    return countryList
  }

  const filterList = async (regionToApply: string | null) => {
    const filterToApply = regionToApply ?? appliedFilter

    if (filterToApply === null) return countryList

    return await updateList((prevState) =>
      prevState.filter(({ region }) => filterToApply.toLocaleLowerCase() === region.toLocaleLowerCase()),
    )
  }

  const changeFilter = async (newFilter: string | null) => {
    appliedFilter = newFilter === null ? newFilter : newFilter.toLocaleLowerCase()
    const filteredCountryList = await filterList(appliedFilter)
    await updateList(() => filteredCountryList)
  }

  const search = async (text: string) => {
    if (typeof text !== 'string' || text.length < 1) {
      const filteredCountries = await filterList(appliedFilter)
      await updateList(() => filteredCountries)
      return
    }

    searchText = text.toLocaleLowerCase().trim()
    const filteredCountries = (await filterList(appliedFilter)).filter(
      ({ capital, name }) =>
        name.toLocaleLowerCase().includes(searchText) ||
        (typeof capital === 'string' && capital.toLocaleLowerCase().includes(searchText)),
    )

    await updateList(() => filteredCountries)
  }

  const updateList = async (callback: (prevState: Country[]) => Country[]) => {
    const newState = callback(await getList())
    countriesStore.set({ ...countriesStore.get(), currentList: newState })
    return newState
  }

  return {
    search,
    getList,
    updateList,
    changeFilter,
    subscribe: countriesStore.subscribe,
  }
}
