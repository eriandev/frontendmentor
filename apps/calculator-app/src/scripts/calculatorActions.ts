import { $ } from 'shared/utils/dom.ts'
import { keypadList } from '@/scripts/consts.ts'
import { $inputDisplay } from '@/scripts/declareRefs.ts'

let isOperationUsed = false

function getLastNumber(value: string): string {
  const numberValueList = value.split(/[+\-*/]/)
  return numberValueList[numberValueList.length - 1]
}

function getResult($inputDisplay: HTMLInputElement): string {
  // eslint-disable-next-line no-eval, @typescript-eslint/no-unsafe-type-assertion -- Accurate type validation is not required, but eval yes
  const result = eval($inputDisplay.value) as number
  const resultHavePoint = Boolean(/\./.exec(result.toString()))
  return resultHavePoint ? result.toFixed(3) : result.toString()
}

function handleBackspace(input: HTMLInputElement): void {
  input.value = input.value.slice(0, -1)
}

function handleDelete(input: HTMLInputElement): void {
  input.value = ''
  isOperationUsed = false
}

function handleDigit(input: HTMLInputElement, value: string): void {
  const lastValue = getLastNumber(input.value)
  input.value = lastValue === '0' ? input.value.slice(0, -1) + value : input.value + value
  isOperationUsed = false
}

function handleEnter(input: HTMLInputElement): void {
  isOperationUsed = false
  if (input.value === '') {
    input.value = '0'
  } else {
    input.value = getResult(input)
  }
}

function handleOperation(input: HTMLInputElement, operation: string): void {
  updateOperation(input, operation)
}

function matchesKeyOrCode(event: KeyboardEvent, key: string, code?: string[] | string): boolean {
  const codeExists = Array.isArray(code)
  return key === event.key || (codeExists && code.includes(event.code))
}

function updateOperation($inputDisplay: HTMLInputElement, operation: string): void {
  if (isOperationUsed) $inputDisplay.value = $inputDisplay.value.slice(0, -1)
  if ($inputDisplay.value.length > 0) $inputDisplay.value += operation
  isOperationUsed = true
}

function updateValueWithPoint($inputDisplay: HTMLInputElement): void {
  const lastValue = getLastNumber($inputDisplay.value)
  const havePoint = Boolean(/\./.exec(lastValue))
  const isLastEmpty = lastValue === ''

  if (!havePoint) {
    $inputDisplay.value = isLastEmpty ? $inputDisplay.value + '0.' : $inputDisplay.value + '.'
    isOperationUsed = false
  }
}

export function updateInputDisplay(value: string): void {
  const isDigit = !Number.isNaN(Number(value))

  if ($inputDisplay != null) {
    switch (value) {
      case 'NumpadMultiply':
      case 'KeyX':
      case 'X':
      case 'x':
      case '*':
        handleOperation($inputDisplay, '*')
        break
      case 'NumpadDivide':
      case '/':
        handleOperation($inputDisplay, '/')
        break
      case 'NumpadAdd':
      case '+':
        handleOperation($inputDisplay, '+')
        break
      case 'NumpadSubtract':
      case '-':
        handleOperation($inputDisplay, '-')
        break
      case 'NumpadDecimal':
      case '.':
        updateValueWithPoint($inputDisplay)
        break
      case 'Backspace':
        handleBackspace($inputDisplay)
        break
      case 'Delete':
        handleDelete($inputDisplay)
        break
      case 'Enter':
        handleEnter($inputDisplay)
        break
      default:
        if (isDigit) {
          handleDigit($inputDisplay, value)
        }
    }

    $inputDisplay.scrollLeft = $inputDisplay.scrollWidth
  }
}

// export function updateInputDisplay (value: string): void {
//   const isDigit = !Number.isNaN(Number(value))

//   if ($inputDisplay != null) {
//     switch (value) {
//       case 'NumpadMultiply':
//       case 'KeyX':
//       case 'X':
//       case 'x':
//       case '*':
//         updateOperation($inputDisplay, '*')
//         break
//       case 'NumpadDivide':
//       case '/':
//         updateOperation($inputDisplay, '/')
//         break
//       case 'NumpadAdd':
//       case '+':
//         updateOperation($inputDisplay, '+')
//         break
//       case 'NumpadSubtract':
//       case '-':
//         updateOperation($inputDisplay, '-')
//         break
//       case 'NumpadDecimal':
//       case '.':
//         updateValueWithPoint($inputDisplay)
//         break
//       case 'Backspace':
//         $inputDisplay.value = $inputDisplay.value.slice(0, -1)
//         break
//       case 'Delete':
//         $inputDisplay.value = ''
//         isOperationUsed = false
//         break
//       case 'Enter':
//         isOperationUsed = false

//         if ($inputDisplay.value === '') {
//           $inputDisplay.value = '0'
//           return
//         }

//         $inputDisplay.value = getResult($inputDisplay)
//         break
//       default:
//         if (isDigit) {
//           const lastValue = getLastNumber($inputDisplay.value)
//           $inputDisplay.value = lastValue === '0' ? $inputDisplay.value.slice(0, -1) + value : $inputDisplay.value + value
//           isOperationUsed = false
//         }
//     }

//     $inputDisplay.scrollLeft = $inputDisplay.scrollWidth
//   }
// }

// export function updateKeyActive (event: KeyboardEvent, classListMethod: 'add' | 'remove'): void {
//   try {
//     for (const { key, code } of keypadList) {
//       const codeExists = Array.isArray(code)

//       if (key === event.key || (codeExists && code.includes(event.code))) {
//         const id = `#key-${codeExists ? code[0] : key}`
//         $(id)?.classList[classListMethod]('active')
//       }
//     }
//   } catch (error) {
//     console.error(error)
//   }
// }

export function updateKeyActive(event: KeyboardEvent, classListMethod: 'add' | 'remove'): void {
  try {
    const keyItem = keypadList.find(({ key, code }) => matchesKeyOrCode(event, key, code))
    if (keyItem != null) $(`#key-${keyItem.key}`)?.classList[classListMethod]('active')
  } catch (error) {
    console.error(error)
  }
}
