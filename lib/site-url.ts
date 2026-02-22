/**
 * Single source of truth for the site base URL.
 *
 * Production fallback: https://tycherainvest.com
 * Dev fallback:        http://localhost:3000
 */

function normalize(url: string): string {
  return url.trim().replace(/\/+$/, "");
}

/**
 * Returns the canonical site URL.
 * Reads env at call time so tests can override process.env.
 */
export function getSiteUrl(): string {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;

  if (envUrl) return normalize(envUrl);

  return process.env.NODE_ENV === "production"
    ? "https://tycherainvest.com"
    : "http://localhost:3000";
}

/** Convenience constant — snapshot at module load. */
export const SITE_URL: string = getSiteUrl();
