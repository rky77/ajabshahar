'use client';

import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

import ajabNewsLogo from '../public/ajab-news-fly.png';
import ajabNewsText from '../public/ajab-news-text.png';
import PrevIcon from '../public/left-arrow.svg';
import NextIcon from '../public/right-arrow.svg';
import popUpBg from '../public/pop-up-bg.webp';

import type { ContentItem } from '@/lib/data';
import ContentCard from './ContentCard';
import '../styles/ModalStyle.css';

interface ContentSliderModalProps {
  items: ContentItem[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
}

export default function ContentSliderModal({
  items,
  isOpen,
  onClose,
  initialIndex = 0,
}: ContentSliderModalProps) {
  const [activeIndex, setActiveIndex] = useState(initialIndex);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<any>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center  pop-up-custom-outter-spacing">
      {' '}
      {/* Changed items-center to items-start and added pt-20 (80px) */}
      {/* Background container with 90% height and centered */}
      <div
        className="absolute w-full h-[830px] max-w-[820px] mx-auto pop-up-margin-top"
        style={{
          backgroundImage: `url(${popUpBg.src})`,
          backgroundSize: 'content',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: -1,
        }}
      />
      {/* Modal content */}
      <div className="relative flex flex-col items-center justify-center max-w-[620px] w-full bg-transparent rounded-2xl py-4 mx-auto h-full">
        {' '}
        {/* Added mt-0 to ensure no additional margin */}
        {/* Header */}
        <div className="flex items-center justify-between w-full px-2 py-2 bg-white rounded-t-2xl">
          <div className="news-logo">
            <Image src={ajabNewsLogo} alt="Ajab News" />
          </div>
          <div className="news-text">
            <Image src={ajabNewsText} alt="Ajab News" />
          </div>
          <button
            onClick={onClose}
            className="text-pink-600 hover:text-pink-700 mr-1 text-xl font-bold cursor-pointer"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        {/* Swiper wrapper */}
        <div className="relative w-full flex justify-center bg-white">
          {/* Prev Button */}
          <button
            ref={prevRef}
            aria-label="Previous"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-20"
          >
            <Image src={PrevIcon} alt="Prev" width={16} height={16} />
          </button>

          {/* Next Button */}
          <button
            ref={nextRef}
            aria-label="Next"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer z-20"
          >
            <Image src={NextIcon} alt="Next" width={16} height={16} />
          </button>

          {/* Swiper */}
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              // @ts-ignore
              swiper.params.navigation.prevEl = prevRef.current;
              // @ts-ignore
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setTimeout(() => {
                if (swiperRef.current?.navigation) {
                  swiperRef.current.navigation.init();
                  swiperRef.current.navigation.update();
                }
              });
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            initialSlide={initialIndex}
            className="w-full flex justify-center bg-white"
          >
            {items.map((item) => (
              <SwiperSlide key={item.id} className="flex justify-center">
                <div className="max-w-[420px] w-full mx-auto modal-container pt-0">
                  <ContentCard item={item} className="rounded-none shadow-none" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
