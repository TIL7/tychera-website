import Image from "next/image";
import { useTranslations } from 'next-intl';
import { Linkedin } from 'lucide-react';

const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const Footer = () => {
  const t = useTranslations('footer');

  return (
    <footer className="bg-primary text-primary-foreground py-16 lg:py-20">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-start lg:items-start">
          <div className="lg:col-span-5 flex flex-col items-start text-left">
            <div className="flex justify-start text-primary-foreground -mt-3">
              <Image
                src="/images/tychera-logo-white-new.png"
                alt="TYCHERA Investments"
                width={842}
                height={353}
                className="h-[36px] sm:h-[44px] lg:h-[53px] w-auto max-w-[132px] sm:max-w-[154px] lg:max-w-[176px]"
                style={{ filter: 'brightness(0) invert(1)' }}
                priority
              />
            </div>
            <p className="mt-1.5 text-primary-foreground/60 text-sm sm:text-base font-sans leading-relaxed max-w-sm lg:max-w-md">
              {t('tagline')}
            </p>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-xs font-sans font-semibold uppercase tracking-wide mb-4 text-primary-foreground/90">
              {t('headquarters')}
            </h4>
            <address className="not-italic space-y-1.5">
              <p className="text-sm font-sans text-primary-foreground font-medium">
                {t('address.company')}
              </p>
              <p className="text-sm font-sans text-primary-foreground/90">
                {t('address.building')}
              </p>
              <p className="text-sm font-sans text-primary-foreground/90">
                {t('address.city')}
              </p>
            </address>
          </div>

          <div className="lg:col-span-4">
            <h4 className="text-xs font-sans font-semibold uppercase tracking-wide mb-4 text-primary-foreground/90">
              {t('contact')}
            </h4>
            <div className="space-y-2">
              <a
                href="mailto:contact@tycherainvestments.com"
                className="block text-sm font-sans text-primary-foreground/90 break-words hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                aria-label={t('ariaEmail')}
              >
                contact@tycherainvestments.com
              </a>
              <a
                href="tel:+250722138799"
                className="block text-sm font-mono text-primary-foreground/90 hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                aria-label={t('ariaPhone')}
              >
                +250 722 138 799
              </a>
            </div>

            <div className="flex gap-4 mt-6">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary rounded-sm"
                aria-label="X (formerly Twitter)"
              >
                <XIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Gold Divider */}
        <div className="my-10 h-px bg-accent/50" />

        {/* Bottom Bar */}
        <div className="flex justify-center">
          <p className="text-sm font-sans text-primary-foreground/60 text-center">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
