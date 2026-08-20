"use client";

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { items } from "./data.js";
import { notFound } from "next/navigation";
import { ArrowUpRight, ExternalLink, ArrowLeftCircle } from "lucide-react";

import Particles from "@/components/Particles/Particles";
import Reveal from "@/components/Reveal/Reveal.jsx";

function useMounted(delay = 0) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);

    return () => clearTimeout(t);
  }, [delay]);

  return visible;
}

function ProjectCard({ item, index }) {
  return (
    <Reveal delay={index * 100}>
      <Link
        href={item.linked}
        target="_blank"
        rel="noopener noreferrer"
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
          hover:border-[#12c971]/40
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#12c971]/50
        "
      >
        {/* IMAGE */}
        <div className="relative h-[200px] overflow-hidden sm:h-[220px] lg:h-[240px]">
          <Image
            src={item.img}
            alt={item.title}
            fill
            sizes="
              (max-width: 639px) 100vw,
              (max-width: 1279px) 50vw,
              33vw
            "
            className="
              object-cover
              brightness-[0.5]
              transition-transform
              duration-700
              ease-out
              group-hover:scale-[1.05]
            "
          />

          {/* DARK GRADIENT */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
            "
            style={{
              background:
                "linear-gradient(to top, #1e1e1e 0%, transparent 65%)",
            }}
          />

          {/* HOVER OVERLAY */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-[#12c971]/[0.04]
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
          />

          {/* SEE MORE */}
          <div
            className="
              pointer-events-none
              absolute
              inset-0
              flex
              items-center
              justify-center
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
          >
            <span
              className="
                flex
                items-center
                gap-2
                rounded-full
                bg-[#12c971]
                px-4
                py-2
                text-xs
                font-bold
                text-[#0d0d0d]
                shadow-lg
              "
            >
              <ExternalLink size={13} />
              See more
            </span>
          </div>

          {/* NUMBER */}
          <span
            className="
              absolute
              left-3
              top-3
              rounded-full
              border
              border-[#12c971]/25
              bg-[#12c971]/10
              px-2
              py-0.5
              font-mono
              text-xs
              text-[#12c971]
              backdrop-blur-sm
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* IMAGE ARROW */}
          <span
            className="
              absolute
              right-3
              top-3
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              border
              border-[#12c971]/30
              bg-[#12c971]/10
              text-[#12c971]
              opacity-0
              transition-opacity
              duration-300
              group-hover:opacity-100
            "
          >
            <ArrowUpRight size={14} />
          </span>
        </div>

        {/* CONTENT */}
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <h2
              className="
                min-w-0
                text-lg
                font-bold
                leading-tight
                text-gray-100
                sm:text-xl
              "
            >
              {item.title}
            </h2>

            <span
              className="
                flex
                h-7
                w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#3a3a3a]
                text-[#4b5563]
                transition-colors
                duration-300
                group-hover:border-[#12c971]/50
                group-hover:text-[#12c971]
              "
            >
              <ArrowUpRight size={13} />
            </span>
          </div>

          <p
            className="
              mt-3
              line-clamp-3
              text-sm
              leading-relaxed
              text-gray-500
            "
          >
            {item.desc}
          </p>

          {/* BOTTOM LINE */}
          <div
            className="
              mt-5
              h-px
              w-full
              origin-left
              scale-x-0
              bg-gradient-to-r
              from-[#12c971]/60
              to-transparent
              opacity-0
              transition-all
              duration-500
              group-hover:scale-x-100
              group-hover:opacity-100
            "
          />
        </div>
      </Link>
    </Reveal>
  );
}

const Category = ({ params }) => {
  const { category } = use(params);

  const data = items[category];

  if (!data) {
    return notFound();
  }

  const v0 = useMounted(100);

  const label = category.charAt(0).toUpperCase() + category.slice(1);

  return (
    <div className="flex justify-between mt-8 sm:mt-2 z-40">
      <div
        className="
          relative
          w-full
          p-5
          md:px-16
          xl:px-24
          py-10
          mt-8
          sm:mt-0
          z-40
          rounded-2xl
          bg-[#1A1A1A]
          overflow-hidden
        "
      >
        <Particles count={25} />

        <div
          className="
            absolute
            -top-20
            -left-20
            w-[380px]
            h-[380px]
            rounded-full
            pointer-events-none
          "
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
            className="
              flex
              items-center
              justify-between
            "
          >
            <div>
              <p
                className="
                  text-[#12c971]
                  font-mono
                  text-xs
                  tracking-[0.25em]
                  uppercase
                  mb-2
                "
              >
                — {label}
              </p>

              <h1
                className="
                  text-3xl
                  sm:text-4xl
                  lg:text-5xl
                  font-black
                  text-gray-100
                  tracking-tight
                  capitalize
                "
              >
                {category}
              </h1>

              <p
                className="
                  text-gray-500
                  text-sm
                  mt-2
                  font-mono
                "
              >
                {data.length} {data.length === 1 ? "item" : "items"}
              </p>
            </div>

            <Link
              href="/portfolio"
              className="
                group
                flex
                items-center
                justify-center
                gap-2
                overflow-hidden
                text-gray-100
                text-sm
                font-semibold
                tracking-wide
                px-2
                py-1.5
                sm:px-3
                sm:py-2
                md:px-4
                md:py-2.5
                rounded-xl
                border
                border-[#636363]
                bg-[#1e1e1e]
                hover:border-[#12c971]/50
                hover:text-[#12c971]
                transition-all
                duration-300
              "
            >
              <ArrowLeftCircle
                size={24}
                className="
                  group-hover:-translate-x-1
                  transition-transform
                  duration-300
                "
              />

              <span className="hidden sm:inline">Back to portfolio</span>

              <span className="inline sm:hidden">Back</span>
            </Link>
          </div>

          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              gap-5
              lg:gap-6
            "
          >
            {data.map((item, index) => (
              <ProjectCard key={item.id} item={item} index={index} />
            ))}
          </div>

          <div
            style={{
              opacity: v0 ? 1 : 0,
              transition: "opacity 1s ease 0.6s",
            }}
            className="
              flex
              items-center
              gap-3
              pt-4
            "
          >
            <div className="h-px flex-1 bg-[#2e2e2e]" />

            <p
              className="
                text-gray-600
                text-xs
                font-mono
                tracking-wider
              "
            >
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
