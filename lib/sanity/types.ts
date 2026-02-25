/**
 * TypeScript Types for Sanity CMS Data
 * 
 * These types define the structure of data returned from Sanity queries.
 * They ensure type safety when working with CMS content.
 * 
 * @requirements 4.2, 4.3, 4.4
 */

/**
 * Bilingual text field
 * All user-facing content in Sanity is bilingual (French primary, English secondary)
 */
export interface BilingualText {
  fr: string;
  en: string;
}

/**
 * Bilingual rich text field (Portable Text)
 * Used for longer content with formatting
 */
export interface BilingualRichText {
  fr: PortableTextBlock[];
  en: PortableTextBlock[];
}

/** Portable Text block shape (minimal) */
export interface PortableTextBlock {
  _type: string;
  _key?: string;
  [key: string]: unknown;
}

/**
 * Sanity Image Asset
 * Represents an image with metadata
 */
export interface SanityImageAsset {
  _id: string;
  url: string;
  metadata?: {
    dimensions?: {
      width: number;
      height: number;
      aspectRatio: number;
    };
    lqip?: string; // Low Quality Image Placeholder
    blurhash?: string;
  };
}

/**
 * Sanity Image
 * Image field with asset reference and alt text
 */
export interface SanityImage {
  asset: SanityImageAsset;
  alt?: string;
}

/**
 * Service Item
 * Represents one of TYCHERA's service pillars (up to 6 supported)
 */
export interface ServiceItem {
  _id: string;
  _createdAt?: string;
  _updatedAt?: string;
  number: string;
  title: BilingualText;
  description: BilingualText;
  detailedContent?: BilingualRichText;
  image?: SanityImage;
  icon: string;
  order: number;
}

/**
 * Team Member
 * Represents a team member or principal
 */
export interface TeamMember {
  _id: string;
  _createdAt?: string;
  _updatedAt?: string;
  name: string;
  role: BilingualText;
  shortBio?: BilingualText;
  bio: BilingualRichText;
  image: SanityImage;
  order: number;
}

/**
 * Page Content
 * Represents a reusable content block
 */
export interface PageContent {
  _id: string;
  _createdAt?: string;
  _updatedAt?: string;
  key: string; // Unique identifier (kebab-case)
  content: BilingualRichText;
  page: 'home' | 'expertise' | 'about' | 'contact';
  description?: string; // Internal note
}

/**
 * Home Page Data
 * Combined data for home page
 */
export interface HomePageData {
  services: ServiceItem[];
  content: PageContent[];
}

/**
 * Expertise Page Data
 * Combined data for expertise page
 */
export interface ExpertisePageData {
  services: ServiceItem[];
  content: PageContent[];
}

/**
 * Site Settings
 * Global contact and footer settings managed in Sanity.
 */
export interface SiteSettings {
  _id: string;
  email: string;
  phone: string;
  address?: {
    line1: string;
    line2?: string;
    line3?: string;
  };
  socials?: {
    linkedin?: string;
    x?: string;
  };
  logo?: {
    asset?: {
      url?: string;
    };
  };
  legalText?: string;
  copyrightText?: string;
}

/**
 * Locale type
 * Supported locales in the application
 */
export type Locale = 'fr' | 'en';

/**
 * Helper function to get localized text
 * 
 * @param bilingualText - Bilingual text object
 * @param locale - Current locale
 * @returns Localized text string
 */
export function getLocalizedText(
  bilingualText: BilingualText | undefined,
  locale: Locale
): string {
  if (!bilingualText) return '';
  return bilingualText[locale] || bilingualText.fr; // Fallback to French
}

/**
 * Helper function to get localized rich text
 * 
 * @param bilingualRichText - Bilingual rich text object
 * @param locale - Current locale
 * @returns Localized rich text blocks
 */
export function getLocalizedRichText(
  bilingualRichText: BilingualRichText | undefined,
  locale: Locale
): PortableTextBlock[] {
  if (!bilingualRichText) return [];
  return bilingualRichText[locale] || bilingualRichText.fr; // Fallback to French
}
