import type { Metadata } from "next";

/**
 * Metadata Generation Utilities for TYCHERA Website
 * 
 * This module provides reusable functions for generating consistent SEO metadata
 * across all pages. It handles:
 * - Title templates
 * - Descriptions
 * - Canonical URLs
 * - Keywords
 * - Open Graph tags
 * - Twitter cards
 * - Language alternates
 * 
 * @requirements 3.5, 3.6
 */

export type Locale = "fr" | "en";

interface MetadataConfig {
  locale: Locale;
  title: string;
  description: string;
  keywords: string[];
  path?: string;
  ogImage?: string;
  ogType?: "website" | "article";
}

/**
 * Get the base URL for the application
 * Falls back to production URL if not configured
 */
function getBaseUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://tycherainvestments.com";
}

/**
 * Generate canonical URL for a page
 * 
 * @param locale - The current locale (fr or en)
 * @param path - The page path (e.g., "/expertise", "/")
 * @returns The full canonical URL
 */
export function generateCanonicalUrl(locale: Locale, path: string = "/"): string {
  const baseUrl = getBaseUrl();
  const isDefault = locale === "fr";
  
  // Normalize path
  const normalizedPath = path === "/" ? "" : path;
  
  if (isDefault) {
    return `${baseUrl}${normalizedPath}`;
  }
  
  return `${baseUrl}/${locale}${normalizedPath}`;
}

/**
 * Generate language alternates for a page
 * 
 * @param path - The page path (e.g., "/expertise", "/")
 * @returns Object with language alternates
 */
export function generateLanguageAlternates(path: string = "/") {
  const baseUrl = getBaseUrl();
  const normalizedPath = path === "/" ? "" : path;
  
  return {
    fr: `${baseUrl}${normalizedPath}`,
    en: `${baseUrl}/en${normalizedPath}`,
    "x-default": `${baseUrl}${normalizedPath}`,
  };
}

/**
 * Generate Open Graph metadata
 * 
 * @param config - Metadata configuration
 * @returns Open Graph metadata object
 */
export function generateOpenGraphMetadata(config: MetadataConfig) {
  const canonicalUrl = generateCanonicalUrl(config.locale, config.path);
  const baseUrl = getBaseUrl();
  const ogImage = config.ogImage ? `${baseUrl}${config.ogImage}` : `${baseUrl}/og-image.jpg`;
  
  return {
    type: (config.ogType || "website") as "website" | "article",
    locale: config.locale === "en" ? "en_US" : "fr_RW",
    url: canonicalUrl,
    siteName: "TYCHERA Investments LTD",
    title: config.title,
    description: config.description,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: config.title,
      },
    ],
  };
}

/**
 * Generate Twitter Card metadata
 * 
 * @param config - Metadata configuration
 * @returns Twitter Card metadata object
 */
export function generateTwitterMetadata(config: MetadataConfig) {
  const baseUrl = getBaseUrl();
  const ogImage = config.ogImage ? `${baseUrl}${config.ogImage}` : `${baseUrl}/og-image.jpg`;
  
  return {
    card: "summary_large_image" as const,
    title: config.title,
    description: config.description,
    images: [ogImage],
  };
}

/**
 * Generate complete metadata for a page
 * 
 * This is the main function to use for generating metadata in page components.
 * It combines all metadata elements (title, description, canonical, OG, Twitter, etc.)
 * 
 * @param config - Metadata configuration
 * @returns Complete Metadata object for Next.js
 * 
 * @example
 * ```typescript
 * export async function generateMetadata(props: PageProps): Promise<Metadata> {
 *   const params = await props.params;
 *   const locale = params.locale as Locale;
 *   
 *   return generatePageMetadata({
 *     locale,
 *     title: "My Page Title",
 *     description: "My page description",
 *     keywords: ["keyword1", "keyword2"],
 *     path: "/my-page",
 *   });
 * }
 * ```
 */
export function generatePageMetadata(config: MetadataConfig): Metadata {
  const canonicalUrl = generateCanonicalUrl(config.locale, config.path);
  const languageAlternates = generateLanguageAlternates(config.path);
  const openGraph = generateOpenGraphMetadata(config);
  const twitter = generateTwitterMetadata(config);
  
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: languageAlternates,
    },
    openGraph,
    twitter,
  };
}

/**
 * Generate metadata for the home page
 * 
 * @param locale - The current locale (fr or en)
 * @returns Complete Metadata object for the home page
 */
export function generateHomePageMetadata(locale: Locale): Metadata {
  const frenchMetadata = {
    title: "TYCHERA Investments LTD - Architecte du Financement des Projets en Afrique",
    description:
      "Le pont entre capital international et potentiel africain. Structuration sophistiquée, impact durable. Financement de projets, ingénierie financière, gestion de fonds.",
    keywords: [
      "financement de projets",
      "Afrique",
      "investissements",
      "structuration financière",
      "Rwanda",
      "ingénierie financière",
      "gestion de fonds",
      "partenariat stratégique",
    ],
  };

  const englishMetadata = {
    title: "TYCHERA Investments LTD - Architect of Project Financing in Africa",
    description:
      "The bridge between international capital and African potential. Sophisticated structuring, sustainable impact. Project financing, financial engineering, fund management.",
    keywords: [
      "project financing",
      "Africa",
      "investments",
      "financial structuring",
      "Rwanda",
      "financial engineering",
      "fund management",
      "strategic partnership",
    ],
  };

  const metadata = locale === "en" ? englishMetadata : frenchMetadata;

  return generatePageMetadata({
    locale,
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    path: "/",
  });
}

/**
 * Generate metadata for the expertise page
 * 
 * @param locale - The current locale (fr or en)
 * @returns Complete Metadata object for the expertise page
 */
export function generateExpertisePageMetadata(locale: Locale): Metadata {
  const frenchMetadata = {
    title: "Expertise - TYCHERA Investments LTD",
    description:
      "Découvrez nos quatre piliers d'excellence : Ingénierie Financière, Financement de Projets, Gestion de Fonds, et Structuration de Deals. Expertise institutionnelle au service du développement africain.",
    keywords: [
      "expertise financière",
      "ingénierie financière",
      "financement de projets",
      "gestion de fonds",
      "structuration de deals",
      "Afrique",
      "investissements",
    ],
  };

  const englishMetadata = {
    title: "Expertise - TYCHERA Investments LTD",
    description:
      "Discover our four pillars of excellence: Financial Engineering, Project Financing, Fund Management, and Deal Structuring. Institutional expertise in service of African development.",
    keywords: [
      "financial expertise",
      "financial engineering",
      "project financing",
      "fund management",
      "deal structuring",
      "Africa",
      "investments",
    ],
  };

  const metadata = locale === "en" ? englishMetadata : frenchMetadata;

  return generatePageMetadata({
    locale,
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    path: "/expertise",
  });
}

/**
 * Generate metadata for the 404 page
 * 
 * @param locale - The current locale (fr or en)
 * @returns Complete Metadata object for the 404 page
 */
export function generate404PageMetadata(locale: Locale): Metadata {
  const frenchMetadata = {
    title: "Page non trouvée - TYCHERA Investments LTD",
    description: "La page que vous recherchez n'existe pas. Retournez à l'accueil.",
    keywords: ["404", "page non trouvée", "erreur"],
  };

  const englishMetadata = {
    title: "Page Not Found - TYCHERA Investments LTD",
    description: "The page you are looking for does not exist. Return to home.",
    keywords: ["404", "page not found", "error"],
  };

  const metadata = locale === "en" ? englishMetadata : frenchMetadata;

  return generatePageMetadata({
    locale,
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    path: "/404",
  });
}
