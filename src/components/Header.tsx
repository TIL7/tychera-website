import { useState } from "react";
import tychemLogo from "@/assets/tychera-logo-color.svg";

const Header = () => {
  const [activeLang, setActiveLang] = useState<"EN" | "FR">("FR");

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 glass-header">
      <div className="container h-full flex items-center justify-between">
        {/* Logo - h-16 (64px) as specified */}
        <a href="/" className="flex items-center gap-3">
          <img 
            src={tychemLogo} 
            alt="TYCHERA Investments" 
            className="h-16 w-auto"
          />
        </a>

        {/* Navigation - French with smooth scroll */}
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#expertise" 
            onClick={(e) => handleSmoothScroll(e, 'expertise')}
            className="text-sm font-sans text-foreground/80 hover:text-primary transition-colors"
          >
            Expertise
          </a>
          <a 
            href="#institution" 
            onClick={(e) => handleSmoothScroll(e, 'institution')}
            className="text-sm font-sans text-foreground/80 hover:text-primary transition-colors"
          >
            L'Institution
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleSmoothScroll(e, 'contact')}
            className="text-sm font-sans text-foreground/80 hover:text-primary transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Language Toggle Only - No Partner Button */}
        <div className="flex items-center">
          <div className="hidden sm:flex items-center gap-1 text-sm font-sans">
            <button
              onClick={() => setActiveLang("FR")}
              className={`px-2 py-1 transition-all ${
                activeLang === "FR" 
                  ? "text-primary font-medium" 
                  : "text-foreground/50 hover:text-foreground/70"
              }`}
            >
              FR
            </button>
            <span className="text-accent">|</span>
            <button
              onClick={() => setActiveLang("EN")}
              className={`px-2 py-1 transition-all ${
                activeLang === "EN" 
                  ? "text-primary font-medium" 
                  : "text-foreground/50 hover:text-foreground/70"
              }`}
            >
              EN
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
