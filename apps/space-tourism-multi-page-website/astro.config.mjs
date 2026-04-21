import { defineConfig } from 'astro/config'
import { getAstroConfig } from 'shared/config/astro'

const config = getAstroConfig({ project: 'space-tourism-multi-page-website', })

// https://astro.build/config
export default defineConfig(config)
