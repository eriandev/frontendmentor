export const $ = <T extends HTMLElement> (selector: string): T | null => document.querySelector(selector)
export const $$ = <T extends Element> (selector: string): NodeListOf<T> => document.querySelectorAll(selector)
