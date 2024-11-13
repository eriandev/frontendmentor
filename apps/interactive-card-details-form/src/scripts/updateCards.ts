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
  inputYY
} from './declareRefs.ts'

export function resetCards (): void {
  if (cardNumber != null) cardNumber.textContent = '0000 0000 0000 0000'
  if (cardHolder != null) cardHolder.textContent = 'Jane Appleseed'
  if (cardExpMM != null) cardExpMM.textContent = '00'
  if (cardExYY != null) cardExYY.textContent = '00'
  if (cardCVC != null) cardCVC.value = '000'
}

inputNum?.addEventListener('input', ({ target }) => {
  const {value} = (target as HTMLInputElement)
  if (cardNumber != null) cardNumber.textContent = getFormatted(value)
})
inputName?.addEventListener('input', ({ target }) => {
  const {value} = (target as HTMLInputElement)
  if (cardHolder != null) cardHolder.textContent = typeof value !== 'undefined' ? value : 'Jane Appleseed'
})
inputMM?.addEventListener('input', ({ target }) => {
  const {value} = (target as HTMLInputElement)
  if (cardExpMM != null) cardExpMM.textContent = typeof value !== 'undefined' ? value : '00'
})
inputYY?.addEventListener('input', ({ target }) => {
  const {value} = (target as HTMLInputElement)
  if (cardExYY != null) cardExYY.textContent = typeof value !== 'undefined' ? value : '00'
})
inputCVC?.addEventListener('input', ({ target }) => {
  const {value} = (target as HTMLInputElement)
  if (cardCVC != null) cardCVC.value = typeof value !== 'undefined' ? value : '000'
})

function getFormatted (text: string): string {
  return typeof text === 'string'
    ? text
      .replace(/[^0-9]/g, '')
      .slice(0, 17)
      .split('')
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions -- Required
      .reduce((str, l, i) => str + (!i || (Boolean((i % 4))) ? '' : ' ') + l, '')
    : '0000 0000 0000 0000'
}
