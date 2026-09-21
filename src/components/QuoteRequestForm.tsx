import { useState, type FormEvent } from 'react';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useVehicles } from '@/hooks/useVehicles';
import { Button } from '@/components/ui/Button';
import { buildWhatsAppUrl, defaultWhatsAppMessage } from '@/config/site';

interface QuoteFormProps {
  defaultVehicleId?: string;
}

interface FormData {
  full_name: string;
  email: string;
  phone: string;
  pickup_date: string;
  pickup_time: string;
  return_date: string;
  return_time: string;
  vehicle_id: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

const initialData: FormData = {
  full_name: '',
  email: '',
  phone: '',
  pickup_date: '',
  pickup_time: '',
  return_date: '',
  return_time: '',
  vehicle_id: '',
  message: '',
};

export function QuoteRequestForm({ defaultVehicleId }: QuoteFormProps) {
  const { vehicles } = useVehicles();
  const [data, setData] = useState<FormData>({
    ...initialData,
    vehicle_id: defaultVehicleId ?? '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  function validate(): FormErrors {
    const e: FormErrors = {};
    if (!data.full_name.trim()) e.full_name = 'Inserisci il tuo nome e cognome.';
    if (!data.email.trim()) {
      e.email = 'Inserisci la tua email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = 'Inserisci un indirizzo email valido.';
    }
    if (!data.phone.trim()) {
      e.phone = 'Inserisci il tuo numero di telefono.';
    } else if (!/^[+]?[\d\s()-]{8,}$/.test(data.phone)) {
      e.phone = 'Inserisci un numero di telefono valido.';
    }
    if (!data.pickup_date) e.pickup_date = 'Seleziona la data di ritiro.';
    if (!data.return_date) e.return_date = 'Seleziona la data di riconsegna.';
    if (data.pickup_date && data.return_date && data.return_date < data.pickup_date) {
      e.return_date = 'La data di riconsegna non può precedere quella di ritiro.';
    }
    return e;
  }

  function handleChange(field: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('submitting');
    try {
      const { error } = await supabase.from('quote_requests').insert({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        pickup_date: data.pickup_date || null,
        pickup_time: data.pickup_time || null,
        return_date: data.return_date || null,
        return_time: data.return_time || null,
        vehicle_id: data.vehicle_id || null,
        message: data.message || null,
        status: 'Nuova',
      });

      if (error) throw error;

      setStatus('success');
      setData({ ...initialData });
    } catch (err) {
      console.error('Quote request submission failed:', err);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center animate-scale-in">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-600 mb-4" />
        <h3 className="text-xl font-bold text-charcoal-900 mb-2">
          Richiesta inviata con successo!
        </h3>
        <p className="text-charcoal-600 mb-6 max-w-md mx-auto">
          Grazie per averci contattato. Ti risponderemo al più presto con una proposta personalizzata.
          Se preferisci una risposta immediata, puoi scriverci su WhatsApp.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={() => setStatus('idle')}
          >
            Invia un'altra richiesta
          </Button>
          <a
            href={buildWhatsAppUrl(defaultWhatsAppMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl bg-[#25D366] text-white hover:bg-[#1da851] transition-colors focus-ring"
          >
            Scrivici su WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {status === 'error' && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">
            Si è verificato un errore durante l'invio della richiesta. Riprova o contattaci direttamente via WhatsApp.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Nome e cognome" error={errors.full_name} required>
          <input
            type="text"
            value={data.full_name}
            onChange={(e) => handleChange('full_name', e.target.value)}
            className={inputClass(errors.full_name)}
            placeholder="Mario Rossi"
          />
        </Field>

        <Field label="Email" error={errors.email} required>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={inputClass(errors.email)}
            placeholder="mario.rossi@email.com"
          />
        </Field>

        <Field label="Telefono" error={errors.phone} required>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={inputClass(errors.phone)}
            placeholder="+39 333 1234567"
          />
        </Field>

        <Field label="Automobile desiderata">
          <select
            value={data.vehicle_id}
            onChange={(e) => handleChange('vehicle_id', e.target.value)}
            className={inputClass()}
          >
            <option value="">Nessuna preferenza</option>
            {vehicles.map((v) => (
              <option key={v.id} value={v.id}>
                {v.brand} {v.model} — {v.category}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label="Data ritiro" error={errors.pickup_date} required>
          <input
            type="date"
            value={data.pickup_date}
            onChange={(e) => handleChange('pickup_date', e.target.value)}
            className={inputClass(errors.pickup_date)}
          />
        </Field>

        <Field label="Ora ritiro">
          <input
            type="time"
            value={data.pickup_time}
            onChange={(e) => handleChange('pickup_time', e.target.value)}
            className={inputClass()}
          />
        </Field>

        <Field label="Data riconsegna" error={errors.return_date} required>
          <input
            type="date"
            value={data.return_date}
            onChange={(e) => handleChange('return_date', e.target.value)}
            className={inputClass(errors.return_date)}
            min={data.pickup_date || undefined}
          />
        </Field>

        <Field label="Ora riconsegna">
          <input
            type="time"
            value={data.return_time}
            onChange={(e) => handleChange('return_time', e.target.value)}
            className={inputClass()}
          />
        </Field>
      </div>

      <Field label="Messaggio">
        <textarea
          value={data.message}
          onChange={(e) => handleChange('message', e.target.value)}
          rows={4}
          className={inputClass()}
          placeholder="Tell us about your needs, special requests, or questions..."
        />
      </Field>

      <div className="pt-2">
        <Button
          type="submit"
          size="lg"
          className="w-full sm:w-auto"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Invio in corso...
            </>
          ) : (
            'Richiedi preventivo'
          )}
        </Button>
      </div>

      <p className="text-xs text-charcoal-400">
        Inviando questa richiesta accetti di essere contattato per rispondere alla tua richiesta.
        Nessun pagamento viene elaborato in questa fase.
      </p>
    </form>
  );
}

function inputClass(error?: string): string {
  return `w-full rounded-xl border px-4 py-3 text-sm transition-colors focus-ring ${
    error
      ? 'border-red-300 bg-red-50 focus:border-red-500'
      : 'border-charcoal-200 bg-white focus:border-accent-500'
  }`;
}

interface FieldProps {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ label, error, required, children }: FieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-charcoal-700 mb-1.5">
        {label}
        {required && <span className="text-accent-600 ml-0.5">*</span>}
      </label>
      {children}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
