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

function normalizeExecutiveName(name: string): string {
  const normalized = name.trim().toLowerCase();
  const isKamal = normalized.includes('kamal');
  const hasKnownVariant =
    normalized.includes('alawo') ||
    normalized.includes('adjayi') ||
    normalized === 'kamal ajayi';

  if (isKamal && hasKnownVariant) {
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

  const founderNarrative: string[] = [
    t('principal.bio.intro'),
    t('principal.bio.education'),
    t('principal.bio.experience'),
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

  const hasCmsData = cmsMembers.length > 0;

  // Principal = first CMS member (order 1), or fallback to translations
  const principal = hasCmsData ? cmsMembers[0] : null;
  const principalName = normalizeExecutiveName(principal?.name || t('principal.name'));
  const principalTitle = t('principal.title');
  const principalImageUrl = principal?.image?.asset?.url;
  const principalImageAlt = principal?.image?.alt || principalName;
  const principalLqip = principal?.image?.asset?.metadata?.lqip;

  // Fallback team list for the grid (when CMS is empty)
  const fallbackTeam = [
    { name: 'Kamal Alawo ADJAYI', role: t('team.roles.managingDirector') },
    { name: 'Hawa KAYISHARAZA', role: t('team.roles.chiefOperatingOfficer') },
  ];

  const getTeamRoleDisplay = (name: string, fallbackRole: string): string => {
    const normalized = name.trim().toLowerCase();

    if (normalized.includes('kamal')) {
      return t('team.roles.managingDirector');
    }

    if (normalized.includes('hawa')) {
      return t('team.roles.chiefOperatingOfficer');
    }

    return fallbackRole;
  };

  return (
    <div className="min-h-screen">
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

      {/* Founder Section - monochrome single-column text block */}
      <section className="py-12 lg:py-14 bg-background border-t border-border/40">
        <div className="container px-6">
          <div className="mx-auto max-w-4xl">
            <div className="relative mb-8 aspect-[16/11] bg-muted rounded-sm overflow-hidden border border-border/60">
              {principalImageUrl ? (
                <Image
                  src={principalImageUrl}
                  alt={principalImageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  placeholder={principalLqip ? 'blur' : 'empty'}
                  blurDataURL={principalLqip || undefined}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                  <span className="font-serif text-lg text-center px-4">{t('principal.portraitPlaceholder')}</span>
                </div>
              )}
            </div>

            <div className="space-y-5 relative">
              <div className="absolute -inset-6 bg-muted/30 -z-10 rounded-sm" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">
                {principalName}
              </h2>
              <p className="text-xs font-sans uppercase tracking-[0.18em] text-foreground/70">
                {principalTitle}
              </p>

              <div className="space-y-6 pt-6 border-t border-border/60">
                {founderNarrative.map((text, idx) => (
                  <p
                    key={`narrative-${idx}`}
                    className="text-base md:text-lg text-muted-foreground font-sans leading-8"
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Intro Section */}
      <section className="py-12 lg:py-14 bg-muted/20 border-y border-border/50">
        <div className="container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-7">
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-5">
                {t('sections.team.title')}
              </h2>
              <p className="text-muted-foreground font-sans leading-relaxed mb-6 max-w-2xl">
                {t('sections.team.description')}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-sm font-sans text-primary hover:text-primary/80 transition-colors group"
              >
                {t('sections.team.cta')}
                <ArrowRight
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </div>

            <div className="lg:col-span-5 rounded-sm border border-border/60 bg-background p-4 md:p-5">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.18em] text-foreground/70 font-sans mb-3">
                  {teamHighlights.title}
                </p>
                <div className="space-y-2.5">
                  {teamHighlightCards.map((text, idx) => (
                    <div
                      key={`team-highlight-${idx}`}
                      className="border-t border-border/60 pt-3 first:border-t-0 first:pt-0"
                    >
                      <p className="text-sm text-muted-foreground font-sans leading-relaxed">
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

      {/* Team Grid */}
      <section className="py-12 lg:py-14 bg-background" aria-labelledby="team-grid-heading">
        <div className="container px-6">
          <div className="max-w-3xl mb-10">
            <h3 id="team-grid-heading" className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              {t('sections.team.title')}
            </h3>
            <div className="w-16 h-px bg-border" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {hasCmsData
              ? cmsMembers.map((member) => {
                  const displayName = normalizeExecutiveName(member.name);
                  const role = getTeamRoleDisplay(displayName, getLocalizedText(member.role, locale));
                  const shortBio = member.shortBio ? getLocalizedText(member.shortBio, locale) : null;

                  return (
                    <article
                      key={member._id}
                      className="p-5 border border-border/60 rounded-sm bg-background"
                    >
                      <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-muted mb-4 flex items-center justify-center overflow-hidden border border-border/60">
                          {member.image?.asset?.url ? (
                            <Image
                              src={member.image.asset.url}
                              alt={member.image.alt || displayName}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-2xl font-serif text-muted-foreground">
                              {displayName.charAt(0)}
                            </span>
                          )}
                        </div>
                        <p className="font-serif text-foreground text-lg leading-snug">
                          {displayName}
                        </p>
                        <p className="mt-1 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                          {role}
                        </p>
                        {shortBio && (
                          <p className="mt-3 text-sm font-sans text-muted-foreground/85 leading-relaxed line-clamp-4">
                            {shortBio}
                          </p>
                        )}
                      </div>
                    </article>
                  );
                })
              : fallbackTeam.map((member, idx) => (
                  <article
                    key={member.name}
                    className="p-5 border border-border/60 rounded-sm bg-background"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-20 h-20 rounded-full bg-muted mb-4 flex items-center justify-center border border-border/60">
                        <span className="text-2xl font-serif text-muted-foreground">
                          {String.fromCharCode(65 + idx)}
                        </span>
                      </div>
                      <p className="font-serif text-foreground text-lg leading-snug">
                        {member.name}
                      </p>
                      <p className="mt-1 font-sans text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        {member.role}
                      </p>
                    </div>
                  </article>
                ))}
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
