'use client';

import SongDetails from '@/components/Songs/SongDetailsPage';
import { use } from 'react';

const SongDetailsPage = ({ params }: { params: Promise<{ id: string; title: string }> }) => {
  const { id, title } = use(params); // ✅ unwraps the async params
  return <SongDetails id={id} title={title} />;
};

export default SongDetailsPage;
