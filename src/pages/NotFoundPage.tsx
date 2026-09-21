import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Button } from '@/components/ui/Button';

export function NotFoundPage() {
  return (
    <>
      <Seo title="Pagina non trovata | [NOME AUTONOLEGGIO]" />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <span className="text-7xl font-bold text-accent-500/30 font-display">404</span>
        <h1 className="mt-4 text-2xl font-bold text-charcoal-900">Pagina non trovata</h1>
        <p className="mt-2 text-charcoal-600 mb-8">La pagina che cerchi non esiste o è stata spostata.</p>
        <Button to="/" variant="outline">
          <Home className="h-4 w-4" />
          Torna alla home
        </Button>
      </div>
    </>
  );
}
