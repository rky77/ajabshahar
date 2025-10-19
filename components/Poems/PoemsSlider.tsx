// components/Poems/PoemsSlider.tsx
'use client';

import { useState } from 'react';
import { Poem } from './types';
import './PoemsSlider.css';

interface PoemsSliderProps {
  poems?: Poem[];
  title?: string;
}
// components/Poems/types.ts
export interface Poem {
  id: string;
  englishTransliteration: string;
  englishTranslation: string; // Make this required
  poet: {
    id: string;
    name: string;
  };
}

const mockPoems: Poem[] = [
  {
    id: '1',
    englishTransliteration:
      'Aa panchhi jal piyet, nadiye khoote na neer The birds come to drink water, but the river water never decreases',
    poet: { id: '1', name: 'ABC' },
  },
  {
    id: '2',
    englishTransliteration:
      'Dharam kiye nahin dhan khoote, keh gaya das Kabir By doing dharma, wealth is not lost, says servant Kabir',
    poet: { id: '1', name: 'DCE' },
  },
  {
    id: '3',
    englishTransliteration:
      'Jal mein kumbh, kumbh mein jal hai, bahar bheetar paani Water in the pot, pot in the water, water inside and outside',
    poet: { id: '1', name: 'KABIR' },
  },
];

const LanguageSelector = () => {
  const [languages, setLanguages] = useState([
    { id: 1, label: 'अ', active: true },
    { id: 2, label: 'ā', active: false },
    { id: 3, label: 'a', active: false },
  ]);

  const handleLanguageClick = (id: number) => {
    setLanguages(
      languages.map((lang) => ({
        ...lang,
        active: lang.id === id,
      }))
    );
  };

  return (
    <div className="flex items-center justify-center gap-4 language-button">
      {languages.map((lang) => (
        <div
          key={lang.id}
          onClick={() => handleLanguageClick(lang.id)}
          className={`w-11 h-11 flex items-center justify-center rounded-full border transition-all duration-300 cursor-pointer ${
            lang.active
              ? 'bg-white text-pink shadow-md border-pink-200'
              : 'bg-white text-gray-500 hover:text-pink-600 hover:border-pink-300'
          }`}
        >
          <span className="text-lg font-medium">{lang.label}</span>
        </div>
      ))}
    </div>
  );
};

export default function PoemsSlider({ poems = mockPoems, title = 'Poems' }: PoemsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === poems.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? poems.length - 1 : prevIndex - 1));
  };

  if (!poems.length) return null;

  return (
    <div className="poems-slider">
      {/* Header with Count and Controls */}
      <div className="slider-header">
        <div className="slider-controls">
          <button onClick={prevSlide} className="slider-btn prev-btn">
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
              ></path>
            </svg>
          </button>
          <button onClick={nextSlide} className="slider-btn next-btn">
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
              ></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Slider Content */}
      <div className="slider-content">
        <div className="poem-card">
          <div className="poem-text-content">
            <p className="poem-transliteration">{poems[currentIndex].englishTransliteration}</p>
            <div className="poem-meta">
              <div className="poet-info">
                <span className="poet-label">poet</span>
                <span className="poet-name">{poems[currentIndex].poet?.name || 'KABIR'}</span>
              </div>
            </div>
          </div>

          {/* Language Selector */}
          <LanguageSelector />

          <div className="poem-actions">
            <button className="action-btn">NOTES</button>
            <span className="action-divider">|</span>
            <button className="action-btn">GLOSSARY</button>
          </div>
        </div>
      </div>
    </div>
  );
}
