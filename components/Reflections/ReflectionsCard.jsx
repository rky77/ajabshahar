'use client';

import Image from 'next/image';
import Link from 'next/link';
import '@/styles/CustomStyle.css';
import ThumImage from '@/public/TN-About-Basavalingaiah-Hiremath.jpg';

export default function ReflectionsCard(item) {
  const hasMedia = item.youtubeVideoId || item.thumbnailURL;

  //  Handle nested data safely
  const poetName = Array.isArray(item.poets) && item.poets.length > 0 ? item.poets[0]?.name : null;

  const raw = item.__raw || {};

  const speakerName =
    // prefer the API person name fields if present
    (raw?.person_name_english && raw.person_name_english.toString().trim()) ||
    (raw?.person_name_hindi && raw.person_name_hindi.toString().trim()) ||
    (typeof item.speaker === 'object' && item.speaker?.name
      ? item.speaker.name
      : typeof item.speaker === 'string'
      ? item.speaker
      : null) ||
    poetName ||
    null;

  // Prefer original API fields when available so the UI shows exact API text

  const title =
    raw?.title ||
    raw?.metaTitle ||
    (typeof item.metaTitle === 'object' ? item.metaTitle.englishTranslation : item.metaTitle) ||
    item.title ||
    item.songTitle?.englishTranslation ||
    '';

  const description =
    raw?.excerpt || raw?.metaDescription || raw?.meta_description || raw?.about ||
    (typeof item.metaDescription === 'object' ? item.metaDescription.englishTranslation : item.metaDescription) ||
    item.excerpt ||
    item.about ||
    '';

  return (
    <div className="bg-white card-rounded-4 shadow-lg reflections-card transition-shadow duration-300">
      {/*  Media Section */}

      <div className="relative w-full h-[156px] video-custom-width">
        {item.thumbnailURL ? (
          <Image
            src={item.thumbnailURL}
            alt={title || 'reflection'}
            fill
            className="object-cover w-full h-full"
            sizes="(max-width: 768px) 100vw, 280px"
          />
        ) : (
          <Image
            src={ThumImage}
            alt={title || 'reflection'}
            width={280}
            height={156}
            className="object-cover  w-full h-full"
            priority
          />
        )}
      </div>

      {/*  Card Content Section */}
      <div className="p-5 card-shape-top pt-1 pb-0  flex flex-col items-center">
        <div className="mb-2">
          {/*  Title */}
          {title && <h3 className="card-heading font-semibold mb-1 line-clamp-3">{title}</h3>}

          {/*  Speaker */}
          {speakerName && (
            <p className="reflections-semi-heading">
              says <span className="name">{speakerName}</span>
            </p>
          )}

          {/* ✍ Poet */}
          {poetName && (
            <p className="text-xs semi-heading-2 font-medium text-gray-500 uppercase tracking-wide mb-3">
              <span className="lowercase">poet:</span> {poetName}
            </p>
          )}
        </div>

        {/*  Description */}
        {description && <p className="reflections-card-text">{description}</p>}

        {/*  Link */}
        <div className="w-full justify-end flex">
          <Link
            href={`/reflections/details/${item.id}`}
            className="reflections-card-link transition-colors z-20 uppercase"
          >
            INTERVIEW
          </Link>
        </div>
      </div>
    </div>
  );
}
