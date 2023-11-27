import { defineConfig } from 'astro/config'
import { getAstroConfig } from 'shared/config/astro'

const config = getAstroConfig({ project: 'ip-address-tracker' })

// https://astro.build/config
export default defineConfig(config)
