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
  const tPillars = await getTranslations('pillars');
  const tExpertise = await getTranslations('expertisePage');
  const tHeaderNav = await getTranslations('header.nav');

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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border/50 bg-[linear-gradient(180deg,hsl(var(--muted)/0.35)_0%,hsl(var(--background))_100%)] py-16 md:py-20 lg:py-24">
        <div className="container px-6">
          <div className="max-w-4xl">
            <p className="text-sm font-sans uppercase tracking-[0.18em] text-foreground/70 mb-4">
              {tExpertise('hero.label')}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-foreground mb-6">
              {tExpertise('hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              {tExpertise('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-12 lg:py-16">
        <div className="container px-6">
          <div className="mb-8 max-w-3xl">
            <p className="mb-3 text-[0.7rem] uppercase tracking-[0.18em] text-foreground/70 font-sans">
              {tPillars('sectionLabel')}
            </p>
            <h2 className="text-2xl md:text-3xl font-serif text-foreground">
              {tPillars('sectionTitle')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service, index) => {
              const IconComponent = iconMap[service.icon] ?? DEFAULT_ICON;
              const title = getLocalizedText(service.title, locale);
              const description = getLocalizedText(service.description, locale);

              return (
                <article
                  key={service._id}
                  className="overflow-hidden rounded-sm border border-border/60 bg-background"
                  aria-labelledby={`service-title-${service._id}`}
                >
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-border/60 bg-muted/30">
                    <Image
                      src={service.image?.asset?.url ?? (serviceImages[service.order] ?? FALLBACK_IMAGE)}
                      alt={service.image?.alt ?? title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 42vw"
                      priority={index < 2}
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,hsl(var(--background)/0.16)_100%)]"
                      aria-hidden="true"
                    />
                  </div>

                  <div className="p-5 md:p-6">
                    <header>
                      <div className="mb-3 flex items-center gap-3">
                        <span className="font-sans text-xs tracking-[0.16em] uppercase text-foreground/80">
                          {service.number}
                        </span>
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-border/60 bg-muted/40">
                          <IconComponent className="h-4 w-4 text-foreground/70" strokeWidth={1.5} />
                        </span>
                      </div>
                      <h3 id={`service-title-${service._id}`} className="text-2xl md:text-3xl font-serif text-foreground leading-tight">
                        {title}
                      </h3>
                      <p className="mt-3 text-base text-muted-foreground font-sans leading-relaxed">
                        {description}
                      </p>
                    </header>

                    <div className="my-5 h-px w-14 bg-border" />

                    <div className="text-muted-foreground font-sans leading-relaxed text-sm md:text-base [&_p+p]:mt-3">
                      <PortableText value={service.bodyBlocks} />
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section className="border-t border-border/50 bg-muted/20 py-16 lg:py-20">
        <div className="container px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              {tExpertise('cta.title')}
            </h2>
            <p className="text-lg text-muted-foreground font-sans mb-8">
              {tExpertise('cta.subtitle')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-4 font-sans text-base text-primary-foreground transition-colors hover:bg-primary/90"
              >
                {tPillars('learnMore')}
              </Link>
              <Link
                href="/institution"
                className="inline-flex items-center justify-center rounded-sm border border-border/70 bg-background px-6 py-4 font-sans text-base text-foreground transition-colors hover:bg-muted/60"
              >
                {tHeaderNav('institution')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
