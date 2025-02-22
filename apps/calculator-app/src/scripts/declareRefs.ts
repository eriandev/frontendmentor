import { $, $$ } from 'shared/utils/dom.ts'
import { KEY_SELECTOR } from '@/scripts/consts.ts'

export const $keyButtons = $$<HTMLButtonElement>(KEY_SELECTOR)
export const inputStep1 = $<HTMLInputElement>('#switch-theme-1')
export const inputStep2 = $<HTMLInputElement>('#switch-theme-2')
export const inputStep3 = $<HTMLInputElement>('#switch-theme-3')
export const $inputDisplay = $<HTMLInputElement>('#input-display')
