import { PROJECTS_URL } from 'shared/consts'

export interface Projects {
  title: string
  image: string
  techs: string[]
  level: number
  link: string
}

export async function getProjects (): Promise<Projects[]> {
  try {
    const response = await fetch(PROJECTS_URL)

    if (!response.ok) throw Error()

    const { results } = await response.json() as { results: Projects[] }
    return results
  } catch (error) {
    console.error('Unable to obtain projects list')
    return []
  }
}
