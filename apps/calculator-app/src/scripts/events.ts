import { $$, storage } from 'shared/utils/dom.ts'
import { $keyButtons } from '@/scripts/declareRefs.ts'
import { switchTheme } from '@/scripts/themeActions.ts'
import { INPUT_SWITCH_SELECTOR, THEME_STORAGE } from '@/scripts/consts.ts'
import { updateKeyActive, updateInputDisplay } from '@/scripts/calculatorActions.ts'

const themeNumber = storage.get(THEME_STORAGE)
const inputRadioList = $$<HTMLInputElement>(INPUT_SWITCH_SELECTOR)

document.addEventListener('DOMContentLoaded', () => {
  if (themeNumber != null) {
    switchTheme(themeNumber)
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
      const { id } = event.currentTarget as HTMLButtonElement
      const value = id.replace('key-', '')
      updateInputDisplay(value)
    })
  })

  inputRadioList.forEach((inputRadio) => {
    inputRadio.addEventListener('input', () => {
      switchTheme(inputRadio.value)
    })
  })
})
