import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="text-center max-w-md">
        {/* Large 404 */}
        <h1 className="text-8xl font-serif text-primary mb-4">404</h1>
        
        {/* French Title */}
        <h2 className="text-2xl font-serif text-foreground mb-4">
          Page Non Trouvée
        </h2>
        
        {/* French Description */}
        <p className="text-muted-foreground font-sans mb-8 leading-relaxed">
          Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        
        {/* Return Button */}
        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm">
          <a href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'Accueil
          </a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
