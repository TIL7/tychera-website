import type { Metadata } from "next";
import { getTranslations } from 'next-intl/server';
import ContactSection from "@/components/sections/ContactSection";
import { getSiteSettings } from '@/lib/sanity/getSiteSettings';
import { generateContactPageMetadata, type Locale } from "@/lib/metadata";

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(props: ContactPageProps): Promise<Metadata> {
  const params = await props.params;
  return generateContactPageMetadata(params.locale as Locale);
}

export default async function ContactPage(props: ContactPageProps) {
  await props.params;
  const t = await getTranslations('contactPage');
  const siteSettings = await getSiteSettings();

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-24 bg-background">
      <div className="container px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-sans uppercase tracking-widest text-primary mb-4">{t('hero.label')}</p>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif text-foreground mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-base text-muted-foreground font-sans max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>

        <div className="bg-white border border-accent/20 shadow-sm p-8 md:p-12 rounded-sm">
          <ContactSection siteSettings={siteSettings} />
        </div>
      </div>
    </div>
  );
}
