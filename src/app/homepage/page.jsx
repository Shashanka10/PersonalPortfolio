"use client";
import Image from "next/image";
import Illustrate from "../../../public/me.png";
import Button from "@/components/Button/Button";
import Typewriter from "typewriter-effect";
import { MapPin } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex-col w-full p-5 sm:p-8 sm:px-12 md:p-12 lg:p-24 mt-8 sm:mt-0 z-40 rounded-2xl bg-[#1A1A1A]">
      <div className="md:flex md:justify-around md:space-x-8 space-y-8">
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
          <div className="mt-4">
            <button className="flex cursor-auto items-center text-[#12c971] bg-[#335f3536] px-2 lg:px-4 rounded-xl gap-2 lg:gap-3">
              <div className="bg-[#12c971] animate-pulse w-2 h-2 md:w-2.5 md:h-2.5 rounded-full"></div>
              Available for work
            </button>
          </div>
          <div className="flex-col mt-8 md:mt-0 space-y-3 sm:space-y-5">
            <h1 className="text-2xl sm:text-3xl md:text-2xl lg:text-5xl font-bold text-white">
              Hi! I am Shashanka
            </h1>
            <h2 className="text-md sm:text-base lg:text-2xl text-gray-500 font-bold tracking-widest">
              <Typewriter
                options={{
                  strings: [
                    "< Welcome to my website />",
                    "< Full Stack Developer />",
                    "< UI/UX Designer />",
                    "< Trekker />",
                  ],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h2>
          </div>
          <div className="flex items-center gap-2 lg:text-xl text-[#FABC9B] font-semibold">
            <MapPin size={20} />
            <h1>Bhaktapur, Nepal</h1>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <Button url="/portfolio" text="Check Portfolio" />
            <Button url="/contact" text="Contact Me" />
            <Button
              url="/MyResume.pdf"
              text="Download Resume"
              target="_blank"
              rel="noopener noreferrer"
              download="Download File"
            />
          </div>
        </div>
        <div>
          <div className="flex w-full justify-center border-4 sm:border-6 border-gray-500 bg-gray-800 rounded-tr-2xl sm:rounded-tr-3xl rounded-bl-2xl sm:rounded-bl-3xl h-[300px] sm:h-[350px] md:w-[300px] lg:h-[400px] lg:w-[400px] animate-bounce_slow">
            <Image src={Illustrate} alt="home_pfp" className="object-contain" />
          </div>
        </div>
      </div>
    </div>
  );
}
