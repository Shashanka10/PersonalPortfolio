"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import Project from "../../../public/projectt.png";
import Application from "../../../public/apps.jpg";
import Gallery from "../../../public/gallery.png"

const Portfolio = () => {
  return (
    <div className="flex justify-between mt-8 sm:mt-2 z-40">
      <div className="flex-col space-y-4 sm:space-y-6 md:space-y-7 lg:space-y-10 w-full p-5 sm:p-12 md:p-16 lg:p-24 mt-8 sm:mt-0 z-40 rounded-2xl bg-[#1A1A1A]">
        <div className="flex justify-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
            Choose a Gallery
          </h1>
        </div>
        <div className="md:flex md:justify-around md:space-x-5 lg:space-x-8 space-y-4 sm:space-y-6 md:space-y-0 z-40">
          <div className="relative">
            <Link href="/portfolio/Projects">
              <Image
                src={Project}
                alt="Image of illus"
                className="object-cover rounded-2xl h-[200px] sm:h-[300px] md:h-[300px] lg:h-[400px]"
              />
              <span className="absolute bottom-2 left-6 text-cyan-100 text-2xl md:text-xl sm:text-3xl font-bold hover:text-cyan-500">
                Projects{" "}
              </span>
            </Link>
          </div>
          <div className="relative">
            <Link href="/portfolio/Galleries">
              <Image
                src={Gallery}
                alt="Image of webs"
                className="object-cover rounded-2xl h-[200px] sm:h-[300px] md:h-[300px] lg:h-[400px]"
              />
                 <span className="absolute bottom-2 left-6 text-cyan-100 text-2xl md:text-xl sm:text-3xl font-bold hover:text-cyan-500">
                Galleries{" "}
              </span>
            </Link>
          </div>
          <div className="relative">
            <Link href="/portfolio/Blogs">
              <Image
                src={Application}
                alt="Image of apps"
                className="object-cover rounded-2xl h-[200px] sm:h-[300px] md:h-[300px] lg:h-[400px]"
              />
                <span className="absolute bottom-2 left-6 text-cyan-100 text-2xl md:text-xl sm:text-3xl font-bold hover:text-cyan-500">
                Blogs{" "}
              </span>
            </Link>
          </div>
        </div>
        </div>
    </div>
  );
};

export default Portfolio;
