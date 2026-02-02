import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center px-6">
        <p className="text-sm font-sans uppercase tracking-widest text-primary mb-4">
          Erreur 404
        </p>
        <h1 className="text-5xl md:text-6xl font-serif text-foreground mb-6">
          Page Non Trouvée
        </h1>
        <p className="text-lg text-muted-foreground font-sans mb-8 max-w-md mx-auto">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-sm px-8 py-6">
          <Link to="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
