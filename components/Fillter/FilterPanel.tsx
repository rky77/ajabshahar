'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FilterPanel() {
  const [open, setOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);

  const togglePanel = () => setOpen(!open);

  // ✅ Dynamically detect header height
  useEffect(() => {
    const header = document.querySelector('header'); // Assuming header tag is used
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }
  }, []);

  // Mock filter data
  const filterData = {
    Singer: [
      'Abdullah Ismail Jat',
      'Amolak Ram',
      'Arun Goyal',
      'Bindhumalini & Vedanth',
      'Dayaram Saroliya',
    ],
    Poet: ['Lalon Fakir', 'Bulleh Shah', 'Kabir', 'Surdas', 'Meerabai'],
    Theme: ['Love & Devotion', 'Oneness', 'Longing', 'Truth', 'Separation'],
  };

  return (
    <div className="relative inline-block">
      {/* Trigger */}
      <button onClick={togglePanel} className="text-pink font-semibold  transition-colors">
        Filters
      </button>

      {/* Overlay + Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Background overlay */}
            <motion.div
              className="fixed inset-0  z-[40]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={togglePanel}
            />

            {/* Sidebar Panel */}
            <motion.div
              className="fixed left-0 w-80 sm:w-96 bg-white shadow-2xl z-[50] border-r border-gray-200 overflow-hidden"
              style={{
                top: `${headerHeight}px`, // ✅ positions panel below header
                height: `calc(100vh - ${headerHeight}px)`, // ✅ fills remaining height
              }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            >
              {/* Panel Content */}
              <div className="h-full flex flex-col">
                {/* Top Section */}
                <div className="flex justify-between items-center p-5 border-b border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-700">Filter by</h2>
                  <button onClick={togglePanel} className="pink-text  leading-none">
                    ×
                  </button>
                </div>

                {/* Scrollable Middle Section */}
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-8">
                  {Object.entries(filterData).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="font-semibold text-pink-600 mb-2">{category}</h3>
                      <ul className="space-y-1 text-gray-700">
                        {items.map((item) => (
                          <li
                            key={item}
                            className="cursor-pointer hover:text-pink-500 transition-colors"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Bottom Section */}
                <div className="p-5 border-t border-gray-200">
                  <button
                    onClick={() => alert('Filters cleared!')}
                    className="text-pink-600 font-medium hover:underline"
                  >
                    CLEAR ALL
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
