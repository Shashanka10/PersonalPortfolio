"use client"
import React from 'react'
import Link from "next/link";
import { Home } from "lucide-react";
import { Mail } from "lucide-react";
import { Pen } from "lucide-react";
import { UserRound } from "lucide-react";
import { Facebook } from "lucide-react";
import { Instagram } from "lucide-react";
import { Linkedin } from "lucide-react";
import { BsTwitterX } from "react-icons/bs";
import { Github } from "lucide-react";
import Image from 'next/image';

export default function Sidebar() {
  return (
    <div className="hidden  sm:flex sm:justify-center sm:w-1/5 lg:w-1/3">
        <div className="flex-col z-40 text-white space-y-12 p-6 sm:mt-10 lg:mt-16 sm:fixed sm:left-0 sm:top-0 sm:bottom-0">
          <div>
            <Link href="/" className="flex-col items-center lg:space-y-3">
              <Image
                src="/forehead.png"
                alt='profile pic'
                width={300}
                height={300}
                className="w-7 h-7 rounded-full bg-amber-700 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-48 lg:h-48"
              />
              <span className="hidden text-md lg:flex justify-center">
                Shashanka
              </span>
            </Link>
          </div>
          <div className="space-y-4 text-gray-400 font-sans">
            <div className="flex lg:ml-8 justify-center lg:justify-start space-x-4 hover:text-cyan-800 cursor-pointer">
              <Link href="/" className="hidden lg:flex lg:gap-4">
                <Home /> Home
              </Link>
              <Link href="/" className="lg:hidden flex">
                <Home />
              </Link>
            </div>
            <div className="flex lg:ml-8 justify-center lg:justify-start space-x-4 hover:text-cyan-800 cursor-pointer">
              <Link href="/about" className="hidden lg:flex lg:gap-4 ">
                <UserRound />
                About
              </Link>
              <Link href="/about" className="lg:hidden flex">
                <UserRound />
              </Link>
            </div>
            <div className="flex lg:ml-8 justify-center lg:justify-start space-x-4 cursor-pointer hover:text-cyan-800">
              <Link href="/portfolio" className="hidden lg:flex lg:gap-4">
                <Pen />
                Portfolio
              </Link>
              <Link href="/portfolio" className="lg:hidden flex">
                <Pen />
              </Link>
            </div>
            <div className="flex lg:ml-8 justify-center lg:justify-start space-x-4 cursor-pointer hover:text-cyan-800">
              <Link href="/contact" className="hidden lg:flex lg:gap-4">
                <Mail />
                Contact
              </Link>
              <Link href="/contact" className="lg:hidden flex">
                <Mail />
              </Link>
            </div>
          </div>
          <hr className="mt-10 border-gray-600 opacity-50" />
          <div className="sm:space-y-3 md:space-y-4 z-40  lg:space-y-0 lg:flex lg:justify-center gap-4 text-gray-400 font-sans">
            <Link
              href="https://www.facebook.com/luitel.shashanka/"
              className="hover:text-cyan-800 cursor-pointer items-center flex justify-center"
            >
              <Facebook />
            </Link>
            <Link
              href="https://github.com/Shashanka10"
              className="hover:text-cyan-800 cursor-pointer items-center flex justify-center"
            >
              <Github />
            </Link>
            <Link
              href="https://www.instagram.com/_shashankaa10/"
              className="hover:text-cyan-800 cursor-pointer items-center flex justify-center"
            >
              <Instagram />
            </Link>
            <Link
              href="https://twitter.com/_shashanka10"
              className="hover:text-cyan-800 cursor-pointer items-center flex justify-center"
            >
              <BsTwitterX />
            </Link>
            <Link
              href="https://www.linkedin.com/in/shashanka-luitel-5b0166177/"
              className="hover:text-cyan-800 cursor-pointer items-center flex justify-center"
            >
              <Linkedin />
            </Link>
          </div>
        </div>
      </div>
  )
}