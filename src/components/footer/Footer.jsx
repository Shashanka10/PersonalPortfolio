"use client";
import React from "react";
import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  { href: "https://www.facebook.com/luitel.shashanka/",    icon: <FaFacebook size={14} />,  label: "Facebook" },
  { href: "https://github.com/Shashanka10",                icon: <FaGithub size={14} />,    label: "GitHub" },
  { href: "https://www.instagram.com/_shashankaa10/",      icon: <FaInstagram size={14} />, label: "Instagram" },
  { href: "https://twitter.com/_shashanka10",              icon: <BsTwitterX size={13} />,  label: "Twitter" },
  { href: "https://www.linkedin.com/in/shashanka-luitel/", icon: <FaLinkedin size={14} />,  label: "LinkedIn" },
];

const Footer = () => {
  return (
    <footer className="relative flex items-center justify-between
      bg-[#141414] border-t border-[#1f1f1f] text-gray-400
      px-5 sm:px-8 md:px-10 py-4 z-40 overflow-hidden">

      {/* Subtle green glow left */}
      <div
        className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(18,201,113,0.04), transparent)" }}
      />

      <p className="relative text-gray-500 font-mono text-[10px] sm:text-xs tracking-wider">
        © 2023{" "}
        <span className="font-semibold">Shashanka Luitel</span>
        <span className="hidden sm:inline"> · All rights reserved</span>
      </p>

      {/* Social icons */}
      <div className="relative flex items-center gap-1 sm:gap-1.5">
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