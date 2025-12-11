'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../../../styles/CustomStyle.css';

const YOUTUBE_URL = 'https://www.youtube.com/embed';

export default function People({ data }) {
  if (!data) return null; // Prevent crash

  const filmData = {
    id: data.id,
    metaTitle: data.person_name_english || data.person_name_hindi || "Unknown Person",
    metaDescription:
      data.category_name ||
      "This person is part of the Ajab Shahar oral and cultural traditions.",
    subtitle: data.category_type || "Oral Tradition",
    director: "", // People के लिए director नहीं होता
    youtubeVideoId: null, // People में वीडियो नहीं होता
    thumbnailURL: data.thumbnail_url, // Image from API
  };

  return (
    <div className="bg-white card-rounded-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
      
      {/* Media (UI SAME) */}
      <div className="relative h-50 w-full video-custom-width">
        {filmData.youtubeVideoId ? (
          <iframe
            src={`${YOUTUBE_URL}/${filmData.youtubeVideoId}`}
            title={filmData.metaTitle}
            className="h-full w-full frame-radius"
            allowFullScreen
          />
        ) : (
          filmData.thumbnailURL && (
            <Image
              src={filmData.thumbnailURL}
              alt={filmData.metaTitle}
              fill
              className="object-cover rounded-t-lg"
            />
          )
        )}
      </div>

      {/* Content (UI SAME) */}
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
        </div>

        <p className="card-text leading-relaxed mb-4 border-top-pink line-clamp-5 overflow-hidden text-ellipsis">
          {filmData.metaDescription}
        </p>

        <div className="justify-end flex">
          <Link
            href={`/people/${filmData.id}`}
            className="text-sm font-medium pink hover:text-pink-700 transition-colors z-20 uppercase"
          >
            EXPLORE PEOPLE
          </Link>
        </div>

      </div>

    </div>
  );
}
