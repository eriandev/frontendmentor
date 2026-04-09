import path from 'node:path'
import icon from 'astro-icon'
import svelte from '@astrojs/svelte'
import tailwindcss from '@tailwindcss/vite'
import type { AstroUserConfig } from 'astro'

export interface GetAstroConfig {
  project?: string
  hostname?: string
  useSvelte?: boolean
}

export function getAstroConfig({ project, hostname, useSvelte = false }: GetAstroConfig = {}): AstroUserConfig {
  const assets = 'assets'
  const hasHostname = typeof hostname === 'string'
  const hasProjectName = typeof project === 'string'
  const outDir = hasProjectName ? `../../dist/${project}` : undefined
  const base = hasProjectName ? `/frontendmentor/${project}` : '/frontendmentor'

  return {
    base,
    outDir,
    build: { assets },
    image: hasHostname ? { domains: [hostname] } : undefined,
    integrations: [icon(), ...(useSvelte ? [svelte()] : [])],
    vite: {
      plugins: [tailwindcss()],
      resolve: {
        alias: {
          '@': path.resolve('./src'),
        },
      },
      ssr: {
        noExternal: ['@usesvelte/inline-svg'],
      },
    },
  }
}
