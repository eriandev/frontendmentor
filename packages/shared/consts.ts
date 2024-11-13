import { loadEnv } from 'vite'

export const { PUBLIC_API_URL: API_URL, PUBLIC_FRONTENDMENTOR_URL: FRONTENDMENTOR_URL } = loadEnv('', '', 'PUBLIC')
