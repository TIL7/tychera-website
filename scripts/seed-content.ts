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
  console.log('[seed] Starting Sanity content seeding...\n');

  // Validate environment variables
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    console.error('Error: Missing NEXT_PUBLIC_SANITY_PROJECT_ID');
    process.exit(1);
  }

  if (!process.env.SANITY_API_TOKEN) {
    console.error('Error: Missing SANITY_API_TOKEN');
    console.error('Info: Create a token at: https://www.sanity.io/manage');
    console.error('   Add to .env.local: SANITY_API_TOKEN=your-token-here');
    process.exit(1);
  }

  // Load translation files
  const frPath = path.join(process.cwd(), 'messages', 'fr.json');
  const enPath = path.join(process.cwd(), 'messages', 'en.json');

  const frData: TranslationFile = JSON.parse(fs.readFileSync(frPath, 'utf-8'));
  const enData: TranslationFile = JSON.parse(fs.readFileSync(enPath, 'utf-8'));

  console.log('OK: Loaded translation files\n');

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
                text: frService.description,
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
                text: enService.description,
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
      console.log(`OK: Created/Updated: ${frService.title} (${frService.number})`);
    } catch (error) {
      console.error(`Error: Failed to create ${key}:`, error);
    }
  }

  console.log('\nDone: Content seeding complete!');
  console.log('Info: View your content at: https://www.sanity.io/manage');
}


// Run the seeding script
seedContent().catch((error) => {
  console.error('Error: Seeding failed:', error);
  process.exit(1);
});
