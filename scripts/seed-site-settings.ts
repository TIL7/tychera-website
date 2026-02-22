import {createClient} from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'

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

if (!projectId) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
  process.exit(1)
}

if (!token || token === 'your-sanity-api-token-here') {
  console.error('Missing SANITY_API_TOKEN. Add a valid write token before running this script.')
  process.exit(1)
}

const defaults = {
  _id: 'siteSettings',
  _type: 'siteSettings',
  email: 'contact@tycherainvest.com',
  phone: '+250 722 138 799',
  address: {
    line1: 'TYCHERA INVESTMENTS LTD',
    line2: 'Immeuble OHANA',
    line3: 'Kigali, Rwanda',
  },
  socials: {
    linkedin: 'https://www.linkedin.com',
    x: 'https://x.com',
  },
  legalText: '',
  copyrightText: '',
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

async function seedSiteSettings() {
  await client.createOrReplace(defaults)
  console.log('Seeded site settings document: siteSettings')
}

seedSiteSettings().catch((error) => {
  console.error('Failed to seed site settings:', error)
  process.exit(1)
})
