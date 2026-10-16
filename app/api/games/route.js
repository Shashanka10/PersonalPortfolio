import { NextResponse } from "next/server";
import { games } from "@/app/hobbies/[category]/data";

export const revalidate = 86400; // Cache for 24 hours

export async function GET() {
  const apiKey = process.env.RAWG_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "RAWG API key is not configured." },
      { status: 500 },
    );
  }

  try {
    const results = await Promise.all(
      games.map(async (game) => {
        const params = new URLSearchParams({
          key: apiKey,
          search: game.query,
          page_size: "5",
        });

        const response = await fetch(
          `https://api.rawg.io/api/games?${params}`,
          { next: { revalidate: 86400 } },
        );

        if (!response.ok) {
          throw new Error(`RAWG request failed: ${response.status}`);
        }

        const data = await response.json();

        // Prefer an exact title match to avoid unrelated search results.
        const normalizedQuery = game.query.toLowerCase();

        const match =
          data.results?.find(
            (item) => item.name.toLowerCase() === normalizedQuery,
          ) ?? data.results?.[0];

        return {
          id: game.id,
          title: match?.name ?? game.query,
          image: match?.background_image ?? null,
          released: match?.released ?? null,
          rating: match?.rating ?? null,
          genres: match?.genres?.map((genre) => genre.name) ?? [],
          platform: game.platform,
          status: game.status,
          rawgUrl: match ? `https://rawg.io/games/${match.slug}` : null,
        };
      }),
    );

    return NextResponse.json(
      { games: results },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=86400, stale-while-revalidate=3600",
        },
      },
    );
  } catch (error) {
    console.error("Failed to fetch games:", error);

    return NextResponse.json(
      { error: "Unable to load games right now." },
      { status: 502 },
    );
  }
}
