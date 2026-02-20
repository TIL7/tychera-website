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

if (!projectId) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
  process.exit(1)
}
if (!token || token === 'your-sanity-api-token-here') {
  console.error('Missing or placeholder SANITY_API_TOKEN.')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false })

// Helper: create a portable text block from a plain string
function textBlock(text: string, key: string) {
  return [
    {
      _type: 'block',
      _key: key,
      style: 'normal',
      children: [{ _type: 'span', _key: `${key}-span`, text, marks: [] }],
      markDefs: [],
    },
  ]
}


// ─── Service Items (matching i18n translations + expertise fallback) ───
const services = [
  {
    _id: 'service-01',
    _type: 'serviceItem',
    number: '01',
    title: {
      fr: 'Ingénierie Financière',
      en: 'Financial Engineering',
    },
    description: {
      fr: 'Conception de véhicules d\'investissement alignés sur les réalités réglementaires et de marché africaines.',
      en: 'Design of investment vehicles aligned with African market and regulatory realities.',
    },
    detailedContent: {
      fr: textBlock(
        'Nous structurons des véhicules d\'investissement adaptés aux marchés africains et aux exigences institutionnelles.',
        'svc1-fr'
      ),
      en: textBlock(
        'We structure investment vehicles suited to African markets and institutional requirements.',
        'svc1-en'
      ),
    },
    icon: 'Building2',
    order: 1,
  },
  {
    _id: 'service-02',
    _type: 'serviceItem',
    number: '02',
    title: {
      fr: 'Financement de Projets',
      en: 'Project Finance',
    },
    description: {
      fr: 'Accompagnement de la structuration et de l\'exécution, de la faisabilité à la clôture financière.',
      en: 'Structuring and execution support from feasibility through financial close.',
    },
    detailedContent: {
      fr: textBlock(
        'Nous accompagnons le financement des projets de la structuration initiale jusqu\'à la clôture financière.',
        'svc2-fr'
      ),
      en: textBlock(
        'We support project financing from initial structuring through financial close.',
        'svc2-en'
      ),
    },
    icon: 'Construction',
    order: 2,
  },
  {
    _id: 'service-03',
    _type: 'serviceItem',
    number: '03',
    title: {
      fr: 'Structuration de Garanties',
      en: 'Guarantee Structuring',
    },
    description: {
      fr: 'Instruments de partage des risques améliorant la bancabilité et la mobilisation de capitaux institutionnels.',
      en: 'Risk-sharing instruments that improve bankability and mobilize institutional capital.',
    },
    detailedContent: {
      fr: textBlock(
        'Nous concevons des mécanismes de garantie pour réduire les risques et améliorer la bancabilité des projets.',
        'svc3-fr'
      ),
      en: textBlock(
        'We design guarantee mechanisms to reduce risk and improve project bankability.',
        'svc3-en'
      ),
    },
    icon: 'ChartPie',
    order: 3,
  },
  {
    _id: 'service-04',
    _type: 'serviceItem',
    number: '04',
    title: {
      fr: 'Structuration de Projets',
      en: 'Project Structuring',
    },
    description: {
      fr: 'Montage d\'opérations public-privé pour des cadres de projets viables et investissables.',
      en: 'Public-private transaction design for viable and investable project frameworks.',
    },
    detailedContent: {
      fr: textBlock(
        'Nous structurons des montages public-privé viables et adaptés aux réalités locales.',
        'svc4-fr'
      ),
      en: textBlock(
        'We structure viable public-private arrangements adapted to local realities.',
        'svc4-en'
      ),
    },
    icon: 'Handshake',
    order: 4,
  },
]


// ─── Team Members (matching institution page code) ───
const teamMembers = [
  {
    _id: 'team-kamal-adjayi',
    _type: 'teamMember',
    name: 'Kamal ADJAYI',
    role: {
      fr: 'Directeur Général',
      en: 'Managing Director',
    },
    bio: {
      fr: textBlock(
        'Monsieur Kamal Alawo Adjayi est le fondateur et Directeur Général de Tychera Investments Ltd, une société d\'investissement privée active dans les services financiers, la gestion d\'actifs et les activités de holding. Ingénieur financier et entrepreneur panafricain, il est spécialisé en structuration financière, gouvernance stratégique et mobilisation de capitaux pour des projets à fort impact économique et social.',
        'kamal-bio-fr'
      ),
      en: textBlock(
        'Mr. Kamal Alawo Adjayi is the Founder and CEO of Tychera Investments Ltd, a private investment firm active in financial services, asset management, and holding activities. A financial engineer and Pan-African entrepreneur, he specializes in financial structuring, strategic governance, and capital mobilization for projects with high economic and social impact.',
        'kamal-bio-en'
      ),
    },
    order: 1,
  },
  {
    _id: 'team-hawa-kayisharaza',
    _type: 'teamMember',
    name: 'Hawa KAYISHARAZA',
    role: {
      fr: 'Directrice des Opérations',
      en: 'Chief Operating Officer',
    },
    bio: {
      fr: textBlock(
        'Madame Hawa Kayisharaza est la Directrice des Opérations de Tychera Investments Ltd, responsable de la coordination opérationnelle et de la gestion quotidienne des activités de la société.',
        'hawa-bio-fr'
      ),
      en: textBlock(
        'Ms. Hawa Kayisharaza is the Chief Operating Officer of Tychera Investments Ltd, responsible for operational coordination and day-to-day management of the company\'s activities.',
        'hawa-bio-en'
      ),
    },
    order: 2,
  },
]

// ─── Execute seed ───
async function seedAll() {
  console.log('Seeding services...')
  // First, delete any old serviceItem documents that don't match our IDs
  const existingServices = await client.fetch<string[]>(`*[_type == "serviceItem"]._id`)
  const targetServiceIds = services.map((s) => s._id)
  for (const oldId of existingServices) {
    if (!targetServiceIds.includes(oldId)) {
      await client.delete(oldId)
      console.log(`  Deleted stale service: ${oldId}`)
    }
  }
  for (const svc of services) {
    await client.createOrReplace(svc)
    console.log(`  Seeded: ${svc.title.fr}`)
  }

  console.log('Seeding team members...')
  // Delete stale team member documents
  const existingMembers = await client.fetch<string[]>(`*[_type == "teamMember"]._id`)
  const targetMemberIds = teamMembers.map((m) => m._id)
  for (const oldId of existingMembers) {
    if (!targetMemberIds.includes(oldId)) {
      await client.delete(oldId)
      console.log(`  Deleted stale team member: ${oldId}`)
    }
  }
  for (const member of teamMembers) {
    await client.createOrReplace(member)
    console.log(`  Seeded: ${member.name}`)
  }

  console.log('Done. All Studio content now matches the coded site.')
}

seedAll().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
