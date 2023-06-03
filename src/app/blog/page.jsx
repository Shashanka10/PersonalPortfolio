import React from 'react'
import styles from "./page.module.css"
import Link from 'next/link'
import Image from 'next/image'
import Isolation from "../../../public/isolation.png"
import Devil from "../../../public/devil.jpg"
import Love from "../../../public/love.jpg"
import Planet from "../../../public/planet.png"
import Superman from "../../../public/superman.jpg"


const Blog = () => {
  return (
    <div className={styles.blog}>
      <Link href="/blog/testID" className={styles.container}>
          <div className={styles.imgContainer}>
            <Image 
              src={Isolation} 
              width={350}
              height={200}
              className={styles.img}
             alt=''/>
          </div>
          <div className={styles.content}>
            <h1>Robolation</h1>
            <p>The robot sat silently in its small, dimly lit enclosure, surrounded by a thick glass barrier. 
              Cut off from the outside world, its metallic body emanated a sense of isolation and solitude. 
              Its digital eyes gazed longingly at the world beyond, yearning for connection, but confined to its solitary existence.</p>
          </div>
          </Link>
          <Link href="/blog/testID" className={styles.container}>
          <div className={styles.imgContainer}>
            <Image 
              src={Devil} 
              width={350}
              height={200}
              className={styles.img}
             alt=''/>
          </div>
          <div className={styles.content}>
            <h1>Cute Devils</h1>
            <p>The mischievous little devils with their tiny pitchforks and adorable horns giggled as they plotted their next 
              playful prank. Their mischievous eyes twinkled with mischief as they danced around, leaving a trail of tiny 
              hoofprints in their wake. Despite their devilish appearance, their cuteness was simply irresistible, melting 
              hearts with every impish grin.</p>
          </div>
          </Link>
          <Link href="/blog/testID" className={styles.container}>
          <div className={styles.imgContainer}>
            <Image 
              src={Love} 
              width={350}
              height={200}
              className={styles.img}
             alt=''/>
          </div>
          <div className={styles.content}>
            <h1>Love Me Again</h1>
            <p>She gazed into his eyes, searching for a glimmer of the love they once shared, hoping he would find his way back to 
              her heart. With every beat, her own heart whispered, "Love me again," longing for the rekindling of their passionate flame. 
              The memories of their tender moments flooded her mind, urging him to give their love a second chance.</p>
          </div>
          </Link>
          <Link href="/blog/testID" className={styles.container}>
          <div className={styles.imgContainer}>
            <Image 
              src={Planet} 
              width={350}
              height={200}
              className={styles.img}
             alt=''/>
          </div>
          <div className={styles.content}>
            <h1>Planetary</h1>
            <p>The planets, suspended in the vast expanse of darkness, cast an ethereal beauty upon the cosmic canvas. In the 
              depths of the celestial abyss, distant stars flickered like tiny beacons, illuminating the mysterious void. 
              A sense of awe enveloped the observer as they contemplated the enigmatic dance of planets, their secrets hidden 
              within the cloak of darkness.</p>
          </div>
          </Link>
          <Link href="/blog/testID" className={styles.container}>
          <div className={styles.imgContainer}>
            <Image 
              src={Superman} 
              width={350}
              height={200}
              className={styles.img}
             alt=''/>
          </div>
          <div className={styles.content}>
            <h1>Save Us Hero</h1>
            <p>Superman soared through the sky, his iconic red cape billowing behind him, a symbol of hope against the backdrop of 
              a bustling metropolis. With his superhuman strength and unwavering resolve, he stood as a beacon of justice, protecting 
              the innocent from the clutches of darkness. His noble heart and indomitable spirit inspired all, reminding us that 
              even in the face of adversity, a hero can rise above and shine a light in the darkest of times.</p>
          </div>
          </Link>
      </div>
  )
}

export default Blog