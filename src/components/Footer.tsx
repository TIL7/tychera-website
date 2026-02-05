import tycheraLogoWhite from "@/assets/tychera-logo-white.svg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16 lg:py-20">
      <div className="container px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Column 1 - Brand */}
          <div>
            <img 
              src={tycheraLogoWhite} 
              alt="TYCHERA Investments" 
              className="h-14 w-auto mb-4"
            />
            <p className="text-primary-foreground/70 text-sm font-sans leading-relaxed">
              Le pont entre capital international et potentiel africain. Structuration sophistiquée, impact durable.
            </p>
          </div>

          {/* Column 2 - Address */}
          <div>
            <h4 className="text-sm font-sans font-medium uppercase tracking-wider mb-4 text-primary-foreground/50">
              Siège Social
            </h4>
            <address className="not-italic space-y-1">
              <p className="text-sm font-sans text-primary-foreground/80 font-medium">
                TYCHERA INVESTMENTS LTD
              </p>
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

          {/* Column 3 - Contact */}
          <div>
            <h4 className="text-sm font-sans font-medium uppercase tracking-wider mb-4 text-primary-foreground/50">
              Contact
            </h4>
            <div className="space-y-2">
              <a 
                href="mailto:contact@tycherainvestments.com"
                className="block text-sm font-sans text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                contact@tycherainvestments.com
              </a>
              <a 
                href="tel:+250793145440"
                className="block text-sm font-mono text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                +250 793 145 440
              </a>
            </div>
          </div>
        </div>

        {/* Gold Divider */}
        <div className="my-12 h-px bg-accent/30" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-sans text-primary-foreground/50">
            © 2026 TYCHERA INVESTMENTS LTD. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
