import { Seo } from '@/components/Seo';
import { Section, SectionHeader } from '@/components/ui/Section';
import { VehicleCard } from '@/components/VehicleCard';
import { useVehicles } from '@/hooks/useVehicles';

export function VehiclesPage() {
  const { vehicles, loading } = useVehicles();

  return (
    <>
      <Seo
        title="Le nostre auto | Noleggio auto Taranto - [NOME AUTONOLEGGIO]"
        description="Scopri la nostra flotta per il noleggio auto a Taranto: economy, SUV e berline. Scegli l'auto perfetta per il tuo viaggio in Puglia."
      />

      <Section>
        <SectionHeader
          eyebrow="La nostra flotta"
          title="Le nostre auto"
          subtitle="Scegli la vettura più adatta al tuo viaggio in Puglia. Ogni auto è pronta per portarti dove vuoi."
        />

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[0, 1, 2].map((i) => (
              <div key={i} className="bg-charcoal-100 rounded-2xl overflow-hidden">
                <div className="aspect-[16/10] bg-charcoal-200" />
                <div className="p-5 space-y-3">
                  <div className="h-6 w-32 bg-charcoal-200 rounded" />
                  <div className="h-4 w-48 bg-charcoal-200 rounded" />
                  <div className="h-8 w-24 bg-charcoal-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
