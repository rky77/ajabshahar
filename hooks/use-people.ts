import { PersonProfile } from '@/components/People/type';
import { SONGS_FILTER } from '@/components/Songs/constants';
import { getPeople } from '@/lib/services/peopleService';
import useSWR from 'swr';

interface Response {
  people: PersonProfile[];
}

interface IProps {
  activeFilter?: string;
}

const usePeople = ({ activeFilter = SONGS_FILTER[0] }: IProps = {}) => {
  const { data, error, isLoading } = useSWR<Response>('people', getPeople, {
    revalidateOnFocus: false,
  });

  const peopleData = data?.people || [];

  // Filter results based on active filter
  const filteredResults =
    activeFilter === 'ALL'
      ? peopleData
      : peopleData.filter((item) => item?.firstName?.toLowerCase().startsWith(activeFilter));

  return {
    people: filteredResults,
    isLoading,
    error,
  };
};

export default usePeople;
