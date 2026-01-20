import { ArrowRight } from "lucide-react";

interface Pillar {
  number: string;
  title: string;
  description: string;
}

const pillars: Pillar[] = [
  {
    number: "01",
    title: "Financial Engineering",
    description: "Structuring complex capital solutions for public and private stakeholders.",
  },
  {
    number: "02",
    title: "Project Finance",
    description: "End-to-end funding strategies for infrastructure.",
  },
  {
    number: "03",
    title: "Investment Fund Management",
    description: "Secure, compliant, and strategic asset growth.",
  },
];

const ThreePillars = () => {
  return (
    <section id="expertise" className="py-24 lg:py-32">
      <div className="container">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-serif">Our Expertise</h2>
        </div>

        {/* Horizontal Accordion */}
        <div className="border-t border-border">
          {pillars.map((pillar) => (
            <div key={pillar.number} className="pillar-row group cursor-pointer">
              <div className="py-8 px-4 lg:px-8">
                {/* Row Content */}
                <div className="flex items-start justify-between gap-8">
                  <div className="flex items-start gap-8 lg:gap-16">
                    {/* Number */}
                    <span className="text-2xl font-serif text-accent">
                      {pillar.number}
                    </span>
                    
                    {/* Title */}
                    <div className="flex-1">
                      <h3 className="text-xl lg:text-2xl font-serif">
                        {pillar.title}
                      </h3>
                      
                      {/* Expandable Description */}
                      <div className="pillar-content mt-4">
                        <p className="text-muted-foreground font-sans max-w-xl">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="w-5 h-5 text-foreground/60" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreePillars;
