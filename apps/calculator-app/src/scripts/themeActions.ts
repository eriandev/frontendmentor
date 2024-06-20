import { storage } from 'shared/utils/dom.ts'
import { THEME_STORAGE } from '@/scripts/consts.ts'
import { inputStep1, inputStep2, inputStep3 } from '@/scripts/declareRefs'

const inputSteps = {
  1: inputStep1,
  2: inputStep2,
  3: inputStep3
}

export function switchTheme (themeNumber: string): void {
  const bodyClassList = document.body.classList

  bodyClassList.remove('theme-1')
  bodyClassList.remove('theme-2')
  bodyClassList.remove('theme-3')
  bodyClassList.add(`theme-${themeNumber}`)

  inputSteps[themeNumber as '1' | '2' | '3']?.click()

  storage.set(THEME_STORAGE, themeNumber)
}
