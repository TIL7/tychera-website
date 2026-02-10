'use client';

import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/navigation';
import { useSearchParams } from 'next/navigation';

const Header = () => {
  const t = useTranslations('header');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isHomepage = useMemo(() => {
    return pathname === '/' || pathname === '/fr' || pathname === '/en';
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    setMobileOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const navLinks = useMemo(
    () => [
      { key: 'expertise', label: t('nav.expertise') },
      { key: 'institution', label: t('nav.institution') },
      { key: 'contact', label: t('nav.contact') },
    ],
    [t]
  );

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSectionClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    scrollToSection(sectionId);
    setMobileOpen(false);
  };

  const switchLanguage = (newLocale: 'fr' | 'en') => {
    if (newLocale === locale) return;
    
    // With next-intl/navigation, pathname is already stripped of locale
    // We just need to push the same pathname with the new locale
    router.push(pathname, { locale: newLocale });
  };

  const isActive = (href: string) => {
    if (href === '/') return isHomepage;
    
    // Handle locale-specific pathnames
    const cleanPathname = pathname.replace(/^\/(fr|en)/, '');
    const cleanHref = href.replace(/^\//, '');
    
    return cleanPathname === cleanHref;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-[0.22,1,0.36,1] ${isScrolled ? 'glass-header h-20' : 'h-32'
        }`}
    >
      <div className="container h-full flex items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3" aria-label="TYCHERA Investments">
          <Image
            src="/images/tychera-logo-color.svg"
            alt="TYCHERA Investments"
            width={112}
            height={112}
            className={`${isScrolled ? 'h-12' : 'h-28'} w-auto transition-all duration-300 ease-[0.22,1,0.36,1]`}
            style={{ width: 'auto' }}
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            if (link.key === 'institution') {
              return (
                <Link
                  key={link.key}
                  href="/institution"
                  aria-current={isActive('/institution') ? 'page' : undefined}
                  className={`text-sm font-sans transition-colors ${isActive('/institution') ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'
                    }`}
                >
                  {link.label}
                </Link>
              );
            }

            if (link.key === 'expertise') {
              if (isHomepage) {
                return (
                  <a
                    key={link.key}
                    href="#expertise"
                    onClick={(e) => handleSectionClick(e, 'expertise')}
                    className="text-sm font-sans text-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                );
              }
              return (
                <Link
                  key={link.key}
                  href="/expertise"
                  aria-current={isActive('/expertise') ? 'page' : undefined}
                  className={`text-sm font-sans transition-colors ${isActive('/expertise') ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'
                    }`}
                >
                  {link.label}
                </Link>
              );
            }

            // contact - always navigate to contact page
            return (
              <Link
                key={link.key}
                href="/contact"
                aria-current={isActive('/contact') ? 'page' : undefined}
                className={`text-sm font-sans transition-colors ${isActive('/contact') ? 'text-primary font-medium' : 'text-foreground/80 hover:text-primary'
                  }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Side: Language Toggle (Desktop) + Mobile Menu */}
        <div className="flex items-center gap-4">
          {/* Language Toggle - Desktop Only */}
          <div className="hidden md:flex items-center gap-1 text-sm font-sans">
            <button
              onClick={() => switchLanguage('fr')}
              className={`px-2 py-1 transition-all ${locale === 'fr'
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
              className={`px-2 py-1 transition-all ${locale === 'en'
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
                aria-expanded={mobileOpen}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">{t('mobile.openMenu')}</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-screen bg-background border-l border-border/50 p-0"
            >
              <div className="flex flex-col h-full pt-12 px-6">
                {/* Mobile Nav Links */}
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    if (link.key === 'institution') {
                      return (
                        <Link
                          key={link.key}
                          href="/institution"
                          onClick={() => setMobileOpen(false)}
                          aria-current={isActive('/institution') ? 'page' : undefined}
                          className={`text-2xl font-serif transition-colors py-4 border-b border-border/30 ${isActive('/institution') ? 'text-primary' : 'text-foreground hover:text-primary'
                            }`}
                        >
                          {link.label}
                        </Link>
                      );
                    }

                    if (link.key === 'expertise') {
                      if (isHomepage) {
                        return (
                          <a
                            key={link.key}
                            href="#expertise"
                            onClick={(e) => handleSectionClick(e, 'expertise')}
                            className="text-2xl font-serif text-foreground hover:text-primary transition-colors py-4 border-b border-border/30"
                          >
                            {link.label}
                          </a>
                        );
                      }
                      return (
                        <Link
                          key={link.key}
                          href="/expertise"
                          onClick={() => setMobileOpen(false)}
                          aria-current={isActive('/expertise') ? 'page' : undefined}
                          className={`text-2xl font-serif transition-colors py-4 border-b border-border/30 ${isActive('/expertise') ? 'text-primary' : 'text-foreground hover:text-primary'
                            }`}
                        >
                          {link.label}
                        </Link>
                      );
                    }

                    // contact - always navigate to contact page
                    return (
                      <Link
                        key={link.key}
                        href="/contact"
                        onClick={() => setMobileOpen(false)}
                        aria-current={isActive('/contact') ? 'page' : undefined}
                        className={`text-2xl font-serif transition-colors py-4 border-b border-border/30 ${isActive('/contact') ? 'text-primary' : 'text-foreground hover:text-primary'
                          }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile Language Toggle */}
                <div className="mt-8 flex items-center gap-2 text-sm font-sans">
                  <button
                    onClick={() => switchLanguage('fr')}
                    className={`px-3 py-2 rounded-sm transition-all ${locale === 'fr'
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground/50 hover:text-foreground/70'
                      }`}
                    aria-label={t('languageToggle.ariaFrench')}
                  >
                    {t('languageToggle.french')}
                  </button>
                  <button
                    onClick={() => switchLanguage('en')}
                    className={`px-3 py-2 rounded-sm transition-all ${locale === 'en'
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
