import { type ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItemProps {
  question: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({ question, children, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-charcoal-100">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left focus-ring rounded-lg"
        aria-expanded={open}
      >
        <span className="pr-4 text-base font-semibold text-charcoal-900">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 flex-shrink-0 text-charcoal-400 transition-transform duration-300 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? 'max-h-96 pb-5' : 'max-h-0'
        }`}
      >
        <p className="text-charcoal-600 leading-relaxed">{children}</p>
      </div>
    </div>
  );
}
