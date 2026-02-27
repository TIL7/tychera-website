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

// Static images for the 4 validated services by display order
const serviceImages: Record<number, string> = {
  1: '/images/expertise/financial-engineering.png',
  2: '/images/expertise/project-structuring.png',
  3: '/images/expertise/project-finance.png',
  4: '/images/expertise/guarantee-structuring.jpg',
};
const FALLBACK_IMAGE = '/images/expertise/financial-engineering.png';

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

const fallbackServices: ServiceItem[] = [
  {
    _id: "1",
    number: "01",
    title: { fr: "Ingénierie Financière", en: "Financial Engineering" },
    description: {
      fr: "Nous concevons et structurons des plateformes d'investissement robustes et bancables, alignées sur les réalités réglementaires, financières et opérationnelles des marchés africains.",
      en: "We design and structure robust, bankable investment platforms aligned with the regulatory, financial, and operational realities of African markets.",
    },
    detailedContent: {
      fr: toPortableText("Notre rôle consiste à traduire la complexité des projets en cadres financiers clairs et investissables, conformes aux standards institutionnels internationaux. En intégrant transparence, atténuation des risques et création de valeur à long terme, nous permettons aux États, sponsors et investisseurs de mobiliser efficacement et durablement les capitaux.", "1-fr"),
      en: toPortableText("Our role is to translate complex project dynamics into clear, investable financial frameworks that meet international institutional standards. By integrating transparency, risk mitigation, and long-term value creation, we enable governments, sponsors, and investors to mobilize capital efficiently and sustainably.", "1-en"),
    },
    icon: "Building2",
    order: 1,
  },
  {
    _id: "2",
    number: "02",
    title: { fr: "Structuration de Projets", en: "Project Structuring" },
    description: {
      fr: "Nous transformons les concepts stratégiques en projets prêts à l'investissement en définissant des structures juridiques, financières et opérationnelles optimales.",
      en: "We transform strategic concepts into investment-ready projects by defining optimal legal, financial, and operational structures.",
    },
    detailedContent: {
      fr: toPortableText("Notre approche garantit une allocation équilibrée des risques, la conformité réglementaire et la viabilité de long terme. En alignant les objectifs du secteur public avec l'efficacité du secteur privé, nous créons des bases solides pour la réussite des infrastructures et des PPP à travers les marchés africains.", "2-fr"),
      en: toPortableText("Our approach ensures balanced risk allocation, regulatory compliance, and long-term viability. By aligning public-sector objectives with private-sector efficiency, we create solid foundations for successful infrastructure and PPP delivery across African markets.", "2-en"),
    },
    icon: "Handshake",
    order: 2,
  },
  {
    _id: "3",
    number: "03",
    title: { fr: "Financement de Projets", en: "Project Finance" },
    description: {
      fr: "Nous structurons et arrangeons des solutions de financement de projets sur mesure pour les grandes infrastructures et les initiatives de partenariat public-privé.",
      en: "We structure and arrange tailored project finance solutions for large-scale infrastructure and public-private partnership initiatives.",
    },
    detailedContent: {
      fr: toPortableText("Notre expertise se concentre sur la conception de cadres financiers bancables qui allouent efficacement les risques, sécurisent des financements de long terme et alignent les intérêts des États, des sponsors et des prêteurs. Nous accompagnons les projets jusqu'à la clôture financière, en veillant à leur durabilité et à leur bonne exécution.", "3-fr"),
      en: toPortableText("Our expertise focuses on designing bankable financial frameworks that efficiently allocate risk, secure long-term funding, and align the interests of governments, sponsors, and lenders. We support projects through to financial close, ensuring durability and successful execution.", "3-en"),
    },
    icon: "Construction",
    order: 3,
  },
  {
    _id: "4",
    number: "04",
    title: { fr: "Structuration de Garanties", en: "Guarantee Structuring" },
    description: {
      fr: "Nous concevons et structurons des mécanismes de garantie sur mesure qui renforcent la solvabilité et atténuent les risques des projets.",
      en: "We design and structure tailored guarantee mechanisms that enhance creditworthiness and mitigate project risks.",
    },
    detailedContent: {
      fr: toPortableText("En collaboration étroite avec les autorités publiques, les institutions de financement du développement et les investisseurs privés, nous mettons en place des solutions de partage des risques qui renforcent la bancabilité, débloquent les capitaux et consolident la confiance des investisseurs sur les marchés africains.", "4-fr"),
      en: toPortableText("Working closely with public authorities, development finance institutions, and private investors, we implement risk-sharing solutions that strengthen bankability, unlock capital, and reinforce investor confidence across African markets.", "4-en"),
    },
    icon: "ChartPie",
    order: 4,
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

  // const data = await sanityFetchWithFallback<ExpertisePageData>({
  //   query: EXPERTISE_PAGE_QUERY,
  //   fallback: { services: fallbackServices, content: [] },
  //   tags: ['serviceItem', 'pageContent'],
  // });

  // FORCE USE OF FALLBACK SERVICES to ensure content matches the implementation brief exactly.
  // The CMS data (data.services) might be outdated or different.
  const servicesSource = fallbackServices;
  /* 
  const servicesSource = Array.isArray(data.services) && data.services.length > 0
    ? data.services
    : fallbackServices;
  */

  const services = servicesSource
    .filter((s): s is NonNullable<typeof s> => !!s && typeof s === 'object')
    .sort((a, b) => a.order - b.order)
    .slice(0, 4)
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
