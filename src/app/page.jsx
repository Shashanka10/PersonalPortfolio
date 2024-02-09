"use client";
import Image from "next/image";
import Illustrate from "../../public/me.png";
import Button from "@/components/Button/Button";
import Typewriter from "typewriter-effect";

export default function Home() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex-col space-y-14 ml-10">
        <div className="space-y-8">
        <h1 className="text-cyan-300 text-6xl font-medium">Hi! I am Shashanka</h1>
        <h2 className="text-2xl text-slate-200 font-medium tracking-widest">
          <Typewriter
            options={{
              strings: [
                "< Welcome to my Website />",
                "< Web Developer />",
                "< UI/UX Designer />",
                "< Trekker />",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </h2>
        </div>
        <div className="flex space-x-6">
        <Button url="/portfolio" text="See my Work" />
        <Button url="/contact" text="Contact Me" />
        </div>
      </div>
      <div className="flex mr-10 border-8 border-white bg-cyan-300 rounded-tr-3xl rounded-bl-3xl h-[500px] animate-bounce_slow">
        <Image 
          src={Illustrate} 
          alt="home_pfp" 
          className="object-contain" 
          priority={false} />
      </div>
    </div>
  );
}
