'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import People from '@/components/People';
import FullBackground from '@/components/fullBackground';

export default function PeoplePage() {
  return (
    <>
      <FullBackground background={'/people-bg.webp'}>
        <div className="min-h-screen">
          <Header />
          <div className="inner-container-people">
            <main className="relative z-10">
              <div className="mx-auto z-11">
                <People />
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </FullBackground>
    </>
  );
}
