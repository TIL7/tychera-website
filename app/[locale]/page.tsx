import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ThreePillars from "@/components/sections/ThreePillars";
import FounderTeaser from "@/components/sections/FounderTeaser";
import ContactSection from "@/components/sections/ContactSection";
import { CMSErrorBoundary } from "@/components/sections/CMSErrorBoundary";
import { getSiteSettings } from "@/lib/sanity/getSiteSettings";
import { generateHomePageMetadata, type Locale } from "@/lib/metadata";
import OrganizationJsonLd from "@/components/sections/OrganizationJsonLd";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(props: HomePageProps): Promise<Metadata> {
  const params = await props.params;
  return generateHomePageMetadata(params.locale as Locale);
}

/**
 * Home Page - Locale-based Route
 * 
 * Composes all major section components in the correct order:
 * 1. Hero - Main value proposition
 * 2. ThreePillars - Service offerings (4 pillars) [CMS-powered]
 * 3. FounderTeaser - Kamal quote with link to institution
 * 4. ContactSection - Contact form and information
 * 
 * This is a Server Component that renders static content.
 * CMS-powered sections are wrapped in error boundaries for graceful degradation.
 * 
 * @requirements 3.1, 3.4, 3.5, 4.7, 4.8
 */
export default async function HomePage(props: HomePageProps) {
  const params = await props.params;
  const locale = params.locale;
  const siteSettings = await getSiteSettings();

  return (
    <>
      <OrganizationJsonLd locale={locale} />
      <Hero />
      <CMSErrorBoundary>
        <ThreePillars mode="teaser" />
      </CMSErrorBoundary>
      <FounderTeaser />
      <ContactSection siteSettings={siteSettings} />
    </>
  );
}
