import { defineConfig } from 'astro/config'
import { getAstroConfig } from 'shared/config/astro'

const config = getAstroConfig({ project: 'weather-app', useSvelte: true })

// https://astro.build/config
export default defineConfig(config)
