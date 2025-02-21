import { defineConfig } from 'astro/config'
import { getAstroConfig } from 'shared/config/astro'

const config = getAstroConfig({ project: 'job-listings-with-filtering' })

// https://astro.build/config
export default defineConfig(config)
