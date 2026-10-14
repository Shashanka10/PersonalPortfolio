"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";

import Reveal from "@/components/Reveal/Reveal";
import { sports } from "../../app/hobbies/[category]/data";
import { CheckCircle } from "lucide-react";
import { SportShoe } from "lucide-react";

function SportCard({ sport }) {
  const [hovered, setHovered] = useState(false);
  const icon = sport.icon || "✦";
  const accent = sport.color || "#38bdf8";

  return (
    <div
      className="
        group
        relative
        h-[90px]
        overflow-hidden
        rounded-2xl
        border
        border-[#2e2e2e]
        bg-[#1a1a1a]
        select-none
        transition-all
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:-translate-y-1
        hover:border-white/15
        hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)]
      "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="
          absolute
          inset-0
          opacity-0
          group-hover:opacity-100
          transition-opacity
          duration-700
          pointer-events-none
        "
        style={{
          background: `
            radial-gradient(
              circle at 90% 50%,
              ${accent}12 0%,
              transparent 55%
            )
          `,
        }}
      />
      <div
        className="
          absolute
          right-[-10px]
          top-[-30px]
          w-[170px]
          h-[150px]
          pointer-events-none
          opacity-30
          group-hover:opacity-100
          transition-opacity
          duration-700
        "
      >
        <Canvas
          camera={{
            position: [0, 0, 4],
            fov: 45,
          }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
          }}
        >
          <ambientLight intensity={0.25} />

          <pointLight
            position={[2, 2, 3]}
            color={accent}
            intensity={hovered ? 4 : 0.8}
          />
        </Canvas>
      </div>

      <div
        className="
          absolute
          right-[-5px]
          bottom-[-30px]
          text-[90px]
          grayscale
          opacity-[0.02]
          group-hover:opacity-[0.05]
          group-hover:scale-110
          transition-all
          duration-700
          pointer-events-none
          select-none
        "
      >
        {icon}
      </div>
      <div
        className="
          relative
          z-10
          h-full
          flex
          items-center
          justify-center
          sm:justify-start
          gap-4
          px-5
        "
      >
        <div
          className="
            relative
            w-12
            h-12
            shrink-0
            rounded-xl
            flex
            items-center
            justify-center
            bg-[#242424]
            border
            border-[#333]
            overflow-hidden
            transition-all
            duration-500

            group-hover:scale-105
          "
          style={{
            borderColor: `${accent}35`,
            boxShadow: hovered ? `0 0 25px ${accent}18` : "none",
          }}
        >
          {/* Icon background glow */}

          <div
            className="
              absolute
              inset-0
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-500
            "
            style={{
              background: `
                radial-gradient(
                  circle,
                  ${accent}20 0%,
                  transparent 70%
                )
              `,
            }}
          />

          {/* Sport icon */}

          <span
            className="
              relative
              z-10
              text-[27px]
              grayscale
              opacity-70
              group-hover:grayscale-0
              group-hover:opacity-100
              group-hover:scale-110
              transition-all
              duration-500
            "
          >
            {icon}
          </span>
        </div>

        <div className="min-w-0 hidden sm:block">
          <p
            className="
              text-[8px]
              font-mono
              uppercase
              tracking-[0.2em]
              text-gray-600
              mb-1
            "
          >
            Sport
          </p>

          <h3
            className="
              text-base
              sm:text-lg
              font-semibold
              tracking-tight
              text-gray-300
              transition-all
              duration-500
              group-hover:text-white
              group-hover:translate-x-1
            "
          >
            {sport.label}
          </h3>
        </div>
      </div>

      <div
        className="
          absolute
          left-0
          top-1/2
          -translate-y-1/2
          w-[2px]
          h-0
          rounded-full
          group-hover:h-8
          transition-all
          duration-500
        "
        style={{
          backgroundColor: accent,
          boxShadow: `0 0 14px ${accent}`,
        }}
      />

      <div
        className="
          absolute
          bottom-0
          left-0
          h-[2px]
          w-0
          group-hover:w-full
          transition-all
          duration-700
          ease-[cubic-bezier(0.22,1,0.36,1)]
        "
        style={{
          background: `
            linear-gradient(
              90deg,
              transparent,
              ${accent},
              transparent
            )
          `,
        }}
      />
    </div>
  );
}

function PuzzleCube({ type }) {
  const isMirror = type === "mirror";
  const rubikColors = [
    "#ef4444",
    "#f8fafc",
    "#3b82f6",
    "#facc15",
    "#22c55e",
    "#f97316",
    "#3b82f6",
    "#ef4444",
    "#f8fafc",
  ];

  const mirrorColors = [
    "#777b80",
    "#d9dde1",
    "#858a90",
    "#b6bbc1",
    "#646970",
    "#e5e7eb",
    "#858a90",
    "#c4c9cf",
    "#747980",
  ];

  return (
    <div className="relative flex h-[125px] w-[125px] items-center justify-center">
      {/* Ambient glow */}
      <div
        className="absolute inset-4 rounded-full blur-2xl opacity-20"
        style={{
          background: isMirror ? "#cbd5e1" : "#22c55e",
        }}
      />

      {/* Cube face */}
      <div
        className={`
      relative z-10 grid gap-[3px] rounded-lg
      border border-white/20 bg-[#111] p-[5px]
      shadow-[0_16px_35px_rgba(0,0,0,0.45)]
      transition-transform duration-500
      group-hover:rotate-[-8deg]
      group-hover:scale-110
      ${isMirror ? "grid-cols-3" : "grid-cols-3"}
    `}
        style={{
          width: isMirror ? 94 : 98,
          height: isMirror ? 94 : 98,
          transform: "rotate(-10deg) skewY(-2deg)",
          gridTemplateColumns: isMirror
            ? "20px 29px 24px"
            : "repeat(3, minmax(0, 1fr))",
          gridTemplateRows: isMirror
            ? "19px 27px 23px"
            : "repeat(3, minmax(0, 1fr))",
        }}
      >
        {(isMirror ? mirrorColors : rubikColors).map((color, i) => (
          <div
            key={i}
            className="rounded-[3px] border border-black/20"
            style={{
              background: isMirror
                ? `linear-gradient(135deg, ${color}, #42464c)`
                : color,
              boxShadow: isMirror
                ? "inset 1px 1px 2px rgba(255,255,255,0.35)"
                : "inset 0 1px 1px rgba(255,255,255,0.12)",
            }}
          />
        ))}
      </div>

      {/* Small decorative sparkle */}
      <span className="absolute right-2 top-3 text-sm text-white/40 transition-all duration-500 group-hover:text-white group-hover:scale-125">
        ✦
      </span>
    </div>
  );
}

function PuzzleCard({ title, subtitle, type, accent, tag }) {
  return (
    <div
      className="
     group relative overflow-hidden rounded-2xl
     border border-[#2e2e2e] bg-[#1a1a1a]
     transition-all duration-500
     hover:-translate-y-1 hover:border-white/15
     hover:shadow-[0_18px_45px_rgba(0,0,0,0.3)]
   "
    >
      {/* Accent glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover"
        style={{
          background: `radial-gradient(circle at 80% 35%, ${accent}18, transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex min-h-[170px] items-center justify-between gap-3 px-5 py-4">
        <div className="min-w-0">
          <span
            className="mb-3 inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[9px] tracking-[0.12em]"
            style={{
              color: accent,
              borderColor: `${accent}35`,
              backgroundColor: `${accent}0c`,
            }}
          >
            <CheckCircle size={12} />
            {tag}
          </span>

          <h3 className="text-lg font-semibold tracking-tight text-gray-200 transition-colors duration-300 group-hover:text-white">
            {title}
          </h3>

          <p className="mt-1 max-w-[190px] text-xs leading-relaxed text-gray-500">
            {subtitle}
          </p>
        </div>

        <div className="shrink-0">
          <PuzzleCube type={type} />
        </div>
      </div>

      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-700 group-hover:w-full"
        style={{
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
        }}
      />
    </div>
  );
}

export default function SportsSection() {
  if (!sports?.length) {
    return <p className="text-sm text-gray-500">No sports added yet.</p>;
  }

  return (
    <div className="space-y-10">
      {/* Sports */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#333] bg-[#1a1a1a] text-base text-gray-300">
            <span>
              <SportShoe size={16} />
            </span>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wider text-gray-200">
              Sports & Athletics
            </h2>
          </div>

          <div className="h-px flex-1 bg-[#2e2e2e]" />
        </div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-2 md:grid-cols-3">
          {sports.map((sport, index) => (
            <Reveal key={sport.id} delay={index * 50}>
              <SportCard sport={sport} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Puzzle solving */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#333] bg-[#1a1a1a] text-base text-gray-300">
            <span>▦</span>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wider text-gray-200">
              Cubing
            </h2>
          </div>

          <div className="h-px flex-1 bg-[#2e2e2e]" />
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Reveal delay={100}>
            <PuzzleCard
              title="3×3 Rubik's Cube"
              subtitle="Solving the classic color-matching puzzle."
              type="rubik"
              accent="#4ade80"
              tag="CAN SOLVE"
            />
          </Reveal>

          <Reveal delay={150}>
            <PuzzleCard
              title="3×3 Mirror Cube"
              subtitle="A shape-shifting twist on the classic cube."
              type="mirror"
              accent="#cbd5e1"
              tag="CAN SOLVE"
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
