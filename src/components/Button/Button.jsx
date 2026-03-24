"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const Button = ({ text, url, target, rel, download }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={url} target={target} rel={rel} download={download}>
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative group flex items-center justify-center gap-2 overflow-hidden
          text-gray-100 text-sm font-semibold tracking-wide
          px-5 py-2.5 rounded-xl border border-[#636363]
          bg-[#1e1e1e] hover:border-[#12c971]/50
          transition-all duration-300 hover:text-[#12c971]"
      >
        {/* Sweep fill on hover */}
        <span
          className="absolute inset-0 rounded-xl"
          style={{
            background: "rgba(18,201,113,0.07)",
            transform: hovered ? "scaleX(1)" : "scaleX(0)",
            transformOrigin: "left",
            transition: "transform 0.35s ease",
          }}
        />

        <span className="relative z-10">{text}</span>

        <ArrowUpRight
          size={14}
          className="relative z-10 transition-all duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translate(0px, 0px)" : "translate(-4px, 4px)",
          }}
        />
      </button>
    </Link>
  );
};

export default Button;