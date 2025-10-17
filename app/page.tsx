'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Loader from '@/components/Loader';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // simulate initial loading (like fetching config, auth, etc.)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100); // 1.5s loader

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />; // only loader until ready
  }

  return (
    <main className="min-h-screen">
      <Header onSearchToggle={handleSearchToggle} isSearchOpen={isSearchOpen} />
      <Hero isSearchOpen={isSearchOpen} />
      <Footer />
    </main>
  );
}
