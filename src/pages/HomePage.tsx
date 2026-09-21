import { Link } from 'react-router-dom';
import {
  Tag, HeadsetIcon, Shuffle, Zap,
  ArrowRight, MapPin, MessageCircle,
} from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Section, SectionHeader } from '@/components/ui/Section';
import { VehicleCard } from '@/components/VehicleCard';
import { AccordionItem } from '@/components/ui/AccordionItem';
import { Button } from '@/components/ui/Button';
import { useVehicles } from '@/hooks/useVehicles';
import { useFaqs } from '@/hooks/useFaqs';
import { destinations } from '@/data/destinations';
import { siteConfig, buildWhatsAppUrl, defaultWhatsAppMessage } from '@/config/site';

const benefits = [
  { icon: Tag, title: 'Prezzi trasparenti', text: 'Nessun costo nascosto. Sai sempre cosa paghi prima di partire.' },
  { icon: HeadsetIcon, title: 'Assistenza durante il noleggio', text: 'Siamo reachableabili per qualsiasi necessità, dal ritiro alla riconsegna.' },
  { icon: Shuffle, title: 'Flessibilità', text: 'Periodi di noleggio adattabili alle tue esigenze di viaggio.' },
  { icon: Zap, title: 'Semplicità e velocità', text: 'Richiedi un preventivo in pochi minuti. Risposta rapida e diretta.' },
];

const steps = [
  { num: '01', title: 'Scegli la tua auto', text: 'Scopri le vetture disponibili e scegli quella più adatta alle tue esigenze.' },
  { num: '02', title: 'Richiedi un preventivo', text: 'Indicaci date e necessità. Ti risponderemo con una proposta personalizzata.' },
  { num: '03', title: 'Ritira e parti', text: 'Concludi il noleggio, ritira l\'auto e inizia il tuo viaggio.' },
];

export function HomePage() {
  const { vehicles } = useVehicles();
  const { faqs } = useFaqs();

  return (
    <>
      <Seo
        title="Noleggio auto Taranto | [NOME AUTONOLEGGIO] - Autonoleggio a Taranto, Puglia"
        description="Noleggio auto semplice, trasparente e conveniente a Taranto. Affitta un'auto in Puglia con [NOME AUTONOLEGGIO]. Richiedi un preventivo gratuito."
      />

      {/* Hero */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/11645654/pexels-photo-11645654.jpeg?auto=compress&cs=tinysrgb&h=1200&w=1920"
            alt="Costa di Taranto Puglia al tramonto"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal-950/85 via-charcoal-950/60 to-charcoal-950/30" />
        </div>

        <div className="container-app relative z-10 py-20">
          <div className="max-w-2xl animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-sm text-white/90 mb-6">
              <MapPin className="h-4 w-4 text-accent-500" />
              Taranto · Puglia
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              La tua auto.<br />Il tuo viaggio.<br />Senza pensieri.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl">
              Noleggio auto semplice, trasparente e conveniente a Taranto.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button to="/auto" size="lg" variant="primary">
                Scopri le nostre auto
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button to="/preventivo" size="lg" variant="outline" className="bg-white/10 backdrop-blur text-white border-white/30 hover:bg-white hover:text-charcoal-900">
                Richiedi un preventivo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <Section className="bg-charcoal-50">
        <SectionHeader
          eyebrow="Perché sceglierci"
          title="Un noleggio senza sorprese"
          subtitle="Ci impegniamo a offrirti un servizio chiaro e affidabile, dalla prenotazione alla riconsegna."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-white rounded-2xl p-6 border border-charcoal-100 hover:shadow-md transition-shadow"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 text-accent-600 mb-4">
                <b.icon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-charcoal-900 mb-2">{b.title}</h3>
              <p className="text-sm text-charcoal-600 leading-relaxed">{b.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Fleet Preview */}
      <Section>
        <SectionHeader
          eyebrow="La nostra flotta"
          title="Scopri le nostre auto"
          subtitle="La soluzione giusta per ogni viaggio."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.slice(0, 3).map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button to="/auto" variant="outline" size="lg">
            Vedi tutte le auto
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Section>

      {/* How it works */}
      <Section className="bg-charcoal-900 text-white">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-accent-500 font-semibold text-sm uppercase tracking-wider mb-3">Semplice come 1-2-3</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">Come funziona</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.num} className="relative">
              <span className="text-5xl font-bold text-accent-500/30 font-display">{s.num}</span>
              <h3 className="mt-2 text-xl font-bold text-white">{s.title}</h3>
              <p className="mt-2 text-charcoal-300 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button to="/come-funziona" variant="ghost" className="text-accent-500 hover:bg-white/10 hover:text-accent-400">
            Scopri di più
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Section>

      {/* Puglia */}
      <Section>
        <SectionHeader
          eyebrow="Turismo in Puglia"
          title="Parti da Taranto. Scopri la Puglia."
          subtitle="Con un'auto a noleggio puoi raggiungere i borghi più belli del sud Italia a tuo ritmo."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {destinations.map((d) => (
            <div
              key={d.name}
              className="group relative overflow-hidden rounded-xl aspect-[4/5] cursor-default"
            >
              <img
                src={d.image}
                alt={d.name}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal-950/90 via-charcoal-950/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-base mb-1">{d.name}</h3>
                <p className="text-white/70 text-xs">{d.distance}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button to="/taranto-puglia" variant="outline" size="lg">
            Esplora le destinazioni
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-accent-500 py-16 sm:py-20">
        <div className="container-app text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Hai già in mente le date?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Contattaci e ricevi un preventivo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button to="/preventivo" size="lg" variant="secondary" className="bg-charcoal-900 hover:bg-charcoal-800 text-white">
              Richiedi un preventivo
            </Button>
            <a
              href={buildWhatsAppUrl(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold rounded-xl bg-white text-charcoal-900 hover:bg-charcoal-100 transition-colors focus-ring"
            >
              <MessageCircle className="h-5 w-5" />
              Scrivici su WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <Section className="bg-charcoal-50">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Domande frequenti"
            title="Le risposte alle tue domande"
          />
          <div className="bg-white rounded-2xl border border-charcoal-100 px-6 py-2">
            {faqs.slice(0, 6).map((f, i) => (
              <AccordionItem key={f.id} question={f.question} defaultOpen={i === 0}>
                {f.answer}
              </AccordionItem>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button to="/faq" variant="outline" size="md">
              Vedi tutte le FAQ
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
