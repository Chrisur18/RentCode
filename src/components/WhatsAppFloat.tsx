import { MessageCircle } from 'lucide-react';
import { buildWhatsAppUrl, defaultWhatsAppMessage } from '@/config/site';

interface WhatsAppFloatProps {
  message?: string;
}

export function WhatsAppFloat({ message = defaultWhatsAppMessage }: WhatsAppFloatProps) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contattaci su WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1da851] hover:shadow-xl transition-all duration-300 hover:scale-110 focus-ring"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping" style={{ animationDuration: '2s' }} />
    </a>
  );
}
