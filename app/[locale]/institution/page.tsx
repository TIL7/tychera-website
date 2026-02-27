import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import {
  ArrowRight,
} from 'lucide-react';
import { sanityFetchWithFallback } from '@/lib/sanity/client';
import { TEAM_MEMBERS_QUERY } from '@/lib/sanity/queries';
import { type TeamMember, type Locale, getLocalizedText } from '@/lib/sanity/types';
import { generateInstitutionPageMetadata, type Locale as MetaLocale } from "@/lib/metadata";

interface InstitutionPageProps {
  params: Promise<{
    locale: string;
  }>;
}

interface GlobalPresenceCity {
  tag: string;
  city: string;
  address: string;
  description: string;
}

interface GlobalPresenceContent {
  label: string;
  title: string;
  subtitle: string;
  cities: {
    kigali: GlobalPresenceCity;
    luxembourg: GlobalPresenceCity;
    bissau: GlobalPresenceCity;
  };
}

interface TeamHighlightsContent {
  title: string;
  execution: string;
  crossBorder: string;
  governance: string;
}

interface ProfileContent {
  aboutLabel: string;
  visionLabel: string;
  missionLabel: string;
  about: string;
  vision: string;
  mission: string;
}

function isKamalName(name: string): boolean {
  const normalized = name.trim().toLowerCase();
  return (
    normalized.includes('kamal') &&
    (normalized.includes('alawo') ||
      normalized.includes('adjayi') ||
      normalized === 'kamal ajayi' ||
      normalized === 'kamal')
  );
}

function normalizeExecutiveName(name: string): string {
  if (isKamalName(name)) {
    return 'Kamal Alawo ADJAYI';
  }

  return name;
}

function getCityWithoutCountry(city: string): string {
  return city.split(',')[0]?.trim() || city;
}

export async function generateMetadata(props: InstitutionPageProps): Promise<Metadata> {
  const params = await props.params;
  return generateInstitutionPageMetadata(params.locale as MetaLocale);
}

export default async function InstitutionPage(props: InstitutionPageProps) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const t = await getTranslations('institution');
  const globalPresence = t.raw('globalPresence') as GlobalPresenceContent;
  const teamHighlights = t.raw('teamHighlights') as TeamHighlightsContent;
  const profile = t.raw('profile') as ProfileContent;

  const presenceCards: Array<{
    city: GlobalPresenceCity;
  }> = [
      {
        city: globalPresence.cities.luxembourg,
      },
      {
        city: globalPresence.cities.kigali,
      },
      {
        city: globalPresence.cities.bissau,
      },
    ];

  const founderNarrative: Array<{ label: string; text: string }> = [
    { label: profile.aboutLabel, text: profile.about },
    { label: profile.visionLabel, text: profile.vision },
    { label: profile.missionLabel, text: profile.mission },
  ];

  const teamHighlightCards = [
    teamHighlights.execution,
    teamHighlights.crossBorder,
    teamHighlights.governance,
  ];

  // Fetch team members from Sanity (for images, names, roles)
  const cmsMembers = await sanityFetchWithFallback<TeamMember[]>({
    query: TEAM_MEMBERS_QUERY,
    fallback: [],
    tags: ['teamMember'],
  });

  const leadershipMembers = cmsMembers.filter((member) => isKamalName(member.name));

  const principal = leadershipMembers.length > 0 ? leadershipMembers[0] : null;
  const principalName = normalizeExecutiveName(principal?.name || t('principal.name'));
  // Force "Chief Executive Officer" title to ensure consistency across languages, ignoring potential CMS inconsistencies.
  const principalTitle = "Chief Executive Officer";
  /*
  const principalTitle = principal?.role
    ? getLocalizedText(principal.role, locale) || t('principal.title')
    : t('principal.title');
  */
  const principalImageUrl = principal?.image?.asset?.url;
  const principalImageAlt = principal?.image?.alt || principalName;
  const principalLqip = principal?.image?.asset?.metadata?.lqip;
  const leadershipBio = t('sections.team.leadershipBio');

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "name": principalName,
    "caption": "Executive portrait facing inward with warm studio lighting.",
    "contentUrl": "/images/leadership/kamal-portrait.jpg",
    "width": 1200,
    "height": 1800,
    "representativeOfPage": true
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Mission Section */}
      <section className="py-12 lg:py-14 bg-background">
        <div className="container px-6">
          <div className="max-w-4xl">
            <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-primary font-sans mb-3">
              {t('hero.label')}
            </p>
            <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-5">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Institution Profile */}
      <section className="py-12 lg:py-14 bg-background border-t border-border/40">
        <div className="container px-6">
          <div className="mx-auto max-w-4xl rounded-sm border border-border/60 bg-background p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-serif text-foreground">
              {t('principal.sectionTitle')}
            </h2>
            <div className="mt-6 space-y-6 border-t border-border/60 pt-6">
              {founderNarrative.map((item, idx) => (
                <div key={`narrative-${idx}`} className="space-y-2">
                  <p className="text-xs font-sans uppercase tracking-[0.16em] text-foreground/70">
                    {item.label}
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground font-sans leading-8">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team and Leadership */}
      <section className="py-12 lg:py-16 bg-background border-y border-border/50">
        <div className="container px-6">
          <div className="max-w-4xl mb-10 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-5">
              {t('sections.team.title')}
            </h2>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              {t('sections.team.description')}
            </p>
            <p className="mt-3 text-base text-muted-foreground/90 font-sans leading-relaxed">
              {t('sections.team.supportLine')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col">
              <figure className="flex-1 rounded-2xl border border-border/40 bg-background shadow-sm hover:shadow-md transition-shadow overflow-hidden grid grid-cols-1 sm:grid-cols-[280px_1fr] md:grid-cols-[320px_1fr] items-stretch">
                <div className="relative aspect-[4/5] sm:aspect-auto w-full bg-muted">
                  <Image
                    src="/images/leadership/kamal-portrait.jpg"
                    alt={principalImageAlt}
                    fill
                    className="object-cover object-[center_top]"
                    sizes="(min-width: 640px) 320px, 100vw"
                    priority
                  />
                </div>
                <figcaption className="p-8 lg:p-10 flex flex-col justify-center bg-background">
                  <h3 className="font-serif text-foreground text-2xl md:text-3xl leading-tight font-bold">
                    {principalName}
                  </h3>
                  <p className="mt-3 font-sans text-xs uppercase tracking-[0.14em] text-primary font-semibold">
                    {principalTitle}
                  </p>
                  <div className="my-6 h-px w-10 bg-border"></div>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {leadershipBio}
                  </p>

                  <div className="mt-8 pt-6 border-t border-border/40">
                    <Link
                      href="/contact"
                      className="inline-flex items-center text-sm font-sans font-medium text-foreground hover:text-primary transition-colors group"
                    >
                      {t('sections.team.cta')}
                      <ArrowRight
                        className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </figcaption>
              </figure>
            </div>

            {/* Right Sidebar: Team DNA */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col rounded-2xl border border-border/40 bg-muted/20 p-8 lg:p-10 justify-center">
              <div className="w-full">
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/60 font-sans mb-8 font-semibold">
                  {teamHighlights.title}
                </p>

                <div className="space-y-6">
                  {teamHighlightCards.map((text, idx) => (
                    <div
                      key={`team-highlight-${idx}`}
                      className="relative pl-5"
                    >
                      <span className="absolute left-0 top-2.5 w-1 h-1 rounded-full bg-primary/40"></span>
                      <p className="text-sm md:text-base text-foreground/80 font-sans leading-relaxed">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-12 lg:py-14 bg-background border-t border-border/50">
        <div className="container px-6">
          <div className="max-w-4xl mb-8 lg:mb-10">
            <p className="text-sm font-sans uppercase tracking-widest text-foreground/70 mb-3">
              {globalPresence.label}
            </p>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground leading-tight mb-4">
              {globalPresence.title}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground font-sans leading-relaxed">
              {globalPresence.subtitle}
            </p>
          </div>

          <div className="rounded-sm border border-border/60 bg-background px-4 py-6 md:px-8 md:py-7">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {presenceCards.map(({ city }) => (
                <article
                  key={city.city}
                  className="rounded-sm border border-border/60 bg-background p-5 md:p-6"
                >
                  <h3 className="text-2xl font-serif text-foreground">
                    {getCityWithoutCountry(city.city)}
                  </h3>
                  <p className="mt-3 text-sm font-sans text-muted-foreground">
                    {city.address}
                  </p>
                  <p className="mt-3 text-sm md:text-base font-sans text-muted-foreground leading-relaxed">
                    {city.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
