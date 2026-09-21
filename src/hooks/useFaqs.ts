import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { demoFaqs } from '@/data/faqs';
import type { Faq } from '@/types';

interface UseFaqsResult {
  faqs: Faq[];
  loading: boolean;
}

export function useFaqs(): UseFaqsResult {
  const [faqs, setFaqs] = useState<Faq[]>(demoFaqs);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function fetchFaqs() {
      try {
        const { data, error: fetchError } = await supabase
          .from('faqs')
          .select('*')
          .eq('active', true)
          .order('sort_order', { ascending: true });

        if (cancelled) return;

        if (fetchError) {
          console.warn('Supabase query failed, using demo data:', fetchError.message);
          setFaqs(demoFaqs);
          return;
        }

        if (data && data.length > 0) {
          setFaqs(data as Faq[]);
        } else {
          setFaqs(demoFaqs);
        }
      } catch (err) {
        if (!cancelled) {
          console.warn('Falling back to demo FAQ data:', err);
          setFaqs(demoFaqs);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchFaqs();

    return () => {
      cancelled = true;
    };
  }, []);

  return { faqs, loading };
}
