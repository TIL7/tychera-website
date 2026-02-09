import { getTranslations } from 'next-intl/server';
import ContactSection from "@/components/sections/ContactSection";

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export default async function ContactPage(props: ContactPageProps) {
  await props.params;
  const t = await getTranslations('contactPage');

  return (
    <div className="min-h-screen pt-24 md:pt-32 pb-24 bg-background">
      <div className="container px-6 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-sm font-sans uppercase tracking-widest text-primary mb-4">{t('hero.label')}</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground mb-4">
            {t('hero.title')}
          </h1>
          <p className="text-lg text-muted-foreground font-sans max-w-2xl mx-auto">
            {t('hero.subtitle')}
          </p>
        </div>

        <div className="bg-white border border-accent/20 shadow-sm p-8 md:p-12 rounded-sm">
          <ContactSection />
        </div>
      </div>
    </div>
  );
}
