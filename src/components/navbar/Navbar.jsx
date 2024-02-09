"use client";
import Link from "next/link";
import Image from "next/image";
import React from "react";
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
  const session = useSession();
  return (
    <div className="flex justify-between items-center h-full p-4">
      <Link
        href="/"
        className="flex text-lg items-center gap-3 cursor-pointer font-serif tracking-widest hover:text-cyan-800"
      >
        <Image src="/merologo.png" width={40} height={40} />
        Shashanka
      </Link>
      <div className="flex items-center gap-6">
        <Darkmode />
        {links.map((link) => (
          <Link
            key={link.id}
            href={link.url}
            className="text-lg cursor-pointer font-sans hover:text-cyan-800"
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
    </div>
  );
};

export default Navbar;
