import {sanityFetch} from '@/lib/sanity/client'
import {SITE_SETTINGS_QUERY} from '@/lib/sanity/queries'
import type {SiteSettings} from '@/lib/sanity/types'

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      tags: ['siteSettings'],
    })
  } catch (error) {
    console.warn('Failed to fetch site settings, using fallback UI values.', error)
    return null
  }
}
