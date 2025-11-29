'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '@/styles/CustomStyle.css';
import ThumImage from '@/public/TN-About-Basavalingaiah-Hiremath.jpg';

// Counter outside component to maintain sequence
let globalCardCounter = 0;

export default function ReflectionsCard(item) {
  const [screenSize, setScreenSize] = useState('large');
  const [imageDimensions, setImageDimensions] = useState({ width: 280, height: 156 });
  const [cardIndex, setCardIndex] = useState(0);

  const hasMedia = item.youtubeVideoId || item.thumbnailURL;

  // Handle nested data safely
  const poetName = Array.isArray(item.poets) && item.poets.length > 0 ? item.poets[0]?.name : null;

  const speakerName =
    typeof item.speaker === 'object' && item.speaker?.name
      ? item.speaker.name
      : typeof item.speaker === 'string'
      ? item.speaker
      : null;

  const title =
    typeof item.metaTitle === 'object' ? item.metaTitle.englishTranslation || '' : item.metaTitle;

  const description =
    typeof item.metaDescription === 'object'
      ? item.metaDescription.englishTranslation || ''
      : item.metaDescription;

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 1580) {
        setScreenSize('medium');
        setImageDimensions({ width: 240, height: 136 });
      } else {
        setScreenSize('large');
        setImageDimensions({ width: 256, height: 156 });
      }
    };

    // Check initially
    checkScreenSize();

    // Add event listener
    window.addEventListener('resize', checkScreenSize);

    // Set card index on mount
    setCardIndex(globalCardCounter++);

    // Cleanup
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Get height class based on screen size
  const getHeightClass = () => {
    switch (screenSize) {
      case 'medium':
        return 'h-[134px]';
      case 'large':
        return 'h-[156px]';
      default:
        return 'h-[156px]';
    }
  };

  const links = [
    { id: 1, link: 'INTERVIEW' },
    { id: 2, link: 'VISUAL STORY' },
    { id: 3, link: 'ESSAY' },
    { id: 4, link: 'INTERVIEW' },
    { id: 5, link: 'AUDIO STORY' },
    { id: 6, link: 'INTERVIEW' },
  ];

  // Get link text based on card index
  const getCardLinkText = () => {
    const linkIndex = cardIndex % links.length;
    return links[linkIndex].link;
  };

  const cardLinkText = getCardLinkText();

  return (
    <div className="bg-white card-rounded-4 shadow-lg reflections-card transition-shadow duration-300">
      {/* Media Section */}
      <div className={`relative w-full ${getHeightClass()} video-custom-width`}>
        <Image
          src={ThumImage}
          alt={title || 'Reflection image'}
          width={imageDimensions.width}
          height={imageDimensions.height}
          className="object-cover w-full h-full"
          priority
        />
      </div>

      {/* Card Content Section */}
      <div className="p-5 card-shape-top pt-1 pb-0 flex flex-col items-center">
        <div className="mb-2">
          {/* Title */}
          {title && <h3 className="card-heading font-semibold mb-1 line-clamp-3">{title}</h3>}

          {/* Speaker */}
          {speakerName && (
            <p className="reflections-semi-heading">
              says <span className="name">{speakerName}</span>
            </p>
          )}

          {/* Poet */}
          {poetName && (
            <p className="text-xs semi-heading-2 font-medium text-gray-500 uppercase tracking-wide mb-3">
              <span className="lowercase">poet:</span> {poetName}
            </p>
          )}
        </div>

        {/* Description */}
        {description && <p className="reflections-card-text">{description}</p>}

        {/* Link with dynamic text */}
        <div className="w-full justify-end flex">
          <Link
            href={`/reflections/details/${item.id}`}
            className="reflections-card-link transition-colors z-20 uppercase"
          >
            {cardLinkText}
          </Link>
        </div>
      </div>
    </div>
  );
}
