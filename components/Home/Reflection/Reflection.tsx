'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../../../styles/CustomStyle.css';

const YOUTUBE_URL = 'https://www.youtube.com/embed';

export default function Reflection() {
  // Static data from screenshot
  const reflectionData = {
    id: 'had-anhad',
    metaTitle: 'Shoonya is not nothingness',
    metaDescription:
      "Nothing has its own intrinsic character. Everything exists in relation to something else. The name of this realization is 'shoonya'",
    director: 'says KRISHNA NATH',
    youtubeVideoId: 'your-video-id',
    thumbnailURL: '/path-to-thumbnail.jpg',
  };

  return (
    <div className="bg-white card-rounded-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Media - Always shown now */}
      <div className="relative h-60 w-full video-custom-width">
        {reflectionData.youtubeVideoId ? (
          <iframe
            src={`${YOUTUBE_URL}/${reflectionData.youtubeVideoId}`}
            title={reflectionData.metaTitle}
            className="h-full w-full rounded-t-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <Image
            src={reflectionData.thumbnailURL}
            alt={reflectionData.metaTitle}
            fill
            className="object-cover rounded-t-lg"
          />
        )}
      </div>

      {/* Card content */}
      <div className="p-5 card-shape-top pt-1 pb-0">
        <div className="mb-2">
          <h3 className="card-heading font-semibold mb-1 line-clamp-2 overflow-hidden text-ellipsis">
            {reflectionData.metaTitle}
          </h3>
          {reflectionData.director && (
            <p className="text-xs semi-heading-2 font-medium text-gray-500 uppercase tracking-wide mb-3 line-clamp-1 overflow-hidden text-ellipsis">
              {reflectionData.director}
            </p>
          )}
        </div>

        <p className="card-text leading-relaxed mb-4 border-top-pink line-clamp-5 overflow-hidden text-ellipsis">
          {reflectionData.metaDescription}
        </p>

        <div className="justify-end flex">
          <Link
            href={`/films/${reflectionData.id}`}
            className="text-sm font-medium pink hover:text-pink-700 transition-colors z-20 uppercase"
          >
            {`EXPLORE REFLECTION`}
          </Link>
        </div>
      </div>
    </div>
  );
}
