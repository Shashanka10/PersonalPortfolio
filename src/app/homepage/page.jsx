"use client";
import Image from "next/image";
import Illustrate from "../../../public/me.png";
import Button from "@/components/Button/Button";
import Typewriter from "typewriter-effect";
import { MapPin, ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";
import Particles from "@/components/Particles/Particles";

/* Staggered mount animation hook */
function useMounted(delay = 0) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, []);
  return visible;
}

/* ─── Animated corner bracket ─── */
function Corner({ pos }) {
  const base =
    "absolute w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 border-[#12c971]/40";
  const corners = {
    tl: "top-4 left-4 border-t border-l",
    tr: "top-4 right-4 border-t border-r",
    bl: "bottom-4 left-4 border-b border-l",
    br: "bottom-4 right-4 border-b border-r",
  };
  return <span className={`${base} ${corners[pos]}`} />;
}

export default function HomePage() {
  const v0 = useMounted(100);
  const v1 = useMounted(300);
  const v2 = useMounted(500);
  const v3 = useMounted(700);
  const v4 = useMounted(900);

  const fade = (visible, extra = "") =>
    `transition-all duration-700 ${extra} ${
      visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
    }`;

  return (
    <div className="relative w-full p-5 sm:p-8 sm:px-12 md:p-12 lg:p-24 mt-8 sm:mt-0 z-40 rounded-2xl bg-[#1A1A1A] overflow-hidden">
      {/* Subtle green radial glow — top-left */}
      <div
        className="absolute -top-20 -left-20 w-[420px] h-[420px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(18,201,113,0.07) 0%, transparent 70%)",
          zIndex: 0,
        }}
      />

      {/* Floating particles */}
      <Particles />

      {/* Corner brackets */}
      <Corner pos="tl" />
      <Corner pos="tr" />
      <Corner pos="bl" />
      <Corner pos="br" />

      {/* ── MAIN GRID ── */}
      <div className="relative z-10 md:flex md:justify-between md:items-center md:gap-12 space-y-10 md:space-y-0">
        <div className="space-y-6 md:space-y-7 flex-1">
          <div className={fade(v0)}>
            <span className="inline-flex mt-6 sm:mt-4 md:mt-0 items-center gap-2.5 text-[#12c971] bg-[#12c971]/10 border border-[#12c971]/25 px-3 py-1.5 rounded-full text-xs font-mono tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#12c971] animate-pulse [animation-duration:1.5s]" />
              Available for work
            </span>
          </div>

          <div className={fade(v1)}>
            <p className="text-gray-100 font-mono text-xs tracking-[0.25em] uppercase mb-2">
              Hello, I am
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-100 leading-[1.05] tracking-tight">
              Shashanka
              <span
                className="ml-2 sm:ml-4 md:ml-5 text-transparent bg-clip-text"
                style={{ WebkitTextStroke: "1px rgba(18,201,113,0.6)" }}
              >
                Luitel
              </span>
            </h1>
          </div>

          <div
            className={`${fade(v2)} text-sm sm:text-base lg:text-lg text-gray-300 font-mono tracking-wider min-h-[28px]`}
          >
            <Typewriter
              options={{
                strings: [
                  "< Welcome to my website />",
                  "< Research Enthusiast />",
                  "< Full Stack Developer />",
                  "< Footballer />",
                  "< Trekker />",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </div>

          {/* Location */}
          <div className={`${fade(v3)} flex items-center`}>
            <div className="inline-flex items-center gap-2">
              <MapPin size={14} className="text-[#12c971] shrink-0" />
              <span className="text-gray-400 text-sm font-mono tracking-wider">
                Bhaktapur
              </span>
              <span className="text-gray-200 flex gap-1 items-center text-sm font-mono tracking-wider">
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

          {/* Divider line */}
          <div className={`${fade(v3)} h-px w-16 bg-[#12c971]/40`} />

          <div className={`${fade(v4)} flex flex-wrap gap-3`}>
            <Button url="/portfolio" text="Check Portfolio" />
            <Button url="/contact" text="Contact Me" />
            <Button
              url="/shashanka_resume.pdf"
              text="Download CV"
              target="_blank"
              rel="noopener noreferrer"
              download="Download File"
            />
          </div>

          {/* Scroll hint */}
          <div
            className={`${fade(v4)} hidden md:flex items-center gap-2 text-gray-500 text-xs font-mono pt-2`}
          >
            <ArrowDown size={14} className="animate-bounce" />
            scroll to explore
          </div>
        </div>

        <div
          className={`${fade(v2, "delay-200")} flex justify-center md:justify-end`}
        >
          <div
            className="relative group"
            style={{
              width: "clamp(220px, 28vw, 320px)",
              height: "clamp(240px, 30vw, 350px)",
            }}
          >
            {/* Back offset ring — bottom right */}
            <div
              className="absolute bottom-[-6px] right-[-6px] rounded-2xl border border-[#12c971]/25
      group-hover:border-[#12c971]/50 transition-all duration-500 group-hover:translate-x-[2px] group-hover:translate-y-[2px]"
              style={{
                width: "calc(100% - 16px)",
                height: "calc(100% - 16px)",
              }}
            />

            {/* Front offset ring — top left */}
            <div
              className="absolute top-[-6px] left-[-6px] rounded-2xl border border-[#12c971]/25
      group-hover:border-[#12c971]/25 transition-all duration-500 group-hover:-translate-x-[2px] group-hover:-translate-y-[2px]"
              style={{
                width: "calc(100% - 16px)",
                height: "calc(100% - 16px)",
              }}
            />
            <div
              className="absolute inset-[8px] rounded-xl overflow-hidden bg-[#111]
        border border-[#2e2e2e] group-hover:border-[#12c971]/40
        transition-all duration-500"
              style={{ animation: "float 6s ease-in-out infinite" }}
            >
              <Image
                src={Illustrate}
                alt="Shashanka Luitel"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#12c971]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-10px); }
  }
`}</style>
    </div>
  );
}