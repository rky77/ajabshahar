import { NextResponse } from 'next/server';

const UPSTREAM = 'https://ajabshahar.aaravega.in/Api/first_items';

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, { cache: 'no-store' });

    if (!res.ok) {
      const text = await res.text();
      console.error('[API ERROR]', UPSTREAM, res.status, text);
      return NextResponse.json({ error: text || 'Upstream error' }, { status: res.status });
    }

    const data = await res.json();

    // Debug: log upstream raw payload to server console (for developer visibility)
    console.log('[first_items] upstream raw:', JSON.stringify(data, null, 2));

    // Basic passthrough when data already matches expected shape
    if (data == null) return NextResponse.json({ error: 'No data' }, { status: 204 });

    // The upstream returns keys: status, song, reflection, person, film
    // We'll normalize to a predictable shape for the frontend
    const normalized = {
      song: data?.song || null,
      reflection: data?.reflection || null,
      person: data?.person || null,
      film: data?.film || null,
    };

    // Debug: log normalized shape that will be returned to frontend
    console.log('[first_items] normalized:', JSON.stringify(normalized, null, 2));

    return NextResponse.json(normalized);
  } catch (err: any) {
    console.error('[SERVER ERROR]', err);
    return NextResponse.json({ error: err?.message || 'Server crashed' }, { status: 500 });
  }
}
