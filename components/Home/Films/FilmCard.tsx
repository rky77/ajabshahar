'use client';

import Image from 'next/image';
import Link from 'next/link';
// import '../../../styles/CustomStyle.css';

const YOUTUBE_URL = 'https://www.youtube.com/embed';

export default function FilmCard() {
  // Static data from screenshot
  const filmData = {
    id: 'had-anhad',
    metaTitle: 'Had Anhad',
    metaDescription:
      "Kabir was a 15th century mystic poet of north India who defied the boundaries between Hindu and Muslim. He had a Muslim name and upbringing, but his poetry repeatedly invokes the widely revered Hindu name for God – Ram. Who is Kabir's Ram?",
    subtitle: 'Journeys with Ram & Kabir',
    director: 'A film by SHABNAMVIRMAN!',
    youtubeVideoId: 'your-video-id', // Add your video ID
    thumbnailURL: '/path-to-thumbnail.jpg', // Add your thumbnail path
  };

  return (
    <div className="bg-white card-rounded-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Media - Always shown now */}
      <div className="relative h-60 w-full video-custom-width">
        {filmData.youtubeVideoId ? (
          <iframe
            src={`${YOUTUBE_URL}/${filmData.youtubeVideoId}`}
            title={filmData.metaTitle}
            className="h-full w-full rounded-t-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <Image
            src={filmData.thumbnailURL}
            alt={filmData.metaTitle}
            fill
            className="object-cover rounded-t-lg"
          />
        )}
      </div>

      {/* Card content */}
      <div className="p-5 card-shape-top pt-1 pb-0">
        <div className="mb-2">
          <h3 className="card-heading font-semibold mb-1 line-clamp-1 overflow-hidden text-ellipsis">
            {filmData.metaTitle}
          </h3>
          {filmData.subtitle && (
            <p className="text-sm lora-italic mb-2 semi-heading line-clamp-1 overflow-hidden text-ellipsis">
              {filmData.subtitle}
            </p>
          )}
          {filmData.director && (
            <p className="text-xs semi-heading-2 font-medium text-gray-500 uppercase tracking-wide mb-3 line-clamp-1 overflow-hidden text-ellipsis">
              {filmData.director}
            </p>
          )}
        </div>

        <p
          className="card-text leading-relaxed mb-4 border-top-pink
        line-clamp-4 overflow-hidden text-ellipsis"
        >
          {filmData.metaDescription}
        </p>

        <div className="justify-end flex">
          <Link
            href={`/films/${filmData.id}`}
            className="text-sm font-medium pink hover:text-pink-700 transition-colors z-20 uppercase"
          >
            {`EXPLORE FILM`}
          </Link>
        </div>
      </div>
    </div>
  );
}
