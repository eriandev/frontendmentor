import { $ } from 'shared/utils/dom'

import { inputCVC, inputMM, inputName, inputNum, inputYY } from './declareRefs.ts'

const EMPTY_ERROR_MESSAGE = "Can't be blank"
const INVALID_NUMBER_ERROR_MESSAGE = 'Wrong format, numbers only'
const INVALID_CARD_NUMBER_ERROR_MESSAGE = 'Wrong format, need valid credit card number'
const INVALID_MONTH_ERROR_MESSAGE = 'Need valid month'
const INVALID_YEAR_ERROR_MESSAGE = 'Need valid year'
const INVALID_CVC_ERROR_MESSAGE = 'Wrong format, need valid CVC'

export function isValidForm(): boolean {
  const inputs = [
    { input: inputName, validator: isNotEmpty, id: inputName?.id },
    { input: inputNum, validator: isValidCreditCardNumber, id: inputNum?.id },
    { input: inputYY, validator: isValidYearNumber, id: 'input-mm-yy' },
    { input: inputMM, validator: isValidMonthNumber, id: 'input-mm-yy' },
    { input: inputCVC, validator: isValidCVCNumber, id: inputCVC?.id },
  ]

  return inputs.every(({ input, validator, id }) => input != null && validator(input, input.id))
}

function isNotEmpty(ref: HTMLInputElement, id: string): boolean {
  if (typeof ref.value !== 'string' || ref.value.length < 1) return showError(ref, id, EMPTY_ERROR_MESSAGE)
  return true
}

function isValidNumber(ref: HTMLInputElement, id: string): boolean {
  if (!isNotEmpty(ref, id)) return false
  if (isNaN(parseInt(ref.value))) return showError(ref, id, INVALID_NUMBER_ERROR_MESSAGE)
  return true
}

function isValidCreditCardNumber(ref: HTMLInputElement, id: string): boolean {
  if (!isValidNumber(ref, id)) return false
  if (ref.value.length !== 16) return showError(ref, id, INVALID_CARD_NUMBER_ERROR_MESSAGE)
  return true
}

function isValidMonthNumber(ref: HTMLInputElement, id: string): boolean {
  if (isNaN(parseInt(ref.value)) || parseInt(ref.value) > 12) return showError(ref, id, INVALID_MONTH_ERROR_MESSAGE)
  return true
}

function isValidYearNumber(ref: HTMLInputElement, id: string): boolean {
  if (isNaN(parseInt(ref.value)) || parseInt(ref.value) > 60) return showError(ref, id, INVALID_YEAR_ERROR_MESSAGE)
  return true
}

function isValidCVCNumber(ref: HTMLInputElement, id: string): boolean {
  if (!isValidNumber(ref, id)) return false
  if (ref.value.length !== 3) return showError(ref, id, INVALID_CVC_ERROR_MESSAGE)
  return true
}

function showError(inputRef: HTMLInputElement, errorId: string, message: string): boolean {
  const spanError = $(`#error-${errorId}`)
  inputRef.classList.replace('border-light-grayish-violet', 'border-error')
  if (spanError != null) spanError.textContent = message
  return false
}
