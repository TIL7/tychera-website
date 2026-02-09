'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/navigation';

const Header = () => {
  const t = useTranslations('header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t('nav.expertise'), href: '/expertise', isExternal: true },
    { label: t('nav.institution'), href: '#institution', isExternal: false },
    { label: t('nav.contact'), href: '#contact', isExternal: false },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    isExternal: boolean
  ) => {
    if (isExternal) {
      // Let Next.js handle the navigation
      return;
    }
    
    // Handle smooth scroll for anchor links
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  const switchLanguage = (newLocale: string) => {
    // Get the current pathname without locale prefix
    const currentPath = pathname;
    router.replace(currentPath, { locale: newLocale });
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
          {navLinks.map((link) => {
            if (link.isExternal) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-sans text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              );
            }
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.isExternal)}
                className="text-sm font-sans text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Side: Language Toggle (Desktop) + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Language Toggle - Desktop Only */}
          <div className="hidden md:flex items-center gap-1 text-sm font-sans">
            <button
              onClick={() => switchLanguage('fr')}
              className={`px-2 py-1 transition-all ${
                locale === 'fr'
                  ? 'text-primary font-medium'
                  : 'text-foreground/50 hover:text-foreground/70'
              }`}
              aria-label={t('languageToggle.ariaFrench')}
            >
              FR
            </button>
            <span className="text-accent">|</span>
            <button
              onClick={() => switchLanguage('en')}
              className={`px-2 py-1 transition-all ${
                locale === 'en'
                  ? 'text-primary font-medium'
                  : 'text-foreground/50 hover:text-foreground/70'
              }`}
              aria-label={t('languageToggle.ariaEnglish')}
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
                aria-label={t('mobile.openMenu')}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">{t('mobile.openMenu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-80 bg-background border-l border-border/50"
            >
              <div className="flex flex-col h-full pt-12">
                {/* Mobile Nav Links */}
                <nav className="flex flex-col gap-6">
                  {navLinks.map((link) => {
                    if (link.isExternal) {
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-lg font-serif text-foreground hover:text-primary transition-colors py-2 border-b border-border/30"
                        >
                          {link.label}
                        </Link>
                      );
                    }
                    return (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href, link.isExternal)}
                        className="text-lg font-serif text-foreground hover:text-primary transition-colors py-2 border-b border-border/30"
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </nav>

                {/* Mobile Language Toggle */}
                <div className="mt-8 flex items-center gap-2 text-sm font-sans">
                  <button
                    onClick={() => switchLanguage('fr')}
                    className={`px-3 py-2 rounded-sm transition-all ${
                      locale === 'fr'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground/50 hover:text-foreground/70'
                    }`}
                    aria-label={t('languageToggle.ariaFrench')}
                  >
                    {t('languageToggle.french')}
                  </button>
                  <button
                    onClick={() => switchLanguage('en')}
                    className={`px-3 py-2 rounded-sm transition-all ${
                      locale === 'en'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground/50 hover:text-foreground/70'
                    }`}
                    aria-label={t('languageToggle.ariaEnglish')}
                  >
                    {t('languageToggle.english')}
                  </button>
                </div>

                {/* Trust Indicator */}
                <div className="mt-auto pb-8">
                  <p className="text-xs text-muted-foreground font-sans whitespace-pre-line">
                    {t('mobile.trustIndicator')}
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
