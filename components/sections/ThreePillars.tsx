import Link from "next/link";
import { Scale, Construction, TrendingUp, Handshake, ArrowRight } from "lucide-react";

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, any> = {
  Scale,
  Construction,
  TrendingUp,
  Handshake,
};

// Static data - matches approved sitemap exactly
const pillars = [
  {
    _id: "1",
    number: "01",
    title: "Ingénierie Financière",
    description: "Structuration sophistiquée de véhicules d'investissement adaptés aux spécificités des marchés africains.",
    icon: "Scale",
    order: 1,
  },
  {
    _id: "2",
    number: "02",
    title: "Financement de Projets",
    description: "Accompagnement stratégique de bout en bout pour les projets d'infrastructure et d'énergie renouvelable.",
    icon: "Construction",
    order: 2,
  },
  {
    _id: "3",
    number: "03",
    title: "Gestion de Fonds",
    description: "Gestion active de portefeuilles institutionnels selon une approche ESG rigoureuse et performante.",
    icon: "TrendingUp",
    order: 3,
  },
  {
    _id: "4",
    number: "04",
    title: "Structuration de Deals",
    description: "Conception et montage de transactions complexes réunissant acteurs publics et investisseurs privés.",
    icon: "Handshake",
    order: 4,
  },
];

/**
 * ThreePillars Server Component
 * 
 * Displays TYCHERA's four service pillars with CSS-based animations.
 * Uses static French content (default language).
 * 
 * @requirements 1.2, 2.1
 */
export default function ThreePillars() {

  return (
    <section id="expertise" className="py-24 lg:py-32 bg-background">
      <div className="container px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 animate-fade-in-up">
          <p className="text-sm font-sans uppercase tracking-widest text-primary mb-4">
            Nos Piliers d'Excellence
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight text-foreground">
            Excellence financière au service du développement durable
          </h2>
        </div>

        {/* Service Cards Grid - All Identical Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => {
            const IconComponent = iconMap[pillar.icon] || Scale;
            
            return (
              <Link
                key={pillar._id}
                href="/fr/expertise"
                className="group relative p-8 lg:p-10 bg-background border border-border/50 rounded-sm transition-all duration-500 hover:border-accent hover:shadow-lg animate-fade-in-up"
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                {/* Gold accent line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                
                {/* Number */}
                <span className="text-4xl lg:text-5xl font-serif text-accent/80 mb-6 block">
                  {pillar.number}
                </span>
                
                {/* Icon - All Primary Blue */}
                <div className="mb-6 text-primary">
                  <IconComponent className="w-8 h-8" strokeWidth={1.5} />
                </div>
                
                {/* Title - All Primary Blue */}
                <h3 className="text-xl lg:text-2xl font-serif mb-4 text-primary">
                  {pillar.title}
                </h3>
                
                {/* Description */}
                <p className="text-muted-foreground font-sans leading-relaxed text-sm lg:text-base mb-6">
                  {pillar.description}
                </p>

                {/* Learn More Link - Visible on hover */}
                <div className="flex items-center gap-2 text-primary text-sm font-sans opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>En savoir plus</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Gold Divider */}
        <div className="mt-24 flex items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="h-px w-24 bg-accent" />
          <div className="w-2 h-2 bg-accent mx-4 rotate-45" />
          <div className="h-px w-24 bg-accent" />
        </div>
      </div>
    </section>
  );
}
