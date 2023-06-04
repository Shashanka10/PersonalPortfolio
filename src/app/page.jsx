import Image from 'next/image'
import styles from './page.module.css'
import Illustrate from "../../public/me.png"
import Button from '@/components/Button/Button'

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1>Hi! My name is Shashanka</h1>   
        <p>Currently studying Computer Engineering at Kathmandu University</p>   
        <Button url="/portfolio" text="See my Work" />
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
