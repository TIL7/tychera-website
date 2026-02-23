import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

/**
 * PrincipalVision Component
 * 
 * Server Component displaying the CEO's vision and background.
 * Features institutional narrative about Kamal Alawo Adjayi's expertise
 * in financial engineering, investment structuring, and international finance.
 * 
 * @component Server Component (RSC)
 */

export default function PrincipalVision(): JSX.Element {
  const t = useTranslations('institution.principal');

  return (
    <section id="institution" className="py-24 lg:py-32 bg-muted/30">
      <div className="container px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight text-foreground">
            {t('sectionTitle')}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Portrait */}
          <div className="order-2 lg:order-1">
            <div className="aspect-[3/4] max-w-md mx-auto lg:mx-0 bg-muted rounded-sm overflow-hidden border border-accent/30">
              {/* Professional portrait placeholder */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-primary/5 to-primary/15">
                <div className="text-center px-8">
                  <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-serif text-primary">KA</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-sans">
                    {t('portraitPlaceholder')}
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground font-sans text-center lg:text-left">
              <span className="text-foreground font-medium">{t('name')}</span>, {t('title')}
            </p>
          </div>

          {/* Right - Quote and Narrative */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            {/* Pull Quote */}
            <blockquote className="mb-8 border-l-2 border-accent pl-6">
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground/90 italic font-serif">
                &quot;{t('quote')}&quot;
              </p>
            </blockquote>

            {/* Narrative */}
            <div className="space-y-4">
              <p className="text-muted-foreground font-sans leading-relaxed">
                {t('bio.intro')}
              </p>
              <p className="text-muted-foreground font-sans leading-relaxed">
                <span className="text-primary font-medium">{t('bio.experience').split(',')[0]}</span>, {t('bio.experience').substring(t('bio.experience').indexOf(',') + 2)}
              </p>
              <p className="text-muted-foreground font-sans leading-relaxed">
                {t('bio.value')}
              </p>
            </div>

            <div className="pt-8">
              <Link
                href="/contact"
                className="inline-flex items-center text-sm font-sans text-primary hover:text-primary/80 transition-colors group"
                aria-label={t('cta')}
              >
                {t('cta')}
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
      </div>
    </section>
  );
}
