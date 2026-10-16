"use client";
import React from "react";
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import {
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const socialLinks = [
  {
    href: "https://www.facebook.com/luitel.shashanka/",
    icon: <FaFacebook size={14} />,
    label: "Facebook",
  },
  {
    href: "https://github.com/Shashanka10",
    icon: <FaGithub size={14} />,
    label: "GitHub",
  },
  {
    href: "https://www.instagram.com/_shashankaa10/",
    icon: <FaInstagram size={14} />,
    label: "Instagram",
  },
  {
    href: "https://twitter.com/_shashanka10",
    icon: <BsTwitterX size={13} />,
    label: "Twitter",
  },
  {
    href: "https://www.linkedin.com/in/shashanka-luitel/",
    icon: <FaLinkedin size={14} />,
    label: "LinkedIn",
  },
  {
    href: "https://www.youtube.com/@shashanka10",
    icon: <FaYoutube size={14} />,
    label: "YouTube",
  },
];

const Footer = () => {
  return (
    <footer
      className="relative flex flex-col lg:flex-row items-center justify-between
   gap-3
   bg-[#141414] border-t border-[#1f1f1f] text-gray-400
   px-4 sm:px-8 md:px-10 py-4 z-40"
    >
      {/* Subtle green glow left */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(18,201,113,0.04), transparent)",
        }}
      />
      {/* Copyright and build date */}
      <div className="relative flex flex-col xl:flex-row items-center sm:items-start xl:items-center gap-1 xl:gap-3 min-w-0 max-w-full">
        <p className="text-gray-500 font-mono text-[10px] sm:text-xs tracking-wide text-center sm:text-left leading-relaxed">
          © 2023–{new Date().getFullYear()}{" "}
          <span className="font-semibold">Shashanka Luitel</span>
          <span className="hidden lg:inline"> · All rights reserved</span>
        </p>

        <span className="hidden xl:inline text-[#2a2a2a]">|</span>

        <p className="text-gray-600 font-mono text-[10px] sm:text-xs tracking-wide text-center sm:text-left leading-relaxed break-words">
          Last updated: {process.env.NEXT_PUBLIC_BUILD_DATE}
        </p>
      </div>

      {/* Social icons */}
      <div className="relative flex items-center justify-center gap-1 sm:gap-1.5 shrink-0">
        {socialLinks.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center
          text-gray-400 border border-transparent
          hover:text-[#12c971] hover:border-[#12c971]/25 hover:bg-[#12c971]/8
          transition-all duration-250"
          >
            {s.icon}
          </Link>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
