'use client';

import Loader from '@/components/Loader';
import useReflections from '@/hooks/use-reflections';
import { useState } from 'react';
import { REFLECTIONS_FILTER, REFLECTIONS_INTRO } from './constants';
import ReflectionsCard from './ReflectionsCard';
import './Reflections.css';

const Reflections = () => {
  const [activeFilter, setActiveFilter] = useState(REFLECTIONS_FILTER[0]);

  const {
    reflections = [],
    totalResults,
    isLoading,
  } = useReflections({ activeFilter: activeFilter });

  // Transform API data
  const transformReflectionsData = (data) => {
    if (!data || !Array.isArray(data)) {
      return [];
    }

    // Extract reflections from nested structure if needed
    let allReflections = [];

    // Check if reflections are nested under 'words' array
    if (data.length > 0 && data[0]?.reflections) {
      allReflections = data.flatMap((word) => word.reflections || []);
    } else {
      allReflections = data;
    }

    // Map and normalize different possible API field names
    const mapped = allReflections.map((reflection) => {
      // if useReflections stored the original API object under __raw, prefer that
      const raw = reflection?.__raw || reflection || {};

      const id = reflection?.id || raw?.id || raw?.ID || null;
      const title =
        raw?.title || raw?.metaTitle || raw?.meta_title || raw?.name || reflection?.metaTitle || reflection?.title || '';
      const excerpt =
        raw?.excerpt || raw?.metaDescription || raw?.meta_description || raw?.about || raw?.description || reflection?.excerpt || reflection?.metaDescription || '';
      const thumbnail = raw?.thumbnailURL || raw?.thumbnail || raw?.thumbnail_url || reflection?.thumbnailURL || null;
      const speaker =
        raw?.person_name_english || raw?.person_name_hindi || raw?.person_name || raw?.speaker || raw?.author || raw?.singer_name || reflection?.speaker || null;
      const youtube = raw?.youtubeVideoId || raw?.youtube || raw?.youtube_video_id || reflection?.youtubeVideoId || null;
      const poets = raw?.poets || raw?.singers || reflection?.poets || [];
      const songTitle = raw?.songTitle || reflection?.songTitle || { englishTranslation: raw?.song || raw?.song_title || '' };

      if (!id && !title && !excerpt) {
        // nothing meaningful to render
        console.warn('Skipping empty reflection item:', reflection);
        return null;
      }

      return {
        id,
        metaTitle: title,
        metaDescription: excerpt,
        thumbnailURL: thumbnail,
        speaker,
        youtubeVideoId: youtube,
        poets,
        songTitle,
      };
    });

    // remove nulls
    const result = mapped.filter(Boolean);
    // debug: log how many items we will render
    if (result.length === 0) console.debug('transformReflectionsData: no usable reflections found');
    else console.debug(`transformReflectionsData: preparing ${result.length} reflections`);
    return result;
  };

  const transformedReflections = transformReflectionsData(reflections);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-8">
          {/* Main Content */}
          <div className="max-w-6xl mx-auto px-4 pb-8">
            {/* Search Header */}
            <div className="text-center reflections-about mb-8">{REFLECTIONS_INTRO}</div>

            {/* Results Header */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-light black-custom-color">
                {totalResults} Reflections
              </h1>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-start gap-4 mb-8 border-top-heading pt-6 pb-4">
              <span className="text-pink fillter font-medium">Filters</span>
              <span className="all text-gray-600">All</span>
              {/* {REFLECTIONS_FILTER.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full border text-sm font-medium transition-colors ${
                    activeFilter === filter
                      ? 'bg-pink-500 text-white border-pink-500'
                      : 'bg-white text-gray-600 border-gray-300 hover:border-pink-300'
                  }`}
                >
                  {filter}
                </button>
              ))} */}
            </div>

            {/* Results Grid */}
            {transformedReflections.length > 0 ? (
              <div className="reflections-card-container">
                {transformedReflections.slice(0, 6).map((reflection) => (
                  <ReflectionsCard key={reflection.id} {...reflection} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-4">No reflections found</div>
                <p className="text-gray-400">Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Reflections;
