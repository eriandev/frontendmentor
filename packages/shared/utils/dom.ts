/* eslint-disable @typescript-eslint/no-unsafe-type-assertion -- Accurate type validation is not required */

export const $ = <T extends HTMLElement>(selector: string): T | null => document.querySelector(selector)
export const $$ = <T extends Element>(selector: string): NodeListOf<T> => document.querySelectorAll(selector)
export const storage = {
  get: <T = string>(storageName: string, parseValue = false) => {
    const value = localStorage.getItem(storageName)
    return value != null && parseValue ? (JSON.parse(value) as T) : value
  },
  set: (storageName: string, item: unknown) => {
    const valueItem = typeof item === 'string' ? item : JSON.stringify(item)
    localStorage.setItem(storageName, valueItem)
  },
  remove: (storageName: string) => {
    localStorage.removeItem(storageName)
  },
  clear: () => {
    localStorage.clear()
  },
} as const
