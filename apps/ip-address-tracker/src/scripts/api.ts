/* eslint-disable @typescript-eslint/no-unsafe-type-assertion -- Accurate type validation is not required */

import { getUTCFromTimezone } from '@/utils/time'

export interface APIResponse {
  readonly ip: string
  readonly city: string
  readonly region: string
  readonly country: string
  readonly loc: string
  readonly org: string
  readonly postal: string
  readonly timezone: string
}

export interface APIErrorResponse {
  readonly error: string
  readonly token: string
}

export type NormalizedAPIResponse = Omit<APIErrorResponse, 'token'> & {
  readonly ipAddress: string
  readonly location: string
  readonly timezone: string
  readonly isp: string
  readonly lng: number
  readonly lat: number
}

export async function getIpInfo(ip: string): Promise<Partial<NormalizedAPIResponse>> {
  try {
    const response = await fetch(`https://ipinfo.io/${ip}?token=141513b224e025`)
    const data = (await response.json()) as Partial<APIResponse & APIErrorResponse>
    return normalizeResponse(data)
  } catch (error) {
    return { error: 'API communication problems' }
  }
}

function normalizeResponse(response: Partial<APIResponse & APIErrorResponse>): Partial<NormalizedAPIResponse> {
  const { city, error, ip, loc, org, postal, region, timezone } = response

  if (typeof error === 'string') return { error }

  const [lng, lat] = typeof loc === 'string' ? loc.split(',') : ['0', '0']

  return {
    isp: org,
    ipAddress: ip,
    lng: parseInt(lng),
    lat: parseInt(lat),
    location: `${city}, ${region} ${postal}`,
    timezone: typeof timezone === 'string' ? getUTCFromTimezone(timezone) : 'unknown',
  }
}
