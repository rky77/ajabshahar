import useSWR from "swr";
import { Film } from "@/components/movies/type";
import { getPublishedFilms } from "@/lib/services/filmsService";

const useFilms = () => {
  const { data, error, isLoading } = useSWR(
    "published-films",
    getPublishedFilms,
    { revalidateOnFocus: false }
  );

  const filmsArray = Array.isArray(data) ? data : [];

  const films: Film[] = filmsArray.map((r: any) => ({
    id: Number(r.id),

    englishTranslation: r.english_translation || "",
    englishTransliteration: r.english_transliteration || "",

    duration: r.duration || "",
    yearOfProduction: r.year_of_production || "",

    thumbnailUrl: r.thumbnail_url || null,
    profileText: r.about_text || "",

    directors: r.director_name_english
      ? [{ id: 0, name: r.director_name_english }]
      : [],

    // Fill other optional fields to prevent undefined errors
    metaTitle: r.meta_title || "",
    metaKeywords: r.meta_keywords || "",
    metaDescription: r.meta_description || "",
    originalTitle: r.original_title || "",
    aboutText: r.about_text || "",
    youtubeVideoId: null,

    producers: [],
    primaryWords: [],
    secondaryWords: [],
    primarySongs: [],
    secondarySongs: [],
    primaryPeople: [],
    secondaryPeople: [],
    primaryReflections: [],
    secondaryReflections: [],
    relatedCouplets: [],
    stories: [],
    contributes: [],
    filmEpisodes: [],
    showOnLandingPage: true,
    isPublished: true,
  }));

  return {
    films,
    isLoading,
    error,
    rawData: data,
  };
};

export default useFilms;
