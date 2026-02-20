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

async function nukeAndReseed() {
  // Fetch ALL documents of type teamMember — no filter, raw
  const all = await client.fetch<{ _id: string; name: string }[]>(
    `*[_type == "teamMember"]{ _id, name }`
  )
  console.log('All teamMember docs currently in Sanity:')
  console.log(JSON.stringify(all, null, 2))

  // Delete every single one
  if (all.length > 0) {
    const tx = client.transaction()
    all.forEach((d) => tx.delete(d._id))
    await tx.commit()
    console.log(`Deleted ${all.length} teamMember doc(s).`)
  }

  // Also check for any drafts of teamMember
  const drafts = await client.fetch<{ _id: string }[]>(
    `*[_id in path("drafts.**") && _type == "teamMember"]{ _id }`
  )
  if (drafts.length > 0) {
    const tx2 = client.transaction()
    drafts.forEach((d) => tx2.delete(d._id))
    await tx2.commit()
    console.log(`Deleted ${drafts.length} teamMember draft(s).`)
  }

  // Re-seed the correct two members
  const members = [
    {
      _id: 'team-kamal-adjayi',
      _type: 'teamMember',
      name: 'Kamal ADJAYI',
      role: { fr: 'Directeur Général', en: 'Managing Director' },
      bio: {
        fr: [{ _type: 'block', _key: 'k-bio-fr', style: 'normal', children: [{ _type: 'span', _key: 'k-bio-fr-s', text: 'Monsieur Kamal Alawo Adjayi est le fondateur et Directeur Général de Tychera Investments Ltd.', marks: [] }], markDefs: [] }],
        en: [{ _type: 'block', _key: 'k-bio-en', style: 'normal', children: [{ _type: 'span', _key: 'k-bio-en-s', text: 'Mr. Kamal Alawo Adjayi is the Founder and CEO of Tychera Investments Ltd.', marks: [] }], markDefs: [] }],
      },
      order: 1,
    },
    {
      _id: 'team-hawa-kayisharaza',
      _type: 'teamMember',
      name: 'Hawa KAYISHARAZA',
      role: { fr: 'Directrice des Opérations', en: 'Chief Operating Officer' },
      bio: {
        fr: [{ _type: 'block', _key: 'h-bio-fr', style: 'normal', children: [{ _type: 'span', _key: 'h-bio-fr-s', text: 'Madame Hawa Kayisharaza est la Directrice des Opérations de Tychera Investments Ltd.', marks: [] }], markDefs: [] }],
        en: [{ _type: 'block', _key: 'h-bio-en', style: 'normal', children: [{ _type: 'span', _key: 'h-bio-en-s', text: 'Ms. Hawa Kayisharaza is the Chief Operating Officer of Tychera Investments Ltd.', marks: [] }], markDefs: [] }],
      },
      order: 2,
    },
  ]

  for (const m of members) {
    await client.createOrReplace(m)
    console.log(`Seeded: ${m.name}`)
  }

  // Final verification
  const final = await client.fetch<{ _id: string; name: string }[]>(
    `*[_type == "teamMember"]{ _id, name } | order(name asc)`
  )
  console.log('Final state:', JSON.stringify(final, null, 2))
}

nukeAndReseed().catch((err) => {
  console.error('Failed:', err)
  process.exit(1)
})
