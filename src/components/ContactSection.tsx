import { useState } from "react";
import { Mail, Phone, Clock, MapPin, Linkedin, Twitter, Send } from "lucide-react";
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
import LocationMap from "@/components/LocationMap";

const requestTypes = [
  { value: "financement", label: "Financement de Projet (Infrastructure, Énergie, Développement)" },
  { value: "investissement", label: "Opportunité d'Investissement" },
  { value: "conseil", label: "Conseil Stratégique & Structuration" },
  { value: "gestion", label: "Gestion de Fonds" },
  { value: "autre", label: "Autre demande" },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    title: "",
    email: "",
    phone: "",
    country: "",
    requestType: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission will be connected to Zoho later
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background">
      <div className="container px-6 md:px-4">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <p className="text-sm font-sans uppercase tracking-widest text-primary mb-4">
            Contact
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight text-foreground mb-6">
            Initier une Collaboration Stratégique
          </h2>
          <p className="text-muted-foreground font-sans leading-relaxed">
            Que vous soyez une institution publique cherchant à financer des projets d'infrastructure, 
            un investisseur international en quête d'opportunités à fort impact, ou une entreprise 
            nécessitant des solutions de financement sur mesure, TYCHERA INVESTMENTS est votre partenaire privilégié.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left - Contact Form (3 cols) */}
          <div className="lg:col-span-3">
            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center py-16 px-8 bg-muted/30 border border-accent/30 rounded-sm">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <Send className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-serif text-foreground mb-4 text-center">
                  Merci pour votre message
                </h3>
                <p className="text-muted-foreground font-sans text-center max-w-md">
                  Votre demande a été envoyée avec succès. Notre équipe vous recontactera sous 24 heures ouvrables.
                </p>
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name + Organization */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-sans font-medium text-foreground">
                    Nom complet <span className="text-primary">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Votre nom"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="h-12 bg-muted/30 border-border/50 focus:border-primary rounded-sm font-sans"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-sans font-medium text-foreground">
                    Organisation / Entreprise <span className="text-primary">*</span>
                  </label>
                  <Input
                    type="text"
                    placeholder="Votre organisation"
                    value={formData.organization}
                    onChange={(e) => handleInputChange("organization", e.target.value)}
                    className="h-12 bg-muted/30 border-border/50 focus:border-primary rounded-sm font-sans"
                    required
                  />
                </div>
              </div>

              {/* Row 2: Email + Type of Request */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-sans font-medium text-foreground">
                    Email professionnel <span className="text-primary">*</span>
                  </label>
                  <Input
                    type="email"
                    placeholder="email@entreprise.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="h-12 bg-muted/30 border-border/50 focus:border-primary rounded-sm font-sans"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-sans font-medium text-foreground">
                    Type de demande <span className="text-primary">*</span>
                  </label>
                  <Select
                    value={formData.requestType}
                    onValueChange={(value) => handleInputChange("requestType", value)}
                  >
                    <SelectTrigger className="h-12 bg-muted/30 border-border/50 focus:border-primary rounded-sm font-sans">
                      <SelectValue placeholder="Sélectionnez une option" />
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
                </div>
              </div>

              {/* Row 3: Phone + Country */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-sans font-medium text-foreground">
                    Téléphone (avec indicatif pays)
                  </label>
                  <Input
                    type="tel"
                    placeholder="+250 7XX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="h-12 bg-muted/30 border-border/50 focus:border-primary rounded-sm font-sans"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-sans font-medium text-foreground">
                    Pays
                  </label>
                  <Input
                    type="text"
                    placeholder="Votre pays"
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    className="h-12 bg-muted/30 border-border/50 focus:border-primary rounded-sm font-sans"
                  />
                </div>
              </div>

              {/* Row 4: Function/Title */}
              <div className="space-y-2">
                <label className="text-sm font-sans font-medium text-foreground">
                  Fonction / Titre
                </label>
                <Input
                  type="text"
                  placeholder="Votre fonction"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="h-12 bg-muted/30 border-border/50 focus:border-primary rounded-sm font-sans"
                />
              </div>

              {/* Row 5: Message */}
              <div className="space-y-2">
                <label className="text-sm font-sans font-medium text-foreground">
                  Message / Description du Projet <span className="text-primary">*</span>
                </label>
                <Textarea
                  placeholder="Merci de décrire brièvement votre besoin ou projet..."
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  className="min-h-[140px] bg-muted/30 border-border/50 focus:border-primary rounded-sm font-sans resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit"
                  className="w-full md:w-auto px-10 py-6 bg-primary text-primary-foreground font-sans text-sm font-medium rounded-sm hover:bg-primary/90 transition-colors"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Envoyer ma demande
                </Button>
              </div>

              {/* Privacy Note */}
              <p className="text-xs text-muted-foreground font-sans">
                Vos informations sont traitées de manière confidentielle conformément à notre politique de confidentialité.
              </p>
            </form>
            )}
          </div>

          {/* Right - Contact Info + Map (2 cols) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Direct Contact Info */}
            <div className="space-y-6">
              <h3 className="text-lg font-serif text-foreground">
                Coordonnées Directes
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-sans font-medium text-foreground">Adresse</p>
                    <p className="text-sm font-sans text-muted-foreground">
                      TYCHERA INVESTMENTS LTD<br />
                      Immeuble OHANA<br />
                      Nyarutarama, Kigali, Rwanda
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-sans font-medium text-foreground">Email</p>
                    <a 
                      href="mailto:contact@tycherainvestments.com" 
                      className="text-sm font-sans text-primary hover:text-primary/80 transition-colors"
                    >
                      contact@tycherainvestments.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-sans font-medium text-foreground">Téléphone</p>
                    <a 
                      href="tel:+250793145440" 
                      className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
                    >
                      +250 793 145 440
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-sans font-medium text-foreground">Horaires</p>
                    <p className="text-sm font-sans text-muted-foreground">
                      Lundi - Vendredi : 8h00 - 17h00<br />
                      <span className="text-xs">(EAT - East Africa Time)</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4 flex items-center gap-4">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-border/50 rounded-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-border/50 rounded-sm text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
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
