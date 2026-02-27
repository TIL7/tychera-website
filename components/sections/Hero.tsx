import Image from "next/image";
import { useTranslations } from 'next-intl';

/**
 * Hero Section - Server Component
 * 
 * Displays the main hero section with title, subtitle, and CTA.
 * Uses Next.js Image component for optimized image loading.
 * Smooth scrolling is handled by the browser via anchor links.
 */
const Hero = () => {
  const t = useTranslations('hero');
  
  return (
    <section className="min-h-screen pt-24 lg:pt-32 flex flex-col lg:flex-row">
      {/* Left - Typography (40%) */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center px-6 lg:px-16 py-16 lg:py-0 order-2 lg:order-1">
        <div className="max-w-lg">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight animate-text-reveal text-primary">
            {t('title')}
          </h1>
          
          <p className="mt-8 text-lg text-muted-foreground font-sans leading-relaxed animate-text-reveal-delay-1">
            {t('subtitle')}
          </p>
          
          <div className="mt-10 animate-text-reveal-delay-2">
            <a 
              href="#expertise"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-sans text-sm font-medium rounded-sm hover:bg-primary/90 transition-colors"
            >
              {t('cta')}
            </a>
          </div>
        </div>
      </div>

      {/* Right - Image (60%) */}
      <div className="w-full lg:w-[60%] h-[40vh] lg:h-auto relative overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 animate-slow-zoom">
          <Image
            src="/images/hero-infrastructure.webp"
            alt={t('imageAlt')}
            fill
            priority
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            sizes="(max-width: 1024px) 100vw, 60vw"
          />
        </div>
        {/* Subtle gradient overlay for mobile text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:bg-gradient-to-r lg:from-background/20 lg:to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default Hero;
