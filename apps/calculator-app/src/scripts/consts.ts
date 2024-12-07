export const KEY_SELECTOR = '[id^="key-"]'
export const NUMBERS_SEPARATE_REGEX = /[+\-*/]/
export const THEME_STORAGE = 'calculator-app-theme'
export const INPUT_SWITCH_SELECTOR = 'input[name="switch-step"]'

export const keyList = [
  { key: '7' },
  { key: '8' },
  { key: '9' },
  { key: 'Backspace' },
  { key: '4' },
  { key: '5' },
  { key: '6' },
  { key: '+', code: ['NumpadAdd'] },
  { key: '1' },
  { key: '2' },
  { key: '3' },
  { key: '-' },
  { key: '.', code: ['NumpadDecimal', 'Period', 'Comma'] },
  { key: '0' },
  { key: '/', code: ['NumpadDivide'] },
  { key: 'x', code: ['KeyX', 'NumpadMultiply'] },
]
export const keypadList = [...keyList, { key: 'Enter', code: ['Enter', 'NumpadEnter'] }, { key: 'Delete' }]
