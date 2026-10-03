import { NextResponse } from "next/server";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

async function fetchTMDB(type, id) {
  const response = await fetch(
    `${TMDB_BASE_URL}/${type}/${id}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
        accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`TMDB error: ${response.status}`);
  }

  return response.json();
}

async function fetchMany(entries) {
  const results = await Promise.all(
    entries.map(async ({ id, type }) => {
      try {
        const data = await fetchTMDB(type, id);

        return { ...data, media_type: type };
      } catch {
        return null;
      }
    }),
  );

  return results.filter(Boolean);
}

export async function POST(request) {
  try {
    const { movies = [], series = [], anime = [] } = await request.json();

    const [movieResults, seriesResults, animeResults] = await Promise.all([
      fetchMany(movies.map((id) => ({ id, type: "movie" }))),
      fetchMany(series.map((id) => ({ id, type: "tv" }))),
      // anime entries look like { id, type: "tv" | "movie" }; default is tv
      fetchMany(
        anime.map(({ id, type }) => ({
          id,
          type: type === "movie" ? "movie" : "tv",
        })),
      ),
    ]);

    return NextResponse.json({
      movies: movieResults,
      series: seriesResults,
      anime: animeResults,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch movies, series and anime",
      },
      {
        status: 500,
      },
    );
  }
}
