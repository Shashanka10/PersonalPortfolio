"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeftCircle } from "lucide-react";

import Particles from "@/components/Particles/Particles";

import { hobbyCategories } from "../data";

import TrekkingSection from "@/components/TrekkingSection/TrekkingSection";
import SportsSection from "@/components/SportsSection/SportsSection";
import MusicSx from "@/components/MusicSection/MusicSection";

const HobbyCategory = () => {
  const params = useParams();

  const category = params?.category;

  const meta = hobbyCategories.find((item) => item.id === category);

  if (!meta) {
    notFound();
  }

  const renderers = {
    music: MusicSx,
    sports: SportsSection,
    trekking: TrekkingSection,
  };

  const Section = renderers[category];

  return (
    <div className="flex justify-between mt-8 sm:mt-2 z-40">
      <div className="relative w-full p-5 md:px-16 xl:px-24 py-10 mt-8 sm:mt-0 z-40 rounded-2xl bg-[#1A1A1A] overflow-hidden">
        <Particles count={25} />

        {/* Background glow */}
        <div
          className="absolute -top-20 -left-20 w-[380px] h-[380px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${meta.accent}15 0%, transparent 70%)`,
            zIndex: 0,
          }}
        />

        <div className="relative z-10 space-y-10">
          {/* Header */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p
                className="font-mono text-xs tracking-[0.25em] uppercase mb-2"
                style={{ color: meta.accent }}
              >
                — {meta.top}
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-100 tracking-tight capitalize">
                {meta.label}
              </h1>

              <p className="mt-3 text-gray-500 text-sm sm:text-base max-w-xl">
                {meta.bottom}
              </p>
            </div>

            <Link
              href="/hobbies"
              className="
    group
    inline-flex
    items-center
    gap-2
    px-3.5
    py-2
    rounded-full
    border
    text-xs
    font-mono
    uppercase
    tracking-wider
    transition-all
    duration-300
  "
              style={{
                color: meta.accent,
                borderColor: `${meta.accent}45`,
                backgroundColor: `${meta.accent}0D`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${meta.accent}18`;
                e.currentTarget.style.borderColor = `${meta.accent}80`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = `${meta.accent}0D`;
                e.currentTarget.style.borderColor = `${meta.accent}45`;
              }}
            >
              <ArrowLeftCircle
                size={16}
                strokeWidth={1.7}
                className="
      transition-transform
      duration-300
      group-hover:-translate-x-1
    "
              />

              <span className="hidden sm:inline">Back to hobbies</span>

              <span className="sm:hidden">Back</span>
            </Link>
          </div>

          {/* Category content */}
          {Section ? (
            <Section />
          ) : (
            <p className="text-gray-500 text-sm">
              This hobby category is coming soon.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HobbyCategory;
