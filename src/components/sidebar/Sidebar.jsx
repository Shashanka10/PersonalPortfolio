"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Mail, Pen, UserRound } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Images } from "lucide-react";

const navLinks = [
  { id: 1, title: "Home",      url: "/",          icon: <Home size={17} /> },
  { id: 2, title: "About",     url: "/about",      icon: <UserRound size={17} /> },
  { id: 3, title: "Portfolio", url: "/portfolio",  icon: <Pen size={17} /> },
  { id: 4, title: "Gallery",   url: "/gallery",    icon: <Images size={17} /> },
  { id: 5, title: "Contact",   url: "/contact",    icon: <Mail size={17} /> },
];

const socialLinks = [
  { href: "https://www.facebook.com/luitel.shashanka/",    icon: <FaFacebook size={15} />,  label: "Facebook" },
  { href: "https://github.com/Shashanka10",                icon: <FaGithub size={15} />,    label: "GitHub" },
  { href: "https://www.instagram.com/_shashankaa10/",      icon: <FaInstagram size={15} />, label: "Instagram" },
  { href: "https://twitter.com/_shashanka10",              icon: <BsTwitterX size={14} />,  label: "Twitter" },
  { href: "https://www.linkedin.com/in/shashanka-luitel/", icon: <FaLinkedin size={15} />,  label: "LinkedIn" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden sm:flex sm:w-[72px] lg:w-[240px] shrink-0">
      <div className="fixed left-0 top-0 bottom-0 sm:w-[72px] lg:w-[240px] flex flex-col
        bg-[#141414]/20 backdrop-blur-md border-r border-[#1f1f1f] z-40 py-6 px-3 lg:px-5">

        {/* ── LOGO ── */}
        <Link href="/" className="flex items-center gap-3 group mb-8 px-1">
          <div className="relative shrink-0">
            <Image
              src="/forehead.png"
              alt="Shashanka"
              width={300}
              height={300}
              className="w-10 h-10 lg:w-11 lg:h-11 rounded-full object-cover
                border-2 border-[#2e2e2e] group-hover:border-[#12c971]/50 transition-colors duration-300"
            />
            {/* Online dot */}
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-[#12c971] border-2 border-[#141414]" />
          </div>
          <span className="hidden lg:block font-bold text-sm text-gray-100 group-hover:text-[#12c971] transition-colors duration-300 tracking-wide">
            Shashanka
          </span>
        </Link>

        {/* ── NAV LINKS ── */}
        <nav className="flex-1 space-y-1 md:space-y-2">
          {navLinks.map((link) => {
            const active = pathname === link.url;
            return (
              <Link
                key={link.id}
                href={link.url}
                title={link.title}
                className={`flex items-center gap-3.5 px-2.5 py-2.5 rounded-xl text-sm font-semibold
                  transition-all duration-200 group relative
                  ${active
                    ? "bg-[#12c971]/10 text-[#12c971] border border-[#12c971]/20"
                    : "text-gray-400 hover:text-gray-100 hover:bg-[#1e1e1e] border border-transparent"
                  }`}
              >
                {/* Active indicator bar */}
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#12c971] rounded-full -ml-3 lg:-ml-5" />
                )}

                <span className={`shrink-0 transition-colors duration-200
                  ${active ? "text-[#12c971]" : "text-gray-400 group-hover:text-gray-100"}`}>
                  {link.icon}
                </span>

                <span className="hidden lg:block">{link.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* ── DIVIDER ── */}
        <div className="my-4 h-px bg-[#2a2a2a]" />

        {/* ── SOCIAL LINKS ── */}
        <div className="space-y-1">
          {socialLinks.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              title={s.label}
              className="flex items-center gap-3.5 px-2.5 py-2 rounded-xl text-gray-400
                hover:text-[#12c971] hover:bg-[#12c971]/8 border border-transparent
                hover:border-[#12c971]/15 transition-all duration-200 group text-sm"
            >
              <span className="shrink-0">{s.icon}</span>
              <span className="hidden lg:block text-xs font-medium text-gray-400 group-hover:text-[#12c971] transition-colors duration-200">
                {s.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-[#1f1f1f]">
          <p className="hidden lg:block text-gray-500 text-[10px] font-mono text-center tracking-wider">
            © 2023 Shashanka
          </p>
        </div>
      </div>
    </div>
  );
}