'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function FilmCard({ data }) {
  if (!data) return null;

  // ✔ Thumbnail full URL
  const thumbnail = data.thumbnail_url
    ? "https://ajabshahar.aaravega.in/" + data.thumbnail_url
    : null;

  const title = data.original_title;
  const director = data.meta_keywords;
  const meta_description = data.meta_description;
  const description = data.description;

  console.log("FilmCard data:", data);

  return (
    <div
      className="bg-white card-rounded-4 shadow-lg hover:shadow-xl transition-shadow duration-300"
      id={data.id}
    >

      {/* Thumbnail ONLY */}
      <div className="relative h-50 w-full video-custom-width">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover rounded-t-lg"
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center rounded-t-lg">
            <span>No Thumbnail</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 card-shape-top pt-1 pb-0">
        <div className="mb-2">
          <h3 className="card-heading font-semibold mb-1 line-clamp-1">
            {title}
          </h3>

          <p className="text-xs semi-heading-2 font-medium text-gray-500 uppercase tracking-wide mb-3 line-clamp-1">
            {description}
          </p>

          {director && (
            <p className="text-xs semi-heading-2 font-medium text-gray-500 uppercase tracking-wide mb-3 line-clamp-1">
              Director: {director}
            </p>
          )}
        </div>

        <p className="card-text leading-relaxed mb-4 border-top-pink line-clamp-4">
          <span dangerouslySetInnerHTML={{ __html: meta_description }} />
        </p>

        <div className="justify-end flex">
          <Link
            href={`/films/${data.id}`}
            className="text-sm font-medium pink hover:text-pink-700 transition-colors z-20 uppercase"
          >
            EXPLORE FILM
          </Link>
        </div>
      </div>
    </div>
  );
}
