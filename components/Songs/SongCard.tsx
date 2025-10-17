'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../../styles/CustomStyle.css';
import { Song } from '../Home/SongCard/types';

const YOUTUBE_URL = 'https://www.youtube.com/embed';

export default function SongCard(item: Song) {
  const hasMedia = item.youtubeVideoId || item.thumbnailURL;

  return (
    <div
      className={`bg-white  song-card-list  shadow-lg hover:shadow-xl transition-shadow duration-300 ${
        !hasMedia ? 'no-media-card' : ''
      }`}
    >
      {/* Media */}
      {hasMedia && (
        <div className="relative h-60 w-full video-custom-width">
          {item.youtubeVideoId ? (
            <iframe
              src={`${YOUTUBE_URL}/${item.youtubeVideoId}`}
              title={item.metaTitle}
              className="h-full w-full rounded-t-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <Image
              src={item.thumbnailURL}
              alt={item.metaTitle}
              fill
              className="object-cover rounded-t-lg"
            />
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
          <h3 className="song-card-heading line-clamp-2 overflow-hidden text-ellipsis">
            {item.metaTitle}
          </h3>
          {item.poets[0]?.name && (
            <p className="song-semi-heading line-clamp-1 overflow-hidden text-ellipsis">
              {item.poets[0]?.name}
            </p>
          )}
        </div>

        <p className="son-card-text line-clamp-2 overflow-hidden text-ellipsis">
          {item.metaDescription}
        </p>

        {/* <div className={`${!hasMedia ? 'justify-center' : 'justify-end'} flex`}>
          <Link
            href={`/songs/details/${item.id}`}
            className="text-sm font-medium pink hover:text-pink-700 transition-colors z-20 uppercase"
          >
            {`EXPLORE REFLECTIONS`}
          </Link>
        </div> */}
      </div>
    </div>
  );
}
