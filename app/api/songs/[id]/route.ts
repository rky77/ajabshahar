import axiosInstance from '@/lib/utils/axios';
import { NextResponse } from 'next/server';

type Params = {
  params: {
    id: string;
  };
};

export async function GET(_req: Request, { params }: Params) {
  const { id } = params;
  try {
    const response = await axiosInstance.get(`songs/getPublishedSongs/${id}`);
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 });
  }
}
