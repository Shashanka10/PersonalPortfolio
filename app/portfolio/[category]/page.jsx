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
          relative
          block
          rounded-2xl
          overflow-hidden
          border
          border-[#2e2e2e]
          bg-[#1e1e1e]
          h-full
          cursor-pointer
          transition-all
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          hover:-translate-y-1
          hover:border-[#12c971]/30
          hover:shadow-[0_18px_45px_rgba(0,0,0,0.35)]
          focus:outline-none
          focus-visible:ring-2
          focus-visible:ring-[#12c971]/50
        "
      >
        <div
          className="
            relative
            w-full
            h-[200px]
            sm:h-[220px]
            overflow-hidden
          "
        >
          <Image
            width={1000}
            height={1000}
            src={item.img}
            alt={item.title}
            sizes="
              (max-width: 639px) 100vw,
              (max-width: 1279px) 50vw,
              33vw
            "
            className="
              w-full
              h-full
              object-cover
              scale-100
              brightness-[0.5]
              group-hover:scale-[1.04]
              group-hover:brightness-[0.6]
              transition-all
              duration-700
              ease-[cubic-bezier(0.22,1,0.36,1)]
            "
          />
          <div
            className="
              absolute
              inset-0
              pointer-events-none
            "
            style={{
              background:
                "linear-gradient(to top, #1e1e1e 0%, transparent 60%)",
            }}
          />
          <div
            className="
              absolute
              inset-0
              flex
              items-center
              justify-center
              opacity-0
              group-hover:opacity-100
              transition-opacity
              duration-300
              pointer-events-none
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-[#12c971]
                text-[#0d0d0d]
                font-bold
                text-xs
                tracking-wide
                translate-y-2
                group-hover:translate-y-0
                transition-transform
                duration-300
              "
            >
              <ExternalLink size={13} />
              See more
            </div>
          </div>

          <div
            className="
              absolute
              top-3
              left-3
            "
          >
            <span
              className="
                text-[#12c971]
                font-mono
                text-xs
                bg-[#12c971]/10
                border
                border-[#12c971]/25
                px-2
                py-0.5
                rounded-full
              "
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="p-5 space-y-3">
          <div className="flex items-start justify-between gap-3">
            <h2
              className="
                text-gray-100
                font-bold
                text-lg
                sm:text-xl
                leading-tight
              "
            >
              {item.title}
            </h2>

            <div
              className="
                shrink-0
                w-7
                h-7
                rounded-full
                border
                border-[#3a3a3a]
                flex
                items-center
                justify-center
                text-[#4b5563]
                transition-all
                duration-300
                group-hover:border-[#12c971]/50
                group-hover:text-[#12c971]
                group-hover:rotate-45
              "
            >
              <ArrowUpRight size={13} />
            </div>
          </div>

          <p
            className="
              text-gray-500
              text-sm
              leading-relaxed
              line-clamp-3
            "
          >
            {item.desc}
          </p>

          <div
            className="
              h-px
              rounded-full
              bg-gradient-to-r
              from-[#12c971]/50
              to-transparent
              opacity-0
              scale-x-0
              origin-left
              group-hover:opacity-100
              group-hover:scale-x-100
              transition-all
              duration-500
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
