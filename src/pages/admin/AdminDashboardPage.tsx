import { useEffect, useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import {
  Car, FileText, MessageSquare, LogOut, Loader2,
  Mail, Phone, Calendar, Clock,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';
import { Seo } from '@/components/Seo';
import type { Vehicle, QuoteRequest, Faq } from '@/types';

type Tab = 'vehicles' | 'quotes' | 'faqs';

export function AdminDashboardPage() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('quotes');

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-charcoal-50">
        <Loader2 className="h-8 w-8 text-accent-500 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  async function handleSignOut() {
    await signOut();
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen bg-charcoal-50">
      <Seo title="Admin Dashboard | [NOME AUTONOLEGGIO]" />

      {/* Top bar */}
      <header className="bg-charcoal-900 text-white sticky top-0 z-10">
        <div className="container-app">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <Car className="h-6 w-6 text-accent-500" />
              <h1 className="font-bold text-lg">Admin · [NOME AUTONOLEGGIO]</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-charcoal-400 hidden sm:block">{user.email}</span>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-sm text-charcoal-300 hover:text-white transition-colors focus-ring rounded-lg px-2 py-1"
              >
                <LogOut className="h-4 w-4" />
                Esci
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container-app py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-charcoal-200">
          <TabButton active={tab === 'quotes'} onClick={() => setTab('quotes')} icon={<MessageSquare className="h-4 w-4" />}>
            Richieste preventivo
          </TabButton>
          <TabButton active={tab === 'vehicles'} onClick={() => setTab('vehicles')} icon={<Car className="h-4 w-4" />}>
            Veicoli
          </TabButton>
          <TabButton active={tab === 'faqs'} onClick={() => setTab('faqs')} icon={<FileText className="h-4 w-4" />}>
            FAQ
          </TabButton>
        </div>

        {tab === 'quotes' && <QuotesTab />}
        {tab === 'vehicles' && <VehiclesTab />}
        {tab === 'faqs' && <FaqsTab />}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition-colors focus-ring rounded-t-lg ${
        active
          ? 'border-accent-500 text-accent-600'
          : 'border-transparent text-charcoal-500 hover:text-charcoal-800'
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

// =================== QUOTES TAB ===================
function QuotesTab() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [vehicles, setVehicles] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchQuotes() {
      const [{ data: quoteData }, { data: vehicleData }] = await Promise.all([
        supabase.from('quote_requests').select('*').order('created_at', { ascending: false }),
        supabase.from('vehicles').select('id, brand, model'),
      ]);

      const vMap = new Map<string, string>();
      (vehicleData ?? []).forEach((v: { id: string; brand: string; model: string }) => {
        vMap.set(v.id, `${v.brand} ${v.model}`);
      });
      setVehicles(vMap);
      setQuotes((quoteData as QuoteRequest[]) ?? []);
      setLoading(false);
    }
    fetchQuotes();
  }, []);

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from('quote_requests').update({ status }).eq('id', id);
    if (!error) {
      setQuotes((prev) => prev.map((q) => (q.id === id ? { ...q, status: status as QuoteRequest['status'] } : q)));
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (quotes.length === 0) {
    return <EmptyState text="Nessuna richiesta preventivo ricevuta." />;
  }

  const statusColors: Record<string, string> = {
    'Nuova': 'bg-blue-100 text-blue-700',
    'In attesa': 'bg-amber-100 text-amber-700',
    'Confermata': 'bg-green-100 text-green-700',
    'Completata': 'bg-charcoal-100 text-charcoal-700',
    'Annullata': 'bg-red-100 text-red-700',
  };

  return (
    <div className="space-y-4">
      {quotes.map((q) => (
        <div key={q.id} className="bg-white rounded-xl border border-charcoal-100 p-5 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <h3 className="font-bold text-charcoal-900">{q.full_name}</h3>
              <p className="text-xs text-charcoal-400">
                {new Date(q.created_at).toLocaleString('it-IT', { dateStyle: 'short', timeStyle: 'short' })}
              </p>
            </div>
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusColors[q.status] ?? statusColors['Nuova']}`}>
              {q.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-4">
            <div className="flex items-center gap-2 text-charcoal-600">
              <Mail className="h-4 w-4 text-charcoal-400" />
              <a href={`mailto:${q.email}`} className="hover:text-accent-600">{q.email}</a>
            </div>
            <div className="flex items-center gap-2 text-charcoal-600">
              <Phone className="h-4 w-4 text-charcoal-400" />
              <a href={`tel:${q.phone}`} className="hover:text-accent-600">{q.phone}</a>
            </div>
            {q.pickup_date && (
              <div className="flex items-center gap-2 text-charcoal-600">
                <Calendar className="h-4 w-4 text-charcoal-400" />
                Ritiro: {q.pickup_date} {q.pickup_time}
              </div>
            )}
            {q.return_date && (
              <div className="flex items-center gap-2 text-charcoal-600">
                <Clock className="h-4 w-4 text-charcoal-400" />
                Riconsegna: {q.return_date} {q.return_time}
              </div>
            )}
          </div>

          {q.vehicle_id && (
            <p className="text-sm text-charcoal-600 mb-3">
              <span className="font-medium">Veicolo:</span> {vehicles.get(q.vehicle_id) ?? 'N/D'}
            </p>
          )}

          {q.message && (
            <p className="text-sm text-charcoal-600 bg-charcoal-50 rounded-lg p-3 mb-4">{q.message}</p>
          )}

          <div>
            <label className="text-xs text-charcoal-400 uppercase tracking-wider">Cambia stato</label>
            <select
              value={q.status}
              onChange={(e) => updateStatus(q.id, e.target.value)}
              className="mt-1 block w-full sm:w-auto rounded-lg border border-charcoal-200 px-3 py-2 text-sm focus-ring focus:border-accent-500"
            >
              <option value="Nuova">Nuova</option>
              <option value="In attesa">In attesa</option>
              <option value="Confermata">Confermata</option>
              <option value="Completata">Completata</option>
              <option value="Annullata">Annullata</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}

// =================== VEHICLES TAB ===================
function VehiclesTab() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVehicles() {
      const { data } = await supabase.from('vehicles').select('*').order('sort_order', { ascending: true });
      setVehicles((data as Vehicle[]) ?? []);
      setLoading(false);
    }
    fetchVehicles();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (vehicles.length === 0) return <EmptyState text="Nessun veicolo nel database." />;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {vehicles.map((v) => (
        <div key={v.id} className="bg-white rounded-xl border border-charcoal-100 overflow-hidden shadow-sm">
          <div className="aspect-[16/10] bg-charcoal-100">
            {v.image_url && (
              <img src={v.image_url} alt={`${v.brand} ${v.model}`} className="h-full w-full object-cover" />
            )}
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-charcoal-900">{v.brand} {v.model}</h3>
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${v.active ? 'bg-green-100 text-green-700' : 'bg-charcoal-100 text-charcoal-500'}`}>
                {v.active ? 'Attivo' : 'Inattivo'}
              </span>
            </div>
            <p className="text-xs text-charcoal-500">{v.category} · {v.seats} posti · {v.transmission}</p>
            <p className="text-sm font-semibold text-charcoal-900 mt-2">€{v.price_per_day} / giorno</p>
            <Link to={`/auto/${v.id}`} className="text-xs text-accent-600 hover:text-accent-700 mt-2 inline-block">
              Vedi pagina pubblica →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

// =================== FAQS TAB ===================
function FaqsTab() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFaqs() {
      const { data } = await supabase.from('faqs').select('*').order('sort_order', { ascending: true });
      setFaqs((data as Faq[]) ?? []);
      setLoading(false);
    }
    fetchFaqs();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (faqs.length === 0) return <EmptyState text="Nessuna FAQ nel database." />;

  return (
    <div className="space-y-3">
      {faqs.map((f) => (
        <div key={f.id} className="bg-white rounded-xl border border-charcoal-100 p-5 shadow-sm">
          <div className="flex items-start justify-between gap-3 mb-2">
            <h3 className="font-semibold text-charcoal-900">{f.question}</h3>
            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold flex-shrink-0 ${f.active ? 'bg-green-100 text-green-700' : 'bg-charcoal-100 text-charcoal-500'}`}>
              {f.active ? 'Attiva' : 'Inattiva'}
            </span>
          </div>
          <p className="text-sm text-charcoal-600 leading-relaxed">{f.answer}</p>
        </div>
      ))}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-8 w-8 text-accent-500 animate-spin" />
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="text-center py-20 text-charcoal-400">
      <p>{text}</p>
    </div>
  );
}
