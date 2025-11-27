import { SONGS_FILTER } from '@/components/Songs/constants';
import { getPublishedSongs } from '@/lib/services/songsService';
import useSWR from 'swr';

// small util to remove HTML tags from strings coming from the API
function stripHtml(input?: string | null) {
  if (!input) return '';
  // remove tags
  const noTags = input.replace(/<[^>]*>/g, '');
  // basic decode for common HTML entities
  return noTags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

interface ApiSong {
  id: string;
  thumbnail_url: string;
  about: string;
  published_date: string;
  song_title: string;
  singer_name: string;
  // agar api me aur fields ho to yaha add kar sakte ho
}

interface SongsResponse {
  data: ApiSong[];
}

interface IProps {
  activeFilter?: string;
}

const useSongs = ({ activeFilter = SONGS_FILTER[0] }: IProps = {}) => {
  const { data, error, isLoading } = useSWR<SongsResponse>(
    'published-songs',
    getPublishedSongs,
    { revalidateOnFocus: false }
  );

  // ✅ API se array lo (agar undefined ho to empty array)
  const apiSongs: ApiSong[] = data?.data || [];

  // ✅ API → UI normalize karo
  const songs = apiSongs.map((item) => ({
    // original sab rakh rahe hain
    ...item,

    // UI ke liye extra friendly fields
    id: item.id,
    title: item.song_title,            // simple title
    singerName: item.singer_name,
    about: item.about,
    // ensure components expecting metaDescription / poets / singers get values
    // strip HTML so UI doesn't show raw tags like <p style=...>
    metaDescription: stripHtml(item.about),
    poets: item.singer_name ? [{ id: Number(item.id) || 0, name: item.singer_name }] : [],
    singers: item.singer_name ? [{ id: Number(item.id) || 0, name: item.singer_name }] : [],
    thumbnail: item.thumbnail_url,

    // agar kahin pehle se yeh use ho raha ho:
    songTitle: {
      englishTransliteration: item.song_title,
    },
    metaTitle: item.song_title,
  }));

  // 🔀 Shuffle
  const shuffledSongs = songs.slice().sort(() => Math.random() - 0.5);

  const visibleSongs = shuffledSongs.slice(0, 5);

  // 🔎 Filter
  const filteredSongs =
    activeFilter === 'ALL'
      ? songs
      : songs.filter((item) =>
          (item.metaTitle || '')
            .toLowerCase()
            .startsWith(activeFilter.toLowerCase())
        );

  return {
    publishedSongs: filteredSongs.slice(0, 9),
    totalSongs: songs.length,
    shuffledSongs,
    visibleSongs,
    isLoading,
    error,
  };
};

export default useSongs;
