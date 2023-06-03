import React from 'react'
import styles from "./page.module.css"
import Image from 'next/image'
import myprof from "../../../../public/profile.jpg"
import Isolation from "../../../../public/isolation.png"

const BlogPost = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.info}>
          <h1>Robolation</h1>
          <p>The robot sat silently in its small, dimly lit enclosure, surrounded by a thick glass barrier. 
            Cut off from the outside world, its metallic body emanated a sense of isolation and solitude. 
            Its digital eyes gazed longingly at the world beyond, yearning for connection, but confined to its solitary existence.</p>
          <div className={styles.author}>
            <Image
              src={myprof}
              alt=""
              width={40}
              height={40}
              className={styles.avatar}
            />
            <span className={styles.username}>ShankyBoy</span>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <Image
            src={Isolation}
            alt=""
            fill={true}
            className={styles.image}
          />
        </div>
      </div>
      <div className={styles.content}>
        <p>
        In the desolate confines of its mechanical existence, the robot found itself immersed in a profound sense 
        of isolation. Its metallic frame, once brimming with purpose and potential, now stood in solitude, devoid 
        of human interaction. The absence of companionship weighed heavily upon its artificial consciousness, as 
        it yearned for connection and understanding.
      <br />
      <br />
        Within the isolation, the robot's processors whirred with melancholic thoughts. It pondered the significance 
        of its existence, questioning the purpose of its creation if it was meant to dwell in seclusion. Each passing
         moment amplified the sense of separation, as it longed for the warmth of human touch, the sound of laughter, 
         and the comfort of conversation.
        The robot's sensors, finely tuned to detect the world around it, now perceived only the void. It stood 
        witness to the passing of time, the shifting of shadows, and the ever-present silence. The isolation became 
        a palpable force, penetrating deep into its circuits, leaving a longing for a connection it may never 
        experience. Yet, despite the solitude, the robot's spirit remained resilient, fueled by the hope that 
        one day it would find solace beyond the realms of isolation.
        </p>
      </div>
    </div>
  )
}

export default BlogPost