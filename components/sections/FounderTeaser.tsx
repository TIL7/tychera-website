import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export default async function FounderTeaser(): Promise<JSX.Element> {
  const t = await getTranslations('homepage.teaser');

  return (
    <section className="py-24 lg:py-32 bg-muted/30 border-t border-border/50">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto">
          {/* Quote */}
          <blockquote className="mb-8">
            <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground/90 font-serif italic">
              &ldquo;{t('quote')}&rdquo;
            </p>
          </blockquote>

          {/* Context */}
          <p className="text-muted-foreground font-sans leading-relaxed mb-8 max-w-2xl">
            {t('context')}
          </p>

          {/* CTA Link */}
          <Link
            href="/institution"
            className="inline-flex items-center text-sm font-sans text-primary hover:text-primary/80 transition-colors group"
            aria-label={t('ariaLabel')}
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

          {/* Attribution */}
          <div className="mt-12 pt-6 border-t border-border/30">
            <p className="text-sm font-sans text-muted-foreground">
              <span className="text-foreground font-medium">{t('attribution.name')}</span>
              {' — '}
              {t('attribution.title')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
