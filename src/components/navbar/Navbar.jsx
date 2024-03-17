"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";
import { Home } from "lucide-react";
import { Mail } from "lucide-react";
import { Pen } from "lucide-react";
import { UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { GraduationCap } from "lucide-react";

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
  const pathname = usePathname();
  const [open, setOpen] = useState("");
  return (
    <div className="flex fixed top-0 right-0 left-0 sm:hidden justify-between items-center p-5 bg-[#141414] text-white z-50">
      <div>
        <Link
          href="/"
          className="flex text-md md:text-lg md:ml-10 items-center gap-2 md:gap-3 cursor-pointer font-serif tracking-widest hover:text-cyan-800"
        >
          <Image
            src="/forehead.png"
            alt="profile pic"
            width={100}
            height={100}
            className="w-7 h-7 rounded-full bg-amber-700 md:w-10 md:h-10"
          />
          Shashanka
        </Link>
      </div>
      <div className="flex items-center sm:hidden">
        <button
          className="flex z-50 justify-center relative cursor-pointer items-center flex-col space-y-1"
          onClick={() => setOpen(!open)}
        >
          <div
            className={`w-6 h-[2px] bg-gray-500 rounded block transition-all ease-out duration-300 ${
              open ? "rotate-45 translate-y-0.5" : "-translate-y-0.5"
            }`}
          ></div>
          <div
            className={`w-6 h-[2px] bg-gray-500 rounded block transition-all ease-out duration-300 ${
              open ? "hidden" : "flex"
            }`}
          ></div>
          <div
            className={`w-6 h-[2px] bg-gray-500 rounded block transition-all ease-out duration-300 ${
              open ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
            }`}
          ></div>
        </button>
      </div>
      {open && (
        <div className="flex-col space-y-8 z-40 h-screen rounded-tl-3xl rounded-bl-3xl items-center absolute top-0 right-0 w-2/3 sm:w-1/2 bg-black text-white shadow-lg ">
          <div className="flex h-52 items-center rounded-tl-3xl rounded-bl-3xl pt-12 p-5 bg-gradient-to-r from-gray-800 to-gray-900 transform">
            <div className="flex-col">
              <div className="flex space-x-4 items-center">
                <div>
                  <Image
                    src="/shankss.jpg"
                    alt="profile pic"
                    width={1000}
                    height={1000}
                    className="rounded-full w-20 h-20 ring-4 ring-opacity-20 ring-gray-200"
                  />
                </div>
                <div className="flex-col">
                  <h1 className="text-white tracking-wide text-sm">
                    Shashanka Luitel
                  </h1>
                  <p className="text-gray-300 tracking-wider text-xs">
                    Computer Engineer
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <p className="text-yellow-500 tracking-wider text-xs flex items-center gap-2">
                  <GraduationCap />
                  Kathmandu University
                </p>
              </div>
            </div>
          </div>
          <div className="flex-col px-8 space-y-8 text-gray-400 font-sans">
            <div
              className={`flex justify-start space-x-4 hover:text-cyan-800 cursor-pointer ${
                pathname === "/" ? "text-cyan-500" : ""
              }`}
            >
              <Link href="/" className="flex gap-4">
                <Home /> Home
              </Link>
            </div>
            <div
              className={`flex justify-start space-x-4 hover:text-cyan-800 cursor-pointer ${
                pathname === "/about" ? "text-cyan-500" : ""
              }`}
            >
              <Link href="/about" className="flex gap-4 ">
                <UserRound />
                About
              </Link>
            </div>
            <div
              className={`flex justify-start space-x-4 hover:text-cyan-800 cursor-pointer ${
                pathname === "/portfolio" ? "text-cyan-500" : ""
              }`}
            >
              <Link href="/portfolio" className="flex gap-4">
                <Pen />
                Portfolio
              </Link>
            </div>
            <div
              className={`flex justify-start space-x-4 hover:text-cyan-800 cursor-pointer ${
                pathname === "/contact" ? "text-cyan-500" : ""
              }`}
            >
              <Link href="/contact" className="flex gap-4">
                <Mail />
                Contact
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
