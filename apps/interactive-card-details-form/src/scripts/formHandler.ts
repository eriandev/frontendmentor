import { $$ } from 'shared/utils/dom.ts'

import { btn, completeView, mainForm } from './declareRefs.ts'
import { isValidForm } from './formValidations.ts'
import { resetCards } from './updateCards.ts'

let isComplete = false

btn?.addEventListener('click', () => {
  clearErrors()

  if (!isComplete && isValidForm()) {
    completeForm()
    return
  }

  if (isComplete) initForm()
})

function initForm (): void {
  resetForm()
  resetCards()

  isComplete = false

  if (btn != null) btn.textContent = 'Confirm'
  mainForm?.classList.replace('hidden', 'flex')
  completeView?.classList.replace('grid', 'hidden')
}

function completeForm (): void {
  isComplete = true
  mainForm?.classList.replace('flex', 'hidden')
  completeView?.classList.replace('hidden', 'grid')
}

function clearErrors (): void {
  const inputs = $$<HTMLInputElement>('[id^=input-]')
  const errorMessages = $$<HTMLInputElement>('[id^=error-input]')

  inputs.forEach((input) => {
    input.classList.replace('border-error', 'border-light-grayish-violet')
  })

  errorMessages.forEach((errorMessage) => {
    errorMessage.textContent = ''
  })
}

function resetForm (): void {
  const inputs = $$<HTMLInputElement>('[id^=input-]')
  inputs.forEach((input) => {
    input.value = ''
  })
}
