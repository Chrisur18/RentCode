import { useParams, Link } from 'react-router-dom';
import {
  Users, Settings, Fuel, Briefcase, Car,
  CheckCircle2, MessageCircle, ArrowLeft, Loader2,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { useVehicle } from '@/hooks/useVehicles';
import { buildWhatsAppUrl } from '@/config/site';

export function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { vehicle, loading, error } = useVehicle(id);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 text-accent-500 animate-spin" />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <Section>
        <div className="text-center max-w-md mx-auto py-20">
          <h1 className="text-2xl font-bold text-charcoal-900 mb-4">
            Veicolo non trovato
          </h1>
          <p className="text-charcoal-600 mb-8">
            L'auto che cerchi non è disponibile o non esiste.
          </p>
          <Button to="/auto" variant="outline">
            <ArrowLeft className="h-4 w-4" />
            Torna al catalogo
          </Button>
        </div>
      </Section>
    );
  }

  const gallery = vehicle.gallery?.length > 0 ? vehicle.gallery : [vehicle.image_url].filter(Boolean) as string[];
  const whatsappMsg = `Buongiorno, vorrei ricevere un preventivo per il noleggio della ${vehicle.brand} ${vehicle.model}.`;
  const fullName = `${vehicle.brand} ${vehicle.model}`;

  const specs = [
    { icon: Users, label: 'Posti', value: vehicle.seats },
    { icon: Car, label: 'Porte', value: vehicle.doors },
    { icon: Settings, label: 'Cambio', value: vehicle.transmission },
    { icon: Fuel, label: 'Carburante', value: vehicle.fuel },
    { icon: Briefcase, label: 'Bagagliaio', value: `${vehicle.luggage} bagagli` },
  ];

  return (
    <>
      <Seo
        title={`${fullName} | Noleggio auto Taranto - [NOME AUTONOLEGGIO]`}
        description={`${vehicle.brand} ${vehicle.model} - ${vehicle.category} a noleggio a Taranto. ${vehicle.description?.slice(0, 120) ?? ''}`}
      />

      {/* Gallery */}
      <section className="bg-charcoal-950 pt-8 pb-16">
        <div className="container-app">
          <Link
            to="/auto"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Torna al catalogo
          </Link>

          {gallery.length > 1 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 rounded-2xl overflow-hidden aspect-[16/10]">
                <img
                  src={gallery[0]}
                  alt={`${fullName} - vista principale`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
                {gallery.slice(1, 3).map((img, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden aspect-[16/10] lg:aspect-auto">
                    <img
                      src={img}
                      alt={`${fullName} - vista ${i + 2}`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden aspect-[16/9]">
              <img
                src={gallery[0]}
                alt={fullName}
                className="h-full w-full object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <Section className="pt-0 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center rounded-full bg-accent-50 text-accent-700 px-3 py-1 text-xs font-semibold">
                {vehicle.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-charcoal-900 mb-4">
              {fullName}
            </h1>

            <p className="text-lg text-charcoal-600 leading-relaxed mb-8">
              {vehicle.description}
            </p>

            {/* Specs */}
            <h2 className="text-xl font-bold text-charcoal-900 mb-4">Specifiche</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {specs.map((s) => (
                <div key={s.label} className="bg-charcoal-50 rounded-xl p-4">
                  <s.icon className="h-5 w-5 text-accent-600 mb-2" />
                  <p className="text-xs text-charcoal-400 uppercase tracking-wider">{s.label}</p>
                  <p className="text-sm font-semibold text-charcoal-900">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            {vehicle.features?.length > 0 && (
              <>
                <h2 className="text-xl font-bold text-charcoal-900 mb-4">Dotazioni</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {vehicle.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm text-charcoal-700">
                      <CheckCircle2 className="h-4 w-4 text-accent-600 flex-shrink-0" />
                      {f}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-charcoal-100 shadow-sm p-6">
              <div className="text-center pb-6 border-b border-charcoal-100">
                <p className="text-sm text-charcoal-400 mb-1">A partire da</p>
                <p className="text-4xl font-bold text-charcoal-900">
                  €{vehicle.price_per_day}
                  <span className="text-base font-normal text-charcoal-400"> / giorno</span>
                </p>
                <p className="text-xs text-charcoal-400 mt-2">Prezzo indicativo · IVA inclusa</p>
              </div>

              <div className="space-y-3 pt-6">
                <Button to="/preventivo" size="lg" className="w-full">
                  Richiedi un preventivo
                </Button>
                <a
                  href={buildWhatsAppUrl(whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 text-base font-semibold rounded-xl bg-[#25D366] text-white hover:bg-[#1da851] transition-colors focus-ring"
                >
                  <MessageCircle className="h-5 w-5" />
                  Contattaci su WhatsApp
                </a>
              </div>

              <p className="text-xs text-charcoal-400 mt-4 text-center">
                Risposta rapida · Nessun pagamento immediato
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
