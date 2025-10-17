'use client';

import Loader from '@/components/Loader';
import usePeople from '@/hooks/use-people';
import { BASE_URL } from '@/lib/utils/constant';
import Image from 'next/image';
import { useState } from 'react';
import { PEOPLE_FILTER, PEOPLE_INTRO } from './constants';
import './People.css';
import { PersonProfile } from './type';
import Link from 'next/link';

const People = () => {
  const [activeFilter, setActiveFilter] = useState(PEOPLE_FILTER[0]);
  const [visibleCount, setVisibleCount] = useState(4); // Show 4 cards initially
  const { people = [], isLoading } = usePeople({ activeFilter: activeFilter });

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4); // Load 4 more cards
  };

  const visiblePeople = people.slice(0, visibleCount);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-8">
          {/* Main Content */}
          <div className="max-w-6xl mx-auto px-4 pb-8">
            {/* Search Header */}
            <div className="text-center people-about-intro">{PEOPLE_INTRO}</div>

            {/* People Count */}
            <div className="text-left mb-2">
              <h1 className="people-count-text">{people?.length || 0} people</h1>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-start gap-1  border-t-costom pt-3 pb-4">
              <span className="filter">Filters </span>|
              {PEOPLE_FILTER.map((filter) => (
                <button
                  key={filter}
                  onClick={() => {
                    setActiveFilter(filter);
                    setVisibleCount(4); // Reset visible count on filter change
                  }}
                  className={`border-0 button-font all-text cursor-pointer uppercase transition-colors ${
                    activeFilter === filter ? ' all-text text-white' : 'bg-white border search-btn'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Results */}
            <div className="people-card-inner-container">
              {visiblePeople.length
                ? visiblePeople.map((item: PersonProfile) => (
                    <div key={item.id} className="bg-white">
                      <div className="flex flex-col md:flex-row gap-6 people-card-wrp">
                        {/* Image */}
                        <div className="flex-shrink-0 w-full md:w-[442px]">
                          <div className="bg-gray-200 overflow-hidden h-[223px] news-banner-shadow">
                            {' '}
                            {/* 👈 fixed height */}
                            {item?.thumbnailURL && (
                              <Image
                                src={`${BASE_URL}${item?.thumbnailURL}`}
                                alt={item?.metaTitle || item?.firstName}
                                width={442}
                                height={223}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h2 className="people-content-heading mb-2">
                            <span className="h-text">
                              {[item.firstName, item.middleName, item.lastName]
                                .filter(Boolean)
                                .join(' ')}
                              {', '}
                            </span>
                            {item?.roles?.length && (
                              <span className="mb-3 sub-text">
                                {item.roles
                                  .filter(
                                    (role) => typeof role === 'string' && !role.startsWith('_')
                                  )
                                  .join(' ')}
                              </span>
                            )}
                          </h2>
                          <div className="flex items-start gap-2">
                            <div className="items-start gap-2">
                              <span
                                className="people-card-text line-clamp-5 text-base flex-1"
                                dangerouslySetInnerHTML={{ __html: item?.profile || '' }}
                              />
                              <Link
                                href={`/people/${item.id}`}
                                className="explore-text text-pink hover:underline whitespace-nowrap mt-1"
                              >
                                EXPLORE
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                : 'No Results to show!'}
            </div>

            {/* Load More Button */}
            {visibleCount < people.length && (
              <div className="text-center people-btn-container">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-2 load-more-cta cursor-pointer hover:bg-pink-600 transition"
                >
                  Load More...
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default People;
