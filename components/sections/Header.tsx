'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Expertise', id: 'expertise' },
  { label: "L'Institution", id: 'institution' },
  { label: 'Contact', id: 'contact' },
];

const Header = () => {
  const [activeLang, setActiveLang] = useState<'EN' | 'FR'>('FR');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-32 glass-header">
      <div className="container h-full flex items-center justify-between px-6">
        {/* Logo - h-28 (112px) commanding presence */}
        <a href="/" className="flex items-center gap-3">
          <Image
            src="/images/tychera-logo-color.svg"
            alt="TYCHERA Investments"
            width={112}
            height={112}
            className="h-28 w-auto"
            priority
          />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleSmoothScroll(e, link.id)}
              className="text-sm font-sans text-foreground/80 hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleSmoothScroll(e, 'contact')}
            className="px-6 py-2.5 bg-primary text-primary-foreground font-sans text-sm font-medium rounded-sm hover:bg-primary/90 transition-colors"
          >
            Investir avec nous
          </a>
        </nav>

        {/* Right Side: Language Toggle (Desktop) + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Language Toggle - Desktop Only */}
          <div className="hidden md:flex items-center gap-1 text-sm font-sans">
            <button
              onClick={() => setActiveLang('FR')}
              className={`px-2 py-1 transition-all ${
                activeLang === 'FR'
                  ? 'text-primary font-medium'
                  : 'text-foreground/50 hover:text-foreground/70'
              }`}
              aria-label="Changer la langue en français"
            >
              FR
            </button>
            <span className="text-accent">|</span>
            <button
              onClick={() => setActiveLang('EN')}
              className={`px-2 py-1 transition-all ${
                activeLang === 'EN'
                  ? 'text-primary font-medium'
                  : 'text-foreground/50 hover:text-foreground/70'
              }`}
              aria-label="Change language to English"
            >
              EN
            </button>
          </div>

          {/* Mobile Hamburger Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground"
                aria-label="Ouvrir le menu"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Ouvrir le menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-background border-l border-border/50"
            >
              <div className="flex flex-col h-full pt-12">
                {/* Mobile Nav Links */}
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={(e) => handleSmoothScroll(e, link.id)}
                      className="text-lg font-serif text-foreground hover:text-primary transition-colors py-2 border-b border-border/30"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>

                {/* Mobile Language Toggle */}
                <div className="mt-8 flex items-center gap-2 text-sm font-sans">
                  <button
                    onClick={() => setActiveLang('FR')}
                    className={`px-3 py-2 rounded-sm transition-all ${
                      activeLang === 'FR'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground/50 hover:text-foreground/70'
                    }`}
                    aria-label="Changer la langue en français"
                  >
                    Français
                  </button>
                  <button
                    onClick={() => setActiveLang('EN')}
                    className={`px-3 py-2 rounded-sm transition-all ${
                      activeLang === 'EN'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground/50 hover:text-foreground/70'
                    }`}
                    aria-label="Change language to English"
                  >
                    English
                  </button>
                </div>

                {/* Trust Indicator */}
                <div className="mt-auto pb-8">
                  <p className="text-xs text-muted-foreground font-sans">
                    TYCHERA INVESTMENTS LTD
                    <br />
                    Immeuble OHANA, Kigali
                  </p>
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
