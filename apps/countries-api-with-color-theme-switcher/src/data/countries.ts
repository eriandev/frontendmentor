import { bordersFields, detailFields, languaguePriority } from '@/utils/consts'
import type {
  Country,
  CountriesApiResponse,
  NameSymbol,
  CountriesApiFields,
  Name,
  AlteredCountriesApiResponse,
} from '@/utils/types'

let cache: Country[] | null = null

export function getRegions(countryList: Country[]) {
  return [...new Set(countryList.map((c) => c.region.toLocaleLowerCase()))].sort()
}

export async function getCountryList() {
  if (cache !== null) return cache

  const [detailResponse, bordersResponse] = await Promise.allSettled([
    fetchCountriesApi<Array<Omit<CountriesApiResponse, 'borders' | 'tld'>>>(...detailFields),
    fetchCountriesApi<Array<Pick<CountriesApiResponse, 'name' | 'cca3' | 'borders' | 'tld'>>>(...bordersFields),
  ])

  const countriesDetailData = getSettledValue(detailResponse, [])
  const countriesBordersData = getSettledValue(bordersResponse, [])

  const tldMap = new Map(countriesBordersData.map((c) => [c.cca3, c.tld]))
  const bordersMap = new Map(countriesBordersData.map((c) => [c.cca3, c.borders]))
  const nameMap = new Map(countriesBordersData.map((c) => [c.cca3, c.name.common]))
  const countriesData: AlteredCountriesApiResponse[] = countriesDetailData.map((country) => ({
    ...country,
    tld: tldMap.get(country.cca3) ?? [],
    borders: (bordersMap.get(country.cca3) ?? []).map((cca3) => ({
      cca3,
      name: nameMap.get(cca3) ?? cca3,
    })),
  }))

  cache = normalizeCountries(countriesData)
  return cache
}

function getSettledValue<T>(result: PromiseSettledResult<T>, fallback: T): T {
  if (result.status === 'fulfilled') return result.value
  return fallback
}

async function fetchCountriesApi<T>(...fields: CountriesApiFields[]) {
  const response = await fetch(`https://restcountries.com/v3.1/all?fields=${fields.join(',')}`)
  return (await response.json()) as T
}

function getNativeName({ nativeName }: Name) {
  for (const lang of languaguePriority) {
    if (nativeName[lang] !== undefined) return nativeName[lang].common
  }

  return Object.values(nativeName)[0]?.common
}

function normalizeCountries(countriesData: AlteredCountriesApiResponse[]): Country[] {
  return countriesData.map((country) => ({
    cca3: country.cca3,
    tld: country.tld[0],
    flag: country.flags,
    region: country.region,
    borders: country.borders,
    name: country.name.common,
    capital: country.capital[0],
    subRegion: country.subregion,
    nativeName: getNativeName(country.name),
    population: country.population.toLocaleString('en-US'),
    languages: Object.values(country.languages).map((lang: string) => lang),
    currencies: Object.values(country.currencies).map(({ name }: NameSymbol) => name),
  }))
}
