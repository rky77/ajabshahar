'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Poems from '@/components/Poems';
import FullBackground from '@/components/fullBackground';

export default function PoemsPage() {
  return (
    <>
      <FullBackground background={'/poems-page-bg.webp'}>
        <div className="min-h-screen">
          <Header />
          <div className="inner-container-poems">
            <main className="relative z-10">
              <div className="mx-auto z-11">
                <Poems />
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </FullBackground>
    </>
  );
}
