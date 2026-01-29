import tycheraLogoWhite from "@/assets/tychera-logo-white.svg";

const Footer = () => {
  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-16 lg:py-20">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1 - Brand */}
          <div>
            <img 
              src={tycheraLogoWhite} 
              alt="TYCHERA Investments" 
              className="h-14 w-auto mb-4"
            />
            <p className="text-primary-foreground/70 text-sm font-sans leading-relaxed">
              Pont entre le capital mondial et le potentiel local à travers une structuration financière de niveau souverain.
            </p>
          </div>

          {/* Column 2 - Sitemap */}
          <div>
            <h4 className="text-sm font-sans font-medium uppercase tracking-wider mb-4 text-primary-foreground/50">
              Navigation
            </h4>
            <nav className="space-y-3">
              <a 
                href="#expertise" 
                className="block text-sm font-sans text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Expertise
              </a>
              <a 
                href="#institution" 
                className="block text-sm font-sans text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                L'Institution
              </a>
              <a 
                href="#contact" 
                className="block text-sm font-sans text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Column 3 - Legal & Regulatory */}
          <div>
            <h4 className="text-sm font-sans font-medium uppercase tracking-wider mb-4 text-primary-foreground/50">
              Légal & Réglementaire
            </h4>
            <div className="space-y-3">
              <p className="text-sm font-sans text-primary-foreground/80">
                Rwanda Development Board
              </p>
              <p className="text-sm text-primary-foreground/80">
                <span className="text-primary-foreground/50">TIN: </span>
                <span className="font-mono">153223953</span>
              </p>
            </div>
          </div>

          {/* Column 4 - Address */}
          <div>
            <h4 className="text-sm font-sans font-medium uppercase tracking-wider mb-4 text-primary-foreground/50">
              Siège Social
            </h4>
            <address className="not-italic space-y-1">
              <p className="text-sm font-sans text-primary-foreground/80">
                Immeuble OHANA
              </p>
              <p className="text-sm font-sans text-primary-foreground/80">
                Nyarutarama
              </p>
              <p className="text-sm font-sans text-primary-foreground/80">
                Kigali, Rwanda
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-primary-foreground/10">
          <p className="text-sm font-sans text-primary-foreground/50 text-center lg:text-left">
            © 2026 TYCHERA Investments LTD. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
