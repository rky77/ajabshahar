'use client';

import Loader from '@/components/Loader';
import { useEffect, useState } from 'react';
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
  };

  // ---------------------------------------------------
  // ⭐ SEARCH TEXT (Apply on both singer + poet)
  // ---------------------------------------------------
  const handleSearchChange = (text: string) => {
    console.log("SEARCH:", text);

    setSingerName(text);
    setPoetName(text);

    setPage(1);
  };

  // ---------------------------------------------------
  // ⭐ MAIN API CALL
  // ---------------------------------------------------
  const fetchSongs = (reset = false) => {
    setIsLoading(true);

    const searchValue = getFilterValue(activeFilter);

    const apiURL = `https://ajabshahar.aaravega.in/Api/list?search=${searchValue}&page=${page}&limit=${limit}&singer=${singerName}&poet=${poetName}`;

    console.log("API URL:", apiURL);

    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        const list = data?.data || [];

        const formattedSongs = list.map((item: any) => ({
          id: item.id,
          song_title: item.song_title,
          about: item.about,
          thumbnail_url: item.thumbnail_url,
          published_date: item.published_date,
          singer_name: item.singer_name,
        }));

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
        console.error("API Error:", err);
        setIsLoading(false);
      });
  };

  // ---------------------------------------------------
  // ⭐ RUN when Singer / Poet changed
  // ---------------------------------------------------
  useEffect(() => {
    fetchSongs(true);
  }, [singerName, poetName]);

  // ---------------------------------------------------
  // ⭐ RUN when Filter button changes (All, New, Popular etc.)
  // ---------------------------------------------------
  useEffect(() => {
    setPage(1);
    fetchSongs(true);
  }, [activeFilter]);

  // ---------------------------------------------------
  // ⭐ Load More Pagination
  // ---------------------------------------------------
  useEffect(() => {
    if (page > 1) fetchSongs();
  }, [page]);

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
              {publishedSongs.map((song) => (
                <div
                  key={song.id}
                  className="bg-white break-inside-avoid mb-6 song-card-landing-p py-0.5"
                >
                  <SongCard {...song} />
                </div>
              ))}
            </div>

            {/* Load More */}
            {activeFilter.toLowerCase() === "all" && hasMore && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="px-6 py-2 bg-pink text-white rounded-md shadow hover:opacity-90"
                >
                  Load More
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}


// 'use client';

// import Loader from '@/components/Loader';
// import { useEffect, useState } from 'react';
// import { SONGS_FILTER, SONGS_INTRO } from './constants';
// import SongCard from './SongCard';
// import FilterPanel from '../Fillter/FilterPanel';
// import './Songs.css';

// export default function SearchResults() {
//   const [activeFilter, setActiveFilter] = useState(SONGS_FILTER[0]);
// const [singerName, setSingerName] = useState("");

//   const [publishedSongs, setPublishedSongs] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [totalSongs, setTotalSongs] = useState(0);

//   const [page, setPage] = useState(1);
//   const limit = 10; // how many songs per page
//   const [hasMore, setHasMore] = useState(true);

//   // ⭐ All → empty string for API
//   const getFilterValue = (filter: string) => {
//     return filter.toLowerCase() === "all" ? "" : filter;
//   };

//   const handleFilterSelect = (type: string, value: string) => {
//       console.log("Filter Selected:", type, value);
//   setSingerName(value);
//       // setActiveFilter(value); 
// };


// console.log("Active Filter:", activeFilter);

//   const handleSearchChange = (text: string) => {
//   console.log("SEARCH VALUE FROM CHILD:", text); // ⭐ here you get search text
//   setSingerName(text);
//   // Yaha API call hota hai
//   // fetchSongs(text);
// };

// console.log("singer name : ", singerName)

//   // ⭐ Fetch Songs
//   const fetchSongs = (reset = false) => {
//     setIsLoading(true);

//     const searchValue = getFilterValue(activeFilter);
//     // const singerName = getFilterValue(activeFilter);
//     console.log(`https://ajabshahar.aaravega.in/Api/list?search=${searchValue}&page=${page}&limit=${limit}&singer=${singerName}&poet= `);

//     fetch(
//       `https://ajabshahar.aaravega.in/Api/list?search=${searchValue}&page=${page}&limit=${limit}&singer=${singerName}&poet=`
//     )
//       .then((res) => res.json())
//       .then((data) => {
//         const list = data?.data || [];

//         console.log("Fetched Songs List:", list);

//         // format
//         const formattedSongs = list.map((item: any) => ({
//           id: item.id,
//           song_title: item.song_title,
//           about: item.about,
//           thumbnail_url: item.thumbnail_url,
//           published_date: item.published_date,
//           singer_name: item.singer_name,
//         }));

//         setTotalSongs(data?.total || formattedSongs.length);

//         // ⭐ Append or Reset
//         if (reset) {
//           setPublishedSongs(formattedSongs);
//         } else {
//           setPublishedSongs((prev) => [...prev, ...formattedSongs]);
//         }

//         // ⭐ Check Load More availability
//         if (formattedSongs.length < limit) {
//           setHasMore(false);
//         } else {
//           setHasMore(true);
//         }

//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.error("API Error:", err);
//         setIsLoading(false);
//       });
//   };

//   // ⭐ Run when filter changes
//   useEffect(() => {
//     setPage(1);
//     fetchSongs(true); // reset list
//   }, [activeFilter]);

//   // ⭐ Run when page increases
//   useEffect(() => {
//     if (page > 1) fetchSongs();
//   }, [page]);

//   return (
//     <>
//       {isLoading && publishedSongs.length === 0 ? (
//         <Loader />
//       ) : (
//         <div className="mt-8">
//           <div className="max-w-[1180px] mx-auto px-4 pb-8">

//             {/* Header */}
//             <div className="text-center songs-about-intro">{SONGS_INTRO}</div>
//             <div className="text-left mb-2">
//               <h1 className="song-count-text">{totalSongs} songs</h1>
//             </div>

//             {/* Filters */}
//             <div className="flex flex-wrap justify-start gap-1 border-t-costom pt-3 pb-4">
//               <span className="text-pink filters">
//                 <FilterPanel  onFilterSelect={handleFilterSelect} 
//   onSearchChange={handleSearchChange} />
//               </span>

//               <div className="button-link-container">
//                 {SONGS_FILTER.map((filter) => (
//                   <button
//                     key={filter}
//                     onClick={() => setActiveFilter(filter)}
//                     className={`border-0 button-font all-text cursor-pointer uppercase ${
//                       activeFilter === filter
//                         ? 'text-pink text-white'
//                         : 'bg-white border fillter-btn'
//                     }`}
//                   >
//                     {filter}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Results */}
//             <div className="song-card-container">
//               {publishedSongs.map((song) => (
//                 <div
//                   key={song.id}
//                   className="bg-white break-inside-avoid mb-6 song-card-landing-p py-0.5"
//                 >
//                   <SongCard {...song} />
//                 </div>
//               ))}
//             </div>

//             {/* ⭐ Load More — ONLY FOR ALL */}
//             {activeFilter.toLowerCase() === "all" && hasMore && (
//               <div className="text-center mt-6">
//                 <button
//                   onClick={() => setPage((p) => p + 1)}
//                   className="px-6 py-2 bg-pink text-white rounded-md shadow hover:opacity-90" style={{"color":"red"}}
//                 >
//                   Load More
//                 </button>
//               </div>
//             )}

//           </div>
//         </div>
//       )}
//     </>
//   );
// }


// 'use client';

// import Loader from '@/components/Loader';
// import { useEffect, useState } from 'react';
// import { SONGS_FILTER, SONGS_INTRO } from './constants';
// import SongCard from './SongCard';
// import FilterPanel from '../Fillter/FilterPanel';
// import './Songs.css';

// export default function SearchResults() {
//   const [activeFilter, setActiveFilter] = useState(SONGS_FILTER[0]);

//   const [publishedSongs, setPublishedSongs] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [totalSongs, setTotalSongs] = useState(0);

//   console.log("Active Filter:", activeFilter);
//   // ✅ API Fetch + Correct Formatting for SongCard
//   useEffect(() => {
//     setIsLoading(true);

//     fetch(`https://ajabshahar.aaravega.in/Api/list?search=${activeFilter}&page=&limit=`)
//       .then((res) => res.json())
//       .then((data) => {
//         const list = data?.data || [];
//         console.log("Fetched Songs List:", list);

//         // ⭐ Convert API → SongCard required structure
//         const formattedSongs = list.map((item: any) => ({
//           id: item.id,
//           song_title: item.song_title,
//           about: item.about,
//           thumbnail_url: item.thumbnail_url,
//           published_date: item.published_date,
//           singer_name: item.singer_name,
//         }));

//         setPublishedSongs(formattedSongs);
//         setTotalSongs(formattedSongs.length);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.error("API Error:", err);
//         setIsLoading(false);
//       });

//   }, [activeFilter]);

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="mt-8">
//           <div className="max-w-[1180px] mx-auto px-4 pb-8">

//             {/* Header */}
//             <div className="text-center songs-about-intro">{SONGS_INTRO}</div>
//             <div className="text-left mb-2">
//               <h1 className="song-count-text">{totalSongs} songs</h1>
//             </div>

//             {/* Filters */}
//             <div className="flex flex-wrap justify-start gap-1 border-t-costom pt-3 pb-4 pr-2 pl-2">
//               <span className="text-pink filters">
//                 <FilterPanel />
//               </span>

//               <div className="button-link-container">
//                 {SONGS_FILTER.map((filter) => (
//                   <button
//                     key={filter}
//                     onClick={() => setActiveFilter(filter)}
//                     className={`border-0 button-font all-text cursor-pointer uppercase ${
//                       activeFilter === filter
//                         ? 'text-pink text-white'
//                         : 'bg-white border fillter-btn'
//                     }`}
//                   >
//                     {filter}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Results */}
//             <div className="song-card-container">
//               {publishedSongs.length > 0 ? (
//                 publishedSongs.map((song) => (
//                   <div
//                     key={song.id}
//                     className="bg-white break-inside-avoid mb-6 song-card-landing-p py-0.5"
//                   >
//                     {/* ⭐ Now sending correct fields to SongCard */}
//                     <SongCard
//                       id={song.id}
//                       song_title={song.song_title}
//                       about={song.about}
//                       thumbnail_url={song.thumbnail_url}
//                       published_date={song.published_date}
//                       singer_name={song.singer_name}
//                     />
//                   </div>
//                 ))
//               ) : (
//                 'No results Found!'
//               )}
//             </div>

//           </div>
//         </div>
//       )}
//     </>
//   );
// }


// 'use client';

// import Loader from '@/components/Loader';
// import useSongs from '@/hooks/use-songs';
// import { useState } from 'react';
// import { Song } from '../Home/SongCard/types';
// import { SONGS_FILTER, SONGS_INTRO } from './constants';
// import SongCard from './SongCard';
// import FilterPanel from '../Fillter/FilterPanel';
// import './Songs.css';

// export default function SearchResults() {

     


//   const [activeFilter, setActiveFilter] = useState(SONGS_FILTER[0]);
//   const { publishedSongs = [], isLoading, totalSongs } = useSongs({ activeFilter: activeFilter });

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div className="mt-8">
//           {/* Main Content */}
//           <div className="max-w-[1180px] mx-auto px-4 pb-8">
//             {/* Search Header */}
//             <div className="text-center songs-about-intro">{SONGS_INTRO}</div>
//             <div className="text-left mb-2">
//               <h1 className="song-count-text">{totalSongs} songs</h1>
//             </div>

//             {/* Filter Tabs */}
//             <div className="flex flex-wrap justify-start gap-1 border-t-costom pt-3 pb-4 pr-2 pl-2">
//               {/* ✅ Filter text replaced with FilterPanel */}
//               <span className="text-pink filters">
//                 <FilterPanel />
//               </span>

//               <div className="button-link-container">
//                 {SONGS_FILTER.map((filter) => (
//                   <button
//                     key={filter}
//                     onClick={() => setActiveFilter(filter)}
//                     className={` border-0 button-font all-text cursor-pointer uppercase transition-colors ${
//                       activeFilter === filter
//                         ? 'text-pink text-white'
//                         : 'bg-white border fillter-btn'
//                     }`}
//                   >
//                     {filter}
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Results */}
//             <div className="song-card-container">
//               {publishedSongs?.length > 0
//                 ? publishedSongs.map((song: Song) => {
//                     const hasMedia = song.youtubeVideoId || song.thumbnailURL;
//                     return (
//                       <div
//                         key={song.id}
//                         className={`bg-white break-inside-avoid mb-6 song-card-landing-p py-0.5 ${
//                           !hasMedia ? 'no-media-padding' : ''
//                         }`}
//                       >
//                         <SongCard {...song} />
//                       </div>
//                     );
//                   })
//                 : 'No results Found!'}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
