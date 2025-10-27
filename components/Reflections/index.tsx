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

    return allReflections
      .map((reflection) => {
        // Validate required fields
        if (!reflection?.id || !reflection?.title || !reflection?.excerpt) {
          console.warn('Skipping invalid reflection:', reflection);
          return null;
        }

        return {
          id: reflection.id,
          metaTitle: reflection.title,
          metaDescription: reflection.excerpt,
          thumbnailURL: reflection.thumbnailURL,
          speaker: reflection.speaker,
          youtubeVideoId: reflection.youtubeVideoId,
          poets: reflection.poets || [],
          songTitle: reflection.songTitle || { englishTranslation: '' },
        };
      })
      .filter(Boolean);
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
