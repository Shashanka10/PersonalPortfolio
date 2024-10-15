"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import copy from "clipboard-copy";
import { Check, Copy } from "lucide-react";
import { SiAdobeillustrator, SiJavascript, SiNotion, SiReact, SiTailwindcss } from "react-icons/si";
import { TbBrandNextjs, TbBrandReactNative } from "react-icons/tb";
import { FaFigma, FaGithub, FaPython } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { SiCplusplus } from "react-icons/si";
import { TbHexagonLetterC } from "react-icons/tb";
import { SiAdobeindesign } from "react-icons/si";
import { FaGitAlt } from "react-icons/fa";
import { SiVisualstudiocode } from "react-icons/si";
import { SiSublimetext } from "react-icons/si";
import { SiCanva } from "react-icons/si";
import { SiAndroidstudio } from "react-icons/si";
import { experience } from "./experience";
import { education } from "./education";

const About = () => {
  const [isCopied, setIsCopied] = useState(false);
  const handleCopyClick = async () => {
    try {
      await copy("sbishalluitel7@gmail.com");
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 3000);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };
  return (
    <div className="flex justify-between mt-8 sm:mt-2 z-40">
      <div className="flex-col w-full p-5 space-y-8 sm:px-12 md:p-16 lg:p-24 mt-8 md:mt-0 z-40 rounded-2xl bg-[#1A1A1A]">
        <div className="flex-col mt-10 md:mt-0 space-y-2 sm:space-y-3 lg:space-y-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
              Shashanka Luitel
            </h1>
          </div>
          <div>
            <h1 className="text-base sm:text-lg md:text-2xl font-bold text-gray-500">
              Developer | Designer | Trekker
            </h1>
          </div>
        </div>
        <div>
          <p className="font-sans font-semibold text-base text-justify sm:text-lg lg:text-xl text-wrap text-gray-500">
            Myself Shashanka Luitel, currently enrolled as a computer
            engineering student at Kathmandu University, which is regarded as
            one of the finest university in Nepal. I am passionate about
            learning and applying new technologies to create user-friendly and
            engaging applications. I have completed multiple projects using a
            variety of programming languages, frameworks, and design tools,
            including Figma, Adobe Illustrator, Next.js, HTML, CSS (Tailwind
            CSS), React.js, and React Native. I am also a part of the Microsoft
            Learn Student Ambassadors program, where I actively learn and share
            my knowledge on web development and collaboration using Git and
            GitHub with other students and mentors. My experience spans UI/UX
            design, mobile development, web development, and effective teamwork.
            While working on college projects, I actively contribute to
            front-end development. I am eager to apply my skills and creativity
            to solve real-world problems and contribute meaningfully to the tech
            community.
          </p>
        </div>
        <div className="flex-col items-center mt-2 space-y-4">
          <div>
            <button
              className={`font-medium sm:font-semibold text-white tracking-wider p-3 lg:p-3 w-full border-2 border-[#282828] rounded-xl cursor-pointer flex justify-center gap-4 ${
                isCopied ? "bg-green-600 opacity-80" : ""
              }`}
              onClick={handleCopyClick}
            >
              {isCopied ? (
                <>
                  <Check className="text-green-200" />
                  Copied{" "}
                </>
              ) : (
                <>
                  <Copy /> Copy email
                </>
              )}
            </button>
          </div>
          <div>
            <Link
              href="/my_professional_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Download File"
            >
              <button
                className="font-medium sm:font-semibold text-white tracking-wider
                  p-3 lg:p-3 w-full border-2 border-[#282828] rounded-xl
                   cursor-pointer flex justify-center"
              >
                Download CV
              </button>
            </Link>
          </div>
        </div>
        <hr className="mt-10 border-gray-600 opacity-50" />
        <div className="flex-col mt-8 space-y-5 sm:space-y-7 lg:space-y-10">
          <div>
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              Programming Languages / Frameworks
            </h1>
          </div>
          <div className="flex-col space-y-2 lg:space-y-3 w-full">
            <div className="space-y-2 md:space-y-0 md:flex md:justify-around md:space-x-4">
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828] rounded-tl-xl rounded-tr-xl">
                <TbBrandReactNative className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-300">
                  React Native
                </h1>
              </div>
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828] md:rounded-tl-xl md:rounded-tr-xl ">
                <TbHexagonLetterC className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-300">
                  C
                </h1>
              </div>
            </div>
            <div className="space-y-2 md:space-y-0 md:flex md:justify-around md:space-x-4">
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828] ">
                <SiCplusplus className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-300">
                  C++
                </h1>
              </div>
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828] ">
                <FaPython className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-300">
                  Python
                </h1>
              </div>
            </div>
            <div className="space-y-2 md:space-y-0 md:flex md:justify-around md:space-x-4">
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828] ">
                <SiReact className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-300">
                  ReactJS
                </h1>
              </div>
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828] ">
                <TbBrandNextjs className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-300">
                  NextJS
                </h1>
              </div>
            </div>
            <div className="space-y-2 md:space-y-0 md:flex md:justify-around md:space-x-4">
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828] ">
                <SiTailwindcss className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-300">
                  Tailwind CSS
                </h1>
              </div>
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828] ">
                <FaHtml5 className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-300">
                  HTML
                </h1>
              </div>
            </div>
            <div className="space-y-2 md:space-y-0 md:flex md:justify-around md:space-x-4">
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828] md:rounded-bl-xl md:rounded-br-xl ">
                <FaCss3Alt className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-300">
                  CSS
                </h1>
              </div>
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828] rounded-bl-xl rounded-br-xl">
                <SiJavascript className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-semibold text-gray-300">
                  Javascript
                </h1>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-10 border-gray-600 opacity-50" />
        <div className="flex-col mt-8 space-y-5 sm:space-y-7 lg:space-y-10">
          <div>
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              Tools Used
            </h1>
          </div>
          <div className="flex-col space-y-2 lg:space-y-3 w-full">
            <div className="space-y-2 md:space-y-0 md:flex md:justify-around md:space-x-4">
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828] rounded-tl-xl rounded-tr-xl">
                <FaFigma className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-bold text-gray-300">
                  Figma
                </h1>
              </div>
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828] md:rounded-tl-xl md:rounded-tr-xl">
                <SiAdobeindesign className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-bold text-gray-300">
                  Adobe Indesign
                </h1>
              </div>
            </div>
            <div className="space-y-2 md:space-y-0 md:flex md:justify-around md:space-x-4">
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828]">
                <FaGitAlt className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-bold text-gray-300">
                  Git and Github
                </h1>
              </div>
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828]">
                <SiVisualstudiocode className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-bold text-gray-300">
                  Visual Studio Code
                </h1>
              </div>
            </div>
            <div className="space-y-2 md:space-y-0 md:flex md:justify-around md:space-x-4">
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828]">
                <SiSublimetext className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-bold text-gray-300">
                  Sublime Text
                </h1>
              </div>
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828]">
                <SiCanva className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-bold text-gray-300">
                  Canva
                </h1>
              </div>
            </div>
            <div className="space-y-2 md:space-y-0 md:flex md:justify-around md:space-x-4">
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828]">
                <SiAndroidstudio className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-bold text-gray-300">
                  Android Studio
                </h1>
              </div>
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828]">
                <FaGithub className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-bold text-gray-300">
                  Github
                </h1>
              </div>
            </div>
            <div className="space-y-2 md:space-y-0 md:flex md:justify-around md:space-x-4">
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828] md:rounded-bl-xl md:rounded-br-xl">
                <SiAdobeillustrator className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-bold text-gray-300">
                  Adobe Illustrator
                </h1>
              </div>
              <div className="flex w-full md:justify-center space-x-4 p-4 items-center bg-[#282828] rounded-bl-xl rounded-br-xl">
                <SiNotion className="text-gray-500 w-7 h-7" />
                <h1 className="text-xl lg:text-2xl font-bold text-gray-300">
                  Notion
                </h1>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-10 border-gray-600 opacity-50" />
        <div className="flex-col mt-8 space-y-5 sm:space-y-7 lg:space-y-10">
          <div>
            <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
              Experience
            </h1>
          </div>
          {experience.map((exp)=>(
            <div 
              key={exp.id}
              className="flex-col space-y-6"
            >
            <div>
              <h1 className="text-lg font-semibold text-gray-500">
                {exp.active_date}
              </h1>
            </div>
            <div className="flex-col space-y-1">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white">
                {exp.header}
              </h1>
              <h2 className="text-gray-500 text-sm font-semibold">
              {exp.h1}
              </h2>
            </div>
            <div className="flex-col space-y-2">
              <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
              {exp.p1}
              </p>
              <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
              {exp.p2}
              </p>
            </div>
            <hr className="mt-10 border-gray-600 opacity-50" />
          </div>
          ))}
          </div>
          <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
                You can check all my projects on my github repositories or go through Portfolio section of the Website:
          </p>
        <div className="flex justify-center items-center">
          <Link
            href="https://github.com/Shashanka10"
            rel="jobhunt"
            target="_blank"
          >
            <Image
              src="/gitt.png"
              width={20}
              height={20}
              alt="Github logo"
              className="w-8 h-8 transition-all delay-100 hover:scale-105 duration-500 md:w-8 md:h-8 lg:w-10 lg:h-10"
            />
          </Link>
        </div>
        <hr className="mt-10 border-gray-600 opacity-50" />
        <div>
          <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">
            Education
          </h1>
        </div>
        {education.map((edu)=>(
        <div 
          key={edu.id}
          className="flex-col space-y-6"
        >
          <div>
            <h1 className="text-lg font-semibold text-gray-500">
              {edu.active_date}
            </h1>
          </div>
          <div className="flex-col space-y-1">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white">
            {edu.degree}
            </h1>
            <h2 className="text-gray-500 text-sm font-semibold">
            {edu.uni}
            </h2>
            <h2 className="text-gray-500 text-sm font-semibold">{edu.gpa}</h2>
          </div>
          <div className="flex-col space-y-2">
            <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
            {edu.p1}
            </p>
          </div>
          <hr className="mt-10 border-gray-600 opacity-50" />
        </div>
        ))}
      </div>
    </div>
  );
};

export default About;
