'use client'
import Image from 'next/image'
import styles from './page.module.css'
import Illustrate from "../../public/me.png"
import Button from '@/components/Button/Button'
import Typewriter from 'typewriter-effect';

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1>Hi! I am Shashanka</h1>   
        <h2><Typewriter
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
        /></h2>   
        <Button url="/portfolio" text="See my Work" className={styles.btn}/>
      </div>
      <div className={styles.item}>
      <Image 
      src={Illustrate} 
      alt='home_pfp'
      className={styles.img}
      priority={false}/>
      </div>
    </div>
  )
}
