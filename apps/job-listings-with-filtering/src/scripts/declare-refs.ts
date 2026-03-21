import { $, $$ } from 'shared/utils/dom.ts'

export const $main = $<HTMLElement>('main')
export const $badgeList = $$<HTMLDivElement>('.badge')
export const $filterList = $<HTMLDivElement>('#filter-list')
export const $filterSection = $<HTMLElement>('#filter-section')
export const $filterClear = $<HTMLButtonElement>('#filter-clear')
export const $filterContainer = $<HTMLDivElement>('#filter-container')

export const $jobPosts = $$<HTMLElement>('[id^="job-post-"]')
