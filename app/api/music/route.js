import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const query = searchParams.get("q");

    if (!query) {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    const response = await fetch(
      `https://api.deezer.com/search?q=${encodeURIComponent(query)}`,
      {
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Deezer request failed" },
        { status: response.status },
      );
    }

    const data = await response.json();

    const tracks = (data.data || []).slice(0, 5).map((track) => ({
      id: track.id,
      title: track.title,
      artist: track.artist?.name || "Unknown Artist",

      cover:
        track.album?.cover_xl ||
        track.album?.cover_big ||
        track.album?.cover_medium ||
        null,

      previewUrl: track.preview || null,

      externalUrl: track.link || null,

      album: track.album?.title || null,
    }));

    return NextResponse.json(tracks);
  } catch (error) {
    console.error("Deezer API error:", error);

    return NextResponse.json(
      { error: "Unable to fetch music" },
      { status: 500 },
    );
  }
}
