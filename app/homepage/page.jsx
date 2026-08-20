"use client";

import Image from "next/image";
import Illustrate from "@/public/me.png";
import Button from "@/components/Button/Button";
import Typewriter from "typewriter-effect";
import { MapPin, ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Particles from "@/components/Particles/Particles";

function useMounted(delay = 0) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return visible;
}

function Corner({ pos }) {
  const base =
    "absolute w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 border-[#12c971]/40 pointer-events-none";

  const corners = {
    tl: "top-4 left-4 border-t border-l",
    tr: "top-4 right-4 border-t border-r",
    bl: "bottom-4 left-4 border-b border-l",
    br: "bottom-4 right-4 border-b border-r",
  };

  return <span className={`${base} ${corners[pos]}`} />;
}

function TechLabel({ children, className = "" }) {
  return (
    <span
      className={`font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-gray-600 ${className}`}
    >
      {children}
    </span>
  );
}

export default function HomePage() {
  const v0 = useMounted(100);
  const v1 = useMounted(300);
  const v2 = useMounted(500);
  const v3 = useMounted(700);
  const v4 = useMounted(900);
  const v5 = useMounted(1100);

  const heroRef = useRef(null);

  /* Mouse-following glow */
  useEffect(() => {
    const hero = heroRef.current;

    if (!hero) return;

    const handleMouseMove = (event) => {
      const rect = hero.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      hero.style.setProperty("--mouse-x", `${x}px`);
      hero.style.setProperty("--mouse-y", `${y}px`);
    };

    const handleMouseLeave = () => {
      hero.style.setProperty("--mouse-x", "50%");
      hero.style.setProperty("--mouse-y", "50%");
    };

    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const fade = (visible, extra = "") =>
    `transition-all duration-700 ease-out ${extra} ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    }`;

  return (
    <div
      ref={heroRef}
      className="
        hero-container
        relative
        w-full
        min-h-full
        p-5
        sm:p-8
        sm:px-12
        md:p-12
        lg:p-20
        xl:p-24
        mt-8
        sm:mt-0
        z-40
        rounded-2xl
        bg-[#1A1A1A]
        overflow-hidden
        border border-white/[0.035]
      "
      style={{
        "--mouse-x": "50%",
        "--mouse-y": "50%",
      }}
    >
      {/* Technical grid */}
      <div className="absolute inset-0 pointer-events-none opacity-60">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.025) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.025) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "42px 42px",
            maskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 0%, transparent 75%)",
          }}
        />
      </div>

      {/* Mouse-following glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(420px circle at var(--mouse-x) var(--mouse-y), rgba(18,201,113,0.055), transparent 70%)",
        }}
      />

      {/* Static green glow */}
      <div
        className="
          absolute
          -top-32
          -left-32
          w-[480px]
          h-[480px]
          rounded-full
          pointer-events-none
        "
        style={{
          background:
            "radial-gradient(circle, rgba(18,201,113,0.065) 0%, transparent 70%)",
        }}
      />

      <div
        className="
          absolute
          -bottom-48
          right-[-100px]
          w-[500px]
          h-[500px]
          rounded-full
          pointer-events-none
        "
        style={{
          background:
            "radial-gradient(circle, rgba(18,201,113,0.035) 0%, transparent 70%)",
        }}
      />

      {/* Particles */}
      <Particles />

      {/* Corner brackets */}
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />

      {/* Top system bar */}
      <div
        className={`
          ${fade(v0)}
          absolute
          top-5
          left-7
          right-7
          sm:left-10
          sm:right-10
          md:left-14
          md:right-14
          hidden sm:flex
          items-center
          justify-between
          pointer-events-none
        `}
      >
        <TechLabel>PORTFOLIO</TechLabel>

        <div className="flex items-center gap-2">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#12c971] opacity-50 animate-ping" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#12c971]" />
          </span>

          <TechLabel>ONLINE</TechLabel>
        </div>
      </div>

      {/* Main content */}
      <div
        className="
          relative
          z-10
          flex
          flex-col
          md:flex-row
          md:justify-between
          md:items-center
          gap-12
          pt-10
          md:pt-4
        "
      >
        {/* Left content */}
        <div className="space-y-6 md:space-y-7 flex-1 max-w-3xl">
          {/* Availability */}
          <div className={fade(v0)}>
            <span
              className="
                inline-flex
                items-center
                gap-2.5
                text-[#12c971]
                bg-[#12c971]/10
                border
                border-[#12c971]/25
                px-3
                py-1.5
                rounded-full
                text-[10px]
                sm:text-xs
                font-mono
                tracking-widest
                uppercase
              "
            >
              <span className="relative flex w-2 h-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#12c971] opacity-60 animate-ping" />
                <span className="relative w-2 h-2 rounded-full bg-[#12c971]" />
              </span>
              Open to opportunities
            </span>
          </div>

          {/* Name */}
          <div className={fade(v1)}>
            <p className="text-gray-500 font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase mb-3">
              Hello, I am
            </p>

            <div className="space-y-3">
              <h1
                className="
                  text-4xl
                  sm:text-5xl
                  md:text-6xl
                  lg:text-7xl
                  font-black
                  text-gray-100
                  leading-[0.95]
                  tracking-tight
                "
              >
                Shashanka
                <span
                  className="
                    ml-2
                    sm:ml-4
                    md:ml-5
                    text-transparent
                    bg-clip-text
                  "
                  style={{
                    WebkitTextStroke: "1px rgba(18,201,113,0.65)",
                  }}
                >
                  Luitel
                </span>
              </h1>

              {/* Nepali name + pronunciation */}
              <div className="flex items-center gap-2.5">
                <span className="text-lg sm:text-xl text-gray-400 font-medium flex items-center gap-2">
                  शशांक लुईटेल{" "}
                  <span className="text-sm tracking-wider text-gray-500">
                    ( Devanagari )
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Typewriter */}
          <div
            className={`
              ${fade(v2)}
              min-h-[28px]
              text-sm
              sm:text-base
              lg:text-lg
              text-gray-300
              font-mono
              tracking-wider
              flex
              items-center
            `}
          >
            <span className="text-[#12c971]/50 mr-2">&gt;</span>

            <Typewriter
              options={{
                strings: [
                  "Research Enthusiast",
                  "Full Stack Developer",
                  "Trekker",
                  "Footballer",
                ],
                autoStart: true,
                loop: true,
                delay: 80,
                deleteSpeed: 60,
                cursor: "▋",
              }}
            />
          </div>

          {/* Research tags */}
          <div className={fade(v3)}>
            <div className="flex items-center gap-3 mb-3">
              <TechLabel>Currently exploring</TechLabel>
              <span className="h-px w-8 bg-[#12c971]/30" />
            </div>

            <div className="flex flex-wrap gap-2 md:gap-3">
              {["HCI", "XR", "AI"].map((item) => (
                <span
                  key={item}
                  className="
                    px-4
                    md:px-6
                    py-1
                    rounded-md
                    border
                    border-white/[0.07]
                    bg-white/[0.025]
                    text-gray-500
                    text-[12px]
                    sm:text-xs
                    md:text-sm
                    font-mono
                    transition-all
                    duration-300
                    hover:border-[#12c971]/30
                    hover:text-[#12c971]/80
                    hover:bg-[#12c971]/5
                  "
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className={fade(v3)}>
            <div className="inline-flex items-center gap-2">
              <MapPin size={14} className="text-[#12c971] shrink-0" />

              <span className="text-gray-400 text-sm font-mono tracking-wider">
                Bhaktapur
              </span>

              <span className="text-gray-200 flex gap-1.5 items-center text-sm font-mono tracking-wider">
                / Nepal
                <Image
                  src="/nepal.png"
                  alt="Nepal flag"
                  width={18}
                  height={18}
                />
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className={fade(v3)}>
            <div className="h-px w-20 bg-gradient-to-r from-[#12c971]/50 to-transparent" />
          </div>

          {/* Buttons */}
          <div
            className={`
              ${fade(v4)}
              flex
              flex-wrap
              gap-3
              items-center
            `}
          >
            <Button url="/portfolio" text="Portfolio" />

            <Button url="/contact" text="Contact" />

            <Button url="/shashanka_resume.pdf" text="CV" />
          </div>

          {/* Scroll hint */}
          <div
            className={`
              ${fade(v5)}
              hidden
              md:flex
              items-center
              gap-3
              text-gray-600
              text-[10px]
              font-mono
              pt-3
            `}
          >
            <div className="flex flex-col gap-0.5">
              <span className="tracking-[0.2em] uppercase">
                Scroll to explore
              </span>
            </div>

            <ArrowDown size={12} className="animate-bounce ml-1" />
          </div>
        </div>

        {/* Right / Portrait */}
        <div
          className={`
            ${fade(v2, "delay-200")}
            flex
            flex-col
            items-center
            md:items-end
            flex-shrink-0
          `}
        >
          <div className="relative">
            {/* Top metadata */}
            <div
              className="
                absolute
                -top-6
                left-2
                flex
                items-center
                gap-2
                z-20
              "
            >
              <TechLabel>01 / 10</TechLabel>

              <span className="h-px w-8 bg-[#12c971]/20" />
            </div>

            {/* Portrait */}
            <div
              className="relative group"
              style={{
                width: "clamp(220px, 28vw, 330px)",
                height: "clamp(250px, 32vw, 370px)",
              }}
            >
              {/* Outer glow */}
              <div
                className="
                  absolute
                  inset-0
                  rounded-2xl
                  bg-[#12c971]/5
                  blur-2xl
                  opacity-0
                  group-hover:opacity-100
                  transition-opacity
                  duration-700
                "
              />

              {/* Back offset ring */}
              <div
                className="
                  absolute
                  bottom-[-7px]
                  right-[-7px]
                  rounded-2xl
                  border
                  border-[#12c971]/25
                  group-hover:border-[#12c971]/50
                  transition-all
                  duration-500
                  group-hover:translate-x-[3px]
                  group-hover:translate-y-[3px]
                "
                style={{
                  width: "calc(100% - 16px)",
                  height: "calc(100% - 16px)",
                }}
              />

              {/* Front offset ring */}
              <div
                className="
                  absolute
                  top-[-7px]
                  left-[-7px]
                  rounded-2xl
                  border
                  border-[#12c971]/25
                  group-hover:border-[#12c971]/45
                  transition-all
                  duration-500
                  group-hover:-translate-x-[3px]
                  group-hover:-translate-y-[3px]
                "
                style={{
                  width: "calc(100% - 16px)",
                  height: "calc(100% - 16px)",
                }}
              />

              {/* Image */}
              <div
                className="
                  absolute
                  inset-[8px]
                  rounded-xl
                  overflow-hidden
                  bg-[#111]
                  border
                  border-[#2e2e2e]
                  group-hover:border-[#12c971]/40
                  transition-all
                  duration-500
                "
                style={{
                  animation: "float 6s ease-in-out infinite",
                }}
              >
                <Image
                  src={Illustrate}
                  alt="Shashanka Luitel"
                  fill
                  sizes="(max-width: 768px) 80vw, 330px"
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-[1.025]
                  "
                  priority
                />

                {/* Image overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-[#111]/50
                    via-transparent
                    to-[#12c971]/5
                    opacity-60
                  "
                />

                {/* Hover overlay */}
                <div
                  className="
                    absolute
                    inset-0
                    bg-[#12c971]/5
                    opacity-0
                    group-hover:opacity-100
                    transition-opacity
                    duration-500
                  "
                />

                {/* Scan line */}
                <div
                  className="
                    absolute
                    left-0
                    right-0
                    h-px
                    bg-[#12c971]/30
                    opacity-0
                    group-hover:opacity-100
                    animate-scan
                  "
                />
              </div>

              {/* Corner markers */}
              <span className="absolute top-3 left-3 w-2 h-2 border-t border-l border-[#12c971]/50 z-10" />
              <span className="absolute top-3 right-3 w-2 h-2 border-t border-r border-[#12c971]/50 z-10" />
              <span className="absolute bottom-3 left-3 w-2 h-2 border-b border-l border-[#12c971]/50 z-10" />
              <span className="absolute bottom-3 right-3 w-2 h-2 border-b border-r border-[#12c971]/50 z-10" />
            </div>

            {/* Quote */}
            <div
              className="
        mt-5
        md:mt-4
        w-full
        max-w-[280px]
        sm:max-w-[320px]
        md:max-w-[330px]
        flex
        items-center
        justify-center
        gap-3
        text-center
      "
            >
              <span className="hidden sm:block h-px w-6 sm:w-8 bg-[#12c971]/20 shrink-0" />

              <TechLabel className="leading-relaxed text-center">
                Giving up is not in the blood, sir!
              </TechLabel>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden sm:flex items-center gap-3 pointer-events-none">
        <span className="w-8 h-px bg-gradient-to-r from-transparent to-[#12c971]/20" />

        <span className="w-1 h-1 rounded-full bg-[#12c971]/30" />

        <span className="w-16 h-px bg-[#12c971]/10" />

        <span className="w-1 h-1 rounded-full bg-[#12c971]/30" />

        <span className="w-8 h-px bg-gradient-to-l from-transparent to-[#12c971]/20" />
      </div>

      {/* Animations */}
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes scan {
          0% {
            top: 0%;
            opacity: 0;
          }

          10% {
            opacity: 0.8;
          }

          90% {
            opacity: 0.4;
          }

          100% {
            top: 100%;
            opacity: 0;
          }
        }

        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-container *,
          .hero-container {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
