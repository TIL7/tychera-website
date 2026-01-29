const PrincipalVision = () => {
  return (
    <section id="institution" className="py-24 lg:py-32 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left - Portrait */}
          <div className="order-2 lg:order-1">
            <div className="aspect-[3/4] max-w-md mx-auto lg:mx-0 bg-muted rounded-sm overflow-hidden">
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
              Kamal Alawo Adjayi, Fondateur & Directeur
            </p>
          </div>

          {/* Right - Quote and Narrative */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            {/* Pull Quote */}
            <blockquote className="mb-8">
              <p className="pull-quote text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground/90">
                "Le véritable développement nécessite un pont entre la vision publique et l'efficacité privée."
              </p>
            </blockquote>

            {/* Narrative */}
            <div className="space-y-4">
              <p className="text-muted-foreground font-sans leading-relaxed">
                Après une carrière distinguée au service public, dont le poste de Maire de Lomé, 
                M. Adjayi a opéré une transition vers l'architecture d'investissement avec une mission claire: 
                canaliser le capital international vers des projets africains à fort impact.
              </p>
              <p className="text-muted-foreground font-sans leading-relaxed">
                TYCHERA Investments représente cette synthèse entre gouvernance publique et 
                excellence financière privée, offrant une expertise souveraine aux institutions 
                et entreprises cherchant à développer le continent.
              </p>
            </div>

            <div className="pt-6">
              <a 
                href="#contact"
                className="inline-flex items-center text-sm font-sans text-primary hover:text-primary/80 transition-colors"
              >
                Prendre contact
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
