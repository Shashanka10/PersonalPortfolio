"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Project from "../../../public/projectt.png";
import Application from "../../../public/apps.jpg";
import Findings from "../../../public/findings.jpg";
import { ArrowUpRight, FolderOpen, BookOpen } from "lucide-react";
import Particles from "@/components/Particles/Particles";
import { TbReportSearch } from "react-icons/tb";
import Reveal from "@/components/Reveal/Reveal";

function useMounted(delay = 0) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, []);
  return visible;
}

const galleries = [
  {
    id: "projects", href: "/portfolio/projects", image: Project,
    icon: <FolderOpen size={18} />, label: "Projects", tag: "Work",
    description: "Projects built with coding.",
    accent: "#12c971", count: "View all",
  },
  {
    id: "researchs", href: "/portfolio/researchs", image: Findings,
    icon: <TbReportSearch size={18} />, label: "Papers", tag: "Research",
    description: "Experiment findings on few topics.",
    accent: "#C0C0C0", count: "View all",
  },
  {
    id: "blogs", href: "/portfolio/blogs", image: Application,
    icon: <BookOpen size={18} />, label: "Blogs", tag: "Writing",
    description: "Thoughts and reflections on various topics.",
    accent: "#FABC9B", count: "View all",
  },
];

function GalleryCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const visible = useMounted(200 + index * 150);

  return (
    <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(32px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>
      <Reveal delay={index * 120}>
      <Link href={item.href}>
        <div
          className="group relative rounded-2xl overflow-hidden border border-[#2e2e2e] bg-[#1e1e1e] cursor-pointer h-full"
          style={{ transition: "border-color 0.3s ease, transform 0.4s ease", transform: hovered ? "translateY(-4px)" : "translateY(0)", borderColor: hovered ? `${item.accent}40` : undefined }}
          onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        >
          <div className="relative h-[220px] sm:h-[260px] lg:h-[320px] overflow-hidden">
            <Image src={item.image} alt={item.label} fill className="object-cover"
              style={{ transform: hovered ? "scale(1.05)" : "scale(1)", transition: "transform 0.6s ease", filter: hovered ? "brightness(0.55)" : "brightness(0.4)" }} />
            <div className="absolute inset-0" style={{ background: `linear-gradient(to top, #1e1e1e 0%, transparent 60%)` }} />
            <div className="absolute top-4 left-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono tracking-widest uppercase border"
                style={{ color: item.accent, borderColor: `${item.accent}40`, backgroundColor: `${item.accent}10` }}>
                {item.tag}
              </span>
            </div>
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center border"
              style={{ borderColor: `${item.accent}40`, backgroundColor: `${item.accent}10`, color: item.accent, opacity: hovered ? 1 : 0, transform: hovered ? "scale(1) rotate(0deg)" : "scale(0.7) rotate(-45deg)", transition: "opacity 0.3s ease, transform 0.3s ease" }}>
              <ArrowUpRight size={14} />
            </div>
          </div>
          <div className="p-5 sm:p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="p-2 rounded-lg" style={{ color: item.accent, backgroundColor: `${item.accent}15` }}>{item.icon}</span>
                <h3 className="text-gray-100 font-bold text-xl sm:text-2xl tracking-tight">{item.label}</h3>
              </div>
              <span className="text-xs font-mono font-semibold flex items-center gap-1 transition-all duration-300" style={{ color: hovered ? item.accent : "#4b5563" }}>
                {item.count}
                <ArrowUpRight size={12} style={{ transform: hovered ? "translate(2px, -2px)" : "translate(0,0)", transition: "transform 0.3s ease" }} />
              </span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
            <div className="h-px rounded-full transition-all duration-500"
              style={{ background: `linear-gradient(to right, ${item.accent}60, transparent)`, opacity: hovered ? 1 : 0, transform: hovered ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left" }} />
          </div>
        </div>
      </Link>
      </Reveal>
    </div>
  );
}

export const Portfolio = () => {
  const v0 = useMounted(100);
  return (
    <div className="flex justify-between mt-8 sm:mt-2 z-40">
      <div className="relative w-full p-5 sm:p-12 md:p-16 lg:p-24 mt-8 sm:mt-0 z-40 rounded-2xl bg-[#1A1A1A] overflow-hidden">

        {/* ── PARTICLES ── */}
        <Particles count={25} />

        <div className="absolute -top-16 -right-16 w-[360px] h-[360px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(18,201,113,0.05) 0%, transparent 70%)", zIndex: 0 }} />

        <div className="relative z-10 space-y-10">
          <div style={{ opacity: v0 ? 1 : 0, transform: v0 ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease, transform 0.7s ease" }} className="space-y-3">
            <p className="text-[#12c971] font-mono text-xs tracking-[0.25em] uppercase">— My work</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-100 tracking-tight leading-tight">Portfolio</h1>
            <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">A collection of projects, papers and blogs, that I've built, explored, and written about.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-7">
            {galleries.map((item, i) => <GalleryCard key={item.id} item={item} index={i} />)}
          </div>
          <div style={{ opacity: v0 ? 1 : 0, transition: "opacity 1s ease 0.8s" }} className="flex items-center gap-3 pt-2">
            <div className="h-px flex-1 bg-[#2e2e2e]" />
            <p className="text-gray-500 text-xs font-mono tracking-wider">more coming soon</p>
            <div className="h-px flex-1 bg-[#2e2e2e]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;