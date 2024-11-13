import { loadEnv } from 'vite'
import { defineConfig } from 'astro/config'
import { getAstroConfig } from 'shared/config/astro'

const { PUBLIC_API_URL } = loadEnv('', '', 'PUBLIC')
const { hostname } = new URL(PUBLIC_API_URL)
const config = getAstroConfig({ hostname })

// https://astro.build/config
export default defineConfig(config)
