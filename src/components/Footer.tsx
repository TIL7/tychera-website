import { Linkedin, Twitter } from "lucide-react";
import tycheraLogoWhite from "@/assets/tychera-logo-white.svg";

const Footer = () => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary text-primary-foreground py-16 lg:py-20">
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
              Le pont entre capital international et potentiel africain. Structuration sophistiquée, impact durable.
            </p>
            
            {/* Social Links */}
            <div className="mt-6 flex items-center gap-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-primary-foreground/20 rounded-sm text-primary-foreground/70 hover:text-primary-foreground hover:border-primary-foreground/50 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center border border-primary-foreground/20 rounded-sm text-primary-foreground/70 hover:text-primary-foreground hover:border-primary-foreground/50 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2 - Sitemap */}
          <div>
            <h4 className="text-sm font-sans font-medium uppercase tracking-wider mb-4 text-primary-foreground/50">
              Navigation
            </h4>
            <nav className="space-y-3">
              <a 
                href="#expertise"
                onClick={(e) => handleSmoothScroll(e, 'expertise')}
                className="block text-sm font-sans text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                Expertise
              </a>
              <a 
                href="#institution"
                onClick={(e) => handleSmoothScroll(e, 'institution')}
                className="block text-sm font-sans text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                L'Institution
              </a>
              <a 
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, 'contact')}
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
              <div className="pt-2 space-y-2">
                <a href="#" className="block text-sm font-sans text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Mentions légales
                </a>
                <a href="#" className="block text-sm font-sans text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                  Politique de confidentialité
                </a>
              </div>
            </div>
          </div>

          {/* Column 4 - Address */}
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
            <div className="mt-4 pt-4 border-t border-primary-foreground/10">
              <a 
                href="mailto:contact@tycherainvestments.com"
                className="text-sm font-sans text-primary-foreground/80 hover:text-primary-foreground transition-colors"
              >
                contact@tycherainvestments.com
              </a>
              <p className="mt-1">
                <a 
                  href="tel:+250793145440"
                  className="text-sm font-mono text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                >
                  +250 793 145 440
                </a>
              </p>
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
          <p className="text-xs font-sans text-primary-foreground/40">
            Société de droit rwandais, pleinement agréée et conforme aux réglementations locales et internationales.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
