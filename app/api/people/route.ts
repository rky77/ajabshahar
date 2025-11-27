import { NextResponse } from 'next/server';

const UPSTREAM = 'https://ajabshahar.aaravega.in/Api/person_list';

function splitName(name?: string) {
  if (!name) return { first: '', middle: null, last: null };
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { first: '', middle: null, last: null };
  if (parts.length === 1) return { first: parts[0], middle: null, last: null };
  if (parts.length === 2) return { first: parts[0], middle: null, last: parts[1] };
  return { first: parts[0], middle: parts.slice(1, -1).join(' '), last: parts[parts.length - 1] };
}

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, { cache: 'no-store' });

    if (!res.ok) {
      const text = await res.text();
      console.error('[API ERROR]', UPSTREAM, res.status, text);
      return NextResponse.json({ error: text || 'Upstream error' }, { status: res.status });
    }

    const raw = await res.json();

    // Debug: log upstream raw payload to server console
    console.log('[people] upstream raw:', JSON.stringify(raw, null, 2));

    // upstream might return an array or { data: [...] } or something else
    const list = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : raw?.person_list || [];

    const people = list.map((item: any) => {
      const id = Number(item?.id) || 0;
      const en = item?.person_name_english || '';
      const hi = item?.person_name_hindi || '';
      const thumbnailURL = item?.thumbnail_url || '';
      const category_name = item?.category_name || '';
      const category_type = item?.category_type || '';

      const enParts = splitName(en);
      const hiParts = splitName(hi);

      return {
        id,
        firstName: enParts.first,
        middleName: enParts.middle,
        lastName: enParts.last,
        metaTitle: en,
        metaKeywords: '',
        metaDescription: '',
        firstNameInHindi: hiParts.first,
        middleNameInHindi: hiParts.middle,
        lastNameInHindi: hiParts.last,
        roles: category_name ? [category_name] : [],
        primaryOccupation: { id: 0, name: category_name, categoryType: category_type },
        thumbnailURL,
        profile: '',
        display: true,
        publish: true,
      };
    });

    // Debug: log normalized people list
    console.log('[people] normalized count:', people.length);

    // Return in the shape that the frontend hook expects
    return NextResponse.json({ people });
  } catch (err: any) {
    console.error('[SERVER ERROR]', err);
    return NextResponse.json({ error: err?.message || 'Server crashed' }, { status: 500 });
  }
}
