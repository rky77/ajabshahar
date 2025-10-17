'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Loader from '@/components/Loader';
import YouTubePlayer from '@/components/Reusable/YouTubePlayer';
import FullBackground from '@/components/fullBackground';
import useSongById from '@/hooks/use-song';
import './Songs.css';

const SongDetails = ({ id, title }: { id: string; title: string }) => {
  const { song, isLoading, error } = useSongById(id, title);
  const bgImageUrl = '/song-bg-full.svg';

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
                    {/* Main Content */}
                    <div className="max-w-6xl mx-auto px-4 pb-8">
                      {/* Search Header */}
                      <div className="songs-about">
                        {song?.songTitle?.englishTransliteration}{' '}
                        {song?.singers.length && (
                          <>
                            sings <span className="text-pink"> {song?.singers[0]?.name}</span>
                          </>
                        )}
                        <YouTubePlayer
                          youtubeVideoId={song?.youtubeVideoId || ''}
                          title={song?.songTitle?.englishTransliteration}
                        />
                        {song?.metaDescription}
                        <div className="text-center">
                          <div className="p-6">
                            {song?.songTitle?.englishTransliteration}
                            <div>
                              poet
                              <span className="text-pink">
                                {song?.poets?.length && song.poets[0]?.name}
                              </span>
                            </div>
                          </div>

                          <div
                            className="text-lg leading-relaxed text-center"
                            dangerouslySetInnerHTML={{
                              __html: song?.songText?.transliteration || '',
                            }}
                          />
                        </div>
                        Song Notes::
                        <div
                          className="text-lg leading-relaxed text-center"
                          dangerouslySetInnerHTML={{
                            __html: song?.songText?.translation || '',
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
      )}
    </>
  );
};

export default SongDetails;
