"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

const links = [
  {
    id: 1,
    title: "HomePage",
    url: "/",
  },
  {
    id: 2,
    title: "Portfolio",
    url: "/portfolio",
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
];

const Navbar = () => {
  const [open, setOpen] = useState("");
  return (
    <div className="flex fixed top-0 right-0 left-0 sm:hidden justify-between items-center p-5 bg-[#141414] text-white z-50">
      <div>
      <Link
        href="/"
        className="flex text-md md:text-lg md:ml-10 items-center gap-2 md:gap-3 cursor-pointer font-serif tracking-widest hover:text-cyan-800"
      >
        <Image src="/forehead.png" alt="profile pic" width={100} height={100} className="w-7 h-7 rounded-full bg-amber-700 md:w-10 md:h-10" />
        Shashanka
      </Link>
      </div>
      <div className="flex items-center sm:hidden">
        <button className="flex z-50 justify-center relative cursor-pointer items-center flex-col space-y-1.5" onClick={(()=>setOpen(!open))}>
          <div className="w-6 h-[2px] bg-gray-500 rounded"></div>
          <div className="w-6 h-[2px] bg-gray-500 rounded"></div>
          <div className="w-6 h-[2px] bg-gray-500 rounded"></div>
        </button>
      </div>
      { open && (
      <div className="flex z-40 flex-col items-center justify-center text-xl space-y-6 absolute top-0 right-0 w-2/3 sm:w-1/2 h-screen bg-black text-white">
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            className="cursor-pointer font-sans hover:text-cyan-800 "
          >
            {link.title}
          </Link>
        ))}
      </div>
      )}
    </div>
  );
};

export default Navbar;
