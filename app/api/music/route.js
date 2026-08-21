import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim();

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
      return NextResponse.json(
        {
          error: `Deezer request failed with status ${response.status}`,
        },
        { status: response.status },
      );
    }

    const data = await res.json();

    if (!Array.isArray(data?.data)) {
      return NextResponse.json(
        { error: "Invalid response from Deezer" },
        { status: 502 },
      );
    }

    const results = data.data
      .filter((track) => track?.id && track?.preview)
      .map((track) => ({
        id: track.id,
        title: track.title ?? "",
        artist: track.artist?.name ?? "",
        album: track.album?.title ?? "",
        cover:
          track.album?.cover_medium ??
          track.album?.cover_big ??
          track.album?.cover ??
          "",
        previewUrl: track.preview ?? "",
        externalUrl: track.link ?? "",
      }));

    return NextResponse.json(results, {
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Deezer fetch failed:", error);
    return NextResponse.json(
      { error: "Failed to fetch music" },
      { status: 500 },
    );
  }
}
