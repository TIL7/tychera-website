import { Landmark, Briefcase, ShieldCheck, Handshake } from "lucide-react";
import { sanityFetchWithFallback } from "@/lib/sanity/client";
import { EXPERTISE_PAGE_QUERY } from "@/lib/sanity/queries";
import { ExpertisePageData, getLocalizedText, getLocalizedRichText, type Locale } from "@/lib/sanity/types";
import { PortableText } from '@portabletext/react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

interface ExpertisePageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, any> = {
  Building2: Landmark,
  Construction: Briefcase,
  ChartPie: ShieldCheck,
  Handshake,
};

// Local images for service pillars mapped by order
// Keys correspond to the service order (1-4)
const serviceImages: Record<number, string> = {
  // Financial Engineering
  1: '/images/expertise/financial-engineering.png',
  
  // Project Finance
  2: '/images/expertise/project-finance.png',
  
  // Guarantee Structuring
  3: '/images/expertise/guarantee-structuring.jpg',
  
  // Project Structuring
  4: '/images/expertise/project-structuring.png',
};

// Fallback data in case Sanity fetch fails
const fallbackData: ExpertisePageData = {
  services: [
    {
      _id: "1",
      number: "01",
      title: { fr: "Ingénierie Financière", en: "Financial Engineering" },
      description: {
        fr: "Structuration sophistiquée de véhicules d'investissement adaptés aux spécificités des marchés africains.",
        en: "Sophisticated structuring of investment vehicles adapted to African market specificities."
      },
      detailedContent: {
        fr: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: "TYCHERA Investments Ltd conçoit des solutions financières sur mesure, incluant des obligations vertes, des financements structurés et des instruments innovants, répondant aux exigences des investisseurs institutionnels et des projets stratégiques." }]
          }
        ],
        en: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: 'TYCHERA Investments Ltd designs bespoke financial solutions, including green bonds, structured financing, and innovative instruments, aligned with the requirements of institutional investors and strategic projects.' }]
          }
        ]
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
        en: "Strategic end-to-end support for infrastructure and renewable energy projects."
      },
      detailedContent: {
        fr: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: "De la phase de conception initiale jusqu'à la clôture financière, TYCHERA Investments Ltd intervient à chaque étape afin d'assurer la viabilité économique, la structuration financière et l'attractivité des projets auprès des investisseurs institutionnels et internationaux." }]
          }
        ],
        en: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: 'From initial project design through financial close, TYCHERA Investments Ltd supports each stage to ensure economic viability, robust financial structuring, and strong appeal to institutional and international investors.' }]
          }
        ]
      },
      icon: "Construction",
      order: 2,
    },
    {
      _id: "3",
      number: "03",
      title: { fr: "Structuration de Garanties", en: "Guarantee Structuring" },
      description: {
        fr: "Conception et mise en œuvre de mécanismes de garantie pour sécuriser les investissements et atténuer les risques pour les investisseurs institutionnels.",
        en: "Design and implementation of guarantee mechanisms to secure investments and mitigate risks for institutional investors."
      },
      detailedContent: {
        fr: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: "Conception et mise en œuvre de mécanismes de garantie pour sécuriser les investissements et atténuer les risques. TYCHERA Investments Ltd structure des solutions adaptées au contexte africain, afin de renforcer la bancabilité et la mobilisation de capitaux institutionnels." }]
          }
        ],
        en: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: 'Design and implementation of guarantee mechanisms to secure investments and mitigate risk. TYCHERA Investments Ltd structures context-adapted solutions to enhance bankability and unlock institutional capital.' }]
          }
        ]
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
        en: "Conception and assembly of complex projects uniting public and private actors. We optimize risk-return structures to ensure bankable operations."
      },
      detailedContent: {
        fr: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: "Conception et montage de projets complexes réunissant acteurs publics et privés. TYCHERA Investments Ltd accompagne la structuration de projets stratégiques, en coordonnant partenaires publics et privés afin de sécuriser des montages financiers viables, bancables et adaptés aux contextes locaux." }]
          }
        ],
        en: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: 'Conception and assembly of complex projects uniting public and private actors. TYCHERA Investments Ltd coordinates stakeholders to secure viable, bankable financial structures adapted to local contexts.' }]
          }
        ]
      },
      icon: "Handshake",
      order: 4,
    },
  ],
  content: [],
};

/**
 * Expertise Page - Detailed Service Breakdown
 * 
 * Displays detailed information about each of TYCHERA's four service pillars.
 * Fetches data from Sanity CMS with fallback to hardcoded content.
 * 
 * @requirements 3.2, 4.5, 4.6, 4.7, 15.1, 15.4
 */
export default async function ExpertisePage(props: ExpertisePageProps) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const pillarsT = await getTranslations('pillars');

  const canonicalByOrder = {
    1: {
      number: pillarsT('services.financial.number'),
      title: pillarsT('services.financial.title'),
      description: pillarsT('services.financial.description'),
      IconComponent: Landmark,
    },
    2: {
      number: pillarsT('services.project.number'),
      title: pillarsT('services.project.title'),
      description: pillarsT('services.project.description'),
      IconComponent: Briefcase,
    },
    3: {
      number: pillarsT('services.fund.number'),
      title: pillarsT('services.fund.title'),
      description: pillarsT('services.fund.description'),
      IconComponent: ShieldCheck,
    },
    4: {
      number: pillarsT('services.deal.number'),
      title: pillarsT('services.deal.title'),
      description: pillarsT('services.deal.description'),
      IconComponent: Handshake,
    },
  } as const;

  const resolveDetailedContent = (serviceOrder: number, detailedContent: any) => {
    const localized = getLocalizedRichText(detailedContent, locale);
    if (Array.isArray(localized) && localized.length > 0) return detailedContent;
    const fallback = fallbackData.services.find((s) => s.order === serviceOrder);
    return fallback?.detailedContent;
  };

  // Fetch expertise page data from Sanity with fallback
  const data = await sanityFetchWithFallback<ExpertisePageData>({
    query: EXPERTISE_PAGE_QUERY,
    fallback: fallbackData,
    tags: ['serviceItem', 'pageContent'],
  });

  const computedServices = (Array.isArray(data.services) ? data.services : fallbackData.services)
    .map((service) => {
      const order = typeof service.order === 'number' ? service.order : 0;
      return {
        ...service,
        order,
        detailedContent: resolveDetailedContent(order, service.detailedContent),
      };
    })
    .filter((service): service is typeof service & { order: 1 | 2 | 3 | 4 } => {
      const order = Number(service.order);
      return !isNaN(order) && order >= 1 && order <= 4;
    })
    .sort((a, b) => a.order - b.order);

  const services = computedServices.length > 0 ? computedServices : fallbackData.services;

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
                ? 'Solutions financières institutionnelles pour l\'Afrique'
                : 'Institutional financial solutions for Africa'
              }
            </h1>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              {locale === 'fr'
                ? 'TYCHERA Investments offre une gamme complète de services financiers conçus pour répondre aux besoins sophistiqués des investisseurs institutionnels et des projets d\'envergure en Afrique.'
                : 'TYCHERA Investments offers a comprehensive range of financial services designed to meet the sophisticated needs of institutional investors and large-scale projects in Africa.'
              }
            </p>
          </div>
        </div>
      </section>

      {/* Services Detail Section - Zig-Zag Layout */}
      <section className="py-24 lg:py-32">
        <div className="container px-6">
          <div className="space-y-40">
            {services.map((service, index) => {
              const canonical = canonicalByOrder[service.order];
              const IconComponent = canonical?.IconComponent || iconMap[service.icon] || Landmark;
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
                        {canonical?.number || service.number}
                      </div>

                      {/* Icon */}
                      <div className="relative mb-6 text-[#2283a2]">
                        <IconComponent className="w-8 h-8 text-[#2283a2] fill-[#588157]/10" strokeWidth={1.5} />
                      </div>

                      {/* Title */}
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-6 leading-tight">
                        {canonical?.title || getLocalizedText(service.title, locale)}
                      </h2>

                      {/* Short Description */}
                      <p className="text-xl text-primary/80 font-sans leading-relaxed mb-8 font-medium">
                        {canonical?.description || getLocalizedText(service.description, locale)}
                      </p>

                      {/* Gold Divider */}
                      <div className="flex items-center gap-3 mb-8">
                        <div className="h-px w-16 bg-accent" />
                        <div className="w-1.5 h-1.5 bg-accent rotate-45" />
                      </div>

                      {/* Detailed Content */}
                      <div className="prose prose-lg max-w-none">
                        <div className="text-muted-foreground font-sans leading-relaxed text-base space-y-4">
                          {service.detailedContent && (
                            <PortableText
                              value={getLocalizedRichText(service.detailedContent, locale)}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visual/Spacer Column */}
                  <div className={`lg:col-span-5 ${isEven ? 'lg:col-start-8' : 'lg:col-start-1 lg:row-start-1'}`}>
                    <div className="relative aspect-square rounded-sm overflow-hidden border border-border/30">
                      <Image
                        src={serviceImages[service.order] || serviceImages[3]} // Fallback to a valid image
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                      />
                      {/* Overlay gradient for better text contrast if needed */}
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
              {locale === 'fr'
                ? 'Prêt à explorer nos solutions ?'
                : 'Ready to explore our solutions?'
              }
            </h2>
            <p className="text-lg text-muted-foreground font-sans mb-8">
              {locale === 'fr'
                ? 'Contactez notre équipe pour discuter de vos besoins en investissement et découvrir comment TYCHERA peut vous accompagner.'
                : 'Contact our team to discuss your investment needs and discover how TYCHERA can support you.'
              }
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-sans text-base rounded-sm hover:bg-primary/90 transition-colors"
            >
              {locale === 'fr' ? 'Nous contacter' : 'Contact us'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
