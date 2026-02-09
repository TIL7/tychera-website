/**
 * Sanity Content Seeding Script
 * 
 * Populates Sanity CMS with content from fr.json and en.json translation files.
 * This script creates serviceItem documents for the 4 pillars of TYCHERA's expertise.
 * 
 * Usage: npm run seed
 * 
 * @requirements 4.2, 4.3, 4.5
 */

import { createClient } from '@sanity/client';
import * as fs from 'fs';
import * as path from 'path';

// Load environment variables from .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["']|["']$/g, '');
      process.env[key] = value;
    }
  });
}

// Sanity client configuration
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-05',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

// Icon mapping for services
const iconMap: Record<string, string> = {
  financial: 'Scale',
  project: 'Construction',
  fund: 'TrendingUp',
  deal: 'Handshake',
};

interface TranslationFile {
  pillars: {
    services: {
      [key: string]: {
        number: string;
        title: string;
        description: string;
      };
    };
  };
}

async function seedContent(): Promise<void> {
  console.log('🌱 Starting Sanity content seeding...\n');

  // Validate environment variables
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('❌ Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
    process.exit(1);
  }

  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Missing SANITY_API_TOKEN');
    console.error('📋 Create a token at: https://www.sanity.io/manage');
    console.error('   Add to .env.local: SANITY_API_TOKEN=your-token-here');
    process.exit(1);
  }

  // Load translation files
  const frPath = path.join(process.cwd(), 'messages', 'fr.json');
  const enPath = path.join(process.cwd(), 'messages', 'en.json');

  const frData: TranslationFile = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
  const enData: TranslationFile = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

  console.log('✅ Loaded translation files\n');

  // Service keys in order
  const serviceKeys = ['financial', 'project', 'fund', 'deal'];

  // Create service items
  for (let i = 0; i < serviceKeys.length; i++) {
    const key = serviceKeys[i];
    const order = i + 1;
    const frService = frData.pillars.services[key];
    const enService = enData.pillars.services[key];

    const serviceItem = {
      _type: 'serviceItem',
      _id: `service-${key}`,
      number: frService.number,
      title: {
        fr: frService.title,
        en: enService.title,
      },
      description: {
        fr: frService.description,
        en: enService.description,
      },
      detailedContent: {
        fr: [
          {
            _type: 'block',
            _key: `block-fr-${key}`,
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: `span-fr-${key}`,
                text: generateDetailedContent(key, 'fr'),
                marks: [],
              },
            ],
            markDefs: [],
          },
        ],
        en: [
          {
            _type: 'block',
            _key: `block-en-${key}`,
            style: 'normal',
            children: [
              {
                _type: 'span',
                _key: `span-en-${key}`,
                text: generateDetailedContent(key, 'en'),
                marks: [],
              },
            ],
            markDefs: [],
          },
        ],
      },
      icon: iconMap[key],
      order,
    };

    try {
      await client.createOrReplace(serviceItem);
      console.log(`✅ Created/Updated: ${frService.title} (${frService.number})`);
    } catch (error) {
      console.error(`❌ Failed to create ${key}:`, error);
    }
  }

  console.log('\n🎉 Content seeding complete!');
  console.log('📍 View your content at: https://www.sanity.io/manage');
}

/**
 * Generate detailed content for expertise page
 * Institutional language matching TYCHERA's sovereign tone
 */
function generateDetailedContent(key: string, locale: 'fr' | 'en'): string {
  const templates = {
    fr: {
      financial: `Nous concevons des structures financières sur mesure qui répondent aux besoins spécifiques des marchés africains. Notre approche combine une compréhension approfondie des réglementations locales avec les meilleures pratiques internationales en matière de structuration de véhicules d'investissement. Chaque solution est élaborée avec rigueur pour optimiser l'efficacité fiscale, la gouvernance et l'attractivité pour les investisseurs institutionnels.`,
      project: `Notre expertise en financement de projets couvre l'ensemble du cycle de vie, de la structuration initiale à la clôture financière. Nous accompagnons les porteurs de projets d'infrastructure et d'énergie renouvelable dans la mobilisation de capitaux, la négociation avec les bailleurs de fonds, et la mise en place de structures de financement robustes. Notre valeur ajoutée réside dans notre capacité à créer des montages financiers qui alignent les intérêts de toutes les parties prenantes.`,
      fund: `Nous gérons des portefeuilles institutionnels avec une approche disciplinée qui intègre les critères ESG tout en visant des rendements supérieurs ajustés au risque. Notre processus d'investissement repose sur une analyse rigoureuse des fondamentaux, une diversification stratégique et un suivi actif des positions. Nous privilégions les investissements à impact positif qui contribuent au développement durable du continent africain.`,
      deal: `Nous structurons des transactions complexes qui alignent les intérêts des secteurs public et privé, créant des partenariats durables et mutuellement bénéfiques. Notre expertise couvre les partenariats public-privé (PPP), les joint-ventures, et les montages de co-investissement. Nous facilitons le dialogue entre les institutions publiques et les investisseurs privés pour concevoir des solutions de financement innovantes et adaptées aux réalités locales.`,
    },
    en: {
      financial: `We design custom financial structures that meet the specific needs of African markets. Our approach combines deep understanding of local regulations with international best practices in investment vehicle structuring. Each solution is rigorously crafted to optimize tax efficiency, governance, and attractiveness to institutional investors.`,
      project: `Our project financing expertise covers the entire lifecycle, from initial structuring to financial close. We support infrastructure and renewable energy project sponsors in capital mobilization, negotiations with lenders, and establishment of robust financing structures. Our added value lies in our ability to create financial arrangements that align the interests of all stakeholders.`,
      fund: `We manage institutional portfolios with a disciplined approach that integrates ESG criteria while targeting superior risk-adjusted returns. Our investment process relies on rigorous fundamental analysis, strategic diversification, and active position monitoring. We prioritize impact investments that contribute to the sustainable development of the African continent.`,
      deal: `We structure complex transactions that align public and private sector interests, creating sustainable and mutually beneficial partnerships. Our expertise covers public-private partnerships (PPP), joint ventures, and co-investment arrangements. We facilitate dialogue between public institutions and private investors to design innovative financing solutions adapted to local realities.`,
    },
  };

  return templates[locale][key as keyof typeof templates.fr];
}

// Run the seeding script
seedContent().catch((error) => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
