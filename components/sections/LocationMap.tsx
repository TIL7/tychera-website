'use client';

import { ExternalLink } from "lucide-react";
import { useTranslations } from 'next-intl';

/**
 * LocationMap Component
 * 
 * Displays an embedded Google Maps iframe showing TYCHERA's office location
 * at Immeuble OHANA, Nyarutarama, Kigali, Rwanda.
 * 
 * Client Component because it is rendered inside the client ContactSection.
 */
const LocationMap = (): React.ReactElement => {
  const t = useTranslations('locationMap');

  // Coordinates for Immeuble OHANA, Nyarutarama, Kigali
  const latitude = -1.9358;
  const longitude = 30.0937;
  
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.516!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTYnMDkuMCJTIDMwwrAwNScxNi4wIkU!5e0!3m2!1sen!2srw!4v1234567890`;
  const mapsLink = "https://maps.app.goo.gl/qEFACpv1vMqSfv8L8";

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-serif text-foreground">
        {t('title')}
      </h3>
      
      {/* Map Container with Gold Border */}
      <div className="relative overflow-hidden rounded-sm border-2 border-accent/50 shadow-lg">
        <iframe
          src={embedUrl}
          width="100%"
          height="220"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="TYCHERA Investments - Immeuble OHANA, Kigali"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/10 to-transparent" />
      </div>
      
      {/* View on Maps Link */}
      <a 
        href={mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center text-xs font-sans text-muted-foreground hover:text-primary transition-colors group"
      >
        {t('viewOnMaps')}
        <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
      </a>
    </div>
  );
};

export default LocationMap;
