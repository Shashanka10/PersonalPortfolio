"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";

import Reveal from "@/components/Reveal/Reveal";
import { sports } from "../../app/hobbies/[category]/data";

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

        <div className="min-w-0">
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

export default function SportsSection() {
  if (!sports?.length) {
    return <p className="text-sm text-gray-500">No sports added yet.</p>;
  }

  return (
    <div className="space-y-6">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3

          gap-3
        "
      >
        {sports.map((sport, index) => (
          <Reveal key={sport.id} delay={index * 50}>
            <SportCard sport={sport} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
