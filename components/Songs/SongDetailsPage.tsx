'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import FullBackground from '@/components/fullBackground';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';

import './Songs.css';

function extractYouTubeId(url?: string): string {
  if (!url || typeof url !== 'string') return '';
  const regExp = /(?:v=|youtu\.be\/|embed\/)([^&?]+)/;
  const match = url.match(regExp);
  return match ? match[1] : '';
}

const SongDetails = ({ data }: { data: any }) => {
  if (!data) return <Loader />;

  const title = data.umbrellaTitle || data.song_title || 'Untitled';
  const description = data.english_description || data.description || '';
  const singer_name = data.singer_name || '';
  const thumbnail = data.thumbnail_url || '';
  const videoUrl = data.youtube_video_id || data.youtubeVideoId || '';
  const metaDescription = data.metaDescription || '';
  const poet = data.poet || '';
  const songnotes = data.songnotes || '';
  const songLyricsTranslated = data.songLyricsTranslated || '';

  const videoId = extractYouTubeId(videoUrl);
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

                  {/* ================= SONG ABOUT START ================= */}
                  <div className="songs-about">

                    {/* MAIN TITLE + POET */}
                    <h1 className="song-title-line mb-4">
                      <span className="song-title">{title}</span>
                      {poet && (
                        <>
                          <span className="song-sings"> sings </span>
                          <span className="song-poet">{poet}</span>
                        </>
                      )}
                    </h1>

                    {/* SINGER */}
                    {singer_name && (
                      <p className="text-xl mb-2">
                        Sung by <span className="text-pink">{singer_name}</span>
                      </p>
                    )}

                    {/* THUMBNAIL */}
                    {thumbnail && (
                      <div className="flex justify-center my-6 border-top-pink">
                        <img
                          style={{ width: '100%' }}
                          src={`https://ajabshahar.aaravega.in/${thumbnail}`}
                          alt={title}
                          className="rounded-lg shadow-lg w-80"
                        />
                      </div>
                    )}

                    {/* VIDEO */}
                    {videoId && (
                      <div className="w-full max-w-4xl mx-auto my-6 border-top-pink">
                        <div className="aspect-video w-full">
                          <LiteYouTubeEmbed
                            id={videoId}
                            title={title}
                            poster="maxresdefault"
                            noCookie
                          />
                        </div>
                      </div>
                    )}

                    {/* DESCRIPTION */}
                    <div
                      className="text-lg leading-relaxed text-center"
                      dangerouslySetInnerHTML={{
                        __html: metaDescription || '',
                      }}
                    />

                    {/* SONG NOTES (FIRST BLOCK – SAME AS YOUR CODE) */}
                    <div
                      className="text-lg leading-relaxed text-center"
                      dangerouslySetInnerHTML={{
                        __html: data.song_notes || '',
                      }}
                    />

                  </div>
                  {/* ================= SONG ABOUT END ================= */}

                  {/* ======= SAME HEADINGS – REMAINING CONTENT ======= */}
                  <h2 className="text-3xl font-bold mb-4">{title}</h2>

                  <h3 className="text-3xl font-bold mb-4">poet {poet}</h3>

                  <h2 className="text-xl font-semibold mb-2">Song Notes</h2>

                  <div
                    className="text-lg leading-relaxed text-center song-notes"
                    dangerouslySetInnerHTML={{
                      __html: songnotes || '',
                    }}
                  />

                  <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-2">
                      Translated Lyrics:
                    </h2>

                    <div
                      className="text-lg leading-relaxed text-center song-lyrics"
                      dangerouslySetInnerHTML={{
                        __html: songLyricsTranslated || '',
                      }}
                    />
                  </div>

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
