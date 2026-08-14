"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Home, Mail, Pen, UserRound, GraduationCap, X } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Images } from "lucide-react";

const links = [
  { id: 1, title: "Home",      url: "/",           icon: <Home size={17} /> },
  { id: 2, title: "About",     url: "/about",      icon: <UserRound size={17} /> },
  { id: 3, title: "Portfolio", url: "/portfolio",  icon: <Pen size={17} /> },
  { id: 4, title: "Gallery",   url: "/gallery",    icon: <Images size={17} /> },
  { id: 5, title: "Contact",   url: "/contact",    icon: <Mail size={17} /> },
];

const socialLinks = [
  { href: "https://github.com/Shashanka10",                icon: <FaGithub size={15} />,    label: "GitHub" },
  { href: "https://www.linkedin.com/in/shashanka-luitel/", icon: <FaLinkedin size={15} />,  label: "LinkedIn" },
  { href: "https://twitter.com/_shashanka10",              icon: <BsTwitterX size={14} />,  label: "Twitter / X" },
  { href: "https://www.instagram.com/_shashankaa10/",      icon: <FaInstagram size={15} />, label: "Instagram" },
  { href: "https://www.facebook.com/luitel.shashanka/",    icon: <FaFacebook size={15} />,  label: "Facebook" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      {/* ── TOP BAR ── */}
      <div className="flex fixed top-0 right-0 left-0 sm:hidden justify-between items-center
        px-5 py-3.5 bg-[#141414]/90 backdrop-blur-md border-b border-[#2a2a2a] text-gray-100 z-50">

        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <Image
              src="/forehead.png"
              alt="Shashanka"
              width={100}
              height={100}
              className="w-8 h-8 rounded-full object-cover border border-[#2e2e2e] group-hover:border-[#12c971]/50 transition-colors duration-300"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#12c971] border-2 border-[#141414]" />
          </div>
          <span className="font-bold text-sm tracking-wide text-gray-100 group-hover:text-[#12c971] transition-colors duration-300">
            Shashanka
          </span>
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="flex flex-col justify-center items-center w-9 h-9 rounded-lg border border-[#2e2e2e]
            hover:border-[#12c971]/40 transition-colors duration-300 gap-1.5 z-50"
          aria-label="Toggle menu"
        >
          <span className="h-px bg-gray-400 rounded-full block transition-all duration-300"
            style={{ transform: open ? "rotate(45deg) translate(2px, 2px)" : "none", width: "18px" }} />
          <span className="h-px bg-gray-400 rounded-full block transition-all duration-300"
            style={{ opacity: open ? 0 : 1, width: "18px" }} />
          <span className="h-px bg-gray-400 rounded-full block transition-all duration-300"
            style={{ transform: open ? "rotate(-45deg) translate(2px, -2px)" : "none", width: "18px" }} />
        </button>
      </div>

      {/* ── BACKDROP ── */}
      <div
        className="fixed inset-0 z-40 sm:hidden bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={() => setOpen(false)}
      />

      {/* ── DRAWER ── */}
      <div
        className="fixed top-0 right-0 bottom-0 z-50 sm:hidden w-72 bg-[#111] border-l border-[#2a2a2a] flex flex-col"
        style={{
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <Image
              src="/forehead.png"
              alt="Shashanka"
              width={100}
              height={100}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#12c971]/30"
            />
            <div>
              <p className="text-gray-100 font-bold text-sm">Shashanka Luitel</p>
              <p className="text-gray-400 text-xs flex items-center gap-1.5 mt-0.5">
                <GraduationCap size={11} />
                Kathmandu University
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 rounded-lg border border-[#2e2e2e] flex items-center justify-center
              text-gray-400 hover:text-gray-100 hover:border-[#12c971]/40 transition-colors duration-200"
          >
            <X size={15} />
          </button>
        </div>

        {/* ── NAV LINKS ── */}
        <nav className="px-4 pt-4 space-y-1">
          {links.map((link) => {
            const active = pathname === link.url;
            return (
              <Link
                key={link.id}
                href={link.url}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm font-semibold
                  transition-all duration-200 group
                  ${active
                    ? "bg-[#12c971]/10 text-[#12c971] border border-[#12c971]/25"
                    : "text-gray-400 hover:text-gray-100 hover:bg-[#1e1e1e] border border-transparent"
                  }`}
              >
                <span className={`transition-colors duration-200 ${active ? "text-[#12c971]" : "text-gray-400 group-hover:text-gray-100"}`}>
                  {link.icon}
                </span>
                {link.title}
                {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#12c971]" />}
              </Link>
            );
          })}
        </nav>

        {/* ── DIVIDER ── */}
        <div className="mx-6 my-4 h-px bg-[#2a2a2a]" />

        {/* ── SOCIAL LINKS ── */}
        <div className="px-4 space-y-1">
          <p className="text-[#12c971]/60 text-xs font-mono tracking-[0.2em] uppercase px-4 mb-2">
            Find me online
          </p>
          {socialLinks.map((s) => (
            <Link
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-xs font-medium
                text-gray-500 hover:text-[#12c971] hover:bg-[#12c971]/8 border border-transparent
                hover:border-[#12c971]/15 transition-all duration-200 group"
            >
              <span className="shrink-0 group-hover:text-[#12c971] transition-colors duration-200">
                {s.icon}
              </span>
              {s.label}
            </Link>
          ))}
        </div>

        {/* ── FOOTER ── */}
        <div className="mt-auto px-6 py-5 border-t border-[#2a2a2a]">
          <p className="text-gray-600 text-xs font-mono text-center tracking-wider">
            © 2024 Shashanka Luitel
          </p>
        </div>
      </div>
    </>
  );
};

export default Navbar;