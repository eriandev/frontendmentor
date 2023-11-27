import { PROJECTS_URL } from 'shared/consts'

export interface Project {
  title: string
  image: string
  techs: string[]
  level: number
  link: string
}

export async function getProjects (): Promise<Project[]> {
  try {
    const response = await fetch(PROJECTS_URL)

    if (!response.ok) throw Error()

    const { results }: { results: Project[] } = await response.json()
    return results
  } catch (error) {
    console.error('Unable to obtain projects list')
    return []
  }
}
