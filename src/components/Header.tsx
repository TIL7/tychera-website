import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import tychemLogo from "@/assets/tychera-logo-color.svg";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const Header = () => {
  const [activeLang, setActiveLang] = useState<"EN" | "FR">("FR");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { href: "#expertise", id: "expertise", label: "Expertise" },
    { href: "#institution", id: "institution", label: "L'Institution" },
    { href: "#contact", id: "contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-24 glass-header">
      <div className="container h-full flex items-center justify-between">
        {/* Logo - h-16 (64px) */}
        <a href="/" className="flex items-center gap-3">
          <img 
            src={tychemLogo} 
            alt="TYCHERA Investments" 
            className="h-16 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.id}
              href={link.href} 
              onClick={(e) => handleSmoothScroll(e, link.id)}
              className="text-sm font-sans text-foreground/80 hover:text-primary transition-colors relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side: Language Toggle + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Language Toggle */}
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

          {/* Mobile Hamburger Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <button 
                className="p-2 text-foreground hover:text-primary transition-colors"
                aria-label="Ouvrir le menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background border-l border-border">
              <SheetTitle className="sr-only">Menu de navigation</SheetTitle>
              <div className="flex flex-col h-full pt-8">
                {/* Mobile Logo */}
                <div className="px-2 mb-8">
                  <img 
                    src={tychemLogo} 
                    alt="TYCHERA Investments" 
                    className="h-12 w-auto"
                  />
                </div>

                {/* Mobile Nav Links */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => handleSmoothScroll(e, link.id)}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.4 }}
                      className="px-4 py-4 text-lg font-serif text-foreground hover:text-primary hover:bg-muted/50 transition-all border-b border-border/50"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                </nav>

                {/* Mobile Language Toggle */}
                <div className="mt-auto pb-8 px-4">
                  <div className="flex items-center gap-4 text-sm font-sans">
                    <button
                      onClick={() => setActiveLang("FR")}
                      className={`px-3 py-2 rounded-sm transition-all ${
                        activeLang === "FR" 
                          ? "bg-primary text-primary-foreground" 
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      Français
                    </button>
                    <button
                      onClick={() => setActiveLang("EN")}
                      className={`px-3 py-2 rounded-sm transition-all ${
                        activeLang === "EN" 
                          ? "bg-primary text-primary-foreground" 
                          : "text-foreground/70 hover:text-foreground"
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
