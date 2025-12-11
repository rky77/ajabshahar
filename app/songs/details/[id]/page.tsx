'use client';

import SongDetails from '@/components/Songs/SongDetailsPage';
import { use, useEffect, useState } from 'react';

export default function SongDetailsPage({ params }: { params: Promise<{ id: string }> }) {

  // ⭐ unwrap params
  const { id } = use(params);

  const [song, setSong] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log("URL ID =", id);

  useEffect(() => {
    if (!id) return;

    const apiURL = `https://ajabshahar.aaravega.in/Api/explore_songs?${id}`;
    console.log("API URL =", apiURL);

    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        console.log("API DATA =", data);
        setSong(data?.data || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false);
      });

  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!song) return <p>No song found</p>;

  return <SongDetails data={song} />;
}
