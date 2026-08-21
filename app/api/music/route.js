// app/api/music/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(q)}`,
      {
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      throw new Error(`Deezer responded with ${res.status}`);
    }

    const data = await res.json();

    const results = (data?.data || []).map((track) => ({
      id: track.id,
      title: track.title,
      artist: track.artist?.name,
      album: track.album?.title,
      cover: track.album?.cover_medium,
      previewUrl: track.preview?.replace(/^http:\/\//i, "https://"),
      externalUrl: track.link,
    }));

    return NextResponse.json(results, {
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Deezer fetch failed:", error);
    return NextResponse.json([], { status: 200 });
  }
}
