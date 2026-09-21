import { useState, type FormEvent } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { Section, SectionHeader } from '@/components/ui/Section';
import { siteConfig, buildWhatsAppUrl, defaultWhatsAppMessage } from '@/config/site';

export function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    }, 800);
  }

  const contactInfo = [
    { icon: Phone, label: 'Telefono', value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
    { icon: MessageCircle, label: 'WhatsApp', value: siteConfig.whatsapp, href: buildWhatsAppUrl(defaultWhatsAppMessage) },
    { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: MapPin, label: 'Indirizzo', value: siteConfig.address },
    { icon: Clock, label: 'Orari', value: siteConfig.openingHours },
  ];

  return (
    <>
      <Seo
        title="Contatti | Noleggio auto Taranto - [NOME AUTONOLEGGIO]"
        description="Contatta [NOME AUTONOLEGGIO] per noleggio auto a Taranto. Telefono, WhatsApp, email e modulo di contatto."
      />

      <Section>
        <SectionHeader
          eyebrow="Siamo qui per te"
          title="Contatti"
          subtitle="Hai domande o vuoi richiedere un preventivo? Scrivici, chiamaci o passa a trovarci a Taranto."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Info */}
          <div>
            <h3 className="text-xl font-bold text-charcoal-900 mb-6">Informazioni di contatto</h3>
            <div className="space-y-5">
              {contactInfo.map((c) => (
                <div key={c.label} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-50 text-accent-600 flex-shrink-0">
                    <c.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-charcoal-400 uppercase tracking-wider mb-0.5">{c.label}</p>
                    {c.href ? (
                      <a
                        href={c.href}
                        target={c.href.startsWith('http') ? '_blank' : undefined}
                        rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-charcoal-900 font-medium hover:text-accent-600 transition-colors"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-charcoal-900 font-medium">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-charcoal-900 mb-4">Dove siamo</h3>
              <div className="aspect-[16/10] rounded-2xl bg-charcoal-100 border border-charcoal-200 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-10 w-10 text-charcoal-300 mx-auto mb-2" />
                  <p className="text-sm text-charcoal-400">Mappa placeholder</p>
                  <p className="text-xs text-charcoal-400 mt-1">{siteConfig.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <h3 className="text-xl font-bold text-charcoal-900 mb-6">Inviaci un messaggio</h3>
            {status === 'success' ? (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-green-600 mb-4" />
                <h4 className="text-lg font-bold text-charcoal-900 mb-2">Messaggio inviato!</h4>
                <p className="text-charcoal-600">Ti risponderemo al più presto.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 bg-white rounded-2xl border border-charcoal-100 p-6">
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Nome *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-charcoal-200 px-4 py-3 text-sm focus-ring focus:border-accent-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Email *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full rounded-xl border border-charcoal-200 px-4 py-3 text-sm focus-ring focus:border-accent-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal-700 mb-1.5">Messaggio *</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-charcoal-200 px-4 py-3 text-sm focus-ring focus:border-accent-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-semibold rounded-xl bg-accent-500 text-white hover:bg-accent-600 transition-colors focus-ring disabled:opacity-50"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Invio in corso...
                    </>
                  ) : (
                    'Invia messaggio'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
