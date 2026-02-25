/**
 * One-time migration script to fix the email domain in the
 * production siteSettings document.
 *
 * Run with:  npx tsx scripts/fix-site-settings-email.ts
 */

import { createClient } from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'

// Load .env.local
const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8')
  envContent.split('\n').forEach((line) => {
    const match = line.match(/^([^=:#]+)=(.*)$/)
    if (!match) return
    const key = match[1]?.trim()
    const value = match[2]?.trim().replace(/^["']|["']$/g, '')
    if (key && value && !process.env[key]) {
      process.env[key] = value
    }
  })
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-05'
const token = process.env.SANITY_API_TOKEN

if (!projectId || !token || token === 'your-sanity-api-token-here') {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_TOKEN')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

const CORRECT_EMAIL = 'contact@tycherainvest.com'

async function fixEmail(): Promise<void> {
  const doc = await client.getDocument('siteSettings')

  if (!doc) {
    console.log('No siteSettings document found — nothing to patch.')
    return
  }

  const currentEmail: string = (doc as Record<string, unknown>).email as string
  console.log(`Current email in Sanity: ${currentEmail}`)

  if (currentEmail === CORRECT_EMAIL) {
    console.log('Email is already correct. No changes needed.')
    return
  }

  await client.patch('siteSettings').set({ email: CORRECT_EMAIL }).commit()
  console.log(`OK: Updated email from "${currentEmail}" to "${CORRECT_EMAIL}"`)
}

fixEmail().catch((err) => {
  console.error('Failed to fix email:', err)
  process.exit(1)
})
