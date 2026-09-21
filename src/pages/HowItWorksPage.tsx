import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Section, SectionHeader } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

const steps = [
  {
    num: '01',
    title: 'Scegli la tua auto',
    text: 'Scopri le vetture disponibili e scegli quella più adatta alle tue esigenze. Economy per la città, SUV per le famiglie, berline per il comfort.',
    detail: 'Ogni auto è descritta con foto, specifiche e dotazioni per aiutarti a scegliere.',
  },
  {
    num: '02',
    title: 'Richiedi un preventivo',
    text: 'Indicaci date e necessità. Ti risponderemo con una proposta personalizzata senza impegno.',
    detail: 'Compila il form di richiesta o scrivici direttamente su WhatsApp per una risposta rapida.',
  },
  {
    num: '03',
    title: 'Ritira e parti',
    text: 'Concludi il noleggio, ritira l\'auto e inizia il tuo viaggio.',
    detail: 'Ti aspettiamo presso la nostra sede a Taranto. Bastano pochi minuti per il ritiro.',
  },
];

export function HowItWorksPage() {
  return (
    <>
      <Seo
        title="Come funziona | Noleggio auto Taranto - [NOME AUTONOLEGGIO]"
        description="Scopri come noleggiare un'auto a Taranto in tre semplici passaggi. Scegli, richiedi un preventivo e parti."
      />

      <Section>
        <SectionHeader
          eyebrow="Semplice come 1-2-3"
          title="Come funziona"
          subtitle="Noleggiare un'auto con noi è facile e veloce. Tre passi e sei pronto a partire."
        />

        <div className="max-w-3xl mx-auto space-y-12">
          {steps.map((s) => (
            <div key={s.num} className="flex gap-6">
              <div className="flex-shrink-0">
                <span className="text-5xl font-bold text-accent-500/30 font-display block">{s.num}</span>
              </div>
              <div className="pt-2">
                <h3 className="text-xl font-bold text-charcoal-900 mb-2">{s.title}</h3>
                <p className="text-charcoal-600 leading-relaxed mb-2">{s.text}</p>
                <p className="text-sm text-charcoal-400 leading-relaxed">{s.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 pt-12 border-t border-charcoal-100">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/auto" size="lg">
              Scopri le nostre auto
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button to="/preventivo" size="lg" variant="outline">
              Richiedi un preventivo
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
