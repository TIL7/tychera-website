import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site-url";

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

export const ICON_CACHE_BUST = "20260225-1";
const ICON_QUERY = `?v=${ICON_CACHE_BUST}`;

const DEFAULT_OG_IMAGE_PATHS = ["/og-image.jpg", "/og-image.png"] as const;

const TITLE_TEMPLATE = {
  default: "TYCHERA Investments LTD",
  template: "%s | TYCHERA Investments LTD",
} as const;

const SITE_DESCRIPTION = {
  fr: "Architecte du Financement des Projets en Afrique.",
  en: "Architect of Project Financing in Africa.",
} as const;

const ROOT_KEYWORDS = [
  "financement de projets",
  "Afrique",
  "investissements",
  "structuration financière",
  "Rwanda",
];

export const siteIcons: NonNullable<Metadata["icons"]> = {
  icon: [
    { url: "/favicon.ico" },
    { url: `/favicon.ico${ICON_QUERY}` },
    { url: "/icon.svg", type: "image/svg+xml" },
    { url: `/icon.svg${ICON_QUERY}`, type: "image/svg+xml" },
    { url: `/favicon-96x96.png${ICON_QUERY}`, sizes: "96x96", type: "image/png" },
    { url: `/icon-192.png${ICON_QUERY}`, sizes: "192x192", type: "image/png" },
    { url: `/icon-512.png${ICON_QUERY}`, sizes: "512x512", type: "image/png" },
  ],
  apple: [
    { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    { url: `/apple-icon.png${ICON_QUERY}`, sizes: "180x180", type: "image/png" },
  ],
  shortcut: ["/favicon.ico", `/favicon.ico${ICON_QUERY}`],
};

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
 */
function getBaseUrl(): string {
  return getSiteUrl();
}

function toAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getBaseUrl()}${normalizedPath}`;
}

function resolveOgImageUrls(customOgImage?: string): string[] {
  if (customOgImage) return [toAbsoluteUrl(customOgImage)];
  return DEFAULT_OG_IMAGE_PATHS.map((path) => toAbsoluteUrl(path));
}

function getMetadataBase(): URL {
  return new URL(getBaseUrl());
}

export function generateRootMetadata(): Metadata {
  const baseUrl = getBaseUrl();
  const ogImages = resolveOgImageUrls();

  return {
    title: TITLE_TEMPLATE,
    description: SITE_DESCRIPTION.fr,
    keywords: ROOT_KEYWORDS,
    authors: [
      {
        name: "TYCHERA Investments LTD",
        url: baseUrl,
      },
    ],
    creator: "TYCHERA Investments LTD",
    publisher: "TYCHERA Investments LTD",
    formatDetection: {
      email: false,
      telephone: false,
      address: false,
    },
    metadataBase: getMetadataBase(),
    icons: siteIcons,
    openGraph: {
      type: "website",
      locale: "fr_RW",
      url: baseUrl,
      siteName: "TYCHERA Investments LTD",
      title: "TYCHERA Investments LTD",
      description: SITE_DESCRIPTION.fr,
      images: ogImages.map((url) => ({
        url,
        width: 1200,
        height: 630,
        alt: "TYCHERA Investments LTD",
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: "TYCHERA Investments LTD",
      description: SITE_DESCRIPTION.fr,
      images: ogImages,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `${baseUrl}/fr`,
      languages: {
        fr: `${baseUrl}/fr`,
        en: `${baseUrl}/en`,
        "x-default": `${baseUrl}/fr`,
      },
    },
  };
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
  
  // Normalize path
  const normalizedPath = path === "/" ? "" : path;
  
  // localePrefix: 'always' — all locales have explicit prefix
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
    fr: `${baseUrl}/fr${normalizedPath}`,
    en: `${baseUrl}/en${normalizedPath}`,
    "x-default": `${baseUrl}/fr${normalizedPath}`,
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
  const ogImageUrls = resolveOgImageUrls(config.ogImage);
  
  return {
    type: (config.ogType || "website") as "website" | "article",
    locale: config.locale === "en" ? "en_US" : "fr_RW",
    url: canonicalUrl,
    siteName: "TYCHERA Investments LTD",
    title: config.title,
    description: config.description,
    images: ogImageUrls.map((url) => ({
      url,
      width: 1200,
      height: 630,
      alt: config.title,
    })),
  };
}

/**
 * Generate Twitter Card metadata
 * 
 * @param config - Metadata configuration
 * @returns Twitter Card metadata object
 */
export function generateTwitterMetadata(config: MetadataConfig) {
  const ogImageUrls = resolveOgImageUrls(config.ogImage);
  
  return {
    card: "summary_large_image" as const,
    title: config.title,
    description: config.description,
    images: ogImageUrls,
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
    metadataBase: getMetadataBase(),
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
      "Clarity in decisions. Enduring outcomes. Structuration sophistiquée, impact durable. Financement de projets, ingénierie financière, gestion de fonds.",
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
      "Clarity in decisions. Enduring outcomes. Sophisticated structuring, sustainable impact. Project financing, financial engineering, fund management.",
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
 * Generate metadata for the institution page
 *
 * @param locale - The current locale (fr or en)
 * @returns Complete Metadata object for the institution page
 */
export function generateInstitutionPageMetadata(locale: Locale): Metadata {
  const frenchMetadata = {
    title: "L'Institution - TYCHERA Investments LTD",
    description:
      "Architecture financière souveraine au service du développement africain. Une expertise institutionnelle structurée, ancrée dans les réalités du continent.",
    keywords: [
      "institution financière",
      "gouvernance",
      "Afrique",
      "développement",
      "Rwanda",
      "Kigali",
      "expertise institutionnelle",
      "partenariat public-privé",
    ],
  };

  const englishMetadata = {
    title: "The Institution - TYCHERA Investments LTD",
    description:
      "Sovereign financial architecture in service of African development. Structured institutional expertise, anchored in continental realities.",
    keywords: [
      "financial institution",
      "governance",
      "Africa",
      "development",
      "Rwanda",
      "Kigali",
      "institutional expertise",
      "public-private partnership",
    ],
  };

  const metadata = locale === "en" ? englishMetadata : frenchMetadata;

  return generatePageMetadata({
    locale,
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    path: "/institution",
    // Add specific OG image for leadership
    ogImage: "/images/leadership/kamal-portrait.jpg",
  });
}

/**
 * Generate metadata for the contact page
 *
 * @param locale - The current locale (fr or en)
 * @returns Complete Metadata object for the contact page
 */
export function generateContactPageMetadata(locale: Locale): Metadata {
  const frenchMetadata = {
    title: "Contact - TYCHERA Investments LTD",
    description:
      "Initiez une collaboration stratégique avec TYCHERA Investments. Financement de projets, conseil stratégique et structuration financière en Afrique.",
    keywords: [
      "contact",
      "collaboration stratégique",
      "financement de projets",
      "conseil financier",
      "Afrique",
      "Rwanda",
      "Kigali",
    ],
  };

  const englishMetadata = {
    title: "Contact - TYCHERA Investments LTD",
    description:
      "Initiate a strategic collaboration with TYCHERA Investments. Project financing, strategic advisory and financial structuring in Africa.",
    keywords: [
      "contact",
      "strategic collaboration",
      "project financing",
      "financial advisory",
      "Africa",
      "Rwanda",
      "Kigali",
    ],
  };

  const metadata = locale === "en" ? englishMetadata : frenchMetadata;

  return generatePageMetadata({
    locale,
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    path: "/contact",
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
