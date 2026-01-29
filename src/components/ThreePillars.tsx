import { Calculator, Landmark, TrendingUp } from "lucide-react";

interface Pillar {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const pillars: Pillar[] = [
  {
    number: "01",
    title: "Ingénierie Financière",
    description: "Structuration de solutions de capital complexes pour les parties prenantes publiques et privées.",
    icon: Calculator,
  },
  {
    number: "02",
    title: "Financement de Projets",
    description: "Stratégies de financement de bout en bout pour les infrastructures.",
    icon: Landmark,
  },
  {
    number: "03",
    title: "Gestion de Fonds",
    description: "Croissance stratégique des actifs, sécurisée et conforme.",
    icon: TrendingUp,
  },
];

const ThreePillars = () => {
  return (
    <section id="expertise" className="py-24 lg:py-32">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif">Notre Expertise</h2>
        </div>

        {/* Swiss Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <div 
              key={pillar.number} 
              className="group relative bg-card border border-border rounded-sm p-8 lg:p-10 transition-all duration-300 hover:border-accent hover:shadow-lg cursor-pointer"
            >
              {/* Number */}
              <span className="text-5xl font-serif text-accent/60 group-hover:text-accent transition-colors">
                {pillar.number}
              </span>
              
              {/* Icon */}
              <div className="mt-6 mb-4">
                <pillar.icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
              </div>
              
              {/* Title */}
              <h3 className="text-xl lg:text-2xl font-serif mb-4">
                {pillar.title}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground font-sans text-sm leading-relaxed">
                {pillar.description}
              </p>

              {/* Gold border accent on hover */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-b-sm" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreePillars;
