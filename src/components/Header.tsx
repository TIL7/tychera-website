import { useState } from "react";
import tychemLogo from "@/assets/tychera-logo-color.svg";

const Header = () => {
  const [activeLang, setActiveLang] = useState<"EN" | "FR">("FR");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 glass-header">
      <div className="container h-full flex items-center justify-between">
        {/* Logo - Larger for V2 */}
        <a href="/" className="flex items-center gap-3">
          <img 
            src={tychemLogo} 
            alt="TYCHERA Investments" 
            className="h-16 w-auto"
          />
        </a>

        {/* Navigation - French */}
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#expertise" 
            className="text-sm font-sans text-foreground/80 hover:text-foreground transition-colors"
          >
            Expertise
          </a>
          <a 
            href="#institution" 
            className="text-sm font-sans text-foreground/80 hover:text-foreground transition-colors"
          >
            L'Institution
          </a>
          <a 
            href="#contact" 
            className="text-sm font-sans text-foreground/80 hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Language Toggle Only - No Partner Button */}
        <div className="flex items-center">
          <div className="hidden sm:flex items-center gap-1 text-sm font-sans">
            <button
              onClick={() => setActiveLang("FR")}
              className={`transition-opacity ${
                activeLang === "FR" ? "opacity-100 font-medium" : "opacity-50 hover:opacity-70"
              }`}
            >
              FR
            </button>
            <span className="text-foreground/30">|</span>
            <button
              onClick={() => setActiveLang("EN")}
              className={`transition-opacity ${
                activeLang === "EN" ? "opacity-100 font-medium" : "opacity-50 hover:opacity-70"
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
