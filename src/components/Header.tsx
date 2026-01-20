import { useState } from "react";
import { Button } from "@/components/ui/button";
import tychemLogo from "@/assets/tychera-logo-color.svg";

const Header = () => {
  const [activeLang, setActiveLang] = useState<"EN" | "FR">("EN");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 glass-header">
      <div className="container h-full flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img 
            src={tychemLogo} 
            alt="TYCHERA Investments" 
            className="h-10 w-auto"
          />
        </a>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a 
            href="#expertise" 
            className="text-sm font-sans text-foreground/80 hover:text-foreground transition-colors"
          >
            Expertise
          </a>
          <a 
            href="#vision" 
            className="text-sm font-sans text-foreground/80 hover:text-foreground transition-colors"
          >
            Vision
          </a>
          <a 
            href="#contact" 
            className="text-sm font-sans text-foreground/80 hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          {/* Language Toggle */}
          <div className="hidden sm:flex items-center gap-1 text-sm font-sans">
            <button
              onClick={() => setActiveLang("FR")}
              className={`transition-opacity ${
                activeLang === "FR" ? "opacity-100" : "opacity-50 hover:opacity-70"
              }`}
            >
              FR
            </button>
            <span className="text-foreground/30">|</span>
            <button
              onClick={() => setActiveLang("EN")}
              className={`transition-opacity ${
                activeLang === "EN" ? "opacity-100" : "opacity-50 hover:opacity-70"
              }`}
            >
              EN
            </button>
          </div>

          {/* Partner Access */}
          <Button variant="bordered" size="sm">
            Partner Access
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
