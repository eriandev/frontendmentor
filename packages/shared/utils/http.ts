/* eslint-disable @typescript-eslint/no-unsafe-type-assertion -- Accurate type validation is not required */

export async function get<T>(urlRequest: string): Promise<T> {
  const response = await fetch(urlRequest)
  return (await response.json()) as T
}
