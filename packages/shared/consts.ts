import { cwd } from 'node:process'
import { loadEnv } from 'vite'

const PROJECT_NAME = 'frontendmentor'

const envDirectory = cwd().split(PROJECT_NAME)[0] + PROJECT_NAME
const { API_PROJECTS_URL } = loadEnv('', envDirectory, 'API')

export const PROJECTS_URL = API_PROJECTS_URL
