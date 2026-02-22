"use client";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";
import { Landmark, Briefcase, ShieldCheck, Handshake, ArrowRight } from "lucide-react";
import { useTranslations } from 'next-intl';

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
  Building2: Landmark, // Replaced Building2 with Landmark
  Construction: Briefcase, // Replaced Construction with Briefcase
  ChartPie: ShieldCheck, // Replaced ChartPie with ShieldCheck
  Handshake,
};

/**
 * ThreePillars Server Component
 * 
 * Displays TYCHERA's four service pillars with CSS-based animations.
 * Uses i18n translations for multi-language support.
 * 
 * @requirements 1.2, 2.1
 */
interface ThreePillarsProps {
  mode?: 'teaser' | 'detail';
}

interface PillarCardProps extends React.ComponentPropsWithoutRef<typeof Link> {
  mode: 'teaser' | 'detail';
  delayMs: number;
  href: string;
  number: string;
  title: string;
  description: string;
  icon: keyof typeof iconMap;
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
}: PillarCardProps) {
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
  const IconComponent = iconMap[icon] || Building2;

  return (
    <Link
      href={href}
      ref={ref}
      className={`group relative p-8 lg:p-10 bg-background border border-border/50 rounded-sm transition-all duration-500 hover:border-accent hover:shadow-lg ${isVisible ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      style={isVisible ? ({ animationDelay: `${delayMs}ms` } as React.CSSProperties) : undefined}
      {...props}
    >
      {/* Gold accent line on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      {/* Number */}
      <span className="text-4xl lg:text-5xl font-serif text-accent/80 mb-6 block">{number}</span>

      {/* Icon */}
      <div className="mb-6 text-[#2283a2]">
        <IconComponent className="w-8 h-8 text-[#2283a2] fill-[#588157]/10" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="text-xl lg:text-2xl font-serif mb-4 text-primary">{title}</h3>

      {/* Description */}
      <p className="text-muted-foreground font-sans leading-relaxed text-sm lg:text-base mb-6">
        {mode === 'teaser' ? teaserDescription : description}
      </p>

      {/* Learn More Link */}
      <div
        className={`flex items-center gap-2 text-primary text-sm font-sans transition-opacity duration-300 ${mode === 'teaser' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
      >
        <span>{learnMoreLabel}</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </Link>
  );
}

export default function ThreePillars({ mode = 'detail' }: ThreePillarsProps) {
  const t = useTranslations('pillars');

  // Static data structure - translations come from i18n
  const pillars = [
    {
      _id: "1",
      number: t('services.financial.number'),
      title: t('services.financial.title'),
      description: t('services.financial.description'),
      icon: "Building2",
      order: 1,
    },
    {
      _id: "2",
      number: t('services.project.number'),
      title: t('services.project.title'),
      description: t('services.project.description'),
      icon: "Construction",
      order: 2,
    },
    {
      _id: "3",
      number: t('services.fund.number'),
      title: t('services.fund.title'),
      description: t('services.fund.description'),
      icon: "ChartPie",
      order: 3,
    },
    {
      _id: "4",
      number: t('services.deal.number'),
      title: t('services.deal.title'),
      description: t('services.deal.description'),
      icon: "Handshake",
      order: 4,
    },
  ];

  return (
    <section id="expertise" className="py-24 lg:py-32 bg-background">
      <div className="container px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight text-foreground">
            {t('sectionTitle')}
          </h2>
        </div>

        {/* Service Cards Grid - All Identical Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <PillarCard
              key={pillar._id}
              mode={mode}
              delayMs={index * 200}
              href="/expertise"
              number={pillar.number}
              title={pillar.title}
              description={pillar.description}
              icon={pillar.icon as keyof typeof iconMap}
              learnMoreLabel={t('learnMore')}
            />
          ))}
        </div>

        {/* Gold Divider */}
        <div className="mt-24 flex items-center justify-center animate-fade-in-up tychera-delay-800">
          <div className="h-px w-24 bg-accent" />
          <div className="w-2 h-2 bg-accent mx-4 rotate-45" />
          <div className="h-px w-24 bg-accent" />
        </div>
      </div>
    </section>
  );
}
