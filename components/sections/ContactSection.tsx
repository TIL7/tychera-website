'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, Clock, MapPin, Send, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LocationMap from "@/components/sections/LocationMap";
import { useTranslations, useLocale } from 'next-intl';
import { contactFormSchema, contactFormSchemaEN, type ContactFormData } from '@/lib/validations/contact';
import { submitContactForm } from '@/app/actions/contact';
import { toast } from 'sonner';
import type { SiteSettings } from '@/lib/sanity/types';

interface ContactSectionProps {
  siteSettings?: SiteSettings | null;
}

const ContactSection = ({ siteSettings = null }: ContactSectionProps) => {
  const t = useTranslations('contact');
  const locale = useLocale();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const hasSiteSettings = Boolean(siteSettings);
  const email = siteSettings?.email || 'contact@tycherainvest.com';
  const phone = siteSettings?.phone || '+250 722 138 799';
  const addressLine1 = hasSiteSettings ? siteSettings?.address?.line1 : t('info.address.line1');
  const addressLine2 = hasSiteSettings ? siteSettings?.address?.line2 : t('info.address.line2');
  const addressLine3 = hasSiteSettings ? siteSettings?.address?.line3 : t('info.address.line3');

  const requestTypes = [
    { value: "financement" as const, label: t('form.requestTypes.financement') },
    { value: "investissement" as const, label: t('form.requestTypes.investissement') },
    { value: "conseil" as const, label: t('form.requestTypes.conseil') },
    { value: "gestion" as const, label: t('form.requestTypes.gestion') },
    { value: "autre" as const, label: t('form.requestTypes.autre') },
  ];

  // Use locale-specific schema
  const schema = locale === 'en' ? contactFormSchemaEN : contactFormSchema;

  const form = useForm<ContactFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      organization: "",
      title: "",
      email: "",
      phone: "",
      country: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const result = await submitContactForm(data);

      if (result.success) {
        setIsSubmitted(true);
        form.reset();
        toast.success(result.message);
      } else {
        toast.error(result.message);

        // Set field-specific errors if available
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            form.setError(field as any, {
              type: 'manual',
              message: messages[0],
            });
          });
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(
        locale === 'en'
          ? 'An error occurred while sending your message. Please try again.'
          : 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.'
      );
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background">
      <div className="container px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight text-foreground mb-6">
            {t('sectionTitle')}
          </h2>
          <p className="text-muted-foreground font-sans leading-relaxed">
            {t('sectionDescription')}
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Left - Contact Form (3 cols) */}
          <div className="lg:col-span-3">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 space-y-6">
                <CheckCircle className="w-16 h-16 text-primary" />
                <h3 className="text-2xl font-serif text-foreground">{t('form.successTitle')}</h3>
                <p className="text-muted-foreground font-sans text-center max-w-md">
                  {t('form.successMessage')}
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="mt-4"
                >
                  {t('form.sendAnother')}
                </Button>
              </div>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Row 1: Name + Organization + Title */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-sans font-medium text-foreground">
                      {t('form.name')} <span className="text-primary">{t('form.required')}</span>
                    </label>
                    <Input
                      type="text"
                      placeholder={t('form.namePlaceholder')}
                      {...form.register("name")}
                      className="h-12 bg-muted/30 border-border/50 focus:border-primary rounded-sm font-sans"
                    />
                    {form.formState.errors.name && (
                      <p className="text-xs text-destructive">{form.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-sans font-medium text-foreground">
                      {t('form.organization')} <span className="text-primary">{t('form.required')}</span>
                    </label>
                    <Input
                      type="text"
                      placeholder={t('form.organizationPlaceholder')}
                      {...form.register("organization")}
                      className="h-12 bg-muted/30 border-border/50 focus:border-primary rounded-sm font-sans"
                    />
                    {form.formState.errors.organization && (
                      <p className="text-xs text-destructive">{form.formState.errors.organization.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-sans font-medium text-foreground">
                      {t('form.title')}
                    </label>
                    <Input
                      type="text"
                      placeholder={t('form.titlePlaceholder')}
                      {...form.register("title")}
                      className="h-12 bg-muted/30 border-border/50 focus:border-primary rounded-sm font-sans"
                    />
                  </div>
                </div>

                {/* Row 2: Email + Type of Request */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-sans font-medium text-foreground">
                      {t('form.email')} <span className="text-primary">{t('form.required')}</span>
                    </label>
                    <Input
                      type="email"
                      placeholder={t('form.emailPlaceholder')}
                      {...form.register("email")}
                      className="h-12 bg-muted/30 border-border/50 focus:border-primary rounded-sm font-sans"
                    />
                    {form.formState.errors.email && (
                      <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-sans font-medium text-foreground">
                      {t('form.requestType')} <span className="text-primary">{t('form.required')}</span>
                    </label>
                    <Select
                      value={form.watch("requestType")}
                      onValueChange={(value) => form.setValue("requestType", value as any)}
                    >
                      <SelectTrigger className="h-12 bg-muted/30 border-border/50 focus:border-primary rounded-sm font-sans">
                        <SelectValue placeholder={t('form.requestTypePlaceholder')} />
                      </SelectTrigger>
                      <SelectContent className="bg-background border-border rounded-sm">
                        {requestTypes.map((type) => (
                          <SelectItem
                            key={type.value}
                            value={type.value}
                            className="font-sans focus:bg-primary/10"
                          >
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.requestType && (
                      <p className="text-xs text-destructive">{form.formState.errors.requestType.message}</p>
                    )}
                  </div>
                </div>

                {/* Row 3: Phone + Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-sans font-medium text-foreground">
                      {t('form.phone')}
                    </label>
                    <Input
                      type="tel"
                      placeholder={t('form.phonePlaceholder')}
                      {...form.register("phone")}
                      className="h-12 bg-muted/30 border-border/50 focus:border-primary rounded-sm font-sans"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-sans font-medium text-foreground">
                      {t('form.country')}
                    </label>
                    <Input
                      type="text"
                      placeholder={t('form.countryPlaceholder')}
                      {...form.register("country")}
                      className="h-12 bg-muted/30 border-border/50 focus:border-primary rounded-sm font-sans"
                    />
                  </div>
                </div>

                {/* Row 4: Message */}
                <div className="space-y-2">
                  <label className="text-sm font-sans font-medium text-foreground">
                    {t('form.message')} <span className="text-primary">{t('form.required')}</span>
                  </label>
                  <Textarea
                    placeholder={t('form.messagePlaceholder')}
                    {...form.register("message")}
                    className="min-h-[140px] bg-muted/30 border-border/50 focus:border-primary rounded-sm font-sans resize-none"
                  />
                  {form.formState.errors.message && (
                    <p className="text-xs text-destructive">{form.formState.errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full md:w-auto px-10 py-6 bg-primary text-primary-foreground font-sans text-sm font-medium rounded-sm hover:bg-primary/90 transition-colors disabled:opacity-50"
                  >
                    {form.formState.isSubmitting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 mr-2" />
                    )}
                    {t('form.submit')}
                  </Button>
                </div>

                {/* Privacy Note */}
                <p className="text-xs text-muted-foreground font-sans">
                  {t('form.privacy')}
                </p>
              </form>
            )}
          </div>

          {/* Right - Contact Info + Map (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Direct Contact Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-foreground">
                {t('info.title')}
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-sans font-medium text-foreground">{t('info.address.label')}</p>
                    <p className="text-sm font-sans text-muted-foreground">
                      {addressLine1}<br />
                      {addressLine2 && (
                        <>
                          {addressLine2}<br />
                        </>
                      )}
                      {addressLine3}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-sans font-medium text-foreground">{t('info.email.label')}</p>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm font-sans text-primary hover:text-primary/80 transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-sans font-medium text-foreground">{t('info.phone.label')}</p>
                    <a
                      href={`tel:${phone.replace(/\s+/g, '')}`}
                      className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
                    >
                      {phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-sans font-medium text-foreground">{t('info.hours.label')}</p>
                    <p className="text-sm font-sans text-muted-foreground">
                      {t('info.hours.schedule')}<br />
                      <span className="text-xs">{t('info.hours.timezone')}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <LocationMap />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
