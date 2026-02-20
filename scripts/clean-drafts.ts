import { createClient } from '@sanity/client'
import fs from 'node:fs'
import path from 'node:path'

const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8').split('\n').forEach((line) => {
    const match = line.match(/^([^=:#]+)=(.*)$/)
    if (!match) return
    const key = match[1]?.trim()
    const value = match[2]?.trim().replace(/^["']|["']$/g, '')
    if (key && value && !process.env[key]) process.env[key] = value
  })
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  apiVersion: '2026-02-05',
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
})

async function cleanDrafts() {
  // Fetch ALL draft documents across all types
  const drafts = await client.fetch<{ _id: string; _type: string }[]>(
    `*[_id in path("drafts.**")]{ _id, _type }`
  )

  if (drafts.length === 0) {
    console.log('No drafts found.')
    return
  }

  console.log(`Found ${drafts.length} draft(s):`)
  drafts.forEach((d) => console.log(`  ${d._id} (${d._type})`))

  // Delete them all
  const tx = client.transaction()
  drafts.forEach((d) => tx.delete(d._id))
  await tx.commit()

  console.log(`Deleted ${drafts.length} draft(s). Studio is now clean.`)
}

cleanDrafts().catch((err) => {
  console.error('Failed:', err)
  process.exit(1)
})
