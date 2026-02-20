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

async function query() {
  const teams = await client.fetch('*[_type == "teamMember"]{_id, name, "role": role.fr, order} | order(order asc)')
  console.log('Team Members:', JSON.stringify(teams, null, 2))

  const services = await client.fetch('*[_type == "serviceItem"]{_id, number, "title": title.fr, order} | order(order asc)')
  console.log('Services:', JSON.stringify(services, null, 2))

  const allTypes = await client.fetch('array::unique(*[]._type)')
  console.log('All document types:', JSON.stringify(allTypes))
}

query().catch(console.error)
