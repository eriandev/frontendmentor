import { $$, storage } from 'shared/utils/dom.ts'
import { $keyButtons } from '@/scripts/declareRefs.ts'
import { switchTheme } from '@/scripts/themeActions.ts'
import { INPUT_SWITCH_SELECTOR, THEME_STORAGE } from '@/scripts/consts.ts'
import { updateKeyActive, updateInputDisplay } from '@/scripts/calculatorActions.ts'

const themeNumber = storage.get(THEME_STORAGE)
const inputRadioList = $$<HTMLInputElement>(INPUT_SWITCH_SELECTOR)

function getValidThemeNumber(value: string): 1 | 2 | 3 {
  const valueAsNumber = Number(value)
  const isValidThemeNumber = valueAsNumber === 1 || valueAsNumber === 2 || valueAsNumber === 3

  if (isValidThemeNumber) return valueAsNumber
  return 1
}

document.addEventListener('DOMContentLoaded', () => {
  if (themeNumber != null) {
    switchTheme(getValidThemeNumber(themeNumber))
  }

  document.addEventListener('keydown', (event) => {
    updateKeyActive(event, 'add')
  })

  document.addEventListener('keyup', (event) => {
    updateKeyActive(event, 'remove')
    updateInputDisplay(event.key)
  })

  $keyButtons.forEach((element) => {
    element.addEventListener('click', (event) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion -- I'm sure, believe me
      const { id } = event.currentTarget as HTMLButtonElement
      const value = id.replace('key-', '')
      updateInputDisplay(value)
    })
  })

  inputRadioList.forEach((inputRadio) => {
    inputRadio.addEventListener('input', () => {
      switchTheme(getValidThemeNumber(inputRadio.value))
    })
  })
})
