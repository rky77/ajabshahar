'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import './News.css';
import NewsCard from './NewsCard';

// News data array matching your screenshot content
const newsData = [
  {
    id: 1,
    title: 'Gulshan-e-Armaan by KABIR PROJECT',
    content: [
      {
        type: 'heading',
        text: 'Gulshan-e-Armaan',
      },
      {
        type: 'paragraph',
        text: 'The story highlights the gulshan-e-na-a-freeda (the Uncreated Garden) that Shah hayat spoke of, to evoke his utopian vision of a world in which the human spirit was not driven by fear, mistrust, oppression and exploitation, but rather was guided by a non-egote spirit of connection and love. The story highlights the gulshan-e-na-a-freeda (the UnCreated Garden) that Shah hayat spoke of, to evoke his utopian vision of a world in which the human spirit was not driven by fear, mistrust, oppression and exploitation, but rather was guided by a non-egote spirit...more.',
      },
    ],
    images: ['news-banner.webp', 'Rectangle.jpg', 'news-banner.webp'],
    date: '2024-01-15',
  },
  {
    id: 2,
    title: 'Haman Hai Isha',
    content: [
      {
        type: 'heading',
        text: 'Haman Hai Isha',
      },
      {
        type: 'paragraph',
        text: 'The story highlights the gulshan-e-na-a-freeda (the UnCreated Garden) that Shah hayat spoke of, to evoke his utopian vision of a world in which the human spirit was not driven by fear, mistrust, oppression and exploitation, but rather was guided by a non-egote spirit of connection and love.',
      },
    ],
    images: ['news-banner.webp'],
    date: '2024-01-10',
  },
  {
    id: 3,
    title: "Had Anhad I Lost My Heart To Nizam's Glance",
    content: [
      {
        type: 'heading',
        text: "Had Anhad I Lost My Heart To Nizam's Glance",
      },
      {
        type: 'paragraph',
        text: 'The story highlights the gulshan-e-na-a-freeda (the UnCreated Garden) that Shah hayat spoke of, to evoke his utopian vision of a world in which the human spirit was not driven by fear, mistrust, oppression and exploitation, but rather was guided by a non-egote spirit of connection and love.',
      },
    ],
    images: ['Rectangle.jpg', 'news-banner.webp'],
    date: '2024-01-05',
  },
];

// 🔹 ToggleText Component
function ToggleText({ text, maxChars = 200 }: { text: string; maxChars?: number }) {
  const [expanded, setExpanded] = useState(false);

  if (text.length <= maxChars) {
    return <p className="leading-relaxed">{text}</p>;
  }

  return (
    <p className="leading-relaxed">
      {expanded ? text : text.slice(0, maxChars)}
      <button onClick={() => setExpanded(!expanded)} className="pink-text cursor-pointer">
        {expanded ? '...less' : '...more'}
      </button>
    </p>
  );
}

// 🔹 Image Slider Component
function ImageSlider({ images }: { images: string[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (images.length === 0) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className="relative mb-6 rounded-lg">
        {/* Main Image */}
        <div className="relative mb-2 rounded-lg w-full max-w-[853px] h-auto mx-auto news-banner-shadow">
          <img
            src={images[currentImageIndex]}
            alt="News image"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Navigation Arrows - unchanged */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="51"
                viewBox="0 0 26 51"
                fill="none"
              >
                <path
                  d="M22.8301 0.359375C22.1201 0.619375 21.6001 1.16939 21.0901 1.74939C14.6701 8.90939 8.2401 16.0694 1.8101 23.2294C0.910101 24.2294 0.720112 25.3994 1.29011 26.4794C1.42011 26.7294 1.6001 26.9494 1.7801 27.1594C8.3601 34.4894 14.9401 41.8194 21.5301 49.1494C22.7801 50.5394 24.6001 50.2894 25.3101 48.6194C25.6801 47.7394 25.6001 46.8894 25.1001 46.0994C24.9601 45.8794 24.7801 45.6794 24.6101 45.4894C18.6801 38.8794 12.7401 32.2694 6.80009 25.6594C6.68009 25.5294 6.5101 25.4393 6.3701 25.3293C6.3701 25.2593 6.3701 25.1794 6.3701 25.1094C6.5101 24.9994 6.68009 24.9094 6.80009 24.7794C12.7701 18.1394 18.7301 11.4994 24.7001 4.84937C25.6101 3.82937 25.7901 2.63945 25.1901 1.55945C24.8501 0.929448 24.3001 0.619385 23.7101 0.369385H22.8401L22.8301 0.359375Z"
                  fill="#B3B3B3"
                />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-full transition-colors cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="51"
                viewBox="0 0 26 51"
                fill="none"
              >
                <path
                  d="M3.21029 0.359375C3.92029 0.619375 4.44028 1.16939 4.95028 1.74939C11.3703 8.90939 17.8003 16.0694 24.2303 23.2294C25.1303 24.2294 25.3203 25.3994 24.7503 26.4794C24.6203 26.7294 24.4403 26.9494 24.2603 27.1594C17.6803 34.4894 11.1003 41.8194 4.51034 49.1494C3.26034 50.5394 1.44031 50.2894 0.73031 48.6194C0.36031 47.7394 0.440271 46.8894 0.940271 46.0994C1.08027 45.8794 1.26038 45.6794 1.43038 45.4894C7.36038 38.8794 13.3003 32.2694 19.2403 25.6594C19.3603 25.5294 19.5304 25.4393 19.6704 25.3293C19.6704 25.2593 19.6704 25.1794 19.6704 25.1094C19.5304 24.9994 19.3603 24.9094 19.2403 24.7794C13.2703 18.1394 7.3103 11.4994 1.3403 4.84937C0.430295 3.82937 0.250305 2.63945 0.850305 1.55945C1.19031 0.929448 1.74029 0.619385 2.33029 0.369385H3.20028L3.21029 0.359375Z"
                  fill="#B3B3B3"
                />
              </svg>
            </button>
          </>
        )}
      </div>
    </>
  );
}

// 🔹 Main News Component
export default function Ajabnews() {
  return (
    <div className="custom-inner-container mx-auto space-y-12 py-8">
      {newsData.map((news, index) => (
        <article key={news.id} className="bg-white">
          {/* Image Slider */}
          <ImageSlider images={news.images} />

          {/* Content Sections */}
          <div className="prose prose-lg max-w-none">
            {news.content.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {section.type === 'heading' ? (
                  <h2 className="mb-4 custom-heading-font">{section.text}</h2>
                ) : (
                  <ToggleText text={section.text} maxChars={200} />
                )}
              </div>
            ))}
          </div>

          {/* Divider - Show only between articles */}
          {index < newsData.length - 1 && <div className="mt-7 border-dotted-seprator"></div>}
        </article>
      ))}
      <NewsCard />
    </div>
  );
}
