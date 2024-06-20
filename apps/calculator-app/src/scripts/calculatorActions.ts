import { $ } from 'shared/utils/dom.ts'
import { keypadList } from '@/scripts/consts.ts'
import { $inputDisplay } from '@/scripts/declareRefs.ts'

let isOperationUsed = false

function getLastNumber (value: string): string {
  const numberValueList = value.split(/[+\-*/]/)
  return numberValueList[numberValueList.length - 1]
}

function getResult ($inputDisplay: HTMLInputElement): string {
  // eslint-disable-next-line no-eval
  const result = eval($inputDisplay.value) as number
  const resultHavePoint = Boolean(result.toString().match(/\./))
  return resultHavePoint ? result.toFixed(3) : result.toString()
}

function updateOperation ($inputDisplay: HTMLInputElement, operation: string): void {
  if (isOperationUsed) $inputDisplay.value = $inputDisplay.value.slice(0, -1)
  if ($inputDisplay.value.length > 0) $inputDisplay.value += operation
  isOperationUsed = true
}

function updateValueWithPoint ($inputDisplay: HTMLInputElement): void {
  const lastValue = getLastNumber($inputDisplay.value)
  const havePoint = Boolean(lastValue.match(/\./))
  const isLastEmpty = lastValue === ''

  if (!havePoint) {
    $inputDisplay.value = isLastEmpty ? $inputDisplay.value + '0.' : $inputDisplay.value + '.'
    isOperationUsed = false
  }
}

export function updateInputDisplay (value: string): void {
  const isDigit = !Number.isNaN(Number(value))

  if ($inputDisplay != null) {
    switch (value) {
      case 'NumpadMultiply':
      case 'KeyX':
      case 'X':
      case 'x':
      case '*':
        updateOperation($inputDisplay, '*')
        break
      case 'NumpadDivide':
      case '/':
        updateOperation($inputDisplay, '/')
        break
      case 'NumpadAdd':
      case '+':
        updateOperation($inputDisplay, '+')
        break
      case 'NumpadSubtract':
      case '-':
        updateOperation($inputDisplay, '-')
        break
      case 'NumpadDecimal':
      case '.':
        updateValueWithPoint($inputDisplay)
        break
      case 'Backspace':
        $inputDisplay.value = $inputDisplay.value.slice(0, -1)
        break
      case 'Delete':
        $inputDisplay.value = ''
        isOperationUsed = false
        break
      case 'Enter':
        isOperationUsed = false

        if ($inputDisplay.value === '') {
          $inputDisplay.value = '0'
          return
        }

        $inputDisplay.value = getResult($inputDisplay)
        break
      default:
        if (isDigit) {
          const lastValue = getLastNumber($inputDisplay.value)
          $inputDisplay.value = lastValue === '0' ? $inputDisplay.value.slice(0, -1) + value : $inputDisplay.value + value
          isOperationUsed = false
        }
    }

    $inputDisplay.scrollLeft = $inputDisplay.scrollWidth
  }
}

export function updateKeyActive (event: KeyboardEvent, classListMethod: 'add' | 'remove'): void {
  try {
    for (const { key, code } of keypadList) {
      const codeExists = Array.isArray(code)

      if (key === event.key || (codeExists && code?.includes(event.code))) {
        const id = `#key-${codeExists ? code[0] : key}`
        $(id)?.classList[classListMethod]('active')
      }
    }
  } catch (error) {
    console.error(error)
  }
}
