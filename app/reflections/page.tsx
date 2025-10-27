'use client';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Reflections from '@/components/Reflections';
import FullBackground from '@/components/fullBackground';

export default function ReflectionsPage() {
  return (
    <>
      <div className="min-h-screen">
        <Header />
        <div className="inner-container-reflections">
          <main className="relative z-10">
            <div className="mx-auto z-11">
              <Reflections />
            </div>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
