import { createClient } from 'next-sanity';

/**
 * Sanity Client Configuration
 * 
 * This client is used to fetch data from Sanity CMS in Server Components.
 * It supports:
 * - ISR (Incremental Static Regeneration) with configurable revalidation
 * - CDN caching in production for better performance
 * - Error handling with detailed logging
 * 
 * @requirements 4.1, 4.5, 4.7, 4.8
 */

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-02-05',
  useCdn: process.env.NODE_ENV === 'production',
  perspective: 'published',
  stega: {
    enabled: false,
    studioUrl: '/studio',
  },
});

/**
 * Fetch data from Sanity with error handling and caching
 * 
 * This wrapper function provides:
 * - Type-safe data fetching
 * - Automatic error handling
 * - ISR configuration
 * - Cache tagging for on-demand revalidation
 * 
 * @param query - GROQ query string
 * @param params - Query parameters
 * @param tags - Cache tags for revalidation
 * @returns Typed data from Sanity
 * 
 * @example
 * ```typescript
 * const services = await sanityFetch<ServiceItem[]>({
 *   query: SERVICE_ITEMS_QUERY,
 *   tags: ['serviceItem'],
 * });
 * ```
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
}: {
  query: string;
  params?: Record<string, any>;
  tags?: string[];
}): Promise<T> {
  try {
    return await client.fetch<T>(query, params, {
      next: {
        revalidate: process.env.NODE_ENV === 'development' ? 0 : 3600, // 1 hour in production
        tags,
      },
    });
  } catch (error) {
    console.error('Sanity fetch error:', error);
    console.error('Query:', query);
    console.error('Params:', params);
    
    throw new Error(
      `Failed to fetch data from Sanity: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}

/**
 * Fetch data from Sanity with fallback
 * 
 * This function attempts to fetch data from Sanity, but returns a fallback value
 * if the fetch fails. Useful for non-critical content.
 * 
 * @param query - GROQ query string
 * @param params - Query parameters
 * @param fallback - Fallback value if fetch fails
 * @param tags - Cache tags for revalidation
 * @returns Data from Sanity or fallback value
 */
export async function sanityFetchWithFallback<T>({
  query,
  params = {},
  fallback,
  tags = [],
}: {
  query: string;
  params?: Record<string, any>;
  fallback: T;
  tags?: string[];
}): Promise<T> {
  try {
    return await sanityFetch<T>({ query, params, tags });
  } catch (error) {
    console.warn('Sanity fetch failed, using fallback:', error);
    return fallback;
  }
}
