import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ThreePillars from "@/components/sections/ThreePillars";
import FounderTeaser from "@/components/sections/FounderTeaser";
import ContactSection from "@/components/sections/ContactSection";
import { CMSErrorBoundary } from "@/components/sections/CMSErrorBoundary";
import { getSiteSettings } from "@/lib/sanity/getSiteSettings";
import { generateHomePageMetadata, type Locale } from "@/lib/metadata";
import OrganizationJsonLd from "@/components/sections/OrganizationJsonLd";
import { sanityFetchWithFallback } from "@/lib/sanity/client";
import { HOME_PAGE_QUERY } from "@/lib/sanity/queries";
import type { HomePageData, ServiceItem } from "@/lib/sanity/types";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(props: HomePageProps): Promise<Metadata> {
  const params = await props.params;
  return generateHomePageMetadata(params.locale as Locale);
}

const fallbackServices: ServiceItem[] = [
  {
    _id: "1",
    number: "01",
    title: { fr: "Ingénierie Financière", en: "Financial Engineering" },
    description: {
      fr: "Conception de véhicules d'investissement alignés sur les réalités réglementaires et de marché africaines.",
      en: "Design of investment vehicles aligned with African market and regulatory realities.",
    },
    icon: "Building2",
    order: 1,
  },
  {
    _id: "2",
    number: "02",
    title: { fr: "Financement de Projets", en: "Project Finance" },
    description: {
      fr: "Accompagnement de la structuration et de l'exécution, de la faisabilité à la clôture financière.",
      en: "Structuring and execution support from feasibility through financial close.",
    },
    icon: "Construction",
    order: 2,
  },
  {
    _id: "3",
    number: "03",
    title: { fr: "Structuration de Garanties", en: "Guarantee Structuring" },
    description: {
      fr: "Instruments de partage des risques améliorant la bancabilité et la mobilisation de capitaux institutionnels.",
      en: "Risk-sharing instruments that improve bankability and mobilize institutional capital.",
    },
    icon: "ChartPie",
    order: 3,
  },
  {
    _id: "4",
    number: "04",
    title: { fr: "Structuration de Projets", en: "Project Structuring" },
    description: {
      fr: "Montage d'opérations public-privé pour des cadres de projets viables et investissables.",
      en: "Public-private transaction design for viable and investable project frameworks.",
    },
    icon: "Handshake",
    order: 4,
  },
];

/**
 * Home Page - Locale-based Route
 *
 * Fetches services from Sanity CMS and passes them to ThreePillars.
 * Falls back to hardcoded data if CMS is unavailable.
 */
export default async function HomePage(props: HomePageProps): Promise<React.ReactElement> {
  const params = await props.params;
  const locale = params.locale;
  const siteSettings = await getSiteSettings();

  const data = await sanityFetchWithFallback<HomePageData>({
    query: HOME_PAGE_QUERY,
    fallback: { services: fallbackServices, content: [] },
    tags: ['serviceItem'],
  });

  const services = Array.isArray(data.services) && data.services.length > 0
    ? data.services
    : fallbackServices;

  return (
    <>
      <OrganizationJsonLd locale={locale} />
      <Hero />
      <CMSErrorBoundary>
        <ThreePillars mode="teaser" services={services} locale={locale} />
      </CMSErrorBoundary>
      <FounderTeaser />
      <ContactSection siteSettings={siteSettings} />
    </>
  );
}
