import { $ } from 'shared/utils/dom'

export const cardNumber = $<HTMLSpanElement>('#card-number')
export const cardHolder = $<HTMLSpanElement>('#cardholder-name')
export const cardExpMM = $<HTMLSpanElement>('#exp-mm-date')
export const cardExYY = $<HTMLSpanElement>('#exp-yy-date')
export const cardCVC = $<HTMLInputElement>('#cvc')
export const mainForm = $<HTMLFormElement>('form')
export const inputName = $<HTMLInputElement>('#input-name')
export const inputNum = $<HTMLInputElement>('#input-num')
export const inputMM = $<HTMLInputElement>('#input-mm')
export const inputYY = $<HTMLInputElement>('#input-yy')
export const inputCVC = $<HTMLInputElement>('#input-cvc')
export const btn = $<HTMLButtonElement>('#btn-action')
export const completeView = $<HTMLDivElement>('#complete-view')
