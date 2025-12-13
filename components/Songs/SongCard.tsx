'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import '../../styles/CustomStyle.css';

export default function SongCard(item: any) {

  const router = useRouter();

  const thumbnail = item.thumbnailUrl || '/TN-About-Basavalingaiah-Hiremath.jpg';

  console.log("SongCard Item:",thumbnail);

  const description = item.about
    ? item.about.replace(/<[^>]+>/g, "")
    : "";
console.log("SongCard Description:",item);
  // ⭐ Click Handler
  const handleClick = () => {
    if (!item.id) {
      console.error("Song ID not found");
      return;
    }
    router.push(`/songs/details/${item.id}`);
  };
    console.log(`https://ajabshahar.aaravega.in/${thumbnail}`);

  return (
    <div
      className="bg-white song-card-list shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={handleClick}   // ⭐ Card click → open detail page
    >

      {/* Thumbnail */}
      <div className="relative w-full h-[156px] video-custom-width">
        <Image
          src={`https://ajabshahar.aaravega.in/${thumbnail}`}
          alt={item.song_title || "Song thumbnail"}
          width={400}
          height={136}
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Content */}
      <div className="p-5 card-shape-top pt-1 pb-0">
        <div className="mb-2">
          <h3 className="song-card-heading line-clamp-2 overflow-hidden text-ellipsis">
            {item.song_title}
          </h3>
             {item.songTitle && (
            <p className="song-semi-heading line-clamp-1 overflow-hidden text-ellipsis">
              {item.songTitle}
            </p>
          )}
          {item.singer_name && (
            <p className="song-semi-heading line-clamp-1 overflow-hidden text-ellipsis">
            sings {item.singer_name}
            </p>
          )}
          {item.poet && (
            <p className="song-semi-heading line-clamp-1 overflow-hidden text-ellipsis">
            poet  {item.poet}
            </p>
          )}
          
        </div>
          
        <p className="son-card-text line-clamp-2 overflow-hidden text-ellipsis">
          {description}
        </p>
      </div>
    </div>
  );
}


// 'use client';

// import Image from 'next/image';
// import '../../styles/CustomStyle.css';
// import { Song } from '../Home/SongCard/types';

// export default function SongCard(item: Song) {
//   // Local image data (can be replaced later with dynamic array)
//   const searchData = {
//     results: [
//       {
//         id: 1,
//         image: '/TN-About-Basavalingaiah-Hiremath.jpg', // image from /public folder
//       },
//     ],
//   };

//   // ✅ Always use image from array
//   const thumbnail = searchData.results[0].image;

//   return (
//     <div className="bg-white song-card-list shadow-lg hover:shadow-xl transition-shadow duration-300">
//       {/* Always show an image */}
//       <div className="relative w-full h-[156px] video-custom-width">
//         <Image
//           src={thumbnail}
//           alt={item.metaTitle || 'Song thumbnail'}
//           width={400}
//           height={136}
//           className="object-cover  w-full h-full"
//           priority
//         />
//       </div>

//       {/* Card content */}
//       <div className="p-5 card-shape-top pt-1 pb-0">
//         <div className="mb-2">
//           <h3 className="song-card-heading line-clamp-2 overflow-hidden text-ellipsis">
//             {item.metaTitle}
//           </h3>

//           {item.poets?.[0]?.name && (
//             <p className="song-semi-heading line-clamp-1 overflow-hidden text-ellipsis">
//               {item.poets[0].name}
//             </p>
//           )}
//         </div>

//         <p className="son-card-text line-clamp-2 overflow-hidden text-ellipsis">
//           {item.metaDescription}
//         </p>
//       </div>
//     </div>
//   );
// }
