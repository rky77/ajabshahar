'use client';

import Loader from '@/components/Loader';
import { useEffect, useState, useCallback } from 'react';
import { SONGS_FILTER, SONGS_INTRO } from './constants';
import SongCard from './SongCard';
import FilterPanel from '../Fillter/FilterPanel';
import './Songs.css';

export default function SearchResults() {
  const [activeFilter, setActiveFilter] = useState(SONGS_FILTER[0]);

  const [singerName, setSingerName] = useState("");
  const [poetName, setPoetName] = useState("");

  const [publishedSongs, setPublishedSongs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalSongs, setTotalSongs] = useState(0);

  const [page, setPage] = useState(1);
  const limit = 10;
  const [hasMore, setHasMore] = useState(true);

  // ⭐ All → empty string for API
  const getFilterValue = (filter: string) => {
    return filter.toLowerCase() === "all" ? "" : filter;
  };

  // ---------------------------------------------------
  // ⭐ FILTER CLICK (Singer / Poet)
  // ---------------------------------------------------
  const handleFilterSelect = (type: string, value: string) => {
    console.log("Filter Selected:", type, value);

    if (type === "Singer") {
      setSingerName(value);
      setPoetName(""); // reset poet
    }

    if (type === "Poet") {
      setPoetName(value);
      setSingerName(""); // reset singer
    }

    setPage(1);
    setPublishedSongs([]); // Clear existing songs
  };

  // ---------------------------------------------------
  // ⭐ SEARCH TEXT (Apply on both singer + poet)
  // ---------------------------------------------------
  const handleSearchChange = (text: string) => {
    console.log("SEARCH:", text);

    setSingerName(text);
    setPoetName(text);

    setPage(1);
    setPublishedSongs([]); // Clear existing songs
  };

  // ---------------------------------------------------
  // ⭐ MAIN API CALL - useCallback to prevent recreating
  // ---------------------------------------------------
  const fetchSongs = useCallback((reset = false) => {
    setIsLoading(true);

    const searchValue = getFilterValue(activeFilter);

    const apiURL = `https://ajabshahar.aaravega.in/Api/list?search=${searchValue}&page=${page}&limit=${limit}&singer=${singerName}&poet=${poetName}`;

    console.log("API URL:", apiURL);

    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        const list = data?.data || [];

        console.log("✅ API Response:", data);
        console.log("✅ Songs List:", list);

        const formattedSongs = list.map((item: any) => ({
          id: item.id,
          song_title: item.umbrellaTitle,
          songTitle: item.songTitle,
          thumbnailUrl: item.thumbnailUrl,
          published_date: item.published_date,
          singer_name: item.singer,
          poet: item.poet,
          songLyricsTranslated: item.songLyricsTranslated,
           
          
        }));

        console.log("✅ Formatted Songs:", formattedSongs);

        setTotalSongs(data?.total || formattedSongs.length);

        if (reset) {
          setPublishedSongs(formattedSongs);
        } else {
          setPublishedSongs((prev) => [...prev, ...formattedSongs]);
        }

        setHasMore(formattedSongs.length >= limit);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("❌ API Error:", err);
        setIsLoading(false);
      });
  }, [activeFilter, page, limit, singerName, poetName]); // ✅ All dependencies

  // ---------------------------------------------------
  // ⭐ RUN when Singer / Poet / activeFilter changes
  // ---------------------------------------------------
  useEffect(() => {
    setPage(1); // Reset to page 1
    fetchSongs(true); // Reset songs list
  }, [singerName, poetName, activeFilter]);

  // ---------------------------------------------------
  // ⭐ Load More Pagination
  // ---------------------------------------------------
  useEffect(() => {
    if (page > 1) {
      fetchSongs(false); // Append to existing songs
    }
  }, [page, fetchSongs]);

  return (
    <>
      {isLoading && publishedSongs.length === 0 ? (
        <Loader />
      ) : (
        <div className="mt-8">
          <div className="max-w-[1180px] mx-auto px-4 pb-8">

            {/* Header */}
            <div className="text-center songs-about-intro">{SONGS_INTRO}</div>
            <div className="text-left mb-2">
              <h1 className="song-count-text">{totalSongs} songs</h1>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap justify-start gap-1 border-t-costom pt-3 pb-4">
              <span className="text-pink filters">
                <FilterPanel
                  onFilterSelect={handleFilterSelect}
                  onSearchChange={handleSearchChange}
                />
              </span>

              <div className="button-link-container">
                {SONGS_FILTER.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`border-0 button-font all-text cursor-pointer uppercase ${
                      activeFilter === filter
                        ? 'text-pink text-white'
                        : 'bg-white border fillter-btn'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Results */}
            <div className="song-card-container">
              {publishedSongs.length > 0 ? (
                publishedSongs.map((song) => (
                  <div
                    key={song.id}
                    className="bg-white break-inside-avoid mb-6 song-card-landing-p py-0.5"
                  >
                    <SongCard {...song} />
                  </div>
                ))
              ) : (
                !isLoading && <p className="text-center">No songs found!</p>
              )}
            </div>

            {/* Load More */}
            {activeFilter.toLowerCase() === "all" && hasMore && publishedSongs.length > 0 && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={isLoading}
                  className="px-6 py-2 bg-pink text-white rounded-md shadow hover:opacity-90 disabled:opacity-50"
                >
                  {isLoading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}