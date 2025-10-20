'use client';

import Image from 'next/image';
import '../../styles/CustomStyle.css';
import { Song } from '../Home/SongCard/types';

export default function SongCard(item: Song) {
  // Local image data (can be replaced later with dynamic array)
  const searchData = {
    results: [
      {
        id: 1,
        image: '/TN-About-Basavalingaiah-Hiremath.jpg', // image from /public folder
      },
    ],
  };

  // ✅ Always use image from array
  const thumbnail = searchData.results[0].image;

  return (
    <div className="bg-white song-card-list shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Always show an image */}
      <div className="relative w-full h-[186px] video-custom-width">
        <Image
          src={thumbnail}
          alt={item.metaTitle || 'Song thumbnail'}
          width={400}
          height={186}
          className="object-cover rounded-t-lg w-full h-full"
          priority
        />
      </div>

      {/* Card content */}
      <div className="p-5 card-shape-top pt-1 pb-0">
        <div className="mb-2">
          <h3 className="song-card-heading line-clamp-2 overflow-hidden text-ellipsis">
            {item.metaTitle}
          </h3>

          {item.poets?.[0]?.name && (
            <p className="song-semi-heading line-clamp-1 overflow-hidden text-ellipsis">
              {item.poets[0].name}
            </p>
          )}
        </div>

        <p className="son-card-text line-clamp-2 overflow-hidden text-ellipsis">
          {item.metaDescription}
        </p>
      </div>
    </div>
  );
}
