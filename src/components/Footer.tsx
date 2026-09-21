import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { siteConfig, buildWhatsAppUrl, defaultWhatsAppMessage } from '@/config/site';

const footerLinks = [
  { label: 'Home', to: '/' },
  { label: 'Le nostre auto', to: '/auto' },
  { label: 'Come funziona', to: '/come-funziona' },
  { label: 'Taranto e Puglia', to: '/taranto-puglia' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contatti', to: '/contatti' },
];

const legalLinks = [
  { label: 'Privacy Policy', to: '#' },
  { label: 'Cookie Policy', to: '#' },
  { label: 'Termini e condizioni', to: '#' },
];

export function Footer() {
  return (
    <footer className="bg-charcoal-950 text-charcoal-300">
      <div className="container-app py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-accent-500">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13M5 13h14M5 13v4h2v-1h10v1h2v-4M8 13v-2m8 2v-2" />
                </svg>
              </span>
              <span className="font-display text-lg font-bold text-white">
                {siteConfig.companyName}
              </span>
            </div>
            <p className="text-sm leading-relaxed text-charcoal-400">
              Autonoleggio a Taranto, Puglia.
            </p>
            <p className="text-sm leading-relaxed text-charcoal-400 mt-2">
              Noleggio auto semplice, trasparente e conveniente per scoprire il sud Italia.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Navigazione
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-charcoal-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contatti
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-charcoal-400">
                <Phone className="h-4 w-4 mt-0.5 text-charcoal-500 flex-shrink-0" />
                <span>{siteConfig.phone}</span>
              </li>
              <li>
                <a
                  href={buildWhatsAppUrl(defaultWhatsAppMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-sm text-charcoal-400 hover:text-white transition-colors"
                >
                  <MessageCircle className="h-4 w-4 mt-0.5 text-charcoal-500 flex-shrink-0" />
                  <span>WhatsApp: {siteConfig.whatsapp}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-charcoal-400">
                <Mail className="h-4 w-4 mt-0.5 text-charcoal-500 flex-shrink-0" />
                <span>{siteConfig.email}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-charcoal-400">
                <MapPin className="h-4 w-4 mt-0.5 text-charcoal-500 flex-shrink-0" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-charcoal-400">
                <Clock className="h-4 w-4 mt-0.5 text-charcoal-500 flex-shrink-0" />
                <span>{siteConfig.openingHours}</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Legale
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-charcoal-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-charcoal-500">
            (c) {new Date().getFullYear()} {siteConfig.companyName}. Tutti i diritti riservati.
          </p>
          <p className="text-xs text-charcoal-500">
            Noleggio auto Taranto · Puglia · Italia
          </p>
        </div>
      </div>
    </footer>
  );
}
