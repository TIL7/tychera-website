import { motion } from "framer-motion";
import { TrendingUp, Building2, PieChart, Handshake } from "lucide-react";

const pillars = [
  {
    number: "01",
    title: "Ingénierie Financière",
    description: "Structuration sophistiquée de véhicules d'investissement adaptés aux spécificités des marchés africains. Nous concevons des solutions sur mesure incluant obligations vertes, financement structuré et instruments innovants répondant aux besoins de nos clients institutionnels.",
    icon: TrendingUp,
    isGreen: false,
  },
  {
    number: "02",
    title: "Financement de Projets",
    description: "Accompagnement stratégique de bout en bout pour les projets d'infrastructure et d'énergie renouvelable. De la phase de conception initiale jusqu'à la clôture financière, nous assurons la viabilité et l'attractivité de chaque projet auprès des investisseurs internationaux.",
    icon: Building2,
    isGreen: true,
  },
  {
    number: "03",
    title: "Gestion de Fonds",
    description: "Gestion active de portefeuilles institutionnels selon une approche ESG rigoureuse. Notre expertise combine performance financière mesurable et impact social et environnemental positif, créant une valeur durable pour nos investisseurs.",
    icon: PieChart,
    isGreen: false,
  },
  {
    number: "04",
    title: "Structuration de Deals",
    description: "Conception et montage de transactions complexes réunissant acteurs publics et investisseurs privés. Nous optimisons les structures de risque-rendement et élaborons des cadres contractuels robustes pour garantir des opérations bancables, conformes et durables.",
    icon: Handshake,
    isGreen: false,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: "easeOut" as const,
    },
  }),
};

const ThreePillars = () => {
  return (
    <section id="expertise" className="py-24 lg:py-32 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-sm font-sans uppercase tracking-widest text-primary mb-4"
          >
            Nos Piliers d'Excellence
          </motion.p>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight text-foreground"
          >
            Excellence financière au service du{" "}
            <span className="text-secondary">développement durable</span>
          </motion.h2>
        </div>

        {/* Bento Grid - Standardized Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={cardVariants}
              className="group relative p-8 lg:p-10 bg-card border border-border/50 rounded-sm shadow-sm transition-all duration-500 hover:shadow-md hover:border-accent"
            >
              {/* Gold accent line on hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              
              {/* Number */}
              <span className="text-4xl lg:text-5xl font-serif text-accent/80 mb-6 block">
                {pillar.number}
              </span>
              
              {/* Icon */}
              <div className={`mb-6 ${pillar.isGreen ? 'text-secondary' : 'text-primary'}`}>
                <pillar.icon className="w-8 h-8" strokeWidth={1.5} />
              </div>
              
              {/* Title */}
              <h3 className={`text-xl lg:text-2xl font-serif mb-4 ${
                pillar.isGreen ? 'text-secondary' : 'text-foreground'
              }`}>
                {pillar.title}
              </h3>
              
              {/* Description */}
              <p className="text-muted-foreground font-sans leading-relaxed text-sm lg:text-base">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Gold Divider */}
        <div className="mt-24 flex items-center justify-center">
          <div className="h-px w-24 bg-accent" />
          <div className="w-2 h-2 bg-accent mx-4 rotate-45" />
          <div className="h-px w-24 bg-accent" />
        </div>
      </div>
    </section>
  );
};

export default ThreePillars;
