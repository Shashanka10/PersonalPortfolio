"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Gamepad2,
  Smartphone,
  Monitor,
  Star,
  Gamepad,
  RefreshCw,
} from "lucide-react";

const FILTERS = [
  { id: "all", label: "All Games", icon: Gamepad2 },
  { id: "pc", label: "PC", icon: Monitor },
  { id: "mobile", label: "Mobile", icon: Smartphone },
];

const SKELETON_COUNT = 6;

function GameSkeleton() {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.07] bg-[#202020]">
      <div className="aspect-video animate-pulse bg-white/[0.06]" />
      <div className="space-y-3 p-3">
        <div className="h-3 w-3/4 animate-pulse rounded bg-white/[0.07]" />
        <div className="h-2.5 w-1/3 animate-pulse rounded bg-white/[0.05]" />
      </div>
    </div>
  );
}

function GameCard({ game, platform }) {
  const [imageFailed, setImageFailed] = useState(false);

  const title = game.title || game.query || "Untitled Game";
  const year = game.released?.slice(0, 4);
  const rating = Number(game.rating);

  return (
    <article
      className="
        group relative min-w-0 overflow-hidden rounded-xl
        border border-white/[0.08] bg-[#202020]
        transition-all duration-300 ease-out
        hover:-translate-y-1 hover:border-pink-500/40
        hover:shadow-lg hover:shadow-pink-500/[0.05]
        motion-reduce:transform-none motion-reduce:transition-none
      "
    >
      {/* Game artwork */}
      <div className="relative aspect-video overflow-hidden bg-[#292929]">
        {game.image && !imageFailed ? (
          <img
            src={game.image}
            alt={`${title} cover artwork`}
            loading="lazy"
            onError={() => setImageFailed(true)}
            className="
              h-full w-full object-cover
              transition-transform duration-500
              group-hover:scale-105
              motion-reduce:transform-none
            "
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-gray-500">
              <Gamepad2 size={25} strokeWidth={1.5} />
            </div>
          </div>
        )}

        {/* Subtle artwork gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        {/* Platform indicator */}
        <div className="absolute left-2 top-2 flex items-center gap-1 rounded-md border border-white/10 bg-black/65 px-2 py-1 text-[10px] font-medium text-gray-200 backdrop-blur-md">
          {platform === "pc" ? <Monitor size={11} /> : <Smartphone size={11} />}
          <span>{platform === "pc" ? "PC" : "Mobile"}</span>
        </div>
      </div>

      {/* Game information */}
      <div className="space-y-2 p-2.5 sm:p-3">
        <h3
          title={title}
          className="
            line-clamp-2 min-h-9 text-xs font-semibold leading-4
            text-gray-100 transition-colors duration-200
            group-hover:text-pink-300
            sm:text-sm
          "
        >
          {title}
        </h3>

        <div className="flex min-h-4 items-center justify-between gap-2">
          <span className="truncate text-[10px] text-gray-500 sm:text-xs">
            {year || (platform === "pc" ? "PC Game" : "Mobile Game")}
          </span>

          {Number.isFinite(rating) && rating > 0 && (
            <span className="flex shrink-0 items-center gap-1 text-[10px] text-gray-400 sm:text-xs">
              <Star size={11} className="fill-yellow-400 text-yellow-400" />
              {rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function GamesSection() {
  const [games, setGames] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchGames(signal) {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/games", { signal });

      if (!response.ok) {
        throw new Error("Failed to fetch games");
      }

      const data = await response.json();

      if (!Array.isArray(data.games)) {
        throw new Error("Invalid games response");
      }

      setGames(data.games);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Games API error:", err);
        setError(true);
      }
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    fetchGames(controller.signal);

    return () => controller.abort();
  }, []);

  const filteredGames = useMemo(() => {
    if (activeFilter === "all") return games;

    return games.filter((game) => game.platform === activeFilter);
  }, [games, activeFilter]);

  const pcCount = games.filter((game) => game.platform === "pc").length;
  const mobileCount = games.filter((game) => game.platform === "mobile").length;

  return (
    <section className="space-y-7 sm:space-y-9">
      {/* Filter controls */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.07] pb-4">
        {FILTERS.map((filter) => {
          const Icon = filter.icon;
          const active = activeFilter === filter.id;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={active}
              className={`
                inline-flex items-center gap-2 rounded-lg border cursor-pointer
                px-3 py-2 text-xs font-medium transition-all duration-200
                focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-pink-400
                sm:px-4 sm:text-sm
                ${
                  active
                    ? "border-pink-500/30 bg-pink-500/10 text-pink-300"
                    : "border-white/[0.07] bg-white/[0.02] text-gray-400 hover:border-white/15 hover:text-gray-200"
                }
              `}
            >
              <Icon size={14} />
              {filter.label}
              {!loading && !error && (
                <span
                  className={`text-[10px] ${
                    active ? "text-pink-300/70" : "text-gray-600"
                  }`}
                >
                  {filter.id === "all"
                    ? games.length
                    : filter.id === "pc"
                      ? pcCount
                      : mobileCount}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
            <GameSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.02] px-5 py-12 text-center">
          <Gamepad2 size={32} className="mb-3 text-gray-600" />

          <h3 className="text-sm font-semibold text-gray-200">
            Couldn't load your games
          </h3>

          <p className="mt-1 max-w-sm text-xs leading-relaxed text-gray-500">
            Something went wrong while fetching the game library. Please try
            again.
          </p>

          <button
            type="button"
            onClick={() => {
              const controller = new AbortController();
              fetchGames(controller.signal);
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-xs font-medium text-pink-300 transition-colors hover:bg-pink-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
          >
            <RefreshCw size={13} />
            Try again
          </button>
        </div>
      )}

      {/* Game cards */}
      {!loading && !error && filteredGames.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-3">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} platform={game.platform} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filteredGames.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 px-5 py-12 text-center">
          <Gamepad2 size={30} className="mb-3 text-gray-600" />

          <h3 className="text-sm font-medium text-gray-300">
            No games here yet
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Add some games to this category to see them here.
          </p>

          {activeFilter !== "all" && (
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className="mt-3 text-xs text-pink-400 hover:text-pink-300"
            >
              Show all games
            </button>
          )}
        </div>
      )}
    </section>
  );
}
