"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import Darkmode from "../DarkModeToogle/Darkmode";
import { signOut, useSession } from "next-auth/react";

const links = [
  {
    id: 1,
    title: "Home",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
  },
  {
    id: 3,
    title: "Blog",
    url: "/blog",
  },
  {
    id: 4,
    title: "About",
    url: "/about",
  },
  {
    id: 5,
    title: "Contact",
    url: "/contact",
  },
  {
    id: 6,
    title: "Dashboard",
    url: "/dashboard",
  },
];

const Navbar = () => {
  const [open, setOpen] = useState("");
  const session = useSession();
  return (
    <div className="flex justify-between items-center h-full p-4">
      <Link
        href="/"
        className="flex text-md md:text-lg items-center gap-2 md:gap-3 cursor-pointer font-serif tracking-widest hover:text-cyan-800"
      >
        <Image src="/merologo.png" width={40} height={40} className="w-7 h-7 md:w-10 md:h-10" />
        Shashanka
      </Link>
      <div className="hidden md:flex md:space-x-4">
        <Darkmode />
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            className="cursor-pointer font-sans hover:text-cyan-800"
          >
            {link.title}
          </Link>
        ))}
        {session.status === "authenticated" && (
          <button
            className="p-3 transition ease-in-out delay-100 text-md font-medium bg-cyan-700 rounded-xl hover:translate-y-1 hover:scale-110 hover:bg-slate-500 duration-300"
            onClick={signOut}
          >
            Logout
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 md:hidden">
        <Darkmode />
        <button className="flex justify-center z-50 relative cursor-pointer items-center w-8 h-6 flex-col space-y-1.5" onClick={(()=>setOpen(!open))}>
          <div className="w-6 h-[1.5px] bg-slate-300 rounded"></div>
          <div className="w-6 h-[1.5px] bg-slate-300 rounded"></div>
          <div className="w-6 h-[1.5px] bg-slate-300 rounded"></div>
        </button>
      </div>
      { open && (
      <div className="flex flex-col items-center justify-center text-xl space-y-6 z-10 absolute top-0 right-0 w-2/3 h-screen bg-black text-white">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            className="cursor-pointer font-sans hover:text-cyan-800 "
          >
            {link.title}
          </Link>
        ))}
        {session.status === "authenticated" && (
          <button
            className="p-3 transition ease-in-out delay-100 text-md font-medium bg-cyan-700 rounded-xl hover:translate-y-1 hover:scale-110 hover:bg-slate-500 duration-300"
            onClick={signOut}
          >
            Logout
          </button>
        )}
      </div>
      )}
    </div>
  );
};

export default Navbar;
