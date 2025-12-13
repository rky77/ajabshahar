'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../../../styles/CustomStyle.css';

const YOUTUBE_URL = 'https://www.youtube.com/embed';

export default function People({ data }) {
  if (!data) return null;

  // ✅ Fetch data (As per your requirement)
  const thumbnail_url = data.thumbnail_url
    ? "https://ajabshahar.aaravega.in/" + data.thumbnail_url
    : null;

  const title = data.meta_title;
  const meta_keywords = data.meta_keywords;
  const description = data.meta_description;

  const personName =
    data.person_name_english || data.person_name_hindi || "Unknown Person";

  const subtitle = data.category_type || "Oral Tradition";

  console.log("People data:", data);

  return (
    <div className="bg-white card-rounded-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
      
      {/* Media */}
      <div className="relative h-50 w-full video-custom-width">
        {thumbnail_url ? (
          <Image
            src={thumbnail_url}
            alt={title || personName}
            fill
            className="object-cover rounded-t-lg"
          />
        ) : (
          <div className="h-full w-full bg-gray-300 flex items-center justify-center">
            {/* <span>No Thumbnail</span> */}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 card-shape-top pt-1 pb-0">

        <div className="mb-2">
          <h3 className="card-heading font-semibold mb-1 line-clamp-1 overflow-hidden text-ellipsis">
            {title}
          </h3>

          {subtitle && (
            <p className="text-sm lora-italic mb-2 semi-heading line-clamp-1 overflow-hidden text-ellipsis">
              {meta_keywords}
            </p>
          )}
        </div>

        <p className="card-text leading-relaxed mb-4 border-top-pink line-clamp-5 overflow-hidden text-ellipsis">
          {description}
        </p>

        <div className="justify-end flex">
          <Link
            href={`/people/${data.id}`}
            className="text-sm font-medium pink hover:text-pink-700 transition-colors z-20 uppercase"
          >
            EXPLORE PEOPLE
          </Link>
        </div>

      </div>
    </div>
  );
}
