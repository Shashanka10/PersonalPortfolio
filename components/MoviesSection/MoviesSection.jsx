"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Star,
  Calendar,
  Clock,
  Film,
  Tv,
  Laptop,
  X,
  ExternalLink,
} from "lucide-react";

import Reveal from "@/components/Reveal/Reveal";
import {
  favoriteMovies,
  favoriteSeries,
  favoriteAnime,
} from "@/app/hobbies/[category]/data";

const ACCENT = "#f59e0b";
const TMDB_IMG = "https://image.tmdb.org/t/p";

const CATEGORIES = [
  { id: "movie", label: "Movies", icon: Film },
  { id: "series", label: "Series", icon: Tv },
  { id: "anime", label: "Anime", icon: Laptop },
];

const FILTERS = [{ id: "all", label: "All" }, ...CATEGORIES];

const SORTS = [
  { id: "mine", label: "My order" },
  { id: "rating", label: "Top rated" },
  { id: "year", label: "Newest" },
];

const GRID_CLASS =
  "grid gap-3 sm:gap-4 grid-cols-[repeat(auto-fill,minmax(96px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(116px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(132px,1fr))]";

/* ---------- helpers ---------- */

function getMeta(item) {
  const isSeries = item.media_type === "tv";
  const isAnime = item.category === "anime";
  const title = item.title || item.name || "Untitled";
  const date = item.release_date || item.first_air_date || "";
  const year = date.slice(0, 4);

  let length = "";
  if (isSeries && item.number_of_seasons) {
    const n = item.number_of_seasons;
    length = `${n} season${n > 1 ? "s" : ""}`;
  } else if (!isSeries && item.runtime) {
    length = `${Math.floor(item.runtime / 60)}h ${item.runtime % 60}m`;
  }

  return {
    isSeries,
    isAnime,
    title,
    year,
    length,
    genres: (item.genres || []).map((g) => g.name),
    // short label for badges
    badge: isAnime ? "Anime" : isSeries ? "Series" : "Movie",
    // longer label for the modal
    kind: isAnime
      ? isSeries
        ? "Anime series"
        : "Anime film"
      : isSeries
        ? "Series"
        : "Movie",
  };
}

function ratingColor(value) {
  if (value >= 8) return "#22c55e";
  if (value >= 6) return "#f59e0b";
  return "#ef4444";
}

// Merge your local data (personalTag, type) into the TMDB response
function withLocal(items, local, category, offset) {
  return items.map((item) => {
    const index = local.findIndex(
      (l) =>
        l.id === item.id && (l.type ?? item.media_type) === item.media_type,
    );

    return {
      ...item,
      category,
      personalTag: local[index]?.personalTag,
      order: offset + index,
    };
  });
}

function sortItems(list, sort) {
  const dateOf = (i) => i.release_date || i.first_air_date || "";

  return [...list].sort((a, b) => {
    if (sort === "rating") return (b.vote_average || 0) - (a.vote_average || 0);
    if (sort === "year") return dateOf(b).localeCompare(dateOf(a));
    return a.order - b.order;
  });
}

const keyOf = (item) => `${item.category}-${item.media_type}-${item.id}`;

function KindIcon({ item, size = 11 }) {
  if (item.category === "anime") return <Laptop size={size} />;
  return item.media_type === "tv" ? <Tv size={size} /> : <Film size={size} />;
}

/* ---------- small pieces ---------- */

function Rating({ value, className = "" }) {
  if (!value || value <= 0) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border border-white/10 bg-black/60 px-2 py-1 text-xs text-gray-200 backdrop-blur-md ${className}`}
    >
      <Star
        size={11}
        style={{ color: ratingColor(value), fill: ratingColor(value) }}
      />
      {value.toFixed(1)}
    </span>
  );
}

function PersonalTag({ children }) {
  if (!children) return null;

  return (
    <span
      className="rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur-md"
      style={{
        color: ACCENT,
        borderColor: `${ACCENT}40`,
        backgroundColor: `${ACCENT}1a`,
      }}
    >
      {children}
    </span>
  );
}

function SectionHeading({ icon, children }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-gray-200">
        {icon}
        <h2 className="text-xl font-bold">{children}</h2>
      </div>
      <div className="h-px flex-1 bg-[#2e2e2e]" />
    </div>
  );
}

/* ---------- card ---------- */

function MovieCard({ item, onOpen }) {
  const { title, year, badge } = getMeta(item);
  const poster = item.poster_path
    ? `${TMDB_IMG}/w342${item.poster_path}`
    : null;

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`${title}, view details`}
      title={title}
      className="group block w-full text-left cursor-pointer focus:outline-none"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-xl border border-[#2e2e2e] bg-[#151515] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#f59e0b60] group-focus-visible:-translate-y-1 group-focus-visible:ring-2 group-focus-visible:ring-[#f59e0b]">
        {poster ? (
          <Image
            src={poster}
            alt=""
            fill
            loading="eager"
            sizes="(max-width: 639px) 34vw, 180px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[10px] text-gray-600">
            No poster
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <span
          title={badge}
          className="absolute left-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border backdrop-blur-md"
          style={{
            color: ACCENT,
            borderColor: `${ACCENT}40`,
            backgroundColor: `${ACCENT}1a`,
          }}
        >
          <KindIcon item={item} size={12} />
        </span>

        {item.vote_average > 0 && (
          <span className="absolute bottom-1.5 left-1.5 inline-flex items-center gap-1 rounded-full bg-black/60 px-1.5 py-0.5 text-[10px] text-gray-200 backdrop-blur-md">
            <Star
              size={9}
              style={{
                color: ratingColor(item.vote_average),
                fill: ratingColor(item.vote_average),
              }}
            />
            {item.vote_average.toFixed(1)}
          </span>
        )}
      </div>

      <div className="px-0.5 pt-2">
        <h3 className="line-clamp-1 text-xs font-semibold text-gray-100">
          {title}
        </h3>

        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          {year && <span className="text-[11px] text-gray-500">{year}</span>}

          {item.personalTag && (
            <span
              className="rounded-full px-2 py-0.5 text-[10px] font-medium"
              style={{ color: ACCENT, backgroundColor: `${ACCENT}1a` }}
            >
              {item.personalTag}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

/* ---------- detail modal ---------- */

function DetailModal({ item, onClose }) {
  const closeRef = useRef(null);
  const { title, year, length, genres, isSeries, kind } = getMeta(item);

  const backdrop = item.backdrop_path
    ? `${TMDB_IMG}/w780${item.backdrop_path}`
    : null;
  const poster = item.poster_path
    ? `${TMDB_IMG}/w342${item.poster_path}`
    : null;
  const tmdbUrl = `https://www.themoviedb.org/${isSeries ? "tv" : "movie"}/${item.id}`;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className="relative max-h-[92dvh] w-full overflow-y-auto overscroll-contain rounded-t-2xl border border-[#2e2e2e] bg-[#1A1A1A] sm:max-h-[88vh] sm:max-w-2xl sm:rounded-2xl lg:max-w-3xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close details"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center cursor-pointer justify-center rounded-full border border-white/10 bg-black/60 text-gray-300 backdrop-blur-md transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] sm:h-9 sm:w-9"
        >
          <X size={16} />
        </button>

        <div className="relative h-36 bg-[#151515] sm:h-52 lg:h-60">
          {backdrop && (
            <Image
              src={backdrop}
              alt=""
              fill
              loading="eager"
              sizes="(max-width: 767px) 100vw, 768px"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
        </div>

        <div className="relative -mt-12 px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:-mt-20 sm:px-8 sm:pb-8">
          <div className="flex gap-4 sm:gap-6">
            {poster && (
              <div className="relative aspect-[2/3] w-24 shrink-0 overflow-hidden rounded-xl border border-[#2e2e2e] shadow-xl sm:w-36 lg:w-44">
                <Image
                  src={poster}
                  alt=""
                  fill
                  loading="eager"
                  sizes="(max-width: 639px) 96px, 176px"
                  className="object-cover"
                />
              </div>
            )}

            <div className="min-w-0 flex-1 space-y-2 pt-12 sm:pt-20">
              <div className="flex flex-wrap items-center gap-2">
                <PersonalTag>{item.personalTag}</PersonalTag>
                <Rating value={item.vote_average} />
              </div>

              <h3 className="text-xl font-black leading-tight tracking-tight text-gray-100 sm:text-2xl lg:text-3xl">
                {title}
              </h3>

              {item.tagline && (
                <p className="text-sm italic text-gray-500">{item.tagline}</p>
              )}

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
                <span className="inline-flex items-center gap-1.5">
                  <KindIcon item={item} size={12} />
                  {kind}
                </span>
                {year && (
                  <span className="inline-flex items-center gap-1.5">
                    <Calendar size={12} />
                    {year}
                  </span>
                )}
                {length && (
                  <span className="inline-flex items-center gap-1.5">
                    <Clock size={12} />
                    {length}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            {genres.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-full border border-[#2e2e2e] px-2.5 py-0.5 text-xs text-gray-400"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {item.overview && (
              <p className="text-sm leading-relaxed text-gray-400">
                {item.overview}
              </p>
            )}

            <a
              href={tmdbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b]"
              style={{ color: ACCENT, borderColor: `${ACCENT}45` }}
            >
              View on TMDB
              <ExternalLink size={13} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- filter + sort bar ---------- */

function Toolbar({ filter, setFilter, sort, setSort, counts }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div
        className="-mx-5 flex gap-2 overflow-x-auto cursor-pointer px-5 py-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:py-0 [&::-webkit-scrollbar]:hidden"
        role="group"
        aria-label="Filter by type"
      >
        {FILTERS.map((f) => {
          const active = filter === f.id;

          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(f.id)}
              className="shrink-0 cursor-pointer whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] sm:px-3.5 sm:py-1.5 sm:text-xs"
              style={{
                color: active ? ACCENT : "#9ca3af",
                borderColor: active ? `${ACCENT}60` : "#2e2e2e",
                backgroundColor: active ? `${ACCENT}14` : "transparent",
              }}
            >
              {f.label}
              <span className="ml-1.5 text-gray-600">{counts[f.id]}</span>
            </button>
          );
        })}
      </div>

      <label className="flex items-center gap-2 text-xs text-gray-500">
        Sort
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border cursor-pointer border-[#2e2e2e] bg-[#1e1e1e] px-3 py-2 text-xs sm:text-base text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b] sm:px-2.5 sm:py-1.5 sm:text-xs"
        >
          {SORTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

/* ---------- main ---------- */

export default function MoviesSection() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("mine");
  const [selected, setSelected] = useState(null);

  const loadFavorites = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      const response = await fetch("/api/movies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movies: favoriteMovies.map((movie) => movie.id),
          series: favoriteSeries.map((show) => show.id),
          anime: favoriteAnime.map(({ id, type }) => ({
            id,
            type: type || "tv",
          })),
        }),
      });

      if (!response.ok) throw new Error("Failed to load favorites");

      const data = await response.json();

      setItems([
        ...withLocal(data.movies || [], favoriteMovies, "movie", 0),
        ...withLocal(data.series || [], favoriteSeries, "series", 1000),
        ...withLocal(data.anime || [], favoriteAnime, "anime", 2000),
      ]);
    } catch (err) {
      console.error("Failed to load movies:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  const closeModal = useCallback(() => setSelected(null), []);

  const counts = useMemo(() => {
    const result = { all: items.length };
    CATEGORIES.forEach((c) => {
      result[c.id] = items.filter((i) => i.category === c.id).length;
    });
    return result;
  }, [items]);

  const sections = useMemo(
    () =>
      CATEGORIES.filter((c) => filter === "all" || filter === c.id)
        .map((c) => ({
          ...c,
          items: sortItems(
            items.filter((i) => i.category === c.id),
            sort,
          ),
        }))
        .filter((s) => s.items.length > 0),
    [items, filter, sort],
  );

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="h-8 w-64 animate-pulse rounded-full bg-[#252525]" />
        <div className={GRID_CLASS}>
          {Array.from({ length: 14 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[2/3] animate-pulse rounded-xl bg-[#202020]"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-start gap-3">
        <p className="text-sm text-gray-500">
          Couldn&apos;t load movies, series and anime. Check your connection and
          try again.
        </p>
        <button
          type="button"
          onClick={loadFavorites}
          className="rounded-full border px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f59e0b]"
          style={{ color: ACCENT, borderColor: `${ACCENT}45` }}
        >
          Retry
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return <p className="text-sm text-gray-500">Nothing to show yet.</p>;
  }

  return (
    <div className="space-y-10">
      <Toolbar
        filter={filter}
        setFilter={setFilter}
        sort={sort}
        setSort={setSort}
        counts={counts}
      />

      {sections.map(({ id, label, icon: Icon, items: list }) => (
        <section key={id} className="space-y-5">
          <SectionHeading icon={<Icon size={18} />}>{label}</SectionHeading>

          <div className={GRID_CLASS}>
            {list.map((item, index) => (
              <Reveal key={keyOf(item)} delay={Math.min(index, 10) * 60}>
                <MovieCard item={item} onOpen={setSelected} />
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      {selected && <DetailModal item={selected} onClose={closeModal} />}
    </div>
  );
}
