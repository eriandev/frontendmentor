import {
  cardCVC,
  cardExpMM,
  cardExYY,
  cardHolder,
  cardNumber,
  inputCVC,
  inputMM,
  inputName,
  inputNum,
  inputYY,
} from './declareRefs.ts'

export function resetCards(): void {
  const cardElements = [
    { element: cardNumber, value: '0000 0000 0000 0000' },
    { element: cardHolder, value: 'Jane Appleseed' },
    { element: cardExpMM, value: '00' },
    { element: cardExYY, value: '00' },
    { element: cardCVC, value: '000' },
  ]

  cardElements.forEach(({ element, value }) => {
    if (element == null) return

    if (element instanceof HTMLInputElement) {
      element.value = value
    } else {
      element.textContent = value
    }
  })
}

inputNum?.addEventListener('input', ({ target }) => {
  if (!(target instanceof HTMLInputElement)) return
  if (cardNumber != null) cardNumber.textContent = getFormatted(target.value)
})
inputName?.addEventListener('input', ({ target }) => {
  if (!(target instanceof HTMLInputElement)) return
  if (cardHolder != null) cardHolder.textContent = typeof target.value !== 'undefined' ? target.value : 'Jane Appleseed'
})
inputMM?.addEventListener('input', ({ target }) => {
  if (!(target instanceof HTMLInputElement)) return
  if (cardExpMM != null) cardExpMM.textContent = typeof target.value !== 'undefined' ? target.value : '00'
})
inputYY?.addEventListener('input', ({ target }) => {
  if (!(target instanceof HTMLInputElement)) return
  if (cardExYY != null) cardExYY.textContent = typeof target.value !== 'undefined' ? target.value : '00'
})
inputCVC?.addEventListener('input', ({ target }) => {
  if (!(target instanceof HTMLInputElement)) return
  if (cardCVC != null) cardCVC.value = typeof target.value !== 'undefined' ? target.value : '000'
})

function getFormatted(text: string): string {
  return typeof text === 'string'
    ? text
        .replace(/[^0-9]/g, '')
        .slice(0, 17)
        .split('')
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- Required
        .reduce((str, l, i) => str + (!i || Boolean(i % 4) ? '' : ' ') + l, '')
    : '0000 0000 0000 0000'
}
