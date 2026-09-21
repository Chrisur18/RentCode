import { Seo } from '@/components/Seo';
import { Section, SectionHeader } from '@/components/ui/Section';
import { QuoteRequestForm } from '@/components/QuoteRequestForm';

export function QuotePage() {
  return (
    <>
      <Seo
        title="Richiedi un preventivo | Noleggio auto Taranto - [NOME AUTONOLEGGIO]"
        description="Richiedi un preventivo gratuito per il noleggio auto a Taranto. Compila il form e ti risponderemo con una proposta personalizzata."
      />

      <Section>
        <div className="max-w-2xl mx-auto">
          <SectionHeader
            eyebrow="Preventivo gratuito"
            title="Richiedi un preventivo"
            subtitle="Compila il form con le tue esigenze. Ti risponderemo al più presto con una proposta personalizzata."
          />
          <div className="bg-white rounded-2xl border border-charcoal-100 shadow-sm p-6 sm:p-8">
            <QuoteRequestForm />
          </div>
        </div>
      </Section>
    </>
  );
}
