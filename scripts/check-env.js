#!/usr/bin/env node

/**
 * Environment Variables Validation Script
 * Checks that all required environment variables are set before starting the dev server
 */

const requiredEnvVars = [
  'NEXT_PUBLIC_SANITY_PROJECT_ID',
  'NEXT_PUBLIC_SANITY_DATASET',
  'NEXT_PUBLIC_SANITY_API_VERSION',
  'NEXT_PUBLIC_SITE_URL',
];

const optionalEnvVars = [
  'NODE_ENV',
];

console.log('\nChecking: Checking environment variables...\n');

let hasErrors = false;
let hasWarnings = false;

// Check required variables
requiredEnvVars.forEach((varName) => {
  const value = process.env[varName];
  if (!value) {
    console.error(`Error: MISSING: ${varName}`);
    hasErrors = true;
  } else {
    console.log(`OK: ${varName}=${value}`);
  }
});

// Check optional variables
optionalEnvVars.forEach((varName) => {
  const value = process.env[varName];
  if (!value) {
    console.warn(`Warning:  OPTIONAL: ${varName} (not set)`);
    hasWarnings = true;
  } else {
    console.log(`OK: ${varName}=${value}`);
  }
});

console.log('');

if (hasErrors) {
  console.error('Error: CRITICAL: Missing required environment variables!\n');
  console.error('Info: Create or update your .env.local file with:\n');
  console.error('NEXT_PUBLIC_SANITY_PROJECT_ID="xiqaa9j2"');
  console.error('NEXT_PUBLIC_SANITY_DATASET="production"');
  console.error('NEXT_PUBLIC_SANITY_API_VERSION="2026-02-05"');
  console.error('NEXT_PUBLIC_SITE_URL="http://localhost:3000"');
  console.error('NODE_ENV="development"\n');
  process.exit(1);
}

if (hasWarnings) {
  console.warn('Warning:  Some optional variables are not set (this is usually fine)\n');
}

console.log('OK: All required environment variables are set!\n');
