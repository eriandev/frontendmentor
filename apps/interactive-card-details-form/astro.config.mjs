import { defineConfig } from 'astro/config'
import { getAstroConfig } from 'shared/config/astro'

const config = getAstroConfig({ project: 'interactive-card-details-form' })

// https://astro.build/config
export default defineConfig(config)
