'use client';

import Image from 'next/image';
import Link from 'next/link';
import '../../../styles/CustomStyle.css';
import './Poem.css';

export default function Poem() {
  // Data from the screenshot
  const poemData = {
    id: 'amir-khusro-maati-kahe',
    poets: [
      {
        name: 'AMIR KHUSRO',
      },
    ],
    heading: 'The potter tells the earth - Thus and thus I pound you...',
    metaDescription: `Maati kahe kumhaar se 
tu kya roondat moye? Ik din aisa aayega, main rondungi toyev The potter tells the earth`,
  };

  const hasMedia = false;

  return (
    <div className="full-width">
      <div className="bg-white poem-card-box-wrapper card-rounded-4 shadow-lg hover:shadow-xl transition-shadow duration-300">
        {/* Card content */}
        <div
          className={`p-5 card-shape-top pt-1 pb-0 ${
            !hasMedia ? 'flex flex-col items-center text-center' : ''
          }`}
        >
          {/* Poem text */}
          <p className="card-text leading-relaxed mb-4 whitespace-pre-line line-clamp-4 overflow-hidden text-ellipsis">
            {poemData.metaDescription}
          </p>
          <div className="mb-4 whitespace-pre-line peopm-heading whitespace-pre-line line-clamp-2 overflow-hidden text-ellipsis">
            {poemData.heading}
          </div>

          {/* Poet name with border */}
          <div className="mb-2 border-top-pink">
            {poemData.poets[0]?.name && (
              <p className="text-xs semi-heading-2 font-medium text-gray-500 uppercase tracking-wide mb-3">
                <span className="lowercase">poet</span> {poemData.poets[0]?.name}
              </p>
            )}
          </div>

          {/* Explore poem link */}
          <div className="justify-self-stretch justify-end">
            <Link
              href={`/${poemData.id}/maati-kahe-kumhaar-se`}
              className="text-sm font-medium pink hover:text-pink-700 transition-colors z-20 uppercase"
            >
              {`EXPLORE POEM`}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
