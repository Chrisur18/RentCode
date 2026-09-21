import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { demoVehicles } from '@/data/vehicles';
import type { Vehicle } from '@/types';

interface UseVehiclesResult {
  vehicles: Vehicle[];
  loading: boolean;
  error: string | null;
}

export function useVehicles(): UseVehiclesResult {
  const [vehicles, setVehicles] = useState<Vehicle[]>(demoVehicles);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchVehicles() {
      try {
        const { data, error: fetchError } = await supabase
          .from('vehicles')
          .select('*')
          .eq('active', true)
          .order('sort_order', { ascending: true });

        if (cancelled) return;

        if (fetchError) {
          console.warn('Supabase query failed, using demo data:', fetchError.message);
          setError(null);
          setVehicles(demoVehicles);
          return;
        }

        if (data && data.length > 0) {
          setVehicles(data as Vehicle[]);
        } else {
          setVehicles(demoVehicles);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('Falling back to demo vehicle data:', err);
          setVehicles(demoVehicles);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchVehicles();

    return () => {
      cancelled = true;
    };
  }, []);

  return { vehicles, loading, error };
}

interface UseVehicleResult {
  vehicle: Vehicle | null;
  loading: boolean;
  error: string | null;
}

export function useVehicle(id: string | undefined): UseVehicleResult {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setVehicle(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchVehicle() {
      const demo = demoVehicles.find((v) => v.id === id);
      try {
        const { data, error: fetchError } = await supabase
          .from('vehicles')
          .select('*')
          .eq('id', id)
          .maybeSingle();

        if (cancelled) return;

        if (fetchError) {
          console.warn('Supabase query failed, using demo data:', fetchError.message);
          setVehicle(demo ?? null);
          return;
        }

        if (data) {
          setVehicle(data as Vehicle);
        } else {
          setVehicle(demo ?? null);
          if (!demo) setError('Veicolo non trovato.');
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('Falling back to demo data:', err);
          setVehicle(demo ?? null);
          if (!demo) setError('Veicolo non trovato.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchVehicle();

    return () => {
      cancelled = true;
    };
  }, [id]);

  return { vehicle, loading, error };
}
