"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { items } from "./data.js";
import { notFound } from "next/navigation";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Particles from "@/components/Particles/Particles";
import Reveal from "@/components/Reveal/Reveal.jsx";
import { ArrowLeftCircle } from "lucide-react";

function useMounted(delay = 0) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, []);
  return visible;
}

function ProjectCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={index * 100}>
      <div
        className="group relative rounded-2xl overflow-hidden border bg-[#1e1e1e] h-full"
        style={{
          borderColor: hovered ? "rgba(18,201,113,0.3)" : "#2e2e2e",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
          transition: "border-color 0.3s ease, transform 0.35s ease",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="relative w-full h-[200px] sm:h-[220px] overflow-hidden">
          <Image
            width={1000}
            height={1000}
            src={item.img}
            alt={item.title}
            className="w-full h-full object-cover"
            style={{
              transform: hovered ? "scale(1.04)" : "scale(1)",
              filter: hovered ? "brightness(0.6)" : "brightness(0.5)",
              transition: "transform 0.5s ease, filter 0.4s ease",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, #1e1e1e 0%, transparent 60%)",
            }}
          />
          <div
            className="absolute inset-0 flex items-center justify-center gap-2"
            style={{
              opacity: hovered ? 1 : 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <Link
              href={item.linked}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#12c971] text-[#0d0d0d] font-bold text-xs tracking-wide hover:bg-[#0fb862] transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={13} /> See more
            </Link>
          </div>
          <div className="absolute top-3 left-3">
            <span className="text-[#12c971] font-mono text-xs bg-[#12c971]/10 border border-[#12c971]/25 px-2 py-0.5 rounded-full">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>
        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-gray-100 font-bold text-lg sm:text-xl leading-tight">
              {item.title}
            </h2>
            <div
              className="shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300"
              style={{
                borderColor: hovered ? "rgba(18,201,113,0.5)" : "#3a3a3a",
                color: hovered ? "#12c971" : "#4b5563",
                transform: hovered ? "rotate(45deg)" : "rotate(0deg)",
              }}
            >
              <ArrowUpRight size={13} />
            </div>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
            {item.desc}
          </p>
          <div
            className="h-px rounded-full"
            style={{
              background:
                "linear-gradient(to right, rgba(18,201,113,0.5), transparent)",
              opacity: hovered ? 1 : 0,
              transform: hovered ? "scaleX(1)" : "scaleX(0)",
              transformOrigin: "left",
              transition: "opacity 0.4s ease, transform 0.4s ease",
            }}
          />
        </div>
      </div>
    </Reveal>
  );
}

const Category = ({ params }) => {
  const data = items[params.category];
  if (!data) return notFound();
  const v0 = useMounted(100);
  const label =
    params.category.charAt(0).toUpperCase() + params.category.slice(1);

  return (
    <div className="flex justify-between mt-8 sm:mt-2 z-40">
      <div className="relative w-full p-5 md:px-16 xl:px-24 py-10 mt-8 sm:mt-0 z-40 rounded-2xl bg-[#1A1A1A] overflow-hidden">
        {/* ── PARTICLES ── */}
        <Particles count={25} />

        <div
          className="absolute -top-20 -left-20 w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(18,201,113,0.05) 0%, transparent 70%)",
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
            className="flex items-center justify-between"
          >
            <div>
              <p className="text-[#12c971] font-mono text-xs tracking-[0.25em] uppercase mb-2">
                — {label}
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-100 tracking-tight capitalize">
                {params.category}
              </h1>
              <p className="text-gray-500 text-sm mt-2 font-mono">
                {data.length} {data.length === 1 ? "item" : "items"}
              </p>
            </div>
            <Link
              href="/portfolio"
              className="group flex items-center justify-center gap-2 overflow-hidden
          text-gray-100 text-sm font-semibold tracking-wide px-2 py-1.5
          sm:px-3 sm:py-2 md:px-4 md:py-2.5 rounded-xl border border-[#636363]
          bg-[#1e1e1e] hover:border-[#12c971]/50
          transition-all duration-300 hover:text-[#12c971]"
            >
              <ArrowLeftCircle
                size={24}
                className="group-hover:-translate-x-1 transition-transform duration-300"
              />
              <span className="hidden sm:inline">Back to portfolio</span>
              <span className="inline sm:hidden">Back</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
            {data.map((item, index) => (
              <ProjectCard key={item.id} item={item} index={index} />
            ))}
          </div>

          <div
            style={{ opacity: v0 ? 1 : 0, transition: "opacity 1s ease 0.6s" }}
            className="flex items-center gap-3 pt-4"
          >
            <div className="h-px flex-1 bg-[#2e2e2e]" />
            <p className="text-gray-600 text-xs font-mono tracking-wider">
              {data.length} {data.length === 1 ? "item" : "items"} total
            </p>
            <div className="h-px flex-1 bg-[#2e2e2e]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
