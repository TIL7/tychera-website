import { ExternalLink } from "lucide-react";

/**
 * LocationMap Component - Server Component
 * 
 * Displays an embedded Google Maps iframe showing TYCHERA's office location
 * at Immeuble OHANA, Nyarutarama, Kigali, Rwanda.
 * 
 * This is a Server Component as it contains no client-side interactivity.
 * The map is statically embedded and all rendering happens on the server.
 */
const LocationMap = () => {
  // Coordinates for Immeuble OHANA, Nyarutarama, Kigali
  // Extracted from: https://maps.app.goo.gl/qEFACpv1vMqSfv8L8
  const latitude = -1.9358;
  const longitude = 30.0937;
  
  // Google Maps Embed URL
  const embedUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.516!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMcKwNTYnMDkuMCJTIDMwwrAwNScxNi4wIkU!5e0!3m2!1sen!2srw!4v1234567890`;
  
  // Direct Google Maps link
  const mapsLink = "https://maps.app.goo.gl/qEFACpv1vMqSfv8L8";

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-serif text-foreground">
        Localisation
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
        Voir sur Google Maps
        <ExternalLink className="w-3 h-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
      </a>
    </div>
  );
};

export default LocationMap;
