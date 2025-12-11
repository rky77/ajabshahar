'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../../../styles/CustomStyle.css';

const YOUTUBE_URL = 'https://www.youtube.com/embed';

export default function Reflection({ data }) {
  if (!data) return null;

  const title = data.title;
  const description = data.meta_description;
  const personName = data.person_name_english || data.person_name_hindi;
  const thumbnail = data.thumbnail_url || null;
  const youtubeVideoId = data.youtube_video_id || null;

  return (
    <div className="bg-white card-rounded-4 shadow-lg hover:shadow-xl transition-shadow duration-300">

      {/* Media */}
      <div className="relative h-50 w-full video-custom-width">
        {youtubeVideoId ? (
          <iframe
            src={`${YOUTUBE_URL}/${youtubeVideoId}`}
            title={title}
            className="h-full w-full frame-radius"
            allowFullScreen
          />
        ) : (
          thumbnail && (
            <Image
              src={thumbnail}
              alt={title}
              fill
              className="object-cover rounded-t-lg"
            />
          )
        )}
      </div>

      {/* Content */}
      <div className="p-5 card-shape-top pt-1 pb-0">
        
        <div className="mb-2">
          <h3 className="card-heading font-semibold mb-1 line-clamp-2">
            {title}
          </h3>

          {personName && (
            <p className="text-xs semi-heading-2 font-medium text-gray-500 mb-3 line-clamp-1">
              says {personName}
            </p>
          )}
        </div>

        <p className="card-text leading-relaxed mb-4 border-top-pink line-clamp-5">
          {description}
        </p>

        {/* Explore Link */}
        <div className="justify-end flex">
          <Link
            href={`/reflection/${data.id}`}
            className="text-sm font-medium pink hover:text-pink-700 transition-colors uppercase"
          >
            EXPLORE REFLECTION
          </Link>
        </div>

      </div>
    </div>
  );
}
