"use client";
import React, { useState } from "react";
import Link from "next/link";
import copy from "clipboard-copy";
import {
  Check,
  Copy,
  DownloadIcon,
  ChevronRight,
  Briefcase,
  GraduationCap,
  Star,
} from "lucide-react";
import {
  SiAdobeillustrator,
  SiDatagrip,
  SiFigma,
  SiJavascript,
  SiNotion,
  SiPostman,
  SiReact,
  SiSwagger,
  SiTailwindcss,
} from "react-icons/si";
import { TbBrandNextjs, TbBrandReactNative } from "react-icons/tb";
import {
  FaGithub,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiAdobeindesign,
  SiVisualstudiocode,
  SiAndroidstudio,
  SiCplusplus,
  SiCsharp,
} from "react-icons/si";
import { FaUnity } from "react-icons/fa6";
import { extracurricular } from "./extracurricular";
import { education } from "./education";
import { experience } from "./experience";
import toast from "react-hot-toast";
import Particles from "@/components/Particles/Particles";
import Reveal from "@/components/Reveal/Reveal";

function SectionHeading({ children }) {
  return (
    <div className="flex items-center gap-4 mb-6 md:mb-8">
      <div className="w-1 h-8 rounded-full bg-[#12c971]" />
      <h2 className="text-base sm:text-xl md:text-3xl font-bold text-gray-100 tracking-tight">
        {children}
      </h2>
    </div>
  );
}

function SkillBadge({ icon, label }) {
  return (
    <div className="group flex items-center gap-3 p-3 bg-[#222222] border border-[#2e2e2e] rounded-xl hover:border-[#12c971]/40 hover:bg-[#1e2e22] transition-all duration-300 cursor-default">
      <span className="text-gray-400 group-hover:text-[#12c971] transition-colors duration-300 text-xl">
        {icon}
      </span>
      <span className="text-gray-100 font-medium text-sm sm:text-base group-hover:text-gray-100 transition-colors duration-300">
        {label}
      </span>
    </div>
  );
}

function TabPill({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-300
        ${active ? "bg-[#12c971] text-[#0d0d0d] border-[#12c971]" : "text-gray-400 border-[#2e2e2e] hover:border-[#12c971]/40 hover:text-gray-100"}`}
    >
      {icon}
      {label}
    </button>
  );
}

function TimelineEntry({ date, title, subtitle, children }) {
  return (
    <div className="relative pl-6 border-l border-[#5f5f5f] hover:border-[#12c971]/50 transition-colors duration-500">
      <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#12c971] shadow-[0_0_8px_#12c97180]" />
      <p className="text-[#12c971] text-xs font-mono tracking-widest mb-1 uppercase">
        {date}
      </p>
      <h3 className="text-gray-100 text-base sm:text-lg md:text-xl font-bold">{title}</h3>
      {subtitle && <p className="text-gray-500 text-sm mb-3">{subtitle}</p>}
      <div className="mt-2">{children}</div>
    </div>
  );
}

const About = () => {
  const [isCopied, setIsCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("experience");

  const handleCopyClick = async () => {
    try {
      await copy("shashankaluitel10@gmail.com");
      setIsCopied(true);
      toast.success("Email copied to clipboard!");
      setTimeout(() => setIsCopied(false), 3000);
    } catch (error) {
      console.error("Failed to copy text to clipboard", error);
    }
  };

  const skills = [
    { icon: <FaHtml5 />, label: "HTML" },
    { icon: <FaCss3Alt />, label: "CSS" },
    { icon: <SiJavascript />, label: "JavaScript" },
    { icon: <SiReact />, label: "ReactJS" },
    { icon: <TbBrandNextjs />, label: "Next.js" },
    { icon: <TbBrandReactNative />, label: "React Native" },
    { icon: <SiTailwindcss />, label: "Tailwind CSS" },
    { icon: <FaPython />, label: "Python" },
    { icon: <SiCplusplus />, label: "C / C++" },
    { icon: <SiCsharp />, label: "C#" },
  ];

  const tools = [
    { icon: <FaGitAlt />, label: "Git & GitHub" },
    { icon: <SiVisualstudiocode />, label: "VS Code" },
    { icon: <SiDatagrip />, label: "DataGrip" },
    { icon: <SiPostman />, label: "Postman" },
    { icon: <SiFigma />, label: "Figma" },
    { icon: <FaUnity />, label: "Unity" },
    { icon: <SiAndroidstudio />, label: "Android Studio" },
    { icon: <FaGithub />, label: "GitHub" },
    { icon: <SiSwagger />, label: "Swagger" },
    { icon: <SiNotion />, label: "Notion" },
    { icon: <SiAdobeillustrator />, label: "Adobe Illustrator" },
    { icon: <SiAdobeindesign />, label: "Adobe InDesign" },
  ];

  return (
    <div className="flex justify-between mt-8 sm:mt-2 z-40">
      <div className="relative flex-col w-full p-5 sm:px-12 md:p-16 lg:p-24 mt-8 md:mt-0 z-40 rounded-2xl bg-[#1A1A1A] overflow-hidden">
        {/* ── PARTICLES ── */}
        <Particles count={30} />

        <div className="relative z-10">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-start md:justify-between gap-8 pt-6 md:pt-0">
              <div className="space-y-4 flex-1">
                <div className="flex flex-col space-y-3">
                  <p className="text-[#12c971] font-mono text-sm tracking-[0.2em] uppercase mb-2">
                    — About me
                  </p>
                  <p className="mt-2 flex flex-wrap gap-2 md:gap-4 text-xs sm:text-sm font-medium tracking-wide">
                    <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/30">
                      Full-Stack Developer
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30">
                      Research Enthusiast
                    </span>
                    <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                      Trekking
                    </span>
                    <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/30">
                      Football
                    </span>
                  </p>
                </div>
                <p className="text-gray-400 text-xs sm:text-base leading-relaxed text-justify md:max-w-4xl">
                  I am a{" "}
                  <span className="text-gray-300 font-semibold">
                    Computer Engineering
                  </span>{" "}
                  graduate from Kathmandu University, with professional
                  experience as a{" "}
                  <span className="text-gray-300 font-semibold">
                    Software Engineer
                  </span>{" "}
                  at Citytech Group Pvt. Ltd., a fintech company based in
                  Kathmandu, Nepal. Over the course of 7 months, I contributed
                  to the development of remittance products, gaining hands-on
                  experience in building scalable solutions. I am skilled in
                  full-stack development using React.js and Node.js, and I have
                  a growing{" "}
                  <span className="text-gray-300 font-semibold">
                    interest in research.
                  </span>
                </p>
                <p className="text-gray-400 text-xs sm:text-base leading-relaxed text-justify md:max-w-4xl">
                  Beside work, I enjoy playing football and other sports, love
                  watching movies, series & anime, enjoy exploring new places.
                  Trekking is one of my favorite hobbies.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                  {[
                    { value: "7+", label: "months at Citytech" },
                    { value: "KU", label: "Computer Engineering" },
                  ].map((s) => (
                    <div
                      key={s.label}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#222] border border-[#2e2e2e]"
                    >
                      <span className="text-[#12c971] font-bold text-sm">
                        {s.value}
                      </span>
                      <span className="text-gray-400 text-xs">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap flex-row min-w-full lg:flex-col gap-4 lg:min-w-[220px]">
                <button
                  className={`flex-1 md:flex-none flex items-center justify-center gap-3 px-2 py-2.5 md:px-5 md:py-3 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm border-2 transition-all duration-300
                    ${isCopied ? "bg-[#12c971] text-[#0d0d0d] border-[#12c971]" : "text-gray-100 border-[#2e2e2e] hover:border-[#12c971] hover:bg-[#12c971]/10"}`}
                  onClick={handleCopyClick}
                >
                  {isCopied ? (
                    <>
                      <Check size={16} /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={16} /> Copy email
                    </>
                  )}
                </button>
                <Link
                  href="/shashanka_resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex-1 md:flex-none"
                >
                  <button className="w-full flex items-center justify-center gap-3 px-2 py-2.5 md:px-5 md:py-3 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm text-gray-100 bg-[#222] border border-[#2e2e2e] hover:bg-[#2a2a2a] hover:border-[#12c971]/40 transition-all duration-300">
                    <DownloadIcon size={16} /> Download CV
                  </button>
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#2e2e2e] to-transparent" />
          <Reveal delay={80}>
            <SectionHeading>Journey</SectionHeading>
            <div className="flex flex-wrap gap-3 mb-10">
              <TabPill
                active={activeTab === "experience"}
                onClick={() => setActiveTab("experience")}
                icon={<Briefcase size={14} />}
                label="Experience"
              />
              <TabPill
                active={activeTab === "education"}
                onClick={() => setActiveTab("education")}
                icon={<GraduationCap size={14} />}
                label="Education"
              />
              <TabPill
                active={activeTab === "extracurricular"}
                onClick={() => setActiveTab("extracurricular")}
                icon={<Star size={14} />}
                label="Extracurricular"
              />
            </div>

            {activeTab === "experience" && (
              <div className="space-y-10">
                {experience.map((exp) => (
                  <Reveal key={exp.id}>
                    <TimelineEntry
                      date={exp.active_date}
                      title={exp.header}
                      subtitle={exp.h1}
                    >
                      <div className="space-y-6 mt-4">
                        {exp.roles.map((role, i) => (
                          <div
                            key={i}
                            className="pl-4 border-l border-[#505050] space-y-2"
                          >
                            <div className="flex flex-col gap-3">
                              <span className="text-[#12c971] font-semibold text-sm sm:text-base md:text-lg">
                                {role.title}
                              </span>
                              <span className="text-gray-500 text-xs md:text-sm font-mono">
                                {role.date}
                              </span>
                            </div>
                            {role.description.map((desc, j) => (
                              <p
                                key={j}
                                className="text-gray-400 text-xs sm:text-sm md:text-base leading-relaxed"
                              >
                                {desc}
                              </p>
                            ))}
                          </div>
                        ))}
                      </div>
                    </TimelineEntry>
                  </Reveal>
                ))}
              </div>
            )}

            {activeTab === "education" && (
              <div className="space-y-10">
                {education.map((edu) => (
                  <Reveal key={edu.id}>
                    <TimelineEntry
                      date={edu.active_date}
                      title={edu.degree}
                      subtitle={edu.uni}
                    >
                      {edu.gpa && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12c971]/10 text-[#12c971] text-sm md:text-base font-mono mb-3">
                          · {edu.gpa}
                        </span>
                      )}
                      <p className="text-gray-400 text-justify text-xs sm:text-sm md:text-base leading-relaxed">
                        {edu.p1}
                      </p>
                    </TimelineEntry>
                  </Reveal>
                ))}
              </div>
            )}

            {activeTab === "extracurricular" && (
              <div className="space-y-10">
                {extracurricular.map((ext) => (
                  <Reveal key={ext.id}>
                    <TimelineEntry
                      date={ext.active_date}
                      title={ext.header}
                      subtitle={ext.h1}
                    >
                      <div className="space-y-2">
                        {ext.p1 && (
                          <p className="text-gray-400 text-justify text-xs sm:text-sm md:text-base leading-relaxed">
                            {ext.p1}
                          </p>
                        )}
                        {ext.p2 && (
                          <p className="text-gray-400 text-justify text-xs sm:text-sm md:text-base leading-relaxed">
                            {ext.p2}
                          </p>
                        )}
                      </div>
                    </TimelineEntry>
                  </Reveal>
                ))}
              </div>
            )}
          </Reveal>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#2e2e2e] to-transparent" />

          <Reveal delay={80}>
            <SectionHeading>Languages &amp; Frameworks</SectionHeading>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {skills.map((s) => (
                <SkillBadge key={s.label} icon={s.icon} label={s.label} />
              ))}
            </div>
          </Reveal>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#2e2e2e] to-transparent" />

          <Reveal delay={80}>
            <SectionHeading>Tools</SectionHeading>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {tools.map((t) => (
                <SkillBadge key={t.label} icon={t.icon} label={t.label} />
              ))}
            </div>
          </Reveal>

          <div className="my-12 h-px bg-gradient-to-r from-transparent via-[#2e2e2e] to-transparent" />

          <Reveal delay={80}>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-[#1e2e22] border border-[#12c971]/20">
              <div>
                <p className="text-gray-100 font-semibold text-lg">
                  See all my projects
                </p>
                <p className="text-gray-400 text-sm mt-1">
                  Check my GitHub repositories or explore the Portfolio section.
                </p>
              </div>
              <Link
                href="https://github.com/Shashanka10"
                rel="noopener noreferrer"
                target="_blank"
                className="flex items-center gap-3 px-6 py-3 rounded-xl bg-[#12c971] text-[#0d0d0d] font-bold text-sm hover:bg-[#0fb862] transition-all duration-300 whitespace-nowrap hover:scale-105 active:scale-95"
              >
                <FaGithub size={18} /> View GitHub <ChevronRight size={16} />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default About;
