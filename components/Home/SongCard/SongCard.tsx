'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../../../styles/CustomStyle.css';
import { Song } from './types';
import { BASE_URL } from '@/lib/utils/constant';

const YOUTUBE_URL = 'https://www.youtube.com/embed';

export default function SongCard(item: Partial<Song> = {}) {
  const thumbnail = item.thumbnailURL || (item as any).thumbnail_url || '';
  const thumbnailSrc = thumbnail?.startsWith('http') ? thumbnail : `${BASE_URL}${thumbnail}`;
  const songTitle =
    (item.songTitle as any)?.englishTranslation || (item.metaTitle as any) || (item as any).song_title || '';
  const singerName = ((item.singers && item.singers[0]?.name) || (item as any).singer_name) || '';
  const about = (item.metaDescription as any) || (item as any).about || '';

  const hasMedia = item.youtubeVideoId || thumbnail;

  return (
    <div
      className={`bg-white card-rounded-4 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
        !hasMedia ? 'no-media-card' : ''
      }`}
    >
      {/* Media */}
      {hasMedia && (
        <div className="relative h-50 w-full video-custom-width">
          {item.youtubeVideoId ? (
            <iframe
              src={`${YOUTUBE_URL}/${item.youtubeVideoId}`}
              title={item.metaTitle}
              className="h-full w-full frame-radius "
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            thumbnail ? (
              <Image src={thumbnailSrc} alt={songTitle || (item.metaTitle || '')} fill className="object-cover rounded-t-lg" />
            ) : null
          )}
        </div>
      )}

      {/* Card content */}
      <div
        className={`p-5 card-shape-top pt-1 pb-0 ${
          !hasMedia ? 'flex flex-col items-center text-center' : ''
        }`}
      >
        <div className="mb-2">
          <h3 className="card-heading font-semibold mb-1">{songTitle || (item.metaTitle || 'Untitled')}</h3>
          {songTitle ? <p className="text-sm lora-italic mb-2 semi-heading">{songTitle}</p> : null}
          {/* {item.songTitle.englishTranslation && (
            <p className="text-sm lora-italic mb-2 semi-heading">
              {item.songTitle.englishTranslation}
            </p>
          )} */}
          {/* {item.poets[0]?.name && ( */}
          {/* <p className="text-xs semi-heading-2 font-medium text-gray-500 uppercase tracking-wide mb-3">
            <span className="lowercase">says</span> {item.poets[0]?.name}
          </p> */}
          {singerName ? (
            <p className="text-xs semi-heading-2 font-medium text-gray-500 uppercase tracking-wide mb-3">
              <span className="lowercase">sing</span> {singerName}
            </p>
          ) : null}
        </div>

        <p className="card-text leading-relaxed mb-4 border-top-pink line-clamp-5 overflow-hidden text-ellipsis">
          {about || '—'}
        </p>

        <div className={`${!hasMedia ? 'justify-center' : 'justify-end'} flex`}>
          <Link
            href={`/songs/details/${item.id}`}
            className="text-sm font-medium pink hover:text-pink-700 transition-colors z-20 uppercase"
          >
            {`EXPLORE SONG`}
          </Link>
        </div>
      </div>
    </div>
  );
}
