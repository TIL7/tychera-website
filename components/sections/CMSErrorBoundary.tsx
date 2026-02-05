'use client';

import { Component, ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * CMS Error Boundary
 * 
 * Catches errors from CMS data fetching and displays a graceful fallback.
 * This prevents the entire page from crashing if Sanity is unavailable.
 * 
 * @requirements 4.7, 4.8
 */
export class CMSErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('CMS Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="py-24 lg:py-32">
          <div className="container px-6">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive mb-6">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h2 className="text-2xl md:text-3xl font-serif text-foreground mb-4">
                Contenu temporairement indisponible
              </h2>
              <p className="text-muted-foreground font-sans leading-relaxed mb-8">
                Nous rencontrons des difficultés pour charger ce contenu. 
                Veuillez réessayer dans quelques instants.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground font-sans text-sm rounded-sm hover:bg-primary/90 transition-colors"
              >
                Actualiser la page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * CMS Section Error Fallback
 * 
 * A smaller, inline error message for section-level errors.
 * Use this when you want to show an error without breaking the page layout.
 */
export function CMSSectionError({ 
  message = "Ce contenu est temporairement indisponible" 
}: { 
  message?: string 
}) {
  return (
    <div className="py-12 px-6 bg-muted/30 border border-border/50 rounded-sm">
      <div className="flex items-start gap-4">
        <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-sans text-muted-foreground">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
