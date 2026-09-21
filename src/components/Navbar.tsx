import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { siteConfig, buildWhatsAppUrl, defaultWhatsAppMessage } from '@/config/site';
import { Button } from '@/components/ui/Button';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Le nostre auto', to: '/auto' },
  { label: 'Come funziona', to: '/come-funziona' },
  { label: 'Taranto e Puglia', to: '/taranto-puglia' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contatti', to: '/contatti' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-charcoal-100">
      <nav className="container-app">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 focus-ring rounded-lg" onClick={closeMenu}>
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-charcoal-900 text-accent-500">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l1.5-4.5A2 2 0 018.4 7h7.2a2 2 0 011.9 1.5L19 13M5 13h14M5 13v4h2v-1h10v1h2v-4M8 13v-2m8 2v-2" />
              </svg>
            </span>
            <span className="font-display text-lg font-bold text-charcoal-900 hidden sm:block">
              {siteConfig.companyName}
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-lg transition-colors focus-ring ${
                    isActive
                      ? 'text-accent-600'
                      : 'text-charcoal-600 hover:text-charcoal-900 hover:bg-charcoal-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href={`tel:${siteConfig.phone}`}
              className="flex items-center gap-1.5 text-sm font-medium text-charcoal-600 hover:text-charcoal-900 transition-colors focus-ring rounded-lg"
            >
              <Phone className="h-4 w-4" />
              <span>{siteConfig.phone}</span>
            </a>
            <a
              href={buildWhatsAppUrl(defaultWhatsAppMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#25D366] text-white hover:bg-[#1da851] transition-colors focus-ring"
              aria-label="Contattaci su WhatsApp"
            >
              <MessageCircle className="h-5 w-5" />
            </a>
            <Button to="/preventivo" size="md">
              Richiedi un preventivo
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-charcoal-700 hover:bg-charcoal-100 focus-ring"
            aria-label={open ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden border-t border-charcoal-100 bg-white animate-fade-in">
          <div className="container-app py-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-accent-600 bg-accent-50'
                      : 'text-charcoal-700 hover:bg-charcoal-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-3 space-y-3">
              <Button
                to="/preventivo"
                size="md"
                className="w-full"
                // @ts-expect-error onClick is valid on Link
                onClick={closeMenu}
              >
                Richiedi un preventivo
              </Button>
              <a
                href={buildWhatsAppUrl(defaultWhatsAppMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="flex items-center justify-center gap-2 w-full px-6 py-3 text-sm font-semibold rounded-xl bg-[#25D366] text-white hover:bg-[#1da851] transition-colors focus-ring"
              >
                <MessageCircle className="h-5 w-5" />
                Scrivici su WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
