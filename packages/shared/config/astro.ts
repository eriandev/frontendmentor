import icon from 'astro-icon'
import tailwind from '@astrojs/tailwind'
import type { AstroUserConfig } from 'astro/config'

import { API_URL } from '../consts'

export interface GetAstroConfig {
  project?: string
}

export function getAstroConfig ({ project }: GetAstroConfig = {}): AstroUserConfig {
  const assets = 'assets'
  const { hostname } = new URL(API_URL)
  const hasProjectName = typeof project === 'string'
  const outDir = hasProjectName ? `../../dist/${project}` : undefined
  const base = hasProjectName ? `/frontendmentor/${project}` : '/frontendmentor'

  return {
    base,
    outDir,
    integrations: [tailwind(), icon()],
    build: {
      assets
    },
    image: {
      domains: [hostname]
    }
  }
}
