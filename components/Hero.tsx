'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import searchIcon from "../public/search-icon.svg";

import SongCard from "./Home/SongCard/SongCard";
import Poem from "./Home/Poem/Poem";
import FilmCard from "./Home/Films/FilmCard";
import People from "./Home/PeopleView/People";
import Reflection from "./Home/Reflection/Reflection";
import ContentSliderModal from "./ContentSliderModal";

interface IHeroProps {
  isSearchOpen: boolean;
}

export default function Hero({ isSearchOpen }: IHeroProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // ====== API STATES ======
  const [song, setSong] = useState(null);
  const [reflection, setReflection] = useState(null);
  const [person, setPerson] = useState(null);
  const [film, setFilm] = useState(null);
  const [poem, setPoem] = useState(null);

  const [loading, setLoading] = useState(true);
  const [showAjabNews, setShowAjabNews] = useState(false);

  // ====== API FETCH ======
  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("https://ajabshahar.aaravega.in/Api/home");
        const data = await res.json();
         console.log("API Data:", data);
         console.log("Song Data:", data.latest.song);
        if (data.status) {
          setSong(data.latest.song);
          setReflection(data.latest.reflection);
          setPerson(data.latest.person);
          setFilm(data.latest.film);
          setPoem(data.latest.poem);
        }
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
        setShowAjabNews(true);
      }
    }

    loadData();
  }, []);

  return (
    <div className="full-background-home-page">
      <section className="relative min-h-screen">
        <div className="relative z-10 home-hero-container">

          {/* 🔍 SEARCH BOX – SAME UI */}
          {isSearchOpen && (
            <div className="absolute top-35 left-1/2 -translate-x-1/2 w-[750px] z-50">
              <div className="relative">
                <Image src={searchIcon} width={26} height={26} alt="Search" className="absolute left-4 top-1/2 -translate-y-1/2" />

                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-6 py-4 bg-white shadow-lg border border-gray-200 rounded-custom"
                  autoFocus
                />
              </div>
            </div>
          )}

          {/* ================= SONG CARD ================= */}
          {!loading && song && (
            <div className="columns-1 pt-8">
              <div className="product-card mb-6">
                <SongCard {...song} />
              </div>
            </div>
          )}

          {/* ================= POEM ================ */}
          <div className="poem-card-container">
          <Poem data={{...poem}} />

          </div>

          {/* ================= REFLECTION ================ */}
          {!loading && reflection && (
          <div className="reflection-card-container">
            <Reflection data={{...reflection}} />
          </div>
          )}

          {/* ================= PEOPLE ================ */}
          <div className="people-card-container">
            <People data={{...person} }/>
          </div>

          {/* ================= FILM ================ */}
          <div className="film-card-container">
            <FilmCard data={{...film}} />
          </div>

          {/* Ajab News Popup */}
          <ContentSliderModal
            items={song ? [song] : []}
            isOpen={showAjabNews}
            onClose={() => setShowAjabNews(false)}
          />
        </div>
      </section>
    </div>
  );
}
