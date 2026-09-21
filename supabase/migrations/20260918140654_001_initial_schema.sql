/*
# Initial schema for car rental website (Phase 1)

## Overview
Creates the foundational database tables for a car rental company based in Taranto, Puglia.
This is Phase 1 of a larger project — supports vehicle catalog, quote requests, and FAQ management.

## New Tables

### vehicles
- id (uuid, PK): unique vehicle identifier
- brand (text): vehicle manufacturer (e.g. "Fiat")
- model (text): vehicle model name (e.g. "500")
- category (text): vehicle category (e.g. "Economy", "SUV", "Berlina")
- description (text): vehicle description shown on detail page
- image_url (text): primary vehicle image URL
- gallery (jsonb): array of additional image URLs
- seats (int): number of seats
- doors (int): number of doors
- transmission (text): transmission type (e.g. "Manuale", "Automatico")
- fuel (text): fuel type (e.g. "Benzina", "Diesel", "Ibrido")
- luggage (int): luggage capacity in bags
- price_per_day (numeric): starting price per day in EUR (placeholder)
- features (jsonb): array of feature strings
- active (boolean): whether the vehicle is publicly visible
- sort_order (int): display ordering
- created_at (timestamptz): record creation timestamp
- updated_at (timestamptz): record update timestamp

### quote_requests
- id (uuid, PK): unique request identifier
- full_name (text): customer full name
- email (text): customer email
- phone (text): customer phone number
- pickup_date (date): requested pickup date
- pickup_time (text): requested pickup time
- return_date (date): requested return date
- return_time (text): requested return time
- vehicle_id (uuid, FK -> vehicles.id): desired vehicle (nullable for general requests)
- message (text): additional message from customer
- status (text): request status — defaults to 'Nuova'
- created_at (timestamptz): record creation timestamp

### faqs
- id (uuid, PK): unique FAQ identifier
- question (text): the question text
- answer (text): the answer text
- active (boolean): whether the FAQ is publicly visible
- sort_order (int): display ordering
- created_at (timestamptz): record creation timestamp
- updated_at (timestamptz): record update timestamp

## Security (RLS)

### vehicles
- Public read access for active vehicles (anon + authenticated)
- Write access restricted to authenticated users (admin)

### quote_requests
- Public insert access (anyone can submit a quote request)
- Read/update/delete restricted to authenticated users (admin)
  Public users cannot read other people's quote requests.

### faqs
- Public read access for active FAQs (anon + authenticated)
- Write access restricted to authenticated users (admin)

## Notes
1. Quote request status defaults to 'Nuova'. Future statuses: 'In attesa', 'Confermata', 'Completata', 'Annullata'.
2. The vehicle_id FK uses ON DELETE SET NULL so deleting a vehicle doesn't lose quote request history.
3. Phase 2 will add bookings, customers, payments, availability calendars, etc. without modifying these tables.
4. Seed data is inserted after table creation for all three tables.
*/

-- ==================== VEHICLES ====================
CREATE TABLE IF NOT EXISTS vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand text NOT NULL,
  model text NOT NULL,
  category text NOT NULL,
  description text,
  image_url text,
  gallery jsonb DEFAULT '[]'::jsonb,
  seats int NOT NULL DEFAULT 5,
  doors int NOT NULL DEFAULT 5,
  transmission text NOT NULL DEFAULT 'Manuale',
  fuel text NOT NULL DEFAULT 'Benzina',
  luggage int NOT NULL DEFAULT 2,
  price_per_day numeric(10,2),
  features jsonb DEFAULT '[]'::jsonb,
  active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_active_vehicles" ON vehicles;
CREATE POLICY "public_select_active_vehicles"
  ON vehicles FOR SELECT
  TO anon, authenticated
  USING (active = true);

DROP POLICY IF EXISTS "admin_insert_vehicles" ON vehicles;
CREATE POLICY "admin_insert_vehicles"
  ON vehicles FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_vehicles" ON vehicles;
CREATE POLICY "admin_update_vehicles"
  ON vehicles FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_vehicles" ON vehicles;
CREATE POLICY "admin_delete_vehicles"
  ON vehicles FOR DELETE
  TO authenticated
  USING (true);

-- ==================== QUOTE_REQUESTS ====================
CREATE TABLE IF NOT EXISTS quote_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  pickup_date date,
  pickup_time text,
  return_date date,
  return_time text,
  vehicle_id uuid REFERENCES vehicles(id) ON DELETE SET NULL,
  message text,
  status text NOT NULL DEFAULT 'Nuova',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_quote_requests" ON quote_requests;
CREATE POLICY "public_insert_quote_requests"
  ON quote_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_select_quote_requests" ON quote_requests;
CREATE POLICY "admin_select_quote_requests"
  ON quote_requests FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "admin_update_quote_requests" ON quote_requests;
CREATE POLICY "admin_update_quote_requests"
  ON quote_requests FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_quote_requests" ON quote_requests;
CREATE POLICY "admin_delete_quote_requests"
  ON quote_requests FOR DELETE
  TO authenticated
  USING (true);

-- ==================== FAQS ====================
CREATE TABLE IF NOT EXISTS faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  sort_order int NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_select_active_faqs" ON faqs;
CREATE POLICY "public_select_active_faqs"
  ON faqs FOR SELECT
  TO anon, authenticated
  USING (active = true);

DROP POLICY IF EXISTS "admin_insert_faqs" ON faqs;
CREATE POLICY "admin_insert_faqs"
  ON faqs FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "admin_update_faqs" ON faqs;
CREATE POLICY "admin_update_faqs"
  ON faqs FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "admin_delete_faqs" ON faqs;
CREATE POLICY "admin_delete_faqs"
  ON faqs FOR DELETE
  TO authenticated
  USING (true);

-- ==================== INDEXES ====================
CREATE INDEX IF NOT EXISTS idx_vehicles_active_sort ON vehicles(active, sort_order);
CREATE INDEX IF NOT EXISTS idx_quote_requests_status ON quote_requests(status);
CREATE INDEX IF NOT EXISTS idx_quote_requests_created ON quote_requests(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_faqs_active_sort ON faqs(active, sort_order);

-- ==================== SEED DATA ====================
INSERT INTO vehicles (brand, model, category, description, image_url, gallery, seats, doors, transmission, fuel, luggage, price_per_day, features, active, sort_order)
VALUES
(
  'Fiat',
  '500',
  'Economy',
  'Compatta, agile e perfetta per muoversi con facilità tra le strade del centro di Taranto e i borghi della Puglia. Il Fiat 500 combina stile italiano e consumi ridotti, ideale per coppie o piccole famiglie.',
  'https://images.pexels.com/photos/17586894/pexels-photo-17586894.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  '["https://images.pexels.com/photos/17586894/pexels-photo-17586894.jpeg?auto=compress&cs=tinysrgb&h=650&w=940","https://images.pexels.com/photos/18271817/pexels-photo-18271817.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]'::jsonb,
  4,
  3,
  'Manuale',
  'Benzina',
  2,
  35.00,
  '["Climatizzatore","Bluetooth","USB","City sensing","Frenata automatica"]'::jsonb,
  true,
  1
),
(
  'Jeep',
  'Renegade',
  'SUV',
  'Robusto e versatile, il Jeep Renegade è la scelta ideale per chi vuole esplorare la Puglia con comfort e sicurezza. Spazioso all''interno, perfetto per famiglie e itinerari misti stradali e extraurbani.',
  'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  '["https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&h=650&w=940","https://images.pexels.com/photos/29477633/pexels-photo-29477633.png?auto=compress&cs=tinysrgb&h=650&w=940"]'::jsonb,
  5,
  5,
  'Manuale',
  'Diesel',
  3,
  55.00,
  '["Climatizzatore","Bluetooth","Apple CarPlay","Android Auto","Sensore pioggia","Camera posteriore"]'::jsonb,
  true,
  2
),
(
  'Lancia',
  'Ypsilon',
  'Berlina',
  'Elegante e raffinata, la Lancia Ypsilon offre un''esperienza di guida confortevole con un tocco di lusso. Perfetta per chi cerca stile e praticità negli spostamenti quotidiani e nei weekend in Puglia.',
  'https://images.pexels.com/photos/11945283/pexels-photo-11945283.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  '["https://images.pexels.com/photos/11945283/pexels-photo-11945283.jpeg?auto=compress&cs=tinysrgb&h=650&w=940","https://images.pexels.com/photos/6706311/pexels-photo-6706311.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"]'::jsonb,
  5,
  5,
  'Automatico',
  'Ibrido',
  2,
  45.00,
  '["Climatizzatore","Bluetooth","Apple CarPlay","Sedili riscaldabili","Sensore parcheggio"]'::jsonb,
  true,
  3
)
ON CONFLICT DO NOTHING;

INSERT INTO faqs (question, answer, active, sort_order)
VALUES
(
  'Quali documenti servono per il noleggio?',
  'Per noleggiare un''auto sono necessari: patente di guida valida (conseguita da almeno [X] anni), documento d''identità valido (carta d''identità o passaporto) e una carta di credito per la cauzione. [I requisiti specifici verranno definiti dalla politica aziendale.]',
  true,
  1
),
(
  'Qual è l''età minima per noleggiare?',
  'L''età minima per noleggiare un''auto è di [X] anni. Per alcuni veicoli o categorie potrebbero esserci requisiti di età diversi. [I requisiti specifici verranno definiti dalla politica aziendale.]',
  true,
  2
),
(
  'È richiesta una cauzione?',
  'Sì, al momento del ritiro del veicolo viene richiesta una cauzione tramite pre-autorizzazione su carta di credito. L''importo dipende dalla categoria del veicolo. [L''importo esatto verrà comunicato al momento della conferma.]',
  true,
  3
),
(
  'Cosa comprende il prezzo?',
  'Il prezzo giornaliero comprende: assicurazione RC base, chilometraggio [illimitato/limitato], IVA e assistenza stradale. Potrebbero essere disponibili servizi aggiuntivi a pagamento (seggiolino, navigatore, conducente aggiuntivo). [I dettagli esatti verranno definiti dalla politica aziendale.]',
  true,
  4
),
(
  'Posso modificare una richiesta?',
  'Sì, puoi modificare la tua richiesta contattandoci via email o WhatsApp prima della conferma del noleggio. Una volta confermato, le modifiche sono soggette a disponibilità e alle condizioni contrattuali.',
  true,
  5
),
(
  'Dove posso ritirare l''auto?',
  'Il ritiro avviene presso la nostra sede in [INDIRIZZO / PUNTO DI RITIRO] a Taranto. Potremmo valutare consegne in altri punti su richiesta e con costi aggiuntivi. [I dettagli esatti verranno comunicati al momento della conferma.]',
  true,
  6
)
ON CONFLICT DO NOTHING;
