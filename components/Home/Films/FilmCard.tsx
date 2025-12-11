'use client';

import Image from 'next/image';
import Link from 'next/link';

const YOUTUBE_URL = 'https://www.youtube.com/embed';

export default function FilmCard({ data }) {

  console.log("FilmCard data: jj", data);
  if (!data) return null;

  const thumbnail = data.thumbnail_url;
  const title = data.english_translation;
  const director = data.director_name_english;
  const description = data.about_text;
  const youtubeVideoId = data.youtube_video_id || null;

  return (
    <div className="bg-white card-rounded-4 shadow-lg hover:shadow-xl transition-shadow duration-300"  id={data.id}>

      {/* Media */}
      <div className="relative h-50 w-full video-custom-width">
        {youtubeVideoId ? (
          <iframe
            src={`${YOUTUBE_URL}/${youtubeVideoId}`}
            title={title}
            className="h-full w-full frame-radius"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
          <h3 className="card-heading font-semibold mb-1 line-clamp-1">
            {title}
          </h3>

          {director && (
            <p className="text-xs semi-heading-2 font-medium text-gray-500 uppercase tracking-wide mb-3 line-clamp-1">
              Director: {director}
            </p>
          )}
        </div>

        <p className="card-text leading-relaxed mb-4 border-top-pink line-clamp-4">
          <span dangerouslySetInnerHTML={{ __html: description }} />
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
