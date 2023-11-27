import { URL } from 'node:url'
import tailwind from '@astrojs/tailwind'
import type { AstroUserConfig } from 'astro/config'

import { PROJECTS_URL } from '../consts'

export function getAstroConfig ({ project }: { project?: string } = {}): AstroUserConfig {
  const hasProjectName = typeof project === 'string'
  const { hostname } = new URL(PROJECTS_URL)

  return {
    integrations: [tailwind()],
    base: hasProjectName ? `/frontendmentor/${project}` : '/frontendmentor',
    outDir: hasProjectName ? `../../dist/${project}` : undefined,
    build: {
      assets: 'assets'
    },
    image: {
      domains: [hostname]
    }
  }
}
