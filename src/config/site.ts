export const siteConfig = {
  companyName: '[NOME AUTONOLEGGIO]',
  phone: '[NUMERO TELEFONO]',
  whatsapp: '[NUMERO WHATSAPP]',
  email: '[EMAIL]',
  address: '[INDIRIZZO / PUNTO DI RITIRO]',
  city: 'Taranto',
  region: 'Puglia',
  openingHours: '[ORARI DI APERTURA]',
  social: {
    instagram: '#',
    facebook: '#',
  },
} as const;

export const whatsappNumber = siteConfig.whatsapp.replace(/[^0-9]/g, '');

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsAppMessage =
  'Buongiorno, vorrei ricevere un preventivo per il noleggio di un\'auto.';
