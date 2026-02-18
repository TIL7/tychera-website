import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

interface InstitutionPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function InstitutionPage(props: InstitutionPageProps) {
  await props.params;
  const t = await getTranslations('institution');

  return (
    <div className="min-h-screen">
      {/* Mission Section */}
      <section className="py-24 bg-background">
        <div className="container px-6">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
              {t('hero.title')}
            </h2>
            <p className="text-lg text-muted-foreground font-sans leading-relaxed">
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Founder Section - Custom Layout - Image Left, Text Right */}
      <section className="py-24 bg-muted/30">
        <div className="container px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image Side - Left */}
            <div className="relative aspect-[3/4] lg:aspect-square bg-muted rounded-sm overflow-hidden order-1">
              <div className="absolute inset-0 flex items-center justify-center bg-primary/5 text-primary/20">
                <span className="font-serif text-lg">{t('principal.portraitPlaceholder')}</span>
              </div>
            </div>

            {/* Bio Side - Right */}
            <div className="order-2">
              <p className="text-sm font-sans uppercase tracking-widest text-primary mb-2">
                {t('principal.title')}
              </p>
              <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8">
                {t('principal.name')}
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

      {/* Legal Identity & Location Section */}
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

      {/* Team Placeholders Section - Grid Layout */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="container px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              {t('sections.team.title')}
            </h2>
            <div className="w-16 h-px bg-accent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="p-6 border border-border/50 rounded-sm bg-background hover:border-accent/50 transition-colors flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-muted mb-4 flex items-center justify-center">
                  <span className="text-2xl font-serif text-muted-foreground">
                    {String.fromCharCode(65 + idx)}
                  </span>
                </div>
                <p className="font-serif text-foreground mb-1">
                  {t('team.cardTitle') || "Membre de l'équipe"}
                </p>
                <p className="text-sm font-sans text-muted-foreground">
                  {t('team.cardRolePlaceholder') || "Rôle"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
