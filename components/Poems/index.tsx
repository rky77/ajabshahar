'use client';

import Loader from '@/components/Loader';
import useSongs from '@/hooks/use-songs';
import { useState } from 'react';
import { Song } from '../Home/SongCard/types';
import { POEMS_FILTER, POEMS_INTRO } from './constants';
import './Poem.css';
import PoemsSlider from './PoemsSlider';
import PoemsRelatedItem from './PoemsRelatedItem';
import PoemsTags from './PoemsTags';

export default function Poems() {
  const [activeFilter, setActiveFilter] = useState(POEMS_FILTER[0]);

  //need to change once API for this is known
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
            <div className="text-center poems-about">{POEMS_INTRO}</div>
            <div className="text-left mb-2">
              <h1 className="text-2xl md:text-3xl font-light black-custom-color mb-0 mt-0">
                {totalSongs} songs
              </h1>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-start gap-4 mb-10 heading-border pt-3 pb-4">
              <span className="text-pink see-all">See All </span>
              {/* {POEMS_FILTER.map((filter: string) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={` border-0 button-font cursor-pointer uppercase transition-colors ${
                    activeFilter === filter ? 'text-pink text-white' : 'bg-white  border search-btn'
                  }`}
                >
                  {filter}
                </button>
              ))} */}
            </div>
            <PoemsSlider />
            <PoemsRelatedItem />
            <PoemsTags />

            {/* Results */}
            {/* <div className="space-y-8">
              {publishedSongs?.length > 0
                ? publishedSongs.map((song: Song) => {
                    const hasMedia = song.youtubeVideoId || song.thumbnailURL;
                    return (
                      <div
                        key={song.id}
                        className={`bg-white break-inside-avoid mb-6 product-card py-0.5 ${
                          !hasMedia ? 'no-media-padding' : ''
                        }`}
                      ></div>
                    );
                  })
                : 'No results Found!'}
            </div> */}
          </div>
        </div>
      )}
    </>
  );
}
