'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import './PoemsRelatedItem.css';

export default function PoemsRelatedItem() {
  // Main data array for search results
  const searchData = {
    query: 'farid',
    totalResults: 20,
    filters: ['ALL', 'SONGS', 'POEMS', 'REFLECTIONS', 'OTHER'],
    activeFilter: 'ALL',
    results: [
      {
        id: 1,
        type: 'SONGS',
        title: 'Had Anhad',
        subtitle: "I Lost My Heart To Nizam's Glance",
        description:
          'The story highlights the gulshan-e-na-afreeda (the Uncreated Garden) that Shah Inayat spoke of, to evoke his utopian vision of a world in which the human spirit was not driven by fear, mistrust, oppression and exploitation, but rather was guided by a non-egoic spirit of connection and love.',
        image: '/TN-About-Basavalingaiah-Hiremath.jpg',
        category: 'Music',
      },
      {
        id: 2,
        type: 'POEMS',
        title: 'Gulshan-e-Armaan',
        subtitle: 'by KABIR PROJECT',
        description:
          'The story highlights the gulshan-e-na-afreeda (the Uncreated Garden) that Shah Inayat spoke of, to evoke his utopian vision of a world in which the human spirit was not driven by fear, mistrust, oppression and exploitation, but rather was guided by a non-egoic spirit of connection and love.',
        image: '/TN-About-Basavalingaiah-Hiremath.jpg',
        category: 'Poetry',
      },
      {
        id: 3,
        type: 'POEMS',
        title: 'Haman Hai Isha',
        description:
          'The story highlights the gulshan-e-na-afreeda (the Uncreated Garden) that Shah Inayat spoke of, to evoke his utopian vision of a world in which the human spirit was not driven by fear, mistrust, oppression and exploitation, but rather was guided by a non-egoic spirit of connection and love.',
        image: '/TN-About-Basavalingaiah-Hiremath.jpg',
        category: 'Poetry',
      },
      {
        id: 4,
        type: 'OTHER',
        title: 'Mystic Poetry Collection',
        subtitle: "Farid's Legacy",
        description:
          'A collection of mystical poems and reflections from the Sufi tradition, featuring the works of Farid and other spiritual poets.',
        image: '/TN-About-Basavalingaiah-Hiremath.jpg',
        category: 'Collection',
      },
    ],
    counts: {
      ALL: 6,
      SONGS: 1,
      POEMS: 3,
      REFLECTIONS: 0,
      OTHER: 1,
    },
  };

  const [activeFilter, setActiveFilter] = useState(searchData.activeFilter);
  const [imageDimensions, setImageDimensions] = useState({
    width: 280,
    height: 186,
  });

  // Filter results based on active filter
  const filteredResults =
    activeFilter === 'ALL'
      ? searchData.results
      : searchData.results.filter((item) => item.type === activeFilter);

  useEffect(() => {
    const updateImageDimensions = () => {
      if (window.innerWidth < 1580) {
        // For screens less than 1580px
        setImageDimensions({
          width: 220,
          height: 150,
        });
      } else {
        // For larger screens
        setImageDimensions({
          width: 280,
          height: 186,
        });
      }
    };

    // Initial check
    updateImageDimensions();

    // Add event listener for window resize
    window.addEventListener('resize', updateImageDimensions);

    // Cleanup event listener
    return () => {
      window.removeEventListener('resize', updateImageDimensions);
    };
  }, []);

  return (
    <div className="mt-8">
      {/* Main Content */}
      <div className="poems-related-inner-container mx-auto px-4 pb-6">
        {/* Search Header */}
        <div className="text-center mb-2">
          <h1 className="poems-heading mb-0 mt-0 text-left">Related</h1>
        </div>

        {/* Filter Tabs with vertical separators */}
        <div className="flex flex-wrap items-center gap-2 mb-10 related-border-top pt-3 pb-4">
          {searchData.filters.map((filter, index) => (
            <div key={filter} className="flex items-center">
              {/* Filter Button */}
              <button
                onClick={() => setActiveFilter(filter)}
                className={`border-0 button-font cursor-pointer transition-colors ${
                  activeFilter === filter ? 'button-active-text font-semibold' : 'text-gray-60'
                }`}
              >
                {filter} <span className="num">({searchData.counts[filter]})</span>
              </button>

              {/* Vertical Separator (except for last item) */}
              {index < searchData.filters.length - 1 && (
                <span className="mx-3 separator-border">|</span>
              )}
            </div>
          ))}
        </div>

        {/* Search Results */}
        <div className="space-y-8">
          {filteredResults.map((item, index) => (
            <div key={item.id}>
              {/* Result Item */}
              <div className="flex flex-col md:flex-row gap-6">
                {/* Image */}
                <div className="flex-shrink-0">
                  <div className="flex-shrink-0  bg-gray-200 overflow-hidden rounded-md news-banner-shadow">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={imageDimensions.width}
                      height={imageDimensions.height}
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Title */}
                  <h2 className="poems-result-page-heading mb-2">
                    {item.title}
                    {item.subtitle && <span className="mb-3">{item.subtitle}</span>}
                  </h2>

                  {/* Description */}
                  <p className="search-result-text mb-4">{item.description}</p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-dotted-seprator"></div>
            </div>
          ))}
        </div>
      </div>
      <div className="poems-related-inner-container px-4 pb-0">
        <button className="see-all-btn">SEE MORE</button>
      </div>
    </div>
  );
}
