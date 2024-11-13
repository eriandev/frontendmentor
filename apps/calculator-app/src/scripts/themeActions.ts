import { storage } from 'shared/utils/dom.ts'
import { THEME_STORAGE } from '@/scripts/consts.ts'
import { inputStep1, inputStep2, inputStep3 } from '@/scripts/declareRefs'

const inputSteps = {
  1: inputStep1,
  2: inputStep2,
  3: inputStep3
}

export function switchTheme (themeNumber: string): void {
  const { body } = document

  body.classList.remove('theme-1')
  body.classList.remove('theme-2')
  body.classList.remove('theme-3')
  body.classList.add(`theme-${themeNumber}`)

  inputSteps[themeNumber as '1' | '2' | '3']?.click()

  storage.set(THEME_STORAGE, themeNumber)
}
