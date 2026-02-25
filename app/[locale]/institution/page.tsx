import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Image from 'next/image';
import { sanityFetchWithFallback } from '@/lib/sanity/client';
import { TEAM_MEMBERS_QUERY } from '@/lib/sanity/queries';
import { type TeamMember, type Locale, getLocalizedText } from '@/lib/sanity/types';
import { generateInstitutionPageMetadata, type Locale as MetaLocale } from "@/lib/metadata";

interface InstitutionPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(props: InstitutionPageProps): Promise<Metadata> {
  const params = await props.params;
  return generateInstitutionPageMetadata(params.locale as MetaLocale);
}

export default async function InstitutionPage(props: InstitutionPageProps) {
  const params = await props.params;
  const locale = params.locale as Locale;
  const t = await getTranslations('institution');

  // Fetch team members from Sanity (for images, names, roles)
  const cmsMembers = await sanityFetchWithFallback<TeamMember[]>({
    query: TEAM_MEMBERS_QUERY,
    fallback: [],
    tags: ['teamMember'],
  });

  const hasCmsData = cmsMembers.length > 0;

  // Principal = first CMS member (order 1), or fallback to translations
  const principal = hasCmsData ? cmsMembers[0] : null;
  const principalName = principal?.name || t('principal.name');
  const principalTitle = principal
    ? getLocalizedText(principal.role, locale)
    : t('principal.title');
  const principalImageUrl = principal?.image?.asset?.url;
  const principalImageAlt = principal?.image?.alt || principalName;
  const principalLqip = principal?.image?.asset?.metadata?.lqip;

  // Fallback team list for the grid (when CMS is empty)
  const fallbackTeam = [
    { name: 'Kamal Alawo Adjayi', role: t('team.roles.managingDirector') },
    { name: 'Hawa KAYISHARAZA', role: t('team.roles.chiefOperatingOfficer') },
  ];

  return (
    <div className="min-h-screen">
      {/* Mission Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="container px-6">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              {t('hero.title')}
            </h1>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section - Image Left, Bio Right */}
      <section className="py-24 bg-muted/30">
        <div className="container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative aspect-[3/4] lg:aspect-square bg-muted rounded-sm overflow-hidden order-1">
              {principalImageUrl ? (
                <Image
                  src={principalImageUrl}
                  alt={principalImageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  placeholder={principalLqip ? 'blur' : 'empty'}
                  blurDataURL={principalLqip || undefined}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-primary/5 text-primary/20">
                  <span className="font-serif text-lg">{t('principal.portraitPlaceholder')}</span>
                </div>
              )}
            </div>

            {/* Bio Side */}
            <div className="order-2">
              <p className="text-sm font-sans uppercase tracking-widest text-primary mb-2">
                {principalTitle}
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8">
                {principalName}
              </h2>
              <div className="space-y-6 text-muted-foreground font-sans leading-relaxed">
                <p>{t('principal.bio.intro')}</p>
                <p>{t('principal.bio.education')}</p>
                <p>{t('principal.bio.experience')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Intro Section */}
      <section className="py-24 lg:py-32 bg-background border-t border-border/50">
        <div className="container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 lg:gap-16">
            <div className="lg:col-span-1">
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-6">
                {t('sections.team.title')}
              </h2>
              <p className="text-muted-foreground font-sans leading-relaxed mb-6">
                {t('sections.team.description')}
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-sm font-sans text-primary hover:text-primary/80 transition-colors group"
              >
                {t('sections.team.cta')}
                <svg
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 lg:py-32 bg-muted/30" aria-labelledby="team-grid-heading">
        <div className="container px-6">
          <div className="max-w-3xl mb-12">
            <h3 id="team-grid-heading" className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              {t('sections.team.title')}
            </h3>
            <div className="w-16 h-px bg-accent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {hasCmsData
              ? cmsMembers.map((member) => (
                  <div
                    key={member._id}
                    className="p-6 border border-border/50 rounded-sm bg-background hover:border-accent/50 transition-colors flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-muted mb-4 flex items-center justify-center overflow-hidden">
                      {member.image?.asset?.url ? (
                        <Image
                          src={member.image.asset.url}
                          alt={member.image.alt || member.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-serif text-muted-foreground">
                          {member.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <p className="font-serif text-foreground mb-1">
                      {member.name}
                    </p>
                    <p className="text-sm font-sans text-muted-foreground">
                      {getLocalizedText(member.role, locale)}
                    </p>
                    {member.shortBio && (
                      <p className="text-sm font-sans text-muted-foreground/80 mt-2 max-w-sm">
                        {getLocalizedText(member.shortBio, locale)}
                      </p>
                    )}
                  </div>
                ))
              : fallbackTeam.map((member, idx) => (
                  <div
                    key={member.name}
                    className="p-6 border border-border/50 rounded-sm bg-background hover:border-accent/50 transition-colors flex flex-col items-center text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-muted mb-4 flex items-center justify-center">
                      <span className="text-2xl font-serif text-muted-foreground">
                        {String.fromCharCode(65 + idx)}
                      </span>
                    </div>
                    <p className="font-serif text-foreground mb-1">
                      {member.name}
                    </p>
                    <p className="text-sm font-sans text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
}
