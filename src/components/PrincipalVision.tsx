const PrincipalVision = () => {
  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="institution" className="py-24 lg:py-32 bg-muted/30">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-sans uppercase tracking-widest text-primary mb-4">
            L'Institution
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight text-foreground">
            De la Gouvernance Publique à l'Architecture Financière
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Portrait */}
          <div className="order-2 lg:order-1">
            <div className="aspect-[3/4] max-w-md mx-auto lg:mx-0 bg-muted rounded-sm overflow-hidden border border-accent/30">
              {/* Professional portrait placeholder */}
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-primary/5 to-primary/15">
                <div className="text-center px-8">
                  <div className="w-24 h-24 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-serif text-primary">KA</span>
                  </div>
                  <p className="text-sm text-muted-foreground font-sans">
                    Portrait à venir
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground font-sans text-center lg:text-left">
              <span className="text-foreground font-medium">Kamal Alawo Adjayi</span>, CEO & Fondateur
            </p>
          </div>

          {/* Right - Quote and Narrative */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            {/* Pull Quote */}
            <blockquote className="mb-8 border-l-2 border-accent pl-6">
              <p className="pull-quote text-xl md:text-2xl lg:text-3xl leading-relaxed text-foreground/90 italic">
                "La transformation de l'Afrique nécessite des partenariats structurés où l'expertise financière rencontre la compréhension profonde des réalités institutionnelles. Notre mission est de créer ces synergies public-privé qui génèrent un impact tangible."
              </p>
            </blockquote>

            {/* Narrative */}
            <div className="space-y-4">
              <p className="text-muted-foreground font-sans leading-relaxed">
                M. Kamal Alawo Adjayi apporte à TYCHERA INVESTMENTS une expertise unique combinant leadership politique, administration publique de haut niveau et finance internationale.
              </p>
              <p className="text-muted-foreground font-sans leading-relaxed">
                <span className="text-primary font-medium">Ancien Maire de Lomé (Togo)</span>, il a dirigé la transformation urbaine et le développement économique de la capitale togolaise, acquérant une compréhension approfondie des défis institutionnels et des besoins en infrastructure du continent africain.
              </p>
              <p className="text-muted-foreground font-sans leading-relaxed">
                Sa valeur distinctive réside dans sa capacité rare à traduire les besoins publics en actifs financiers structurés et attractifs pour les marchés de capitaux internationaux.
              </p>
            </div>

            <div className="pt-8">
              <a 
                href="#contact"
                onClick={scrollToContact}
                className="inline-flex items-center text-sm font-sans text-primary hover:text-primary/80 transition-colors group"
              >
                Initier une collaboration
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalVision;
