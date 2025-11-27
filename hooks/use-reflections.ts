import useSWR from 'swr';
import { REFLECTIONS_FILTER } from '@/components/Reflections/constants';
import { IWords, Reflection } from '@/components/Reflections/types';
import { getPublishedReflections } from '@/lib/services/reflectionsService';

interface Response {
  words?: IWords[];
  data?: any[];
}

interface IProps {
  activeFilter?: string;
}

// small helper to strip HTML (reuse pattern from use-songs)
function stripHtml(input?: string | null) {
  if (!input) return '';
  const noTags = input.replace(/<[^>]*>/g, '');
  return noTags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

const useReflections = ({ activeFilter = REFLECTIONS_FILTER[0] }: IProps = {}) => {
  const { data, error, isLoading } = useSWR<Response>('reflections', getPublishedReflections, {
    revalidateOnFocus: false,
  });

  // Build a map to deduplicate reflections by id
  const reflectionMap = new Map<number, Reflection>();

  // Normalize possible shapes: data array, or words[].reflections
  const rawWords = data?.words || data?.data || [];

  if (Array.isArray(rawWords)) {
    // If shape is words array where each word has reflections
    rawWords.forEach((w: any) => {
      if (Array.isArray(w.reflections)) {
        w.reflections.forEach((r: Reflection) => {
          reflectionMap.set(r.id, {
            ...r,
            // keep original raw object for exact display if needed
            __raw: r,
            // sanitized excerpt kept for fallback
            excerpt: stripHtml((r as any).excerpt || (r as any).about || ''),
          });
        });
      } else if ((w as any).id && (w as any).title) {
        // If the API returned reflections directly as array items
        const r = w as unknown as Reflection;
        reflectionMap.set(r.id, {
          ...r,
          __raw: r,
          excerpt: stripHtml((r as any).excerpt || (r as any).about || ''),
        });
      }
    });
  }

  const uniqueReflections = [...reflectionMap.values()];

  // Filter results based on active filter
  const filteredResults =
    activeFilter === 'ALL'
      ? uniqueReflections
      : uniqueReflections.filter((item: any) =>
          (item?.title || '')
            .toString()
            .toLowerCase()
            .startsWith((activeFilter || '').toLowerCase())
        );

  return {
    reflections: filteredResults,
    totalResults: filteredResults?.length || 0,
    isLoading,
    error,
  };
};

export default useReflections;
