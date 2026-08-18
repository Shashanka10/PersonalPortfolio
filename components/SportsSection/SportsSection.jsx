"use client";

import { useState, useRef, useEffect } from "react";
import Reveal from "@/components/Reveal/Reveal";
import { sports } from "../../app/hobbies/[category]/data";

/* =========================================================
   SPORT CARD
========================================================= */

function SportCard({ sport }) {
  const [flipped, setFlipped] = useState(false);
  const [timerProgress, setTimerProgress] = useState(0);

  const timeoutRef = useRef(null);
  const animationRef = useRef(null);

  const icon = sport.icon || "✦";
  const accent = sport.color || "#38bdf8";

  /* =======================================================
     FLIP
  ======================================================= */

  const handleFlip = () => {
    // Clear existing timer
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Clear existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    // If already flipped, immediately return to front
    if (flipped) {
      setFlipped(false);
      setTimerProgress(0);
      return;
    }

    // Flip to back
    setFlipped(true);
    setTimerProgress(100);

    const startTime = performance.now();
    const duration = 10000;

    /* =====================================================
       TIMER ANIMATION

       100% → 0%
       Over exactly 5 seconds
    ===================================================== */

    const updateTimer = (currentTime) => {
      const elapsed = currentTime - startTime;

      const progress = Math.max(0, 100 - (elapsed / duration) * 100);

      setTimerProgress(progress);

      if (progress > 0) {
        animationRef.current = requestAnimationFrame(updateTimer);
      }
    };

    animationRef.current = requestAnimationFrame(updateTimer);

    /* =====================================================
       AUTO FLIP BACK AFTER 5 SECONDS
    ===================================================== */

    timeoutRef.current = setTimeout(() => {
      setFlipped(false);
      setTimerProgress(0);
      timeoutRef.current = null;
    }, duration);
  };

  /* =======================================================
     CLEANUP
  ======================================================= */

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div
      className="
        group
        relative
        h-[280px]
        cursor-pointer
        select-none
      "
      style={{
        perspective: "1200px",
      }}
      onClick={handleFlip}
      role="button"
      tabIndex={0}
      aria-label={`${sport.label} information`}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleFlip();
        }
      }}
    >
      {/* =====================================================
          3D INNER
      ===================================================== */}

      <div
        className="
          relative
          w-full
          h-full
          transition-transform
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
        "
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ===================================================
            FRONT
        =================================================== */}

        <div
          className="
            absolute
            inset-0
            w-full
            h-full
            overflow-hidden
            rounded-2xl
            border
            border-[#2e2e2e]
            bg-[#1e1e1e]
            shadow-[0_10px_30px_rgba(0,0,0,0.15)]
          "
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* =================================================
              AMBIENT GLOW
          ================================================= */}

          <div
            className="
              absolute
              -right-16
              -top-16
              w-36
              h-36
              rounded-full
              blur-3xl
              opacity-10
              group-hover:opacity-25
              transition-opacity
              duration-500
              pointer-events-none
            "
            style={{
              backgroundColor: accent,
            }}
          />

          {/* =================================================
              LARGE BACKGROUND ICON
          ================================================= */}

          <div
            className="
              absolute
              -right-6
              -bottom-8
              text-[110px]
              grayscale
              opacity-[0.025]
              group-hover:opacity-[0.06]
              transition-all
              duration-500
              pointer-events-none
            "
          >
            {icon}
          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div className="relative h-full flex flex-col justify-between p-5">
            {/* TOP */}

            <div className="flex items-start justify-between">
              {/* ICON */}

              <div
                className="
                  flex
                  items-center
                  justify-center
                  w-12
                  h-12
                  rounded-xl
                  bg-[#252525]
                  border
                  border-[#333]
                  transition-all
                  duration-500
                  group-hover:scale-105
                "
                style={{
                  borderColor: `${accent}35`,
                }}
              >
                <span
                  className="
                    text-3xl
                    grayscale
                    opacity-80
                    transition-all
                    duration-300
                    group-hover:grayscale-0
                    group-hover:opacity-100
                  "
                >
                  {icon}
                </span>
              </div>

              {/* ACCENT DOT */}

              <div
                className="
                  w-2
                  h-2
                  rounded-full
                  opacity-40
                  group-hover:opacity-100
                  transition-all
                  duration-300
                "
                style={{
                  backgroundColor: accent,
                  boxShadow: `0 0 12px ${accent}`,
                }}
              />
            </div>

            {/* BOTTOM */}

            <div>
              <p
                className="
                  text-[9px]
                  font-mono
                  uppercase
                  tracking-[0.2em]
                  text-gray-600
                  mb-1.5
                "
              >
                Sport
              </p>

              <h3
                className="
                  text-xl
                  font-bold
                  text-gray-100
                  tracking-tight
                "
              >
                {sport.label}
              </h3>

              <div className="flex items-center justify-between mt-4">
                <span
                  className="
                    text-[8px]
                    font-mono
                    uppercase
                    tracking-[0.15em]
                    text-gray-600
                    group-hover:text-gray-400
                    transition-colors
                  "
                >
                  Click to discover
                </span>

                <span
                  className="
                    text-xs
                    text-gray-600
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                >
                  →
                </span>
              </div>
            </div>
          </div>

          {/* =================================================
              NORMAL BOTTOM ACCENT
          ================================================= */}

          <div
            className="
              absolute
              bottom-0
              left-0
              h-[2px]
              w-0
              group-hover:w-full
              transition-all
              duration-500
            "
            style={{
              backgroundColor: accent,
            }}
          />
        </div>

        {/* ===================================================
            BACK
        =================================================== */}

        <div
          className="
            absolute
            inset-0
            w-full
            h-full
            overflow-hidden
            rounded-2xl
            border
            bg-[#181818]
            shadow-[0_15px_40px_rgba(0,0,0,0.25)]
          "
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            borderColor: `${accent}45`,
          }}
        >
          {/* =================================================
              AMBIENT GLOW
          ================================================= */}

          <div
            className="
              absolute
              -right-20
              -top-20
              w-44
              h-44
              rounded-full
              blur-3xl
              opacity-10
              pointer-events-none
            "
            style={{
              backgroundColor: accent,
            }}
          />

          {/* =================================================
              BACKGROUND ICON
          ================================================= */}

          <div
            className="
              absolute
              right-3
              bottom-[-20px]
              text-[100px]
              opacity-[0.025]
              pointer-events-none
              select-none
            "
          >
            {icon}
          </div>

          {/* =================================================
              BACK CONTENT
          ================================================= */}

          <div className="relative h-full flex flex-col p-5">
            {/* HEADER */}

            <div className="flex items-center justify-between mb-4">
              <div>
                <p
                  className="
                    text-[8px]
                    font-mono
                    uppercase
                    tracking-[0.2em]
                    mb-1
                  "
                  style={{
                    color: accent,
                  }}
                >
                  Why I like it
                </p>

                <h3 className="text-lg font-bold text-gray-100">
                  {sport.label}
                </h3>
              </div>

              {/* ICON */}

              <div
                className="
                  w-9
                  h-9
                  rounded-lg
                  flex
                  items-center
                  justify-center
                  bg-[#252525]
                  border
                "
                style={{
                  borderColor: `${accent}35`,
                }}
              >
                <span className="text-xl">{icon}</span>
              </div>
            </div>

            {/* DESCRIPTION */}

            <div className="flex-1">
              <p className="text-sm leading-relaxed text-gray-400">
                {sport.whyILikeIt ||
                  "One of the sports I enjoy watching and following."}
              </p>

              {/* =================================================
                  FUN FACT
              ================================================= */}

              {sport.funFact && (
                <div
                  className="
                    mt-4
                    p-3
                    rounded-xl
                    bg-white/[0.025]
                    border
                    border-[#2e2e2e]
                  "
                >
                  <p
                    className="
                      text-[8px]
                      font-mono
                      uppercase
                      tracking-[0.18em]
                      mb-1
                    "
                    style={{
                      color: accent,
                    }}
                  >
                    Fun fact
                  </p>

                  <p className="text-[11px] leading-relaxed text-gray-500">
                    {sport.funFact}
                  </p>
                </div>
              )}
            </div>

            {/* FOOTER */}

            <div className="flex items-center justify-between mt-3">
              <span
                className="
                  text-[8px]
                  font-mono
                  uppercase
                  tracking-[0.15em]
                  text-gray-600
                "
              >
                Click to flip back
              </span>

              <span className="text-gray-600 text-xs">↻</span>
            </div>
          </div>

          {/* =================================================
              5 SECOND TIMER
          ================================================= */}

          {flipped && (
            <div
              className="
                absolute
                bottom-0
                left-0
                right-0
                h-[3px]
                bg-[#252525]
                overflow-hidden
              "
            >
              <div
                className="h-full origin-left"
                style={{
                  width: `${timerProgress}%`,
                  backgroundColor: accent,
                  boxShadow: `0 0 10px ${accent}`,
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SPORTS SECTION
========================================================= */

export default function SportsSection() {
  if (!sports?.length) {
    return <p className="text-gray-500 text-sm">No sports added yet.</p>;
  }

  return (
    <div className="space-y-10">
      {/* =====================================================
          CARDS
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-4
        "
      >
        {sports.map((sport, index) => (
          <Reveal key={sport.id} delay={index * 70}>
            <SportCard sport={sport} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
