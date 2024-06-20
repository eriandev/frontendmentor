import { $, $$ } from 'shared/utils/dom.ts'
import { KEY_SELECTOR } from '@/scripts/consts.ts'

export const inputStep1 = $<HTMLInputElement>('#step-1')
export const inputStep2 = $<HTMLInputElement>('#step-2')
export const inputStep3 = $<HTMLInputElement>('#step-3')
export const $keyButtons = $$<HTMLButtonElement>(KEY_SELECTOR)
export const $inputDisplay = $<HTMLInputElement>('#input-display')
