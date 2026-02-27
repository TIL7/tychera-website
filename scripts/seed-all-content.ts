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
      fr: 'Nous concevons et structurons des plateformes d\'investissement robustes et bancables, alignées sur les réalités réglementaires, financières et opérationnelles des marchés africains. Notre rôle consiste à traduire la complexité des projets en cadres financiers clairs et investissables, conformes aux standards institutionnels internationaux. En intégrant transparence, atténuation des risques et création de valeur à long terme, nous permettons aux États, sponsors et investisseurs de mobiliser efficacement et durablement les capitaux.',
      en: 'We design and structure robust, bankable investment platforms aligned with the regulatory, financial, and operational realities of African markets. Our role is to translate complex project dynamics into clear, investable financial frameworks that meet international institutional standards. By integrating transparency, risk mitigation, and long-term value creation, we enable governments, sponsors, and investors to mobilize capital efficiently and sustainably.',
    },
    detailedContent: {
      fr: textBlock(
        'Nous concevons et structurons des plateformes d\'investissement robustes et bancables, alignées sur les réalités réglementaires, financières et opérationnelles des marchés africains. Notre rôle consiste à traduire la complexité des projets en cadres financiers clairs et investissables, conformes aux standards institutionnels internationaux. En intégrant transparence, atténuation des risques et création de valeur à long terme, nous permettons aux États, sponsors et investisseurs de mobiliser efficacement et durablement les capitaux.',
        'svc1-fr'
      ),
      en: textBlock(
        'We design and structure robust, bankable investment platforms aligned with the regulatory, financial, and operational realities of African markets. Our role is to translate complex project dynamics into clear, investable financial frameworks that meet international institutional standards. By integrating transparency, risk mitigation, and long-term value creation, we enable governments, sponsors, and investors to mobilize capital efficiently and sustainably.',
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
      fr: 'Structuration de Projets',
      en: 'Project Structuring',
    },
    description: {
      fr: 'Nous transformons les concepts stratégiques en projets prêts à l\'investissement en définissant des structures juridiques, financières et opérationnelles optimales. Notre approche garantit une allocation équilibrée des risques, la conformité réglementaire et la viabilité de long terme. En alignant les objectifs du secteur public avec l\'efficacité du secteur privé, nous créons des bases solides pour la réussite des infrastructures et des PPP à travers les marchés africains.',
      en: 'We transform strategic concepts into investment-ready projects by defining optimal legal, financial, and operational structures. Our approach ensures balanced risk allocation, regulatory compliance, and long-term viability. By aligning public-sector objectives with private-sector efficiency, we create solid foundations for successful infrastructure and PPP delivery across African markets.',
    },
    detailedContent: {
      fr: textBlock(
        'Nous transformons les concepts stratégiques en projets prêts à l\'investissement en définissant des structures juridiques, financières et opérationnelles optimales. Notre approche garantit une allocation équilibrée des risques, la conformité réglementaire et la viabilité de long terme. En alignant les objectifs du secteur public avec l\'efficacité du secteur privé, nous créons des bases solides pour la réussite des infrastructures et des PPP à travers les marchés africains.',
        'svc2-fr'
      ),
      en: textBlock(
        'We transform strategic concepts into investment-ready projects by defining optimal legal, financial, and operational structures. Our approach ensures balanced risk allocation, regulatory compliance, and long-term viability. By aligning public-sector objectives with private-sector efficiency, we create solid foundations for successful infrastructure and PPP delivery across African markets.',
        'svc2-en'
      ),
    },
    icon: 'Handshake',
    order: 2,
  },
  {
    _id: 'service-03',
    _type: 'serviceItem',
    number: '03',
    title: {
      fr: 'Financement de Projets',
      en: 'Project Finance',
    },
    description: {
      fr: 'Nous structurons et arrangeons des solutions de financement de projets sur mesure pour les grandes infrastructures et les initiatives de partenariat public-privé. Notre expertise se concentre sur la conception de cadres financiers bancables qui allouent efficacement les risques, sécurisent des financements de long terme et alignent les intérêts des États, des sponsors et des prêteurs. Nous accompagnons les projets jusqu\'à la clôture financière, en veillant à leur durabilité et à leur bonne exécution.',
      en: 'We structure and arrange tailored project finance solutions for large-scale infrastructure and public-private partnership initiatives. Our expertise focuses on designing bankable financial frameworks that efficiently allocate risk, secure long-term funding, and align the interests of governments, sponsors, and lenders. We support projects through to financial close, ensuring durability and successful execution.',
    },
    detailedContent: {
      fr: textBlock(
        'Nous structurons et arrangeons des solutions de financement de projets sur mesure pour les grandes infrastructures et les initiatives de partenariat public-privé. Notre expertise se concentre sur la conception de cadres financiers bancables qui allouent efficacement les risques, sécurisent des financements de long terme et alignent les intérêts des États, des sponsors et des prêteurs. Nous accompagnons les projets jusqu\'à la clôture financière, en veillant à leur durabilité et à leur bonne exécution.',
        'svc3-fr'
      ),
      en: textBlock(
        'We structure and arrange tailored project finance solutions for large-scale infrastructure and public-private partnership initiatives. Our expertise focuses on designing bankable financial frameworks that efficiently allocate risk, secure long-term funding, and align the interests of governments, sponsors, and lenders. We support projects through to financial close, ensuring durability and successful execution.',
        'svc3-en'
      ),
    },
    icon: 'Construction',
    order: 3,
  },
  {
    _id: 'service-04',
    _type: 'serviceItem',
    number: '04',
    title: {
      fr: 'Structuration de Garanties',
      en: 'Guarantee Structuring',
    },
    description: {
      fr: 'Nous concevons et structurons des mécanismes de garantie sur mesure qui renforcent la solvabilité et atténuent les risques des projets. En collaboration étroite avec les autorités publiques, les institutions de financement du développement et les investisseurs privés, nous mettons en place des solutions de partage des risques qui renforcent la bancabilité, débloquent les capitaux et consolident la confiance des investisseurs sur les marchés africains.',
      en: 'We design and structure tailored guarantee mechanisms that enhance creditworthiness and mitigate project risks. Working closely with public authorities, development finance institutions, and private investors, we implement risk-sharing solutions that strengthen bankability, unlock capital, and reinforce investor confidence across African markets.',
    },
    detailedContent: {
      fr: textBlock(
        'Nous concevons et structurons des mécanismes de garantie sur mesure qui renforcent la solvabilité et atténuent les risques des projets. En collaboration étroite avec les autorités publiques, les institutions de financement du développement et les investisseurs privés, nous mettons en place des solutions de partage des risques qui renforcent la bancabilité, débloquent les capitaux et consolident la confiance des investisseurs sur les marchés africains.',
        'svc4-fr'
      ),
      en: textBlock(
        'We design and structure tailored guarantee mechanisms that enhance creditworthiness and mitigate project risks. Working closely with public authorities, development finance institutions, and private investors, we implement risk-sharing solutions that strengthen bankability, unlock capital, and reinforce investor confidence across African markets.',
        'svc4-en'
      ),
    },
    icon: 'ChartPie',
    order: 4,
  },
]


// ─── Team Members (matching institution page code) ───
const teamMembers = [
  {
    _id: 'team-kamal-adjayi',
    _type: 'teamMember',
    name: 'Kamal Alawo ADJAYI',
    role: {
      fr: 'Chief Executive Officer',
      en: 'Chief Executive Officer',
    },
    bio: {
      fr: textBlock(
        'Kamal Alawo ADJAYI dirige TYCHERA Investments Ltd en tant que Chief Executive Officer, avec une approche institutionnelle axée sur la structuration rigoureuse, la gouvernance et l\'impact durable.',
        'kamal-bio-fr'
      ),
      en: textBlock(
        'Kamal Alawo ADJAYI leads TYCHERA Investments Ltd as Chief Executive Officer, with an institutional approach focused on disciplined structuring, governance, and durable impact.',
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
      fr: 'Chief Operating Officer',
      en: 'Chief Operating Officer',
    },
    bio: {
      fr: textBlock(
        'Hawa KAYISHARAZA soutient l\'exécution opérationnelle des mandats et la coordination des parties prenantes au sein de TYCHERA Investments Ltd.',
        'hawa-bio-fr'
      ),
      en: textBlock(
        'Hawa KAYISHARAZA supports operational delivery and stakeholder coordination across TYCHERA Investments Ltd mandates.',
        'hawa-bio-en'
      ),
    },
    order: 2,
  },
]

// ─── Execute seed ───
async function seedAll() {
  console.log('Seeding services...')
  for (const svc of services) {
    await client.createOrReplace(svc)
    console.log(`  Seeded: ${svc.title.fr}`)
  }

  console.log('Seeding team members...')
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
