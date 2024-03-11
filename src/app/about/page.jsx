"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import copy from "clipboard-copy";
import { Check, Copy } from "lucide-react";
import { SiAdobeillustrator, SiJavascript } from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { FaFigma, FaPython } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { BiLogoFlutter } from "react-icons/bi";
import { SiCplusplus } from "react-icons/si";
import { TbHexagonLetterC } from "react-icons/tb";
import { SiAdobeindesign } from "react-icons/si";
import { FaGitAlt } from "react-icons/fa";
import { SiVisualstudiocode } from "react-icons/si";
import { SiSublimetext } from "react-icons/si";
import { SiCanva } from "react-icons/si";
import { SiAndroidstudio } from "react-icons/si";
import { SiAdobepremierepro } from "react-icons/si";



export const metadata = {
  title: "About Me",
  description: "about page",
};

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
      <div className="flex-col w-full p-5 space-y-8 md:p-16 lg:p-32 mt-8 md:mt-0 z-40 rounded-2xl bg-[#1A1A1A]">
        <div className="flex-col mt-10 md:mt-0 space-y-3">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
              Shashanka Luitel
            </h1>
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl md:text-4xl font-bold text-gray-500">
              Developer | Designer | Trekker
            </h1>
          </div>
        </div>
        <div>
          <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
            Myself Shashanka Luitel, currently enrolled as a computer
            engineering student at Kathmandu University, which is regarded as
            one of the finest university in Nepal. I am passionate about
            technology and its potential to transform the world. I am more
            interested in designing rather than coding. While working on a
            college project, I actively contribute to the front-end development.
            I have a passion for sports. Not only do I enjoy watching games like
            football and cricket, but I also actively participate in physical
            activities that contribute to my overall fitness and well-being.
            Lastly, I want to say that traveling and trekking hold a special
            place in my heart, surpassing any other interests with boundless
            enthusiasm.
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
          <a
            href="/personalCV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Download File"
          >
            {" "}
            <button
              className="font-medium sm:font-semibold text-white tracking-wider
                  p-3 lg:p-3 w-full border-2 border-[#282828] rounded-xl
                   cursor-pointer flex justify-center"
            >
              Download CV
            </button>
          </a>
          </div>
        </div>
        <hr className="mt-10 border-gray-600 opacity-50" />
        <div className="flex-col mt-8 space-y-5">
          <div>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-white">
              Programming Languages
            </h1>
          </div>
          <div className="flex-col space-y-2">
          <div className="flex space-x-4 p-4 items-center bg-[#282828] rounded-tl-xl rounded-tr-xl">
            <TbBrandReactNative className="text-gray-500 w-7 h-7"/>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-semibold text-gray-300">React Native</h1>
          </div>
          <div className="flex space-x-4 p-4 items-center bg-[#282828] ">
            <TbHexagonLetterC className="text-gray-500 w-7 h-7"/>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-semibold text-gray-300">C</h1>
          </div>
          <div className="flex space-x-4 p-4 items-center bg-[#282828] ">
            <SiCplusplus className="text-gray-500 w-7 h-7"/>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-semibold text-gray-300">C++</h1>
          </div>
          <div className="flex space-x-4 p-4 items-center bg-[#282828] ">
            <FaPython className="text-gray-500 w-7 h-7"/>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-semibold text-gray-300">Python</h1>
          </div>
          <div className="flex space-x-4 p-4 items-center bg-[#282828] ">
            <BiLogoFlutter className="text-gray-500 w-7 h-7"/>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-semibold text-gray-300">Flutter</h1>
          </div>
          <div className="flex space-x-4 p-4 items-center bg-[#282828] ">
            <FaHtml5 className="text-gray-500 w-7 h-7"/>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-semibold text-gray-300">HTML</h1>
          </div>   
          <div className="flex space-x-4 p-4 items-center bg-[#282828] ">
            <FaCss3Alt className="text-gray-500 w-7 h-7"/>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-semibold text-gray-300">CSS</h1>
          </div>
          <div className="flex space-x-4 p-4 items-center bg-[#282828] rounded-bl-xl rounded-br-xl">
            <SiJavascript className="text-gray-500 w-7 h-7"/>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-semibold text-gray-300">Javascript</h1>
          </div>
          </div>
        </div>
        <hr className="mt-10 border-gray-600 opacity-50" />
        <div className="flex-col mt-8 space-y-5">
          <div>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-white">
              Tools Used
            </h1>
          </div>
          <div className="flex-col space-y-2">
          <div className="flex space-x-4 p-4 items-center bg-[#282828] rounded-tl-xl rounded-tr-xl">
            <FaFigma className="text-gray-500 w-7 h-7"/>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-gray-300">Figma</h1>
          </div>
          <div className="flex space-x-4 p-4 items-center bg-[#282828]">
            <SiAdobeindesign className="text-gray-500 w-7 h-7"/>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-gray-300">Adobe Indesign</h1>
          </div>
          <div className="flex space-x-4 p-4 items-center bg-[#282828]">
            <FaGitAlt className="text-gray-500 w-7 h-7"/>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-gray-300">Git</h1>
          </div>
          <div className="flex space-x-4 p-4 items-center bg-[#282828]">
            <SiVisualstudiocode className="text-gray-500 w-7 h-7"/>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-gray-300">Visual Studio Code</h1>
          </div>
          <div className="flex space-x-4 p-4 items-center bg-[#282828]">
            <SiSublimetext className="text-gray-500 w-7 h-7"/>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-gray-300">Sublime Text</h1>
          </div>
          <div className="flex space-x-4 p-4 items-center bg-[#282828]">
            <SiCanva className="text-gray-500 w-7 h-7"/>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-gray-300">Canva</h1>
          </div>
          <div className="flex space-x-4 p-4 items-center bg-[#282828]">
            <SiAndroidstudio className="text-gray-500 w-7 h-7"/>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-gray-300">Android Studio</h1>
          </div>
          <div className="flex space-x-4 p-4 items-center bg-[#282828]">
            <SiAdobepremierepro className="text-gray-500 w-7 h-7"/>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-gray-300">Adobe Premier Pro</h1>
          </div>
          <div className="flex space-x-4 p-4 items-center bg-[#282828] rounded-bl-xl rounded-br-xl">
            <SiAdobeillustrator className="text-gray-500 w-7 h-7"/>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-gray-300">Adobe Illustrator</h1>
          </div>
          </div>
        </div>
        <hr className="mt-10 border-gray-600 opacity-50" />
        <div className="flex-col mt-8 space-y-5">
        <div>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-white">
              Experience
            </h1>
          </div>
          <div className="flex-col space-y-6">
            <div>
              <h1 className="text-lg font-semibold text-gray-500">Nov 2023 - Present</h1>
            </div>
            <div className="flex-col space-y-1">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white">Microsoft</h1>
              <h2 className="text-gray-500 text-sm font-semibold">Beta Microsoft Student Ambassador</h2>
            </div>
            <div className="flex-col space-y-2">
              <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
              Microsoft Learn Student Ambassadors are passionate students who advocate for 
              technology, learning, and innovation within their communities. 
              We receive training and resources from Microsoft to enhance 
              our technical skills and leadership abilities. 
              We also organize events, workshops, and hackathons to empower 
              our peers and promote the use of Microsoft technologies. 
              </p>
              <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
              As a Microsoft Learn Student Ambassador, I've had the privilege of conducting 
              workshops in multiple schools, empowering students to cultivate early 
              coding habits and secure their future by mastering coding skills. 
              These sessions aim to inspire students to embrace the world of technology and 
              equip them with the tools they need to thrive in the digital age. 
              </p>
            </div>
          </div>
          <hr className="mt-10 border-gray-600 opacity-50" />
          <div className="flex-col space-y-6">
            <div>
              <h1 className="text-lg font-semibold text-gray-500">2021 - Present</h1>
            </div>
            <div className="flex-col space-y-1">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white">Kathmandu Univeristy Computer Club</h1>
              <h2 className="text-gray-500 text-sm font-semibold">Active General and Design Community Committee Member</h2>
            </div>
            <div className="flex-col space-y-2">
              <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
              Kathmandu Univeristy Computer Club (kUCC) is a non-profit, independent club 
              formed by students of the Department of Computer Science and Engineering 
              in the year 1997.Every year KUCC cooperates and organizes numerous competitive as 
              well as non-competitive events like seminars, exhibitions, hackathon, skill development 
              program and tutorial sessions
              </p>
              <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
              As an active general and design community member of KUCC, I have participated on various events organized by KUCC, as well
              as helped to volunteer on different programs and workshops organized by Design Community.
              </p>
            </div>
          </div>
          <hr className="mt-10 border-gray-600 opacity-50" />
          <div className="flex-col space-y-6">
            <div>
              <h1 className="text-lg font-semibold text-gray-500">29th Sep - 1st Oct 2023</h1>
            </div>
            <div className="flex-col space-y-1">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white">KU Hackfest 2023</h1>
              <h2 className="text-gray-500 text-sm font-semibold">Graphic Designer</h2>
            </div>
            <div className="flex-col space-y-2">
              <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
              KU Hackfest 2023 is a 48 hour long international level 
              hackathon organized by the Kathmandu University Club to nurture boundless creativity, foster relentless innovation, and empower 
              talented minds to tackle real-world challenges.
              </p>
              <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
              As a Graphic Designer in KU Hackfest 2023, I was able to contribute on designing differnt templates,
              social media posts, prospectus, posters, certificates etc.
              </p>
            </div>
          </div>
          <hr className="mt-10 border-gray-600 opacity-50" />
          <div className="flex-col space-y-6">
            <div>
              <h1 className="text-lg font-semibold text-gray-500">20th Nov - 29th Nov 2022</h1>
            </div>
            <div className="flex-col space-y-1">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white">IT Express 2022</h1>
              <h2 className="text-gray-500 text-sm font-semibold">Graphic Designer</h2>
            </div>
            <div className="flex-col space-y-2">
              <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
                IT Express is a annual magazine published by Kathmandu University Computer Club just
                the few days before the grandest IT event in Nepal , i.e. "IT MEET".  It is a platform for students to share
                knowledge and experiences, showcase their talents and skills. IT Express
                began with the aim to give exposure to student’s projects and to help
                them express themselves to a wider audience, which consequently
                would also develop their writing skills
              </p>
              <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
              As a Graphic Designer at IT Express in 2022, I played a crucial role in the successful publication
               of the IT Express Journal by applying the necessary design elements to enhance the magazine's
                visual appeal. Collaborating with a dedicated team, we worked tirelessly for weeks to
                 complete the project. Despite the challenges inherent in design work, the final product
                  was truly remarkable. The effort invested was substantial, but the outcome justified
                   every moment spent refining and perfecting the magazine's layout and aesthetics.
              </p>
            </div>
          </div>
          <hr className="mt-10 border-gray-600 opacity-50" />
          <div className="flex-col space-y-6">
            <div>
              <h1 className="text-lg font-semibold text-gray-500">2020 - present</h1>
            </div>
            <div className="flex-col space-y-1">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white">Each Semester Project</h1>
              <h2 className="text-gray-500 text-sm font-semibold">Developer | Designer | Collaborator</h2>
            </div>
            <div className="flex-col space-y-2">
              <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
              At our university, the emphasis on project-based learning is paramount, with each semester 
              presenting an opportunity for students to immerse themselves in hands-on, real-world 
              experiences. These projects serve as a cornerstone of our academic curriculum, 
              fostering innovation, collaboration, and problem-solving skills among students. 
              </p>
              <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
              Throughout each semester, I have actively engaged in a variety of projects, 
              leveraging different programming languages to tackle diverse challenges. 
              These projects have provided invaluable opportunities for me to expand my 
              skill set, adapt to new technologies, and deepen my understanding of programming 
              principles. 
              </p>
            <ul className="flex-col list-disc ml-4 mt-2 font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
            <li>Job Hunt (Qt) ---2nd Sem</li>
            <li>Battleship (ReactJS) ---3rd Sem</li>
            <li>Trek Diaries (NextJS) ---4th and 5th Sem</li>
            </ul>
            <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
            You can check all my projects on my github repositories:
            </p>
            </div>
          </div>
        </div>
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
              className="w-8 h-8 transition ease-in-out delay-100 hover:translate-y-1 hover:scale-110 duration-300 md:w-8 md:h-8 lg:w-10 lg:h-10"
            />
          </Link>
        </div>
        <hr className="mt-10 border-gray-600 opacity-50" />
        <div>
            <h1 className="text-xl sm:text-4xl md:text-5xl font-bold text-white">
              Education
            </h1>
          </div>
          <div className="flex-col space-y-6">
            <div>
              <h1 className="text-lg font-semibold text-gray-500">Expected June 2025</h1>
            </div>
            <div className="flex-col space-y-1">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white">Bachelor's Degree in Computer Engineering</h1>
              <h2 className="text-gray-500 text-sm font-semibold">Kathmandu University</h2>
              <h2 className="text-gray-500 text-sm font-semibold">CGPA : NULL</h2>
            </div>
            <div className="flex-col space-y-2">
              <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
              Kathmandu University (KU) is an autonomous, not-for-profit, self-funding public 
              institution established by an Act of Parliament in December 1991. 
              It is an institution of higher learning dedicated to maintaining the standard 
              of academic excellence in various classical and professional disciplines.
              </p>
            </div>
          </div>
          <hr className="mt-10 border-gray-600 opacity-50" />
          <div className="flex-col space-y-6">
            <div>
              <h1 className="text-lg font-semibold text-gray-500">2020</h1>
            </div>
            <div className="flex-col space-y-1">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white">+2 with Physics and Computer Major</h1>
              <h2 className="text-gray-500 text-sm font-semibold">DAV College, Jawalakhel</h2>
              <h2 className="text-gray-500 text-sm font-semibold">CGPA : 3.76</h2>
            </div>
            <div className="flex-col space-y-2">
              <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
                D.A.V. College, affiliated to Tribhuvan University, is one of the leading education
               hubs in Nepal since 2003. It runs different programs for management students of 
               Bachelor's and Master's levels. The college places strong emphasis on holistic 
               education-D.A.V. is committed to development of "mind, body, purpose, spirit, and meaning.
              </p>
            </div>
          </div>
          <hr className="mt-10 border-gray-600 opacity-50" />
          <div className="flex-col space-y-6">
            <div>
              <h1 className="text-lg font-semibold text-gray-500">2018</h1>
            </div>
            <div className="flex-col space-y-1">
              <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white">Secondary Education Examination</h1>
              <h2 className="text-gray-500 text-sm font-semibold">CVM Secondary School, BKT</h2>
              <h2 className="text-gray-500 text-sm font-semibold">CGPA : 3.8</h2>
            </div>
            <div className="flex-col space-y-2">
              <p className="font-sans font-semibold text-lg text-justify sm:text-md text-wrap text-gray-500">
              CVM Secondary School is a private school in Bhaktapur District, Nepal. 
              CVM stands for "Charkhandi Vidhya Mandir". The school was founded in 1997, 
              (2054 VS) in Sirutar.
              </p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default About;
