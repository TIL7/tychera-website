'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
    const t = useTranslations('notFound');

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
            <h1 className="text-9xl font-serif text-primary/20 leading-none mb-8 select-none">
                404
            </h1>
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-6">
                {t('title')}
            </h2>
            <p className="text-muted-foreground font-sans max-w-md mb-12 text-lg">
                {t('description')}
            </p>

            <Link href="/">
                <Button size="lg" className="group">
                    <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                    {t('backToHome')}
                </Button>
            </Link>
        </div>
    );
}
