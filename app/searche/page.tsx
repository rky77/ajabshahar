'use client';
import React from 'react';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Image from 'next/image';

import footerLogo from '../ajab-news-logo.svg';
import SearchResults from '@/components/searche/SearchResults';
import FullBackground from '@/components/fullBackground';

export default function NewsPage() {
  return (
    <>
      <FullBackground>
        <div className="min-h-screen">
          <Header />
          <div className="news-inner-container">
            <main className="relative z-10">
              <div className="mx-auto z-11">
                <SearchResults />
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </FullBackground>
    </>
  );
}


