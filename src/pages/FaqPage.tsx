import { Seo } from '@/components/Seo';
import { Section, SectionHeader } from '@/components/ui/Section';
import { AccordionItem } from '@/components/ui/AccordionItem';
import { Button } from '@/components/ui/Button';
import { useFaqs } from '@/hooks/useFaqs';

export function FaqPage() {
  const { faqs } = useFaqs();

  return (
    <>
      <Seo
        title="FAQ | Noleggio auto Taranto - [NOME AUTONOLEGGIO]"
        description="Risposte alle domande frequenti sul noleggio auto a Taranto: documenti, età minima, cauzione, cosa comprende il prezzo e altro."
      />

      <Section>
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Domande frequenti"
            title="FAQ"
            subtitle="Tutto quello che devi sapere prima di noleggiare un'auto con noi."
          />

          <div className="bg-white rounded-2xl border border-charcoal-100 px-6 py-2">
            {faqs.map((f, i) => (
              <AccordionItem key={f.id} question={f.question} defaultOpen={i === 0}>
                {f.answer}
              </AccordionItem>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-charcoal-600 mb-4">Non hai trovato la risposta che cercavi?</p>
            <Button to="/contatti" variant="outline" size="md">
              Contattaci
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
