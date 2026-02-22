import {sanityFetch} from '@/lib/sanity/client'
import {SITE_SETTINGS_QUERY} from '@/lib/sanity/queries'
import type {SiteSettings} from '@/lib/sanity/types'

// Temporary safety net — remove once Sanity value is confirmed correct
export function sanitizeEmail(email: string | undefined): string {
  if (email?.includes('tycherainvestments.com')) {
    console.warn(
      '[TYCHERA] SiteSettings.email contains wrong domain. ' +
      'Substituting canonical email. Update Sanity document to fix permanently.'
    )
    return 'contact@tycherainvest.com'
  }
  return email ?? 'contact@tycherainvest.com'
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    const settings = await sanityFetch<SiteSettings | null>({
      query: SITE_SETTINGS_QUERY,
      tags: ['siteSettings'],
    })
    if (settings) {
      settings.email = sanitizeEmail(settings.email)
    }
    return settings
  } catch (error) {
    console.warn('Failed to fetch site settings, using fallback UI values.', error)
    return null
  }
}
