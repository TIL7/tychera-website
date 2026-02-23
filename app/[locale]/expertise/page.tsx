import type { Metadata } from "next";
import { type LucideProps, Landmark, Briefcase, ShieldCheck, Handshake, TrendingUp, Globe } from "lucide-react";
import { sanityFetchWithFallback } from "@/lib/sanity/client";
import { EXPERTISE_PAGE_QUERY } from "@/lib/sanity/queries";
import { ExpertisePageData, getLocalizedText, getLocalizedRichText, type Locale } from "@/lib/sanity/types";
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';
import { generateExpertisePageMetadata, type Locale as MetaLocale } from "@/lib/metadata";
import type { ServiceItem } from "@/lib/sanity/types";

interface ExpertisePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(props: ExpertisePageProps): Promise<Metadata> {
  const params = await props.params;
  return generateExpertisePageMetadata(params.locale as MetaLocale);
}

type IconComponent = React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;

// Extend this map when new icons are added in Sanity
const iconMap: Record<string, IconComponent> = {
  Building2: Landmark,
  Landmark,
  Construction: Briefcase,
  Briefcase,
  ChartPie: ShieldCheck,
  ShieldCheck,
  Handshake,
  TrendingUp,
  Globe,
};

const DEFAULT_ICON = Landmark;

// Static images for the first 4 services by order; 5th and 6th use a neutral fallback
const serviceImages: Record<number, string> = {
  1: '/images/expertise/financial-engineering.png',
  2: '/images/expertise/project-finance.png',
  3: '/images/expertise/guarantee-structuring.jpg',
  4: '/images/expertise/project-structuring.png',
};
const FALLBACK_IMAGE = '/images/expertise/financial-engineering.png';

const fallbackServices: ServiceItem[] = [
  {
    _id: "1",
    number: "01",
    title: { fr: "Ingénierie Financière", en: "Financial Engineering" },
    description: {
      fr: "Structuration sophistiquée de véhicules d'investissement adaptés aux spécificités des marchés africains.",
      en: "Sophisticated structuring of investment vehicles adapted to African market specificities.",
    },
    icon: "Building2",
    order: 1,
  },
  {
    _id: "2",
    number: "02",
    title: { fr: "Financement de Projets", en: "Project Finance" },
    description: {
      fr: "Accompagnement stratégique de bout en bout pour les projets d'infrastructure et d'énergie renouvelable.",
      en: "Strategic end-to-end support for infrastructure and renewable energy projects.",
    },
    icon: "Construction",
    order: 2,
  },
  {
    _id: "3",
    number: "03",
    title: { fr: "Structuration de Garanties", en: "Guarantee Structuring" },
    description: {
      fr: "Conception et mise en œuvre de mécanismes de garantie pour sécuriser les investissements.",
      en: "Design and implementation of guarantee mechanisms to secure investments.",
    },
    icon: "ChartPie",
    order: 3,
  },
  {
    _id: "4",
    number: "04",
    title: { fr: "Structuration de Projets", en: "Project Structuring" },
    description: {
      fr: "Conception et montage de projets complexes réunissant acteurs publics et investisseurs privés.",
      en: "Conception and assembly of complex projects uniting public and private actors.",
    },
    icon: "Handshake",
    order: 4,
  },
];

const isPortableTextBlocks = (value: unknown): value is Array<{ _type: string; [key: string]: unknown }> => {
  if (!Array.isArray(value)) return false;
  return value.every((block) => !!block && typeof block === 'object' && typeof (block as Record<string, unknown>)._type === 'string');
};

const toPortableText = (text: string, key: string): Array<{ _type: string; [key: string]: unknown }> => [
  {
    _type: 'block',
    _key: `fallback-block-${key}`,
    style: 'normal',
    children: [{ _type: 'span', _key: `fallback-span-${key}`, text, marks: [] }],
    markDefs: [],
  },
];

/**
 * Expertise Page — fully CMS-driven, supports up to 6 services (and beyond).
 */
export default async function ExpertisePage(props: ExpertisePageProps): Promise<React.ReactElement> {
  const params = await props.params;
  const locale = params.locale as Locale;
  const t = await getTranslations('pillars');

  const data = await sanityFetchWithFallback<ExpertisePageData>({
    query: EXPERTISE_PAGE_QUERY,
    fallback: { services: fallbackServices, content: [] },
    tags: ['serviceItem', 'pageContent'],
  });

  const servicesSource = Array.isArray(data.services) && data.services.length > 0
    ? data.services
    : fallbackServices;

  const services = servicesSource
    .filter((s): s is NonNullable<typeof s> => !!s && typeof s === 'object')
    .sort((a, b) => a.order - b.order)
    .map((service) => {
      const localized = getLocalizedRichText(service.detailedContent, locale);
      const bodyBlocks = isPortableTextBlocks(localized) && localized.length > 0
        ? localized
        : toPortableText(
            getLocalizedText(service.description, locale),
            `${service._id}-${locale}`
          );
      return { ...service, bodyBlocks };
    });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-background border-b border-border/50">
        <div className="container px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-sans uppercase tracking-widest text-primary mb-4">
              {locale === 'fr' ? 'Notre Expertise' : 'Our Expertise'}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-foreground mb-6">
              {locale === 'fr'
                ? "Solutions financières institutionnelles pour l'Afrique"
                : 'Institutional financial solutions for Africa'}
            </h1>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              {locale === 'fr'
                ? "TYCHERA Investments offre une gamme complète de services financiers conçus pour répondre aux besoins sophistiqués des investisseurs institutionnels et des projets d'envergure en Afrique."
                : 'TYCHERA Investments offers a comprehensive range of financial services designed to meet the sophisticated needs of institutional investors and large-scale projects in Africa.'}
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail Section — Zig-Zag Layout */}
      <section className="py-24 lg:py-32">
        <div className="container px-6">
          <div className="space-y-40">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] ?? DEFAULT_ICON;
              const isEven = index % 2 === 0;

              return (
                <div
                  key={service._id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center"
                >
                  {/* Text Column */}
                  <div className={`lg:col-span-6 ${isEven ? 'lg:col-start-1' : 'lg:col-start-7'}`}>
                    <div className="relative">
                      {/* Large Number Background */}
                      <div className="absolute -top-12 -left-6 text-[10rem] font-serif text-accent/10 leading-none pointer-events-none select-none">
                        {service.number}
                      </div>

                      {/* Icon */}
                      <div className="relative mb-6 text-[#2283a2]">
                        <IconComponent className="w-8 h-8 text-[#2283a2] fill-[#588157]/10" strokeWidth={1.5} />
                      </div>

                      {/* Title */}
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
                        {getLocalizedText(service.title, locale)}
                      </h2>

                      {/* Short Description */}
                      <p className="text-xl text-primary/80 font-sans leading-relaxed mb-8 font-medium">
                        {getLocalizedText(service.description, locale)}
                      </p>

                      {/* Gold Divider */}
                      <div className="flex items-center gap-3 mb-8">
                        <div className="h-px w-16 bg-accent" />
                        <div className="w-1.5 h-1.5 bg-accent rotate-45" />
                      </div>

                      {/* Detailed Content */}
                      <div className="prose prose-lg max-w-none">
                        <div className="text-muted-foreground font-sans leading-relaxed text-base space-y-4">
                          <PortableText value={service.bodyBlocks} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:col-start-8' : 'lg:col-start-1 lg:row-start-1'}`}>
                    <div className="relative aspect-square rounded-sm overflow-hidden border border-border/30">
                      <Image
                        src={service.image?.asset?.url ?? (serviceImages[service.order] ?? FALLBACK_IMAGE)}
                        alt={service.image?.alt ?? ''}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 bg-primary/5">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              {locale === 'fr' ? 'Prêt à explorer nos solutions ?' : 'Ready to explore our solutions?'}
            </h2>
            <p className="text-lg text-muted-foreground font-sans mb-8">
              {locale === 'fr'
                ? 'Contactez notre équipe pour discuter de vos besoins en investissement et découvrir comment TYCHERA peut vous accompagner.'
                : 'Contact our team to discuss your investment needs and discover how TYCHERA can support you.'}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-sans text-base rounded-sm hover:bg-primary/90 transition-colors"
            >
              {t('learnMore')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
