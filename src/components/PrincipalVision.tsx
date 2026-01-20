const PrincipalVision = () => {
  return (
    <section id="vision" className="py-24 lg:py-32 bg-muted/30">
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
                    Portrait
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground font-sans text-center lg:text-left">
              Kamal Alawo Adjayi, Principal.
            </p>
          </div>

          {/* Right - Quote and Narrative */}
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            {/* Pull Quote */}
            <blockquote className="mb-8">
              <p className="pull-quote text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground/90">
                "True development requires a bridge between public vision and private efficiency."
              </p>
            </blockquote>

            {/* Narrative */}
            <div className="space-y-4">
              <p className="text-muted-foreground font-sans leading-relaxed">
                From the corridors of municipal governance to the architecture of international investment, 
                Kamal Alawo Adjayi brings a perspective shaped by both public service and private enterprise.
              </p>
              <p className="text-muted-foreground font-sans leading-relaxed">
                As the former Mayor of Lomé, Togo, he witnessed firsthand the gap between 
                available capital and infrastructure needs. TYCHERA Investments was founded 
                to bridge that divide through rigorous financial structuring and sovereign-grade execution.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalVision;
