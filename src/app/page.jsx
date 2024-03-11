"use client"
import Contact from "./contact/page";
import About from "./about/page";
import Sidebar from "@/components/sidebar/Sidebar";
import HomePage from "./homepage/page";
import Portfolio from "./portfolio/page";

export default function Home() {
  return (
    <div className="flex-col justify-between mt-8 space-y-2 sm:space-y-4 md:space-y-6 sm:mt-2 z-40">
      <HomePage />
      <About />
      <Portfolio />
      <Contact />
    </div>
  );
}
