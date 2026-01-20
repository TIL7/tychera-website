import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-infrastructure.jpg";

const Hero = () => {
  return (
    <section className="min-h-screen pt-16 flex flex-col lg:flex-row">
      {/* Left - Typography (40%) */}
      <div className="w-full lg:w-[40%] flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-0 order-2 lg:order-1">
        <div className="max-w-lg">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-tight animate-text-reveal">
            Bridging Global Capital with Local Potential.
          </h1>
          
          <p className="mt-8 text-lg text-muted-foreground font-sans leading-relaxed animate-text-reveal-delay-1">
            Sovereign Structuring & Financial Engineering for the Future of Africa.
          </p>
          
          <div className="mt-10 animate-text-reveal-delay-2">
            <Button variant="institutional" size="lg">
              View Expertise
            </Button>
          </div>
        </div>
      </div>

      {/* Right - Image (60%) */}
      <div className="w-full lg:w-[60%] h-[40vh] lg:h-auto relative overflow-hidden order-1 lg:order-2">
        <div className="absolute inset-0 animate-slow-zoom">
          <img
            src={heroImage}
            alt="Modern infrastructure connecting cities"
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
        {/* Subtle gradient overlay for mobile text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:bg-gradient-to-r lg:from-background/20 lg:to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default Hero;
