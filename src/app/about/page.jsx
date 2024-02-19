import React from "react";
import Image from "next/image";
import Me from "../../../public/pp.jpg";
import Button from "@/components/Button/Button";
import Link from "next/link";

export const metadata = {
  title: "About Me",
  description: "about page",
};

const About = () => {
  return (
    <div className="fleex-col space-y-6 md:flex justify-evenly p-4 sm:p-8 md:space-x-8">
      <div className="flex justify-center items-center border border-teal-500 rounded-2xl md:h-[500px] md:mt-12">
        <Image
          src={Me}
          alt="my_pic"
          className="object-cover rounded-2xl w-[300px] h-[300px] sm:w-[450px] sm:h-[350px] md:w-[600px] md:h-[495px] lg:w-[800px]"
          width={200}
          height={200}
        />
      </div>
      <div className="flex-col space-y-2 sm:space-y-4 w-full">
        <div className="flex justify-center items-center space-x-2 sm:space-x-3 md:space-x-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">ABOUT</h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-500">ME</h1>
        </div>
        <div className="flex-col space-y-4">
          <p className="font-sans text-base text-justify sm:text-md text-wrap">
            Myself Shashanka Luitel, currently enrolled as a computer
            engineering student at Kathmandu University, which is regarded as
            one of the finest university in Nepal. I am passionate about
            technology and its potential to transform the world. I am more
            interested in designing rather than coding. While working on a
            college project, I actively contribute to the front-end development,
            ensuring its correctness and making improvements where necessary.
            Summing up my essence in a single word, I'd choose "wonderer." This
            term perfectly reflects my innate curiosity, the constant drive to
            understand, and my sincere appreciation for the wonders that
            surround me. I have a passion for sports. Not only do I enjoy
            watching games like football and cricket, but I also actively
            participate in physical activities that contribute to my overall
            fitness and well-being. Lastly, I want to say that traveling and
            trekking hold a special place in my heart, surpassing any other
            interests with boundless enthusiasm.
          </p>
          <p className="font-sans text-base text-justify sm:text-md text-wrap">
            I have also worked on different Semester projects using different
            programming languages.
            <ul className="flex-col list-disc ml-4 mt-2">
            <li>Job Hunt (Qt) ---2nd SEM</li>
            <li>Battleship (ReactJS) ---3rd SEM</li>
            <li>Trek Diaries (NextJS) ---4th and 5th SEM</li>
            </ul>
          </p>
          <div className="flex">
            <p>You can check all my projects on my github repositories:</p>
          </div>
        </div>
        <div className="flex space-x-5 items-center mt-2">
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
          <Button url="/contact" text="Contact Me" />
        </div>
      </div>
    </div>
  );
};

export default About;
