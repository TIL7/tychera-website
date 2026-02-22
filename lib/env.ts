import { z } from 'zod';

/**
 * Server-side environment variable validation.
 * Only call this from server-side code paths (Server Components, Server Actions, Route Handlers).
 */

const serverEnvSchema = z.object({
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1, 'Missing NEXT_PUBLIC_SANITY_PROJECT_ID'),
  NEXT_PUBLIC_SANITY_DATASET: z.string().default('production'),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().default('2026-02-05'),
  NEXT_PUBLIC_SITE_URL: z.string().url().default('https://tycherainvest.com'),
  SANITY_API_TOKEN: z.string().optional(),
  ZOHO_SMTP_HOST: z.string().optional(),
  ZOHO_SMTP_PORT: z.string().optional(),
  ZOHO_SMTP_USER: z.string().optional(),
  ZOHO_SMTP_PASSWORD: z.string().optional(),
  CONTACT_EMAIL_RECIPIENT: z.string().email().optional(),
  REVALIDATION_SECRET: z.string().optional(),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

let _validated: ServerEnv | null = null;

export function validateServerEnv(): ServerEnv {
  if (_validated) return _validated;

  const result = serverEnvSchema.safeParse(process.env);
  if (!result.success) {
    console.error('[TYCHERA] Environment validation errors:');
    for (const issue of result.error.issues) {
      console.error(`  - ${issue.path.join('.')}: ${issue.message}`);
    }
    throw new Error('Invalid server environment configuration. Check .env.local against .env.example.');
  }

  _validated = result.data;
  return _validated;
}
