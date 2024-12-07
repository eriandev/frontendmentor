export function validateIP(ip: string): { isValid: boolean; message: string } {
  const IP_ADDRESS_REGEX = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/

  if (typeof ip !== 'string') return { isValid: false, message: 'No text' }
  if (ip.length < 1) return { isValid: false, message: "Can't be blank" }
  if (!IP_ADDRESS_REGEX.test(ip)) return { isValid: false, message: 'Need valid IP' }

  return { isValid: true, message: '' }
}
