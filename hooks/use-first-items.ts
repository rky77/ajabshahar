import useSWR from 'swr';
import { getFirstItems } from '@/lib/services/homeService';

interface FirstItemsResponse {
  song?: any | null;
  reflection?: any | null;
  person?: any | null;
  film?: any | null;
}

const useFirstItems = () => {
  const { data, error, isLoading } = useSWR<FirstItemsResponse>('first_items', getFirstItems, {
    revalidateOnFocus: false,
  });

  // Print what the SWR fetcher returns to browser console so developer/user can inspect
  if (typeof window !== 'undefined') {
    if (data) console.log('[useFirstItems] data:', data);
    if (error) console.error('[useFirstItems] error:', error);
  }

  return {
    data: data || { song: null, reflection: null, person: null, film: null },
    isLoading,
    error,
  };
};

export default useFirstItems;
