import axiosInstance from '@/lib/utils/axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const publish = searchParams.get('publish'); // "true", "false", or null

  try {
    const shouldPublish = publish === 'true';

    if (!shouldPublish) {
      return;
    }

    const response = await axiosInstance.get('words?publish=true');

    return NextResponse.json(response.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 });
  }
}
