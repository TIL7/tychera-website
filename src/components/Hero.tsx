import { motion } from "framer-motion";
import heroImage from "@/assets/hero-infrastructure.jpg";

const Hero = () => {
  const scrollToExpertise = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('expertise')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen pt-28 flex flex-col lg:flex-row">
      {/* Left - Typography (40%) */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center px-6 md:px-8 lg:px-16 py-16 lg:py-0 order-2 lg:order-1">
        <div className="max-w-lg">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight text-primary"
          >
            Architecte du Financement des Projets en Afrique
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            className="mt-8 text-lg text-muted-foreground font-sans leading-relaxed"
          >
            Le pont entre capital international et potentiel africain. Structuration sophistiquée, impact durable.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            className="mt-10"
          >
            <a 
              href="#expertise"
              onClick={scrollToExpertise}
              className="inline-flex items-center justify-center px-8 py-4 bg-primary text-primary-foreground font-sans text-sm font-medium rounded-sm hover:bg-primary/90 transition-colors"
            >
              Découvrir nos services
            </a>
          </motion.div>
        </div>
      </div>

      {/* Right - Image (60%) */}
      <div className="w-full lg:w-[60%] h-[40vh] lg:h-auto relative overflow-hidden order-1 lg:order-2">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="Infrastructure moderne en Afrique"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </motion.div>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:bg-gradient-to-r lg:from-background/20 lg:to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default Hero;
