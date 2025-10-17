import { REFLECTIONS_FILTER } from '@/components/Reflections/constants';
import { IWords, Reflection } from '@/components/Reflections/types';
import { getPublishedReflections } from '@/lib/services/reflectionsService';
import useSWR from 'swr';

interface Response {
  words: IWords[];
}

interface IProps {
  activeFilter?: string;
}

const useReflections = ({ activeFilter = REFLECTIONS_FILTER[0] }: IProps = {}) => {
  const { data, error, isLoading } = useSWR<Response>('reflections', getPublishedReflections, {
    revalidateOnFocus: false,
  });

  const reflectionMap = new Map<number, Reflection>();

  data?.words?.forEach((w) =>
    w.reflections?.forEach((r) => {
      reflectionMap.set(r.id, r); // Overwrites duplicates (same as deduplication)
    })
  );
  const uniqueReflections = [...reflectionMap.values()];

  // Filter results based on active filter
  const filteredResults =
    activeFilter === 'ALL'
      ? uniqueReflections
      : uniqueReflections.filter((item: any) => item?.title.toLowerCase().startsWith(activeFilter));

  return {
    reflections: filteredResults,
    totalResults: filteredResults?.length,
    isLoading,
    error,
  };
};

export default useReflections;
