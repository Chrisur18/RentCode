import type { Vehicle } from '@/types';

export const demoVehicles: Vehicle[] = [
  {
    id: 'demo-fiat-500',
    brand: 'Fiat',
    model: '500',
    category: 'Economy',
    description:
      'Compatta, agile e perfetta per muoversi con facilità tra le strade del centro di Taranto e i borghi della Puglia. Il Fiat 500 combina stile italiano e consumi ridotti, ideale per coppie o piccole famiglie.',
    image_url:
      'https://images.pexels.com/photos/17586894/pexels-photo-17586894.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/17586894/pexels-photo-17586894.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/18271817/pexels-photo-18271817.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    seats: 4,
    doors: 3,
    transmission: 'Manuale',
    fuel: 'Benzina',
    luggage: 2,
    price_per_day: 35,
    features: ['Climatizzatore', 'Bluetooth', 'USB', 'City sensing', 'Frenata automatica'],
    active: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-jeep-renegade',
    brand: 'Jeep',
    model: 'Renegade',
    category: 'SUV',
    description:
      "Robusto e versatile, il Jeep Renegade è la scelta ideale per chi vuole esplorare la Puglia con comfort e sicurezza. Spazioso all'interno, perfetto per famiglie e itinerari misti stradali e extraurbani.",
    image_url:
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/29477633/pexels-photo-29477633.png?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    seats: 5,
    doors: 5,
    transmission: 'Manuale',
    fuel: 'Diesel',
    luggage: 3,
    price_per_day: 55,
    features: ['Climatizzatore', 'Bluetooth', 'Apple CarPlay', 'Android Auto', 'Sensore pioggia', 'Camera posteriore'],
    active: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-lancia-ypsilon',
    brand: 'Lancia',
    model: 'Ypsilon',
    category: 'Berlina',
    description:
      "Elegante e raffinata, la Lancia Ypsilon offre un'esperienza di guida confortevole con un tocco di lusso. Perfetta per chi cerca stile e praticità negli spostamenti quotidiani e nei weekend in Puglia.",
    image_url:
      'https://images.pexels.com/photos/11945283/pexels-photo-11945283.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    gallery: [
      'https://images.pexels.com/photos/11945283/pexels-photo-11945283.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      'https://images.pexels.com/photos/6706311/pexels-photo-6706311.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    ],
    seats: 5,
    doors: 5,
    transmission: 'Automatico',
    fuel: 'Ibrido',
    luggage: 2,
    price_per_day: 45,
    features: ['Climatizzatore', 'Bluetooth', 'Apple CarPlay', 'Sedili riscaldabili', 'Sensore parcheggio'],
    active: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
