'use client';

import Loader from '@/components/Loader';
import useFilms from '@/hooks/use-films';
import { BASE_URL } from '@/lib/utils/constant';
import Image from 'next/image';
import { FILMS_INTO } from './constants';
import './Films.css';
import { Film } from './type';

const Films = () => {
  const { films = [], isLoading } = useFilms();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-8">
          {/* Main Content */}
          <div className="max-w-6xl mx-auto px-4 pb-8">
            {/* Search Header */}
            <div className="text-center songs-about">{FILMS_INTO}</div>

            {/* People Count */}
            <div className="text-left mb-2">
              <h1 className="text-2xl md:text-3xl font-light black-custom-color mb-0 mt-0">
                {films?.length || 0} films
              </h1>
            </div>
            <hr className="py-8" />

            {/* Results */}
            <div className="space-y-8">
              {films.length
                ? films.map((item: Film, index) => (
                    <div key={item.id} className="bg-white">
                      {/* Result Item */}
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Image */}
                        <div className="flex-shrink-0">
                          <div className="w-56 h-32 bg-gray-200 thumbnail-image overflow-hidden">
                            {item?.thumbnailUrl && (
                              <Image
                                src={`${BASE_URL}${item?.thumbnailUrl}`}
                                alt={item?.metaTitle || item?.englishTransliteration}
                                width={128}
                                height={128}
                                className="w-full h-full object-cover"
                              />
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          {/* Optional Title/Subtitle block (commented out) */}
                          <h2 className="search-result-page-heading mb-2">
                            <span>{item?.englishTransliteration}</span>{' '}
                            <span>{item?.englishTranslation}</span>
                          </h2>
                          <p>
                            by <span className="uppercase">{item?.directors?.[0].name}</span>
                          </p>
                          <div>
                            <span>{item?.duration}</span>mins, {item?.yearOfProduction}, available
                            in <span></span>
                          </div>
                          <hr className="py-2" />
                          {/* Description */}
                          <p
                            className="search-result-text mb-4 line-clamp-3 text-base"
                            dangerouslySetInnerHTML={{
                              __html: item?.profileText || '',
                            }}
                          />
                          <div className="text-pink uppercase">trailer | film & more</div>
                        </div>
                      </div>
                    </div>
                  ))
                : 'No Results to show!'}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Films;
