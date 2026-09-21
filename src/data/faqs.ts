import type { Faq } from '@/types';

export const demoFaqs: Faq[] = [
  {
    id: 'demo-faq-1',
    question: 'Quali documenti servono per il noleggio?',
    answer:
      "Per noleggiare un'auto sono necessari: patente di guida valida (conseguita da almeno [X] anni), documento d'identità valido (carta d'identità o passaporto) e una carta di credito per la cauzione. [I requisiti specifici verranno definiti dalla politica aziendale.]",
    active: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-faq-2',
    question: 'Qual è l\'età minima per noleggiare?',
    answer:
      "L'età minima per noleggiare un'auto è di [X] anni. Per alcuni veicoli o categorie potrebbero esserci requisiti di età diversi. [I requisiti specifici verranno definiti dalla politica aziendale.]",
    active: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-faq-3',
    question: 'È richiesta una cauzione?',
    answer:
      "Sì, al momento del ritiro del veicolo viene richiesta una cauzione tramite pre-autorizzazione su carta di credito. L'importo dipende dalla categoria del veicolo. [L'importo esatto verrà comunicato al momento della conferma.]",
    active: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-faq-4',
    question: 'Cosa comprende il prezzo?',
    answer:
      'Il prezzo giornaliero comprende: assicurazione RC base, chilometraggio [illimitato/limitato], IVA e assistenza stradale. Potrebbero essere disponibili servizi aggiuntivi a pagamento (seggiolino, navigatore, conducente aggiuntivo). [I dettagli esatti verranno definiti dalla politica aziendale.]',
    active: true,
    sort_order: 4,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-faq-5',
    question: 'Posso modificare una richiesta?',
    answer:
      'Sì, puoi modificare la tua richiesta contattandoci via email o WhatsApp prima della conferma del noleggio. Una volta confermato, le modifiche sono soggette a disponibilità e alle condizioni contrattuali.',
    active: true,
    sort_order: 5,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-faq-6',
    question: 'Dove posso ritirare l\'auto?',
    answer:
      'Il ritiro avviene presso la nostra sede in [INDIRIZZO / PUNTO DI RITIRO] a Taranto. Potremmo valutare consegne in altri punti su richiesta e con costi aggiuntivi. [I dettagli esatti verranno comunicati al momento della conferma.]',
    active: true,
    sort_order: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
