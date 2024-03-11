"use client";
import Image from "next/image";
import Illustrate from "../../../public/me.png";
import Button from "@/components/Button/Button";
import Typewriter from "typewriter-effect";
import { Dot, MapPin } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex-col sm:flex w-full space-y-7 p-5 md:p-16 lg:p-32 mt-8 sm:mt-0 z-40 rounded-2xl bg-[#1A1A1A]">
        <div className="mt-4">
          <button className="flex items-center text-[#12c971] bg-[#335f3536] px-2 rounded-xl">
            <Dot size={30} className="text-[#12c971]" />
            Available for work
          </button>
        </div>
        <div className="flex-col mt-8 md:mt-0 space-y-3 sm:space-y-5">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Hi! I am Shashanka
          </h1>
          <h2 className="text-md sm:text-lg md:text-2xl text-gray-500 font-bold tracking-widest">
            <Typewriter
              options={{
                strings: [
                  "< Welcome to my Website />",
                  "< Web Developer />",
                  "< UI/UX Designer />",
                  "< React Native Developer />",
                  "< Trekker />",
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h2>
        </div>
        <div className="flex items-center gap-2 text-[#FABC9B] font-semibold">
          <MapPin size={18} />
          <h1 className="">Bhaktapur, Nepal</h1>
        </div>
        <div className="flex space-x-4 md:space-x-6">
          <Button url="/portfolio" text="See my Work" />
          <Button url="/contact" text="Contact Me" />
        </div>
        <div className="flex border-4 sm:border-8 border-gray-500 bg-gray-800 rounded-tr-2xl sm:rounded-tr-3xl rounded-bl-2xl sm:rounded-bl-3xl h-[300px] sm:h-[350px] md:h-[450px] animate-bounce_slow">
          <Image src={Illustrate} alt="home_pfp" className="object-contain" />
        </div>
    </div>
  );
}
