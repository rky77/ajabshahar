import { POEMS_FILTER } from '@/components/Poems/constants';
import { getPublishedPoems } from '@/lib/services/poemsService';
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

interface ApiPoem {
  id: string;
  original_title: string;
  couplet_transliteration: string;
  couplet_translation: string;
  related_songs: string;
  soundCloud_track_url: string | null;
  related_reflections: string;
  related_words: string;
  related_films: string;
  related_filmEpisode: string;
  related_couplets: string;
  related_people: string;
  related_stories: string;
  attributed_poet: string;
  translator: string | null;
  poet_id: string | null;
  soundCloud_iD: string;
  original_text: string;
  english_transliteration_text: string;
  english_translation_text: string;
  note_text: string;
  glossary: string | null;
  thumbnail_url: string;
  thumbnail_image_upload: string | null;
  show_on_landing_page: string;
  is_published: string;
  meta_title: string;
  meta_keywords: string;
  keywords: string | null;
  thumbnail_excerpt: string | null;
  meta_description: string;
  created_at: string;
}

interface PoemsResponse {
  data: ApiPoem[];
}

interface IProps {
  activeFilter?: string;
}

const usePoems = ({ activeFilter = POEMS_FILTER[0] }: IProps = {}) => {
  const { data, error, isLoading } = useSWR<PoemsResponse | ApiPoem[]>(
    'published-poems',
    getPublishedPoems,
    { revalidateOnFocus: false }
  );

  // ✅ API se array lo (agar undefined ho to empty array)
  const apiPoems: ApiPoem[] = Array.isArray(data) ? data : data?.data || [];

  // Filter only published poems
  const publishedApiPoems = apiPoems.filter((poem) => poem.is_published === "1");

  // ✅ API → UI normalize karo
  const poems = publishedApiPoems.map((item) => ({
    // original sab rakh rahe hain
    ...item,

    // UI ke liye extra friendly fields
    id: item.id,
    title: item.original_title, // simple title
    englishTransliteration: item.english_transliteration_text || item.original_title,
    englishTranslation: item.english_translation_text,
    poet: {
      id: item.poet_id || item.id,
      name: item.attributed_poet || 'Unknown',
    },
    coupletTransliteration: item.couplet_transliteration,
    coupletTranslation: item.couplet_translation,
    about: item.meta_description,
    // ensure components expecting metaDescription / poets / singers get values
    // strip HTML so UI doesn't show raw tags like <p style=...>
    metaDescription: stripHtml(item.meta_description),
    poets: item.attributed_poet ? [{ id: Number(item.poet_id) || 0, name: item.attributed_poet }] : [],
    singers: [], // poems might not have singers
    thumbnail: item.thumbnail_url,

    // agar kahin pehle se yeh use ho raha ho:
    songTitle: {
      englishTransliteration: item.original_title,
    },
    metaTitle: item.meta_title,
  }));

  // 🔀 Shuffle
  const shuffledPoems = poems.slice().sort(() => Math.random() - 0.5);

  const visiblePoems = shuffledPoems.slice(0, 5);

  // 🔎 Filter
  const filteredPoems =
    activeFilter === 'ALL'
      ? poems
      : poems.filter((item) =>
          (item.metaTitle || '')
            .toLowerCase()
            .startsWith(activeFilter.toLowerCase())
        );

  return {
    publishedPoems: filteredPoems,
    totalPoems: poems.length,
    shuffledPoems,
    visiblePoems,
    isLoading,
    error,
  };
};

export default usePoems;