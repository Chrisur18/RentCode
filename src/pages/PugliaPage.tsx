import { Seo } from '@/components/Seo';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { destinations } from '@/data/destinations';
import { MapPin } from 'lucide-react';

export function PugliaPage() {
  return (
    <>
      <Seo
        title="Taranto e Puglia | Noleggio auto - [NOME AUTONOLEGGIO]"
        description="Parti da Taranto e scopri le destinazioni più belle della Puglia: Alberobello, Ostuni, Polignano a Mare, Matera e molto altro."
      />

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end overflow-hidden">
        <img
          src="https://images.pexels.com/photos/18929127/pexels-photo-18929127.jpeg?auto=compress&cs=tinysrgb&h=800&w=1920"
          alt="Costa della Puglia al tramonto"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/50 to-transparent" />
        <div className="container-app relative z-10 pb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Parti da Taranto. Scopri la Puglia.
          </h1>
        </div>
      </section>

      <Section>
        <SectionHeader
          eyebrow="Itinerari e destinazioni"
          title="Le mete raggiungibili da Taranto"
          subtitle="Con un'auto a noleggio puoi esplorare la Puglia con la massima libertà. Ecco alcune delle destinazioni più affascinanti raggiungibili dalla nostra sede a Taranto."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d) => (
            <div
              key={d.name}
              className="group bg-white rounded-2xl overflow-hidden border border-charcoal-100 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-charcoal-900 mb-2">{d.name}</h3>
                <p className="text-sm text-charcoal-600 leading-relaxed mb-3">{d.description}</p>
                <div className="flex items-center gap-2 text-xs text-accent-600 font-medium">
                  <MapPin className="h-3.5 w-3.5" />
                  {d.distance}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button to="/preventivo" size="lg">
            Richiedi un preventivo
          </Button>
        </div>
      </Section>
    </>
  );
}
