function isMaxLength (maxLength: number, { target }: KeyboardEvent): boolean {
  const value = (target as HTMLInputElement)?.value
  return value.length < maxLength
}

function isOnlyNumbers ({ key }: KeyboardEvent): boolean {
  const pattern = /^[0-9]$/
  return pattern.test(key)
}

window.isMaxLength = isMaxLength
window.isOnlyNumbers = isOnlyNumbers
