// components/Films/index.tsx
'use client';

import Loader from '@/components/Loader';
import useFilms from '@/hooks/use-films';
import { BASE_URL } from '@/lib/utils/constant';
import Image from 'next/image';
import { FILMS_CONSTANTS } from './constants';
import { Film } from './type';
import './Films.css';

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
            {/* Films Count */}
            <div className="text-left mb-2">
              <h1 className="films-heading-text">{films?.length || 0} films</h1>
            </div>

            {/* Film Introduction */}
            <div className="sub-heading-intro">{FILMS_CONSTANTS.FILMS_INTRO}</div>
            <div className="text-center films-about">{FILMS_CONSTANTS.FILMS_DESCRIPTION}</div>

            {/* Results */}
            <div>
              {films.length
                ? films.map((item: Film, index) => (
                    <div key={item.id} className="">
                      {/* Result Item */}
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Image */}
                        <div className="flex-shrink-0 w-full md:w-[442px] h-[240px] people-banner-shadow">
                          <div className="bg-gray-200 overflow-hidden h-[223px] relative">
                            {item?.thumbnailUrl ? (
                              <Image
                                src={`${BASE_URL}${item.thumbnailUrl}`}
                                alt={
                                  item?.metaTitle || item?.englishTransliteration || 'Film image'
                                }
                                fill
                                sizes="(max-width: 768px) 100vw, 442px"
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-300 flex items-center justify-center relative">
                                <span className="text-gray-500">No Image</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h2 className="films-page-heading">
                            {item?.englishTransliteration}
                            {item?.englishTranslation && (
                              <>
                                {' '}
                                - <span className="text-gray-600">{item.englishTranslation}</span>
                              </>
                            )}
                          </h2>

                          {item?.directors?.[0]?.name && (
                            <p className="films-directed-title">
                              Directed by{' '}
                              <span className="uppercase font-medium">
                                {item.directors[0].name}
                              </span>
                            </p>
                          )}

                          <p className="films-date">
                            {item?.duration && <span>{item.duration} mins</span>}
                            {item?.yearOfProduction && ` , ${item.yearOfProduction}`}
                            {item?.languages && item.languages.length > 0 && (
                              <span>
                                {' , Available in '}
                                {item.languages.map((lang) => lang.name).join(', ')}
                              </span>
                            )}
                            {(!item?.languages || item.languages.length === 0) && (
                              <span> {',Available in English, Hindi, Kannada'}</span>
                            )}
                          </p>

                          <hr className="my-3 films-separator" />

                          {/* Description */}
                          {item?.profileText && (
                            <div
                              className="search-result-text mb-3 line-clamp-3 text-base text-gray-700"
                              dangerouslySetInnerHTML={{
                                __html: item.profileText,
                              }}
                            />
                          )}

                          <div className="text-pink films-trailer">
                            trailer <span>|</span> film & more
                          </div>
                        </div>
                      </div>
                      {/* Hide separator for last item */}
                      <div className="card-separator"></div>
                    </div>
                  ))
                : !isLoading && (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">No films found</p>
                    </div>
                  )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Films;
