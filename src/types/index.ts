export interface Vehicle {
  id: string;
  brand: string;
  model: string;
  category: string;
  description: string | null;
  image_url: string | null;
  gallery: string[];
  seats: number;
  doors: number;
  transmission: string;
  fuel: string;
  luggage: number;
  price_per_day: number | null;
  features: string[];
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export type QuoteRequestStatus =
  | 'Nuova'
  | 'In attesa'
  | 'Confermata'
  | 'Completata'
  | 'Annullata';

export interface QuoteRequest {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  pickup_date: string | null;
  pickup_time: string | null;
  return_date: string | null;
  return_time: string | null;
  vehicle_id: string | null;
  message: string | null;
  status: QuoteRequestStatus;
  created_at: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Destination {
  name: string;
  description: string;
  image: string;
  distance: string;
}
