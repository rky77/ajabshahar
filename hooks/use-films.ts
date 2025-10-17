import { Film } from '@/components/Films/type';
import { getPublishedFilms } from '@/lib/services/filmsService';
import useSWR from 'swr';

const useFilms = () => {
  const { data, error, isLoading } = useSWR<Film[]>('published-films', getPublishedFilms, {
    revalidateOnFocus: false,
  });

  return {
    films: data,
    isLoading,
    error,
  };
};

export default useFilms;
