// 'use client';
// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// // Clean list helper
// function cleanList(list: any[]) {
//   return list
//     .filter((v) => v && v !== null && v !== "")
//     .filter((v, i, arr) => arr.indexOf(v) === i);
// }

// export default function FilterPanel({
//   onFilterSelect,
//   onSearchChange,
// }: {
//   onFilterSelect: (type: string, value: string) => void;
//   onSearchChange: (value: string) => void;
// }) {
//   const [open, setOpen] = useState(false);
//   const [headerHeight, setHeaderHeight] = useState(0);
//   const [search, setSearch] = useState("");

//   const [filters, setFilters] = useState({
//     Singer: [],
//     Poet: [],
//     // Theme: []
//   });

//   const togglePanel = () => setOpen(!open);

//   useEffect(() => {
//     const header = document.querySelector("header");
//     if (header) setHeaderHeight(header.offsetHeight);
//   }, []);

//   // Fetch filter lists
//   useEffect(() => {
//     fetchFilters();
//   }, []);

//   const fetchFilters = async () => {
//     try {
//       const res = await fetch("https://ajabshahar.aaravega.in/Api/song_filters");
//       const json = await res.json();

//       setFilters({
//         Singer: cleanList(json?.data?.song?.map((x: any) => x.singer_name)),
//         Poet: cleanList(json?.data?.poet?.map((x: any) => x.poet_name)),
//         // Theme: cleanList(json?.data?.theme?.map((x: any) => x.name)),
//       });
//     } catch (e) {
//       console.error("Filter API error", e);
//     }
//   };

//   // Apply search filter
//   const filteredData = Object.fromEntries(
//     Object.entries(filters).map(([category, items]: any) => [
//       category,
//       items.filter((item: string) =>
//         item.toLowerCase().includes(search.toLowerCase())
//       ),
//     ])
//   );

//   return (
//     <div className="relative inline-block">
//       <button onClick={togglePanel} className="text-pink font-semibold">
//         Filters
//       </button>

//       <AnimatePresence>
//         {open && (
//           <>
//             {/* Overlay */}
//             <motion.div
//               className="fixed inset-0 z-[40]"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={togglePanel}
//             />

//             {/* Panel */}
//             <motion.div
//               className="fixed left-0 w-80 sm:w-96 bg-white shadow-2xl border-r z-[50]"
//               style={{
//                 top: `${headerHeight}px`,
//                 height: `calc(100vh - ${headerHeight}px)`
//               }}
//               initial={{ x: "-100%" }}
//               animate={{ x: 0 }}
//               exit={{ x: "-100%" }}
//               transition={{ type: "spring", stiffness: 100, damping: 15 }}
//             >
//               {/* Search Box */}
//               <div className="p-4 border-b">
//                 <input
//                   value={search}
//                   onChange={(e) => {
//                     setSearch(e.target.value);
//                     onSearchChange(e.target.value); // send search text to parent
//                   }}
//                   className="w-full p-2 border rounded"
//                   placeholder="Search..."
//                 />
//               </div>

//               {/* Filters List */}
//               <div className="p-4 overflow-y-auto space-y-6" style={{
//     height: `calc(100vh - ${headerHeight}px - 70px)` // ⬅ Search box की height minus करके perfect scroll
//   }}>
//                 {Object.entries(filteredData).map(([category, items]: any) => (
//                   <div key={category}>
//                     <h3 className="text-pink-600 font-semibold">{category}</h3>

//                     {items.length === 0 ? (
//                       <p className="text-gray-400">No results</p>
//                     ) : (
//                       items.map((item: string) => (
//                         <p
//                           key={item}
//                           className="cursor-pointer hover:text-pink-500"
//                           onClick={() => {
//                             onFilterSelect(category, item);
//                             setOpen(false);
//                           }}
//                         >
//                           <span className="text-gray-500 font-medium">{}</span> {item}
//                           {/* <span className="text-gray-500 font-medium">{category}</span> — {item} */}
//                         </p>
//                       ))
//                     )}
//                   </div>
//                 ))}
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }



'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Clean list helper
function cleanList(list: any[]) {
  return list
    .filter((v) => v && v !== null && v !== "")
    .filter((v, i, arr) => arr.indexOf(v) === i);
}

export default function FilterPanel({
  onFilterSelect,
  onSearchChange,
}: {
  onFilterSelect: (type: string, value: string) => void;
  onSearchChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    Singer: [],
    Poet: [],
  });

  const togglePanel = () => setOpen(!open);

  useEffect(() => {
    const header = document.querySelector("header");
    if (header) setHeaderHeight(header.offsetHeight);
  }, []);

  // Fetch filter lists
  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      const res = await fetch("https://ajabshahar.aaravega.in/Api/song_filters");
      const json = await res.json();

      setFilters({
        Singer: cleanList(json?.data?.song?.map((x: any) => x.singer_name)),
        Poet: cleanList(json?.data?.poet?.map((x: any) => x.poet_name)),
      });
    } catch (e) {
      console.error("Filter API error", e);
    }
  };

  // Apply search filter inside sidebar
  const filteredData = Object.fromEntries(
    Object.entries(filters).map(([category, items]: any) => [
      category,
      items.filter((item: string) =>
        item.toLowerCase().includes(search.toLowerCase())
      ),
    ])
  );

  return (
    <div className="relative inline-block">
      <button onClick={togglePanel} className="text-pink font-semibold">
        Filters
      </button>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-[40]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={togglePanel}
            />

            {/* Panel */}
            <motion.div
              className="fixed left-0 w-80 sm:w-96 bg-white shadow-2xl border-r z-[50]"
              style={{
                top: `${headerHeight}px`,
                height: `calc(100vh - ${headerHeight}px)`
              }}
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >

              {/* Search Box */}
              <div className="p-4 border-b">
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    onSearchChange(e.target.value);
                  }}
                  className="w-full p-2 border rounded"
                  placeholder="Search..."
                />
              </div>

              {/* Scrollable List */}
              <div
                className="p-4 overflow-y-auto space-y-6"
                style={{
                  height: `calc(100vh - ${headerHeight}px - 70px)`
                }}
              >
                {Object.entries(filteredData).map(([category, items]: any) => (
                  <div key={category}>
                    <h3 className="text-pink-600 font-semibold">{category}</h3>

                    {items.length === 0 ? (
                      <p className="text-gray-400">No results</p>
                    ) : (
                      items.map((item: string) => (
                        <p
                          key={item}
                          className="cursor-pointer hover:text-pink-500"
                          onClick={() => {
                            onFilterSelect(category, item);
                            setOpen(false);
                          }}
                        >
                          {item}
                        </p>
                      ))
                    )}
                  </div>
                ))}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// 'use client';
// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// // 🔥 Utility function to clean list (remove nulls + duplicates)
// function cleanList(list: any[]) {
//   return list
//     .filter((item) => item && item !== null && item !== "") // remove null
//     .filter((value, index, self) => self.indexOf(value) === index); // unique
// }

// export default function FilterPanel() {
//   const [open, setOpen] = useState(false);
//   const [headerHeight, setHeaderHeight] = useState(0);

//   // Dynamic Filters State
//   const [filters, setFilters] = useState({
//     Singer: [],
//     Poet: [],
//     Theme: []
//   });

//   // Open/Close Panel
//   const togglePanel = () => setOpen(!open);

//   // Detect header height
//   useEffect(() => {
//     const header = document.querySelector('header');
//     if (header) setHeaderHeight(header.offsetHeight);
//   }, []);

//   // 🔥 Fetch Filters from API
//   useEffect(() => {
//     fetchFilters();
//   }, []);

//   const fetchFilters = async () => {
//     try {
//       const response = await fetch("https://ajabshahar.aaravega.in/Api/song_filters");
//       const json = await response.json();
// console.log("Filter API Response:", json);
//       const songList = json?.data?.song || [];
//       const poetList = json?.data?.poet || [];
//       // const themeList = json?.data?.theme || [];

//       // Extract singer names
//       const singers = cleanList(songList.map((item: any) => item.singer_name));

//       // Extract poets
//       const poets = cleanList(poetList.map((item: any) => item.poet_name));

//       // Extract themes
//       // const themes = cleanList(themeList.map((item: any) => item.name));

//       setFilters({
//         Singer: singers,
//         Poet: poets,
//         // Theme: themes,
//       });
//     } catch (error) {
//       console.error("Error fetching filter data:", error);
//     }
//   };

//   return (
//     <div className="relative inline-block">
//       {/* Trigger Button */}
//       <button onClick={togglePanel} className="text-pink font-semibold transition-colors">
//         Filters
//       </button>

//       {/* Overlay + Panel */}
//       <AnimatePresence>
//         {open && (
//           <>
//             {/* Background Overlay */}
//             <motion.div
//               className="fixed inset-0 z-[40]"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={togglePanel}
//             />

//             {/* Sidebar Panel */}
//             <motion.div
//               className="fixed left-0 w-80 sm:w-96 bg-white shadow-2xl z-[50] border-r border-gray-200 overflow-hidden"
//               style={{
//                 top: `${headerHeight}px`,
//                 height: `calc(100vh - ${headerHeight}px)`,
//               }}
//               initial={{ x: '-100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '-100%' }}
//               transition={{ type: 'spring', stiffness: 100, damping: 15 }}
//             >
//               {/* Panel Content */}
//               <div className="h-full flex flex-col">
//                 {/* Top Section */}
//                 <div className="flex justify-between items-center p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-700">Filter by</h2>
//                   <button onClick={togglePanel} className="pink-text leading-none">×</button>
//                 </div>

//                 {/* Scrollable Middle Section */}
//                 <div className="flex-1 overflow-y-auto px-5 py-4 space-y-8">
//                   {Object.entries(filters).map(([category, items]: any) => (
//                     <div key={category}>
//                       <h3 className="font-semibold text-pink-600 mb-2">{category}</h3>

//                       <ul className="space-y-1 text-gray-700">
//                         {items.length === 0 ? (
//                           <li className="text-gray-400 text-sm">No data</li>
//                         ) : (
//                           items.map((item: string) => (
//                             <li
//                               key={item}
//                               className="cursor-pointer hover:text-pink-500 transition-colors"
//                             >
//                               {item}
//                             </li>
//                           ))
//                         )}
//                       </ul>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Bottom Section */}
//                 <div className="p-5 border-t border-gray-200">
//                   <button
//                     onClick={() => alert('Filters cleared!')}
//                     className="text-pink-600 font-medium hover:underline"
//                   >
//                     CLEAR ALL ss
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }


// 'use client';
// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// export default function FilterPanel() {
//   const [open, setOpen] = useState(false);
//   const [headerHeight, setHeaderHeight] = useState(0);

//   const togglePanel = () => setOpen(!open);

//   // ✅ Dynamically detect header height
//   useEffect(() => {
//     const header = document.querySelector('header'); // Assuming header tag is used
//     if (header) {
//       setHeaderHeight(header.offsetHeight);
//     }
//   }, []);

//   // Mock filter data
//   const filterData = {
//     Singer: [
//       'Abdullah Ismail Jat',
//       'Amolak Ram',
//       'Arun Goyal',
//       'Bindhumalini & Vedanth',
//       'Dayaram Saroliya',
//       'Nitesh'
//     ],
//     Poet: ['Lalon Fakir', 'Bulleh Shah', 'Kabir', 'Surdas', 'Meerabai'],
//     Theme: ['Love & Devotion', 'Oneness', 'Longing', 'Truth', 'Separation'],
//   };

//   return (
//     <div className="relative inline-block">
//       {/* Trigger */}
//       <button onClick={togglePanel} className="text-pink font-semibold  transition-colors">
//         Filters
//       </button>

//       {/* Overlay + Panel */}
//       <AnimatePresence>
//         {open && (
//           <>
//             {/* Background overlay */}
//             <motion.div
//               className="fixed inset-0  z-[40]"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               onClick={togglePanel}
//             />

//             {/* Sidebar Panel */}
//             <motion.div
//               className="fixed left-0 w-80 sm:w-96 bg-white shadow-2xl z-[50] border-r border-gray-200 overflow-hidden"
//               style={{
//                 top: `${headerHeight}px`, // ✅ positions panel below header
//                 height: `calc(100vh - ${headerHeight}px)`, // ✅ fills remaining height
//               }}
//               initial={{ x: '-100%' }}
//               animate={{ x: 0 }}
//               exit={{ x: '-100%' }}
//               transition={{ type: 'spring', stiffness: 100, damping: 15 }}
//             >
//               {/* Panel Content */}
//               <div className="h-full flex flex-col">
//                 {/* Top Section */}
//                 <div className="flex justify-between items-center p-5 border-b border-gray-200">
//                   <h2 className="text-lg font-semibold text-gray-700">Filter by</h2>
//                   <button onClick={togglePanel} className="pink-text  leading-none">
//                     ×
//                   </button>
//                 </div>

//                 {/* Scrollable Middle Section */}
//                 <div className="flex-1 overflow-y-auto px-5 py-4 space-y-8">
//                   {Object.entries(filterData).map(([category, items]) => (
//                     <div key={category}>
//                       <h3 className="font-semibold text-pink-600 mb-2">{category}</h3>
//                       <ul className="space-y-1 text-gray-700">
//                         {items.map((item) => (
//                           <li
//                             key={item}
//                             className="cursor-pointer hover:text-pink-500 transition-colors"
//                           >
//                             {item}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   ))}
//                 </div>

//                 {/* Bottom Section */}
//                 <div className="p-5 border-t border-gray-200">
//                   <button
//                     onClick={() => alert('Filters cleared!')}
//                     className="text-pink-600 font-medium hover:underline"
//                   >
//                     CLEAR ALL
//                   </button>
//                 </div>
//               </div>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }
