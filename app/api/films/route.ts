import axiosInstance from '@/lib/utils/axios';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await axiosInstance.get('films/getPublished');
    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 });
  }
}
