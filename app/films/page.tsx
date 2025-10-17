'use client';
import Films from '@/components/Films';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import FullBackground from '@/components/fullBackground';

export default function FilmsPage() {
  return (
    <>
      <FullBackground background={'/people-bg.svg'}>
        <div className="min-h-screen">
          <Header />
          <div className="news-inner-container">
            <main className="relative z-10">
              <div className="mx-auto z-11">
                <Films />
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </FullBackground>
    </>
  );
}
