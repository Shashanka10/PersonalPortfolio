"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { hobbyCategories } from "./data";
import Particles from "@/components/Particles/Particles";
import Reveal from "@/components/Reveal/Reveal";

function useMounted(delay = 0) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, []);
  return visible;
}

function HobbyCard({ item, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Reveal delay={index * 120}>
      <Link
        href={item.href}
        className="
          group
          block
          h-full
          overflow-hidden
          rounded-2xl
          border
          border-[#2e2e2e]
          bg-[#1e1e1e]
          transition-colors
          duration-300
          focus:outline-none
          focus-visible:ring-2
        "
        style={{
          borderColor: hovered ? `${item.accent}40` : undefined,
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* IMAGE */}
        <div className="relative h-[200px] overflow-hidden sm:h-[220px] lg:h-[240px]">
          <Image
            src={item.image}
            alt={item.label}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1279px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            style={{
              filter: hovered ? "brightness(1.2)" : "brightness(1.0)",
            }}
          />

          {/* DARK GRADIENT */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #1e1e1e 0%, transparent 65%)",
            }}
          />

          {/* HOVER OVERLAY (accent tint) */}
          <div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ backgroundColor: `${item.accent}0a` }}
          />

          {/* TAG (top-left) */}
          <span
            className="absolute left-3 top-3 rounded-full border px-2 py-0.5 font-mono text-xs uppercase tracking-widest backdrop-blur-sm"
            style={{
              color: item.accent,
              borderColor: `${item.accent}40`,
              backgroundColor: `${item.accent}1a`,
            }}
          >
            {item.tag}
          </span>

          {/* CENTER ARROW REVEAL */}
          <div
            className="absolute inset-0 m-auto flex h-8 w-8 items-center justify-center rounded-full border"
            style={{
              borderColor: `${item.accent}40`,
              backgroundColor: `${item.accent}1a`,
              color: item.accent,
              opacity: hovered ? 1 : 0,
              transform: hovered
                ? "scale(1) rotate(0deg)"
                : "scale(0.7) rotate(-45deg)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <ArrowUpRight size={14} />
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <span
                className="p-2 rounded-lg"
                style={{
                  color: item.accent,
                  backgroundColor: `${item.accent}15`,
                }}
              >
                {item.icon}
              </span>
              <h2 className="min-w-0 text-lg font-bold leading-tight text-gray-100 sm:text-xl">
                {item.label}
              </h2>
            </div>

            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#3a3a3a] text-[#4b5563] transition-colors duration-300"
              style={{
                borderColor: hovered ? `${item.accent}80` : undefined,
                color: hovered ? item.accent : undefined,
              }}
            >
              <ArrowUpRight size={13} />
            </span>
          </div>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-500">
            {item.description}
          </p>

          {/* BOTTOM LINE */}
          <div
            className="mt-5 h-px w-full origin-left scale-x-0 opacity-0 transition-all duration-500 group-hover:scale-x-100 group-hover:opacity-100"
            style={{
              background: `linear-gradient(to right, ${item.accent}99, transparent)`,
            }}
          />
        </div>
      </Link>
    </Reveal>
  );
}

export const Hobbies = () => {
  const v0 = useMounted(100);
  return (
    <div className="flex justify-between mt-8 sm:mt-2 z-40">
      <div className="relative w-full p-5 sm:p-12 md:p-16 lg:p-24 mt-8 sm:mt-0 z-40 rounded-2xl bg-[#1A1A1A] overflow-hidden">
        <Particles count={25} />
        <div
          className="absolute -top-16 -left-16 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />
        <div className="relative z-10 space-y-10">
          <div
            style={{
              opacity: v0 ? 1 : 0,
              transform: v0 ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
            className="space-y-3"
          >
            <p className="text-[#12c971] font-mono text-xs tracking-[0.25em] uppercase">
              — Off the clock
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-100 tracking-tight leading-tight">
              Hobbies
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
              What I get up to when I'm not shipping code.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7">
            {hobbyCategories.map((item, i) => (
              <HobbyCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hobbies;
