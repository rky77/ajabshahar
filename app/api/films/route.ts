import { NextResponse } from "next/server";

const UPSTREAM = "https://ajabshahar.aaravega.in/Api/film_list";

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, { cache: "no-store" });

    if (!res.ok) {
      const text = await res.text();
      console.error("[API ERROR]", UPSTREAM, res.status, text);
      return NextResponse.json({ error: text || "Upstream error" }, { status: res.status });
    }

    const data = await res.json();
    // Unwrap common shapes: Array or { data: [...] }
    if (Array.isArray(data)) return NextResponse.json(data);
    if (Array.isArray(data?.data)) return NextResponse.json(data.data);

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("[SERVER ERROR]", err);
    return NextResponse.json({ error: err?.message || "Server crashed" }, { status: 500 });
  }
}
