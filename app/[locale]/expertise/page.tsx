import { Scale, Construction, TrendingUp, Handshake } from "lucide-react";
import { sanityFetchWithFallback } from "@/lib/sanity/client";
import { EXPERTISE_PAGE_QUERY } from "@/lib/sanity/queries";
import { ExpertisePageData, getLocalizedText, getLocalizedRichText, type Locale } from "@/lib/sanity/types";
import { PortableText } from '@portabletext/react';

interface ExpertisePageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, any> = {
  Scale,
  Construction,
  TrendingUp,
  Handshake,
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
            children: [{ _type: 'span', text: 'Nous concevons des structures financières sur mesure qui répondent aux besoins spécifiques des marchés africains, en tenant compte des réglementations locales et des opportunités d\'investissement.' }]
          }
        ],
        en: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: 'We design custom financial structures that meet the specific needs of African markets, taking into account local regulations and investment opportunities.' }]
          }
        ]
      },
      icon: "Scale",
      order: 1,
    },
    {
      _id: "2",
      number: "02",
      title: { fr: "Financement de Projets", en: "Project Financing" },
      description: { 
        fr: "Accompagnement stratégique de bout en bout pour les projets d'infrastructure et d'énergie renouvelable.",
        en: "End-to-end strategic support for infrastructure and renewable energy projects."
      },
      detailedContent: {
        fr: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: 'Notre expertise en financement de projets couvre l\'ensemble du cycle de vie, de la structuration initiale à la clôture financière, avec un accent particulier sur les projets d\'infrastructure et d\'énergie renouvelable.' }]
          }
        ],
        en: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: 'Our project financing expertise covers the entire lifecycle, from initial structuring to financial close, with particular focus on infrastructure and renewable energy projects.' }]
          }
        ]
      },
      icon: "Construction",
      order: 2,
    },
    {
      _id: "3",
      number: "03",
      title: { fr: "Gestion de Fonds", en: "Fund Management" },
      description: { 
        fr: "Gestion active de portefeuilles institutionnels selon une approche ESG rigoureuse et performante.",
        en: "Active management of institutional portfolios with rigorous and high-performing ESG approach."
      },
      detailedContent: {
        fr: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: 'Nous gérons des portefeuilles institutionnels avec une approche disciplinée qui intègre les critères ESG tout en visant des rendements supérieurs ajustés au risque.' }]
          }
        ],
        en: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: 'We manage institutional portfolios with a disciplined approach that integrates ESG criteria while targeting superior risk-adjusted returns.' }]
          }
        ]
      },
      icon: "TrendingUp",
      order: 3,
    },
    {
      _id: "4",
      number: "04",
      title: { fr: "Structuration de Deals", en: "Deal Structuring" },
      description: { 
        fr: "Conception et montage de transactions complexes réunissant acteurs publics et investisseurs privés.",
        en: "Design and structuring of complex transactions bringing together public actors and private investors."
      },
      detailedContent: {
        fr: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: 'Nous structurons des transactions complexes qui alignent les intérêts des secteurs public et privé, créant des partenariats durables et mutuellement bénéfiques.' }]
          }
        ],
        en: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: 'We structure complex transactions that align public and private sector interests, creating sustainable and mutually beneficial partnerships.' }]
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

  // Fetch expertise page data from Sanity with fallback
  const data = await sanityFetchWithFallback<ExpertisePageData>({
    query: EXPERTISE_PAGE_QUERY,
    fallback: fallbackData,
    tags: ['serviceItem', 'pageContent'],
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
            {data.services.map((service, index) => {
              const IconComponent = iconMap[service.icon] || Scale;
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
                      <div className="relative mb-6 text-primary">
                        <IconComponent className="w-14 h-14" strokeWidth={1.5} />
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
                    <div className="relative aspect-square bg-gradient-to-br from-primary/5 to-accent/5 rounded-sm border border-border/30">
                      {/* Decorative Element */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <IconComponent className="w-32 h-32 text-primary/10" strokeWidth={1} />
                      </div>
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
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-sans text-base rounded-sm hover:bg-primary/90 transition-colors"
            >
              {locale === 'fr' ? 'Nous contacter' : 'Contact us'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
