
'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import FullBackground from '@/components/fullBackground';
// import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import './Songs.css';

const SongDetails = ({ data }: { data: any }) => {
  if (!data) return <Loader />;

  // ⭐ API Fields
  const title = data.song_title;
  const description = data.english_description;
  const singer_name = data.singer_name;
  const thumbnail = data.thumbnail_url;
  const videoUrl = data.youtube_video_url;
  
  console.log("SongDetails Data:", data);
  const bgImageUrl = '/song-bg-full.svg';

  return (
    <FullBackground background={bgImageUrl || '/default-background.jpg'}>
      <div className="min-h-screen">
        <Header />

        <div
          style={{
            backgroundSize: '100% auto',
            padding: '6.5rem 0 7rem',
            maxWidth: '1420px',
            width: '100%',
            margin: '-30px auto 0',
            minHeight: '1300px',
            fontWeight: 300,
            zIndex: -100,
          }}
        >
          <main className="relative z-10">
            <div className="mx-auto z-11">
              <div className="mt-8">
                <div className="max-w-6xl mx-auto px-4 pb-8">
                  <div className="songs-about">

                    {/* ⭐ MAIN TITLE */}
                    <h1 className="text-3xl font-bold mb-4">{title}</h1>

                    {/* ⭐ SINGER */}
                    {singer_name && (
                      <p className="text-xl mb-2">
                        Sung by{' '}
                        <span className="text-pink">{singer_name}</span>
                      </p>
                    )}

                    {/* ⭐ THUMBNAIL */}
                    {thumbnail && (
                      <div className="flex justify-center my-6 border-top-pink " >
                        <img style={{"width":"100%"}}
                          src={`https://ajabshahar.aaravega.in/${thumbnail}`}
                          alt={title}
                          className="rounded-lg shadow-lg w-80"
                        />
                        {/* <LiteYouTubeEmbed id={videoUrl} title={title} poster="maxresdefault" noCookie /> */}
                      </div>
                    )}

                    {/* ⭐ DESCRIPTION */}
                    <div
                      className="text-lg leading-relaxed text-center"
                      dangerouslySetInnerHTML={{
                        __html: data.description || '',
                      }}
                    />
                  
                    {/* ⭐ SONG NOTES */}
                    <h2 className="text-xl font-semibold mt-6">Song Notes:</h2>
                    <div
                      className="text-lg leading-relaxed text-center"
                      dangerouslySetInnerHTML={{
                        __html: data.song_notes || '',
                      }}
                    />
                  </div>
                                 <h1>translate</h1>  
                </div>
              </div>
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </FullBackground>
  );
};

export default SongDetails;



// 'use client';

// import Footer from '@/components/Footer';
// import Header from '@/components/Header';
// import Loader from '@/components/Loader';
// import FullBackground from '@/components/fullBackground';
// import './Songs.css';

// const SongDetails = ({ data }: { data: any }) => {
//   if (!data) return <Loader />;

//   // ⭐ API Fields
//   const title = data.song_title;
//   const description = data.english_description;
//   const singer_name = data.singer_name;
//   const thumbnail = data.thumbnail_url;

//   const bgImageUrl = '/song-bg-full.svg';

//   return (
//     <FullBackground background={bgImageUrl || '/default-background.jpg'}>
//       <div className="min-h-screen">
//         <Header />

//         <div
//           style={{
//             backgroundSize: '100% auto',
//             padding: '6.5rem 0 7rem',
//             maxWidth: '1420px',
//             width: '100%',
//             margin: '-30px auto 0',
//             minHeight: '1300px',
//             fontWeight: 300,
//             zIndex: -100,
//           }}
//         >
//           <main className="relative z-10">
//             <div className="mx-auto z-11">
//               <div className="mt-8">
//                 <div className="max-w-6xl mx-auto px-4 pb-8">
//                   <div className="songs-about">

//                     {/* ⭐ MAIN TITLE */}
//                     <h1 className="text-3xl font-bold mb-4">{title}</h1>

//                     {/* ⭐ SINGER */}
//                     {singer_name && (
//                       <p className="text-xl mb-2">
//                         Sung by <span className="text-pink">{singer_name}</span>
//                       </p>
//                     )}

//                     {/* ⭐ THUMBNAIL */}
//                     {thumbnail && (
//                       <div className="flex justify-center my-6">
//                         <img
//                           src={`https://ajabshahar.aaravega.in/${thumbnail}`}
//                           alt={title}
//                           className="rounded-lg shadow-lg w-80"
//                         />
//                       </div>
//                     )}

//                     {/* ⭐ DESCRIPTION */}
//                     <div
//                       className="text-lg leading-relaxed text-center"
//                       dangerouslySetInnerHTML={{
//                         __html: description || '',
//                       }}
//                     />

//                     {/* ⭐ SONG NOTES */}
//                     <h2 className="text-xl font-semibold mt-6">Song Notes:</h2>
//                     <div
//                       className="text-lg leading-relaxed text-center"
//                       dangerouslySetInnerHTML={{
//                         __html: description || '',
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>

//         <Footer />
//       </div>
//     </FullBackground>
//   );
// };

// export default SongDetails;

