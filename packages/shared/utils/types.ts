import type { HTMLAttributes, HTMLTag } from 'astro/types'

export interface BaseLayoutProps {
  readonly slug?: string
  readonly projectName: string
  readonly description: string
  readonly themeColor?: `#${string}`
  readonly withTransitions?: boolean
  readonly body?: HTMLAttributes<'body'>
  readonly html?: HTMLAttributes<'html'>
  readonly attribution?: { as?: HTMLTag; class?: string }
  readonly preload?: Array<Omit<HTMLAttributes<'link'>, 'rel'>>
  readonly preconnect?: Array<Omit<HTMLAttributes<'link'>, 'rel'>>
}
