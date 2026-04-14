import { defineConfig } from 'astro/config'
import { getAstroConfig } from 'shared/config/astro'

const config = getAstroConfig({
  project: 'countries-api-with-color-theme-switcher',
  hostname: ['flagcdn.com'],
  useSvelte: true,
})

// https://astro.build/config
export default defineConfig(config)
