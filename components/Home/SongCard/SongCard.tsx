'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../../../styles/CustomStyle.css';

const YOUTUBE_URL = 'https://www.youtube.com/embed';

export default function SongCard({
  id,
  song_title,
  singer_name,
  thumbnail_url,
  about,
  youtubeVideoId,
  song_discription 
  // if API sends later
}) {
  // Check if media exists
  const hasMedia = youtubeVideoId || thumbnail_url;

  return (
    <div id={id}
      className={`bg-white card-rounded-4 shadow-lg hover:shadow-xl transition-shadow duration-300 ${
        !hasMedia ? 'no-media-card' : ''
      }`}
      style={{ "width": hasMedia ? "400px" : "fit-content", "marginLeft": hasMedia ? "200px" : "auto" }}
    >
      {/* Media (Video OR Thumbnail) */}
      {hasMedia && (
        <div className="relative h-50 w-full video-custom-width">
          {youtubeVideoId ? (
            <iframe
              src={`${YOUTUBE_URL}/${youtubeVideoId}`}
              title={song_title}
              className="h-full w-full frame-radius "
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <Image
              src={"https://ajabshahar.aaravega.in/" + thumbnail_url}
              alt={song_title}
              fill
              className="object-cover rounded-t-lg"
            />
          )}
        </div>
      )}

      {/* Content */}
      <div
        className={`p-5 card-shape-top pt-1 pb-0 ${
          !hasMedia ? 'flex flex-col items-center text-center' : ''
        }`}
      >
        <div className="mb-2">

          {/* Title */}
          <h3 className="card-heading font-semibold mb-1">
            {song_title}
          </h3>

          {/* Singer */}
          <p className="text-sm lora-italic mb-2 semi-heading">
            {singer_name}
          </p>

        </div>

        {/* Description (HTML allowed) */}
        <p className="card-text leading-relaxed mb-4 border-top-pink line-clamp-5 overflow-hidden text-ellipsis"
          dangerouslySetInnerHTML={{ __html: song_discription }}>
        </p>

        <div className={`${!hasMedia ? 'justify-center' : 'justify-end'} flex`}>
          <Link
            href={`/songs/details/${id}`}
            className="text-sm font-medium pink hover:text-pink-700 transition-colors z-20 uppercase"
          >
            EXPLORE SONG
          </Link>
        </div>
      </div>
    </div>
  );
}
