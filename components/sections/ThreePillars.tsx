"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { type LucideProps, Landmark, Briefcase, ShieldCheck, Handshake, TrendingUp, Globe, ArrowRight } from "lucide-react";
import { useTranslations } from 'next-intl';
import type { ServiceItem } from "@/lib/sanity/types";

type IconComponent = React.ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>>;

// Supported icon names from Sanity — extend this list as new icons are needed
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

interface ThreePillarsProps {
  mode?: 'teaser' | 'detail';
  services: ServiceItem[];
  locale: string;
}

interface PillarCardProps extends React.ComponentPropsWithoutRef<typeof Link> {
  mode: 'teaser' | 'detail';
  delayMs: number;
  href: string;
  number: string;
  title: string;
  description: string;
  icon: string;
  learnMoreLabel: string;
}

function PillarCard({
  mode,
  delayMs,
  href,
  number,
  title,
  description,
  icon,
  learnMoreLabel,
  ...props
}: PillarCardProps): React.ReactElement {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const teaserDescription = description.length > 120 ? `${description.slice(0, 117)}...` : description;
  const IconComponent = iconMap[icon] ?? DEFAULT_ICON;

  return (
    <Link
      href={href}
      ref={ref}
      className={`group relative p-8 lg:p-10 bg-background border border-border rounded-sm transition-all duration-500 hover:border-primary hover:shadow-lg ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={isVisible ? ({ animationDelay: `${delayMs}ms` } as React.CSSProperties) : undefined}
      {...props}
    >
      {/* Gold accent line on hover - Changed to Primary for One Color rule */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* Number */}
      <span className="text-4xl lg:text-5xl font-serif text-primary/40 mb-6 block">{number}</span>

      {/* Icon */}
      <div className="mb-6 text-primary">
        <IconComponent className="w-8 h-8 text-primary fill-primary/10" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="text-xl lg:text-2xl font-serif mb-4 text-foreground group-hover:text-primary transition-colors">{title}</h3>

      {/* Description */}
      <p className="text-muted-foreground font-sans leading-relaxed text-sm lg:text-base mb-6">
        {mode === 'teaser' ? teaserDescription : description}
      </p>

      {/* Learn More Link */}
      <div
        className={`flex items-center gap-2 text-primary text-sm font-sans transition-opacity duration-300 ${mode === 'teaser' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
      >
        <span>{learnMoreLabel}</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}

export default function ThreePillars({ mode = 'detail', services, locale }: ThreePillarsProps): React.ReactElement {
  const t = useTranslations('pillars');

  return (
    <section id="expertise" className="py-24 lg:py-32 bg-background">
      <div className="container px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight text-foreground">
            {t('sectionTitle')}
          </h2>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const title = service.title[locale as 'fr' | 'en'] ?? service.title.fr;
            const description = service.description[locale as 'fr' | 'en'] ?? service.description.fr;

            return (
              <PillarCard
                key={service._id}
                mode={mode}
                delayMs={index * 200}
                href="/expertise"
                number={service.number}
                title={title}
                description={description}
                icon={service.icon}
                learnMoreLabel={t('learnMore')}
              />
            );
          })}
        </div>

        {/* Divider - Primary Color */}
        <div className="mt-24 flex items-center justify-center animate-fade-in-up tychera-delay-800">
          <div className="h-px w-24 bg-primary/30" />
          <div className="w-2 h-2 bg-primary mx-4 rotate-45" />
          <div className="h-px w-24 bg-primary/30" />
        </div>
      </div>
    </section>
  );
}
