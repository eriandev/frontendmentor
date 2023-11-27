import { defineConfig } from 'astro/config'
import { getAstroConfig } from 'shared/config/astro'

const config = getAstroConfig({ project: 'fylo-landing-page-with-two-column-layout' })

// https://astro.build/config
export default defineConfig(config)
