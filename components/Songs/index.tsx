'use client';

import Loader from '@/components/Loader';
import useSongs from '@/hooks/use-songs';
import { useState } from 'react';
import { Song } from '../Home/SongCard/types';
import { SONGS_FILTER, SONGS_INTRO } from './constants';
import SongCard from './SongCard';
import './Songs.css';

export default function SearchResults() {
  const [activeFilter, setActiveFilter] = useState(SONGS_FILTER[0]);
  const { publishedSongs = [], isLoading, totalSongs } = useSongs({ activeFilter: activeFilter });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-8">
          {/* Main Content */}
          <div className="max-w-6xl mx-auto px-4 pb-8">
            {/* Search Header */}
            <div className="text-center songs-about-intro">{SONGS_INTRO}</div>
            <div className="text-left mb-2">
              <h1 className="song-count-text">{totalSongs} songs</h1>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-start gap-1  border-t-costom pt-3 pb-4">
              <span className="text-pink  filters">Filters </span>
              <span className="seprator-all">|</span>
              {SONGS_FILTER.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={` border-0 button-font all-text cursor-pointer uppercase transition-colors ${
                    activeFilter === filter
                      ? 'text-pink text-white'
                      : 'bg-white   border search-btn'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Results */}
            <div className="song-card-container">
              {publishedSongs?.length > 0
                ? publishedSongs.map((song: Song) => {
                    const hasMedia = song.youtubeVideoId || song.thumbnailURL;
                    return (
                      <div
                        key={song.id}
                        className={`bg-white break-inside-avoid mb-6 song-card-landing-p  py-0.5 ${
                          !hasMedia ? 'no-media-padding' : ''
                        }`}
                      >
                        <SongCard {...song} />
                      </div>
                    );
                  })
                : 'No results Found!'}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
