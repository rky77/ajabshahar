'use client';

import Loader from '@/components/Loader';
import useReflections from '@/hooks/use-reflections';
import { useState } from 'react';
import { REFLECTIONS_FILTER, REFLECTIONS_INTRO } from './constants';
import './Reflections.css';

const Reflections = () => {
  const [activeFilter, setActiveFilter] = useState(REFLECTIONS_FILTER[0]);

  //need to change once API for this is known
  const {
    reflections = [],
    totalResults,
    isLoading,
  } = useReflections({ activeFilter: activeFilter });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-8">
          {/* Main Content */}
          <div className="max-w-6xl mx-auto px-4 pb-8">
            {/* Search Header */}
            <div className="text-center songs-about">{REFLECTIONS_INTRO}</div>
            <div className="text-left mb-2">
              <h1 className="text-2xl md:text-3xl font-light black-custom-color mb-0 mt-0">
                {totalResults} Reflections
              </h1>
            </div>
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-start gap-4 mb-10 border-t pt-3 pb-4">
              <span className="text-pink  font-bold text-white">Filters |</span>
              {REFLECTIONS_FILTER.map((filter: string) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={` border-0 button-font cursor-pointer uppercase transition-colors ${
                    activeFilter === filter ? 'text-pink text-white' : 'bg-white  border search-btn'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            {/* Results */}
            <div className="space-y-8">
              {reflections?.length > 0
                ? reflections.map((reflection: any) => {
                    return <div key={reflection?.id}>{reflection?.title}</div>;
                  })
                : 'No results Found!'}
            </div>
            Complete data ::
            <pre>{JSON.stringify(reflections)}</pre>
          </div>
        </div>
      )}
    </>
  );
};

export default Reflections;
