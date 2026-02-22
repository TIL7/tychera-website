'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail } from 'lucide-react';

export default function NotFound() {
  const t = useTranslations('notFound');

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
      {/* Brand mark */}
      <p className="font-serif text-primary/40 text-sm tracking-widest uppercase mb-6 select-none">
        TYCHERA
      </p>

      {/* 404 number with gold underline */}
      <h1 className="text-9xl font-serif text-primary/20 leading-none mb-2 select-none border-b-2 border-[#E9C46A] pb-4">
        404
      </h1>

      {/* Gold divider */}
      <div className="w-16 h-px bg-[#E9C46A] my-6" />

      <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
        {t('title')}
      </h2>
      <p className="text-muted-foreground font-sans max-w-md mb-12 text-lg">
        {t('description')}
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/">
          <Button size="lg" className="group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t('backToHome')}
          </Button>
        </Link>
        <Link href="/contact">
          <Button size="lg" variant="outline" className="group">
            <Mail className="mr-2 h-4 w-4" />
            {t('contactCta')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
