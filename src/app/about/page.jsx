import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Me from "../../../public/pp.jpg"
import Button from "@/components/Button/Button";

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src={Me} alt="my_pic" className={styles.img} fill={true} />
        <div className={styles.imgText}>
          <h1>Enthusiast Web Devloper</h1>
        </div>
        <div className={styles.imgText1}>
          <h1>Graphic Designer</h1>
        </div>
        <div className={styles.imgText2}>
          <h1>Shashanka Luitel</h1>
        </div>
      </div>
      <div className={styles.textContainer}>
        <div className={styles.item}>
          <h1>Who am I?</h1>
          <p>
          I am Shashanka Luitel, a student of computer engineering at KU. 
          I am passionate about technology and its potential to transform the world. 
          I strive to constantly learn and grow in this field, exploring new avenues and contributing to innovative solutions. 
          As an aspiring computer engineer, I aim to make a positive impact by developing cutting-edge technologies that 
          improve people's lives and drive progress in society.
            <br />
          </p>
        </div>
        <div className={styles.item}>
          <h1>What do i do?</h1>
          <p>
          As a computer engineering student, my main responsibilities include attending lectures, 
          studying various subjects like computer hardware and software development, completing assignments and projects, 
          conducting research, participating in laboratory work, collaborating with peers, and seeking internships 
          or co-op programs for real-world experience. It's important to stay updated with the latest advancements in the field, 
          engage in professional development activities, and actively participate in your studies to build a strong foundation 
          and practical skills in computer engineering. I have also worked on different Semester projects using different languages.
            <br />
            <br /> - Job Hunt (Qt) ---2ND SEM
            <br />
            <br /> - Battleship (ReactJS) ---3RD SEM
            <br />
            <br /> - Trek Diaries (NextJS) ---4TH SEM
          </p>
          <Button url="/contact" text="Contact Me" />
        </div>
      </div>
    </div>
  );
};

export default About;