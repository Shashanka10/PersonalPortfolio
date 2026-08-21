"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import Reveal from "@/components/Reveal/Reveal";
import { treks } from "../../app/hobbies/[category]/data";

import {
  Mountain,
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { CalendarDays } from "lucide-react";

const TrekMap = dynamic(() => import("@/components/TrekkingSection/TrekMap"), {
  ssr: false,

  loading: () => (
    <div className="h-[380px] sm:h-[440px] rounded-2xl border border-[#2e2e2e] bg-[#141414] animate-pulse" />
  ),
});

function useCountUp(target, duration = 1200) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;

        started.current = true;

        let startTime = null;
        let animationFrame;

        const animate = (timestamp) => {
          if (!startTime) startTime = timestamp;

          const progress = Math.min((timestamp - startTime) / duration, 1);

          setValue(Math.floor(progress * target));

          if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
          }
        };

        animationFrame = requestAnimationFrame(animate);

        observer.disconnect();

        return () => cancelAnimationFrame(animationFrame);
      },
      {
        threshold: 0.3,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [target, duration]);

  return {
    ref,
    value,
  };
}

function StatChip({ value, label, suffix = "" }) {
  const { ref, value: animated } = useCountUp(value);

  return (
    <div
      ref={ref}
      className="
        flex
        items-center
        gap-2
        px-4
        py-2
        rounded-full
        bg-[#222]
        border
        border-[#2e2e2e]
      "
    >
      <span className="text-[#12c971] font-bold text-sm">
        {animated.toLocaleString()}
        {suffix}
      </span>

      <span className="text-gray-400 text-xs">{label}</span>
    </div>
  );
}

function TrekModal({ trek, color, photoIndex, onClose, onPrev, onNext }) {
  const photo = trek.photos[photoIndex];

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrev();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="
        fixed
        inset-0
        z-[200]
        bg-black/85
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-4
        mt-16
        sm:mt-0
        sm:p-8
        md:p-16
      "
      onClick={onClose}
    >
      <div
        className="
          relative
          w-full
          max-w-5xl
          max-h-[90vh]
          overflow-hidden
          rounded-2xl
          border
          border-[#333]
          bg-[#171717]
          shadow-[0_30px_100px_rgba(0,0,0,0.6)]
          flex
          flex-col
          md:flex-row
        "
        onClick={(event) => event.stopPropagation()}
      >
        <div
          className="
            relative
            w-full
            md:w-[58%]
            h-[280px]
            sm:h-[380px]
            md:h-[600px]
            bg-[#0e0e0e]
            shrink-0
          "
        >
          <Image
            src={photo.url}
            alt={photo.caption || trek.name}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover animate-[fadeIn_500ms_ease-in-out]"
          />

          {/* Image gradient */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/60
              via-transparent
              to-transparent
              pointer-events-none
            "
          />

          {/* Photo counter */}

          <div
            className="
              absolute
              bottom-4
              left-4
              px-3
              py-1.5
              rounded-full
              bg-black/60
              backdrop-blur-md
              border
              border-white/10
              text-[10px]
              font-mono
              text-gray-300
            "
          >
            {String(photoIndex + 1).padStart(2, "0")} /{" "}
            {String(trek.photos.length).padStart(2, "0")}
          </div>

          {/* Previous */}

          {trek.photos.length > 1 && (
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous photo"
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                w-8
                h-8
                sm:w-10
                sm:h-10
                rounded-xl
                bg-black/60
                backdrop-blur-md
                border
                border-white/10
                flex
                items-center
                justify-center
                text-gray-300
                hover:text-white
                hover:border-white/20
                transition-all
                cursor-pointer
              "
            >
              <ChevronLeft size={19} />
            </button>
          )}

          {/* Next */}

          {trek.photos.length > 1 && (
            <button
              type="button"
              onClick={onNext}
              aria-label="Next photo"
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                w-8
                h-8
                sm:w-10
                sm:h-10
                rounded-xl
                bg-black/60
                backdrop-blur-md
                border
                border-white/10
                flex
                items-center
                justify-center
                text-gray-300
                hover:text-white
                hover:border-white/20
                transition-all
                cursor-pointer
              "
            >
              <ChevronRight size={19} />
            </button>
          )}
        </div>

        <div
          className="
            flex-1
            min-w-0
            overflow-y-auto
            p-5
            sm:p-7
            lg:p-8
          "
        >
          {/* Region */}

          <div
            className="
              flex
              items-center
              gap-2
              text-[10px]
              font-mono
              uppercase
              tracking-[0.18em]
            "
            style={{
              color,
            }}
          >
            <Mountain size={13} />

            {trek.region}
          </div>

          {/* Title */}

          <h2
            className="
              mt-2
              text-lg
              sm:text-xl
              md:text-2xl
              font-bold
              tracking-tight
              text-gray-100
            "
          >
            {trek.name}
          </h2>

          <div
            className="
    relative
    py-3
    mt-3
    sm:mt-4
    lg:mt-6
    pl-4
    pr-5
    rounded-xl
    border
    border-[#2e2e2e]
    bg-[#181818]/70
    overflow-hidden
    group
  "
          >
            <div className="flex items-center gap-3">
              {/* Calendar icon */}
              <div
                className="
        w-9
        h-9
        rounded-lg
        flex
        items-center
        justify-center
        border
        transition-all
        duration-300
        group-hover:scale-105
      "
                style={{
                  color,
                  borderColor: `${color}30`,
                  background: `${color}0D`,
                }}
              >
                <CalendarDays size={16} strokeWidth={1.7} />
              </div>

              {/* Date */}
              <div>
                <p
                  className="
          text-[9px]
          font-mono
          uppercase
          tracking-[0.2em]
          text-gray-600
        "
                >
                  Date
                </p>

                <p
                  className="mt-0.5 text-sm font-semibold tracking-wide"
                  style={{ color }}
                >
                  {new Date(trek.date).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>

          {/* Story */}

          <p
            className="
              mt-5
              text-[10px]
              sm:text-xs
              md:text-sm
              leading-7
              text-gray-400
            "
          >
            {trek.story}
          </p>

          {/* Stats */}

          <div
            className="
              grid
              grid-cols-3
              mt-3
              md:mt-5
              border-y
              border-[#2a2a2a]
            "
          >
            <div className="py-4">
              <p className="text-sm font-semibold" style={{ color }}>
                {trek.altitude}
              </p>

              <p className="mt-1 text-[9px] font-mono uppercase tracking-widest text-gray-600">
                Altitude
              </p>
            </div>

            <div
              className="
                py-4
                border-x
                border-[#2a2a2a]
                px-3
              "
            >
              <p className="text-sm font-semibold" style={{ color }}>
                {trek.distanceKm} km
              </p>

              <p className="mt-1 text-[9px] font-mono uppercase tracking-widest text-gray-600">
                Distance
              </p>
            </div>

            <div className="py-4 pl-3">
              <p className="text-sm font-semibold" style={{ color }}>
                {trek.days} days
              </p>

              <p className="mt-1 text-[9px] font-mono uppercase tracking-widest text-gray-600">
                Duration
              </p>
            </div>
          </div>

          {trek.photos.length > 1 && (
            <div className="mt-3 sm:mt-5 md:mt-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">
                  Memories
                </span>

                <span className="text-[10px] font-mono text-gray-600">
                  {trek.photos.length} photos
                </span>
              </div>

              <div className="grid grid-cols-6 gap-2">
                {trek.photos.map((photo, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      // handled by parent state through a local custom event
                      const event = new CustomEvent("trek-photo-select", {
                        detail: index,
                      });

                      window.dispatchEvent(event);
                    }}
                    className={`
                      relative
                      aspect-square
                      overflow-hidden
                      rounded-lg
                      border
                      transition-all
                      duration-200
                      ${
                        index === photoIndex
                          ? "border-white/50"
                          : "border-[#2e2e2e] opacity-60 hover:opacity-100"
                      }
                    `}
                    style={
                      index === photoIndex
                        ? {
                            boxShadow: `0 0 0 1px ${color}`,
                          }
                        : undefined
                    }
                  >
                    <Image
                      src={photo.url}
                      alt={photo.caption || trek.name}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Caption */}

          {photo.caption && (
            <p className="mt-5 text-[10px] md:text-xs text-gray-500 leading-relaxed">
              {photo.caption}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="
            absolute
            top-4
            right-4
            w-7
            h-7
            sm:w-9
            sm:h-9
            rounded-xl
            bg-black/60
            backdrop-blur-md
            border
            border-white/10
            flex
            items-center
            justify-center
            text-gray-400
            hover:text-white
            transition-all
            cursor-pointer
          "
        >
          <X size={17} />
        </button>
      </div>
    </div>
  );
}

function TrekCard({ trek, color = "#12c971", active = false }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const openModal = (index = 0) => {
    setPhotoIndex(index);
    setModalOpen(true);
  };

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const next = useCallback(() => {
    setPhotoIndex((current) => (current + 1) % trek.photos.length);
  }, [trek.photos.length]);

  const prev = useCallback(() => {
    setPhotoIndex(
      (current) => (current - 1 + trek.photos.length) % trek.photos.length,
    );
  }, [trek.photos.length]);

  return (
    <>
      <article
        onClick={() => openModal(0)}
        className={`group relative overflow-hidden rounded-2xl border bg-[#1b1b1b] cursor-pointer transition-all duration-500 ${active ? "border-[#12c971]/60 shadow-[0_0_35px_rgba(18,201,113,0.08)]" : "border-[#2e2e2e] hover:border-[#444]"} `}
      >
        <div
          className="
            relative
            h-[210px]
            sm:h-[250px]
            overflow-hidden
          "
        >
          {trek.photos[0] && (
            <Image
              src={trek.photos[0].url}
              alt={trek.photos[0].caption || trek.name}
              fill
              sizes="
                (max-width: 640px) 100vw,
                768px
              "
              className="
                object-cover
                transition-transform
                duration-700
                ease-out
                group-hover:scale-[1.04]
              "
            />
          )}

          {/* Image overlay */}

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black/90
              via-black/20
              to-transparent
            "
          />

          {/* Active line */}

          <div
            className={`
              absolute
              left-0
              top-0
              h-full
              w-[2px]
              transition-opacity
              duration-300
              ${active ? "opacity-100" : "opacity-0"}
            `}
            style={{
              backgroundColor: color,
            }}
          />

          {/* Region */}

          <div
            className="
    absolute
    top-4
    left-4
    flex
    items-center
    gap-1.5
    px-2.5
    py-1.5
    rounded-lg
    bg-black/55
    backdrop-blur-md
    border
    border-white/10
    text-[9px]
    font-mono
    uppercase
    tracking-widest
    shadow-lg
    leading-none
  "
            style={{
              color,
            }}
          >
            <Mountain size={11} strokeWidth={2} />
            <span>{trek.region}</span>
          </div>

          {/* Photo count */}

          <div
            className="
              absolute
              top-4
              right-4
              px-2
              py-1
              rounded-md
              bg-black/50
              backdrop-blur-md
              border
              border-white/10
              text-[9px]
              font-mono
              text-gray-300
            "
          >
            {trek.photos.length} photos
          </div>
          <div
            className="
              absolute
              left-4
              right-4
              bottom-4
            "
          >
            <h3
              className="
                text-xl
                sm:text-2xl
                font-bold
                tracking-tight
                text-white
              "
            >
              {trek.name}
            </h3>

            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] font-mono text-gray-300">
                {trek.altitude}
              </span>

              <span className="text-gray-600">·</span>

              <span className="text-[10px] font-mono text-gray-300">
                {trek.distanceKm} km
              </span>

              <span className="text-gray-600">·</span>

              <span className="text-[10px] font-mono text-gray-300">
                {trek.days} days
              </span>
            </div>
          </div>
          <div
            className="
              absolute
              bottom-4
              right-4
              w-8
              h-8
              rounded-lg
              bg-black/50
              backdrop-blur-md
              border
              border-white/10
              flex
              items-center
              justify-center
              text-gray-300
              opacity-0
              translate-y-2
              group-hover:opacity-100
              group-hover:translate-y-0
              transition-all
              duration-300
            "
          >
            <ArrowUpRight size={15} />
          </div>
        </div>
        <div
          className="
            h-10
            px-4
            flex
            items-center
            justify-between
            bg-[#1b1b1b]
          "
        >
          <span className="text-[9px] font-mono uppercase tracking-widest text-gray-600">
            Trek #{String(trek.id).padStart(2, "0")}
          </span>

          <span
            className="
              text-[9px]
              font-mono
              uppercase
              tracking-widest
              text-gray-600
              group-hover:text-gray-300
              transition-colors
            "
          >
            View →
          </span>
        </div>
      </article>
      {modalOpen && (
        <TrekModal
          trek={trek}
          color={color}
          photoIndex={photoIndex}
          onClose={closeModal}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}

export default function TrekkingSection() {
  const [activeId, setActiveId] = useState(null);

  const cardRefs = useRef({});

  const handleSelectTrek = useCallback((id) => {
    setActiveId(id);

    const element = cardRefs.current[id];

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, []);

  const highestTrek = treks.reduce((highest, trek) => {
    const altitude = parseInt(trek.altitude.replace(/,/g, ""), 10);

    const highestAltitude = parseInt(highest.altitude.replace(/,/g, ""), 10);

    return altitude > highestAltitude ? trek : highest;
  }, treks[0]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-3">
        <StatChip value={treks.length} label="treks completed" />

        <StatChip
          value={parseInt(highestTrek.altitude.replace(/,/g, ""), 10)}
          suffix=" m"
          label="highest point"
        />
      </div>

      <Reveal>
        <TrekMap
          treks={treks}
          activeId={activeId}
          onSelectTrek={handleSelectTrek}
        />
      </Reveal>

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-5
        "
      >
        {treks.map((trek, index) => (
          <div
            key={trek.id}
            ref={(element) => {
              cardRefs.current[trek.id] = element;
            }}
            className="
              rounded-2xl
              transition-all
              duration-500
            "
          >
            <TrekCard
              trek={trek}
              color={
                trek.color ||
                [
                  "#12c971",
                  "#38bdf8",
                  "#22d3ee",
                  "#f59e0b",
                  "#a78bfa",
                  "#22d3ee",
                ][index % 6]
              }
              active={activeId === trek.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
