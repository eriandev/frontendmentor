import { $, $$ } from 'shared/utils/dom'

export const cardsSection = $<HTMLDivElement>('.cards')
export const cards = Array.from($$<HTMLDivElement>('.card'))
export const searchInput = $<HTMLInputElement>('#search-input')
