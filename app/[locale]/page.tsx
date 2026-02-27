import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import ThreePillars from "@/components/sections/ThreePillars";
import FounderTeaser from "@/components/sections/FounderTeaser";
import ContactSection from "@/components/sections/ContactSection";
import { CMSErrorBoundary } from "@/components/sections/CMSErrorBoundary";
import { getSiteSettings } from "@/lib/sanity/getSiteSettings";
import { generateHomePageMetadata, type Locale } from "@/lib/metadata";
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
      fr: "Nous concevons et structurons des plateformes d'investissement robustes et bancables, alignées sur les réalités réglementaires, financières et opérationnelles des marchés africains. Notre rôle consiste à traduire la complexité des projets en cadres financiers clairs et investissables, conformes aux standards institutionnels internationaux. En intégrant transparence, atténuation des risques et création de valeur à long terme, nous permettons aux États, sponsors et investisseurs de mobiliser efficacement et durablement les capitaux.",
      en: "We design and structure robust, bankable investment platforms aligned with the regulatory, financial, and operational realities of African markets. Our role is to translate complex project dynamics into clear, investable financial frameworks that meet international institutional standards. By integrating transparency, risk mitigation, and long-term value creation, we enable governments, sponsors, and investors to mobilize capital efficiently and sustainably.",
    },
    icon: "Building2",
    order: 1,
  },
  {
    _id: "2",
    number: "02",
    title: { fr: "Structuration de Projets", en: "Project Structuring" },
    description: {
      fr: "Nous transformons les concepts stratégiques en projets prêts à l'investissement en définissant des structures juridiques, financières et opérationnelles optimales. Notre approche garantit une allocation équilibrée des risques, la conformité réglementaire et la viabilité de long terme. En alignant les objectifs du secteur public avec l'efficacité du secteur privé, nous créons des bases solides pour la réussite des infrastructures et des PPP à travers les marchés africains.",
      en: "We transform strategic concepts into investment-ready projects by defining optimal legal, financial, and operational structures. Our approach ensures balanced risk allocation, regulatory compliance, and long-term viability. By aligning public-sector objectives with private-sector efficiency, we create solid foundations for successful infrastructure and PPP delivery across African markets.",
    },
    icon: "Handshake",
    order: 2,
  },
  {
    _id: "3",
    number: "03",
    title: { fr: "Financement de Projets", en: "Project Finance" },
    description: {
      fr: "Nous structurons et arrangeons des solutions de financement de projets sur mesure pour les grandes infrastructures et les initiatives de partenariat public-privé. Notre expertise se concentre sur la conception de cadres financiers bancables qui allouent efficacement les risques, sécurisent des financements de long terme et alignent les intérêts des États, des sponsors et des prêteurs. Nous accompagnons les projets jusqu'à la clôture financière, en veillant à leur durabilité et à leur bonne exécution.",
      en: "We structure and arrange tailored project finance solutions for large-scale infrastructure and public-private partnership initiatives. Our expertise focuses on designing bankable financial frameworks that efficiently allocate risk, secure long-term funding, and align the interests of governments, sponsors, and lenders. We support projects through to financial close, ensuring durability and successful execution.",
    },
    icon: "Construction",
    order: 3,
  },
  {
    _id: "4",
    number: "04",
    title: { fr: "Structuration de Garanties", en: "Guarantee Structuring" },
    description: {
      fr: "Nous concevons et structurons des mécanismes de garantie sur mesure qui renforcent la solvabilité et atténuent les risques des projets. En collaboration étroite avec les autorités publiques, les institutions de financement du développement et les investisseurs privés, nous mettons en place des solutions de partage des risques qui renforcent la bancabilité, débloquent les capitaux et consolident la confiance des investisseurs sur les marchés africains.",
      en: "We design and structure tailored guarantee mechanisms that enhance creditworthiness and mitigate project risks. Working closely with public authorities, development finance institutions, and private investors, we implement risk-sharing solutions that strengthen bankability, unlock capital, and reinforce investor confidence across African markets.",
    },
    icon: "ChartPie",
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
      <Hero />
      <CMSErrorBoundary>
        <ThreePillars mode="teaser" services={services} locale={locale} />
      </CMSErrorBoundary>
      <FounderTeaser />
      <ContactSection siteSettings={siteSettings} />
    </>
  );
}
