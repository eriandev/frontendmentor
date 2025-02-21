import icon from 'astro-icon'
import tailwindcss from '@tailwindcss/vite'
import type { AstroUserConfig } from 'astro'

export interface GetAstroConfig {
  project?: string
  hostname?: string
}

export function getAstroConfig({ project, hostname }: GetAstroConfig = {}): AstroUserConfig {
  const assets = 'assets'
  const hasHostname = typeof hostname === 'string'
  const hasProjectName = typeof project === 'string'
  const outDir = hasProjectName ? `../../dist/${project}` : undefined
  const base = hasProjectName ? `/frontendmentor/${project}` : '/frontendmentor'

  return {
    base,
    outDir,
    build: { assets },
    integrations: [icon()],
    vite: { plugins: [tailwindcss()] },
    image: hasHostname ? { domains: [hostname] } : undefined,
  }
}
