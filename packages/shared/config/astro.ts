import icon from 'astro-icon'
import tailwind from '@astrojs/tailwind'
import type { AstroUserConfig } from 'astro/config'

export interface GetAstroConfig {
  project?: string
  hostname?: string
}

export function getAstroConfig ({ project, hostname }: GetAstroConfig = {}): AstroUserConfig {
  const assets = 'assets'
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
    image: hostname ? { domains: [hostname] } : undefined
  }
}
