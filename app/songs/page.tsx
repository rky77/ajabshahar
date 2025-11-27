'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Songs from '@/components/Songs';
// import './Songs.css';

export default function SongsPage() {
  return (
    <>
      {/* <FullBackground> */}
      <div className="min-h-screen">
        <Header />
        <div className="inner-container-common">
          <main className="relative z-10">
            <div className="mx-auto z-11">
              <Songs />
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
