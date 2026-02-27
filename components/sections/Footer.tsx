import Image from "next/image";
import { getTranslations } from 'next-intl/server';
import { Linkedin } from 'lucide-react';
import { getSiteSettings } from '@/lib/sanity/getSiteSettings';
import type { SVGProps } from 'react';

const XIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const Footer = async () => {
  const t = await getTranslations('footer');
  const siteSettings = await getSiteSettings();
  const hasSiteSettings = Boolean(siteSettings);
  const currentYear = new Date().getFullYear();
  const localizedCopyright = siteSettings?.copyrightText || t('copyright');
  const copyrightText = /\b\d{4}\b/.test(localizedCopyright)
    ? localizedCopyright.replace(/\b\d{4}\b/, String(currentYear))
    : localizedCopyright;
  const email = siteSettings?.email || 'contact@tycherainvest.com';
  const phone = siteSettings?.phone || '+250 722 138 799';
  const phoneHref = phone.replace(/\s+/g, '');
  const linkedinUrl = siteSettings?.socials?.linkedin || 'https://www.linkedin.com';
  const xUrl = siteSettings?.socials?.x || 'https://x.com';
  // Use the new local logo file explicitly as requested
  const logoUrl = '/images/tychera-logo-black-final.svg';
  const addressLine1 = hasSiteSettings ? siteSettings?.address?.line1 : t('address.company');
  const addressLine2 = hasSiteSettings ? siteSettings?.address?.line2 : t('address.building');
  const addressLine3 = hasSiteSettings ? siteSettings?.address?.line3 : t('address.city');
  const legalText = siteSettings?.legalText;

  return (
    <footer className="bg-primary text-primary-foreground py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start lg:items-start">
          <div className="lg:col-span-4 flex flex-col items-start text-left">
            <div className="flex justify-start text-primary-foreground mt-1">
              <Image
                src={logoUrl}
                alt="TYCHERA Investments"
                width={842}
                height={355}
                className="h-[36px] sm:h-[44px] lg:h-[53px] w-auto max-w-[132px] sm:max-w-[154px] lg:max-w-[176px]"
                style={{ filter: 'brightness(0) invert(1)' }}
                priority
              />
            </div>
            <p className="mt-6 text-primary-foreground/60 text-sm sm:text-base font-sans leading-relaxed max-w-sm lg:max-w-md">
              {t('tagline')}
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start text-left pl-0 lg:pl-12">
            <h4 className="text-xs font-sans font-semibold uppercase tracking-wide mb-4 text-primary-foreground/90">
              {t('headquarters')}
            </h4>
            <address className="not-italic space-y-1.5 flex flex-col items-start">
              {addressLine1 && (
                <p className="text-sm font-sans text-primary-foreground font-medium">
                  {addressLine1}
                </p>
              )}
              {addressLine2 && (
                <p className="text-sm font-sans text-primary-foreground/90">
                  {addressLine2}
                </p>
              )}
              {addressLine3 && (
                <p className="text-sm font-sans text-primary-foreground/90">
                  {addressLine3}
                </p>
              )}
            </address>
          </div>

          <div className="lg:col-span-4 flex flex-col items-start text-left pl-0 lg:pl-12">
            <h4 className="text-xs font-sans font-semibold uppercase tracking-wide mb-4 text-primary-foreground/90">
              {t('contact')}
            </h4>
            <div className="space-y-2 flex flex-col items-start">
              <a
                href={`mailto:${email}`}
                className="block text-sm font-sans text-primary-foreground/90 break-words hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                aria-label={t('ariaEmail')}
              >
                {email}
              </a>
              <a
                href={`tel:${phoneHref}`}
                className="block text-sm font-sans text-primary-foreground/90 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                aria-label={t('ariaPhone')}
              >
                {phone}
              </a>
            </div>

            <div className="flex gap-4 mt-4 justify-start">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={xUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
                aria-label="X (formerly Twitter)"
              >
                <XIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px bg-primary-foreground/20" />

        {legalText && (
          <div className="mb-6">
            <p className="text-sm font-sans text-primary-foreground/70 text-center">{legalText}</p>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="flex justify-center">
          <p className="text-sm font-sans text-primary-foreground/60 text-center">
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
