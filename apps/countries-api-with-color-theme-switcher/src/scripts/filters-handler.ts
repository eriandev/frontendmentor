import { cards, cardsSection, searchInput } from '@/scripts/declare-refs'

let currentSearch = ''
let currentRegion: string | null = null

searchInput?.addEventListener('input', (e) => {
  currentSearch = (e.currentTarget as HTMLInputElement).value.toLowerCase()
  applyFilters()
})

document.addEventListener('region-change', (e) => {
  currentRegion = e.detail.region
  applyFilters()
})

// eslint-disable-next-line complexity --- Necessary
function applyFilters() {
  let cardsCount = 0
  const value = currentSearch

  for (const card of cards) {
    const name = card.dataset.name?.toLowerCase()
    const region = card.dataset.region?.toLowerCase()
    const capital = card.dataset.capital?.toLowerCase()

    const matchSearch =
      value.length === 0 ||
      (typeof name === 'string' && name.includes(value)) ||
      (typeof capital === 'string' && capital.includes(value))
    const matchRegion = currentRegion === null || region === currentRegion.toLowerCase()

    const match = matchSearch && matchRegion
    if (match) cardsCount += 1
    card.hidden = !match
  }

  if (cardsCount < 4) {
    cardsSection?.classList.add('justify-items-start', 'px-6')
    cardsSection?.classList.remove('justify-items-center')
  } else {
    cardsSection?.classList.add('justify-items-center')
    cardsSection?.classList.remove('justify-items-start', 'px-6')
  }
}
