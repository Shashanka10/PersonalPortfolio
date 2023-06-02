import Image from 'next/image'
import styles from './page.module.css'
import Illustrate from "../../public/me.png"

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1>Hi! My name is Shashanka</h1>   
        <p>Currently studying Computer Engineering at Kathmandu University</p>   
        <button className={styles.cv}>Hire Me</button> 
      </div>
      <div className={styles.item}>
      <Image src={Illustrate} alt='home_pfp'className={styles.img}/>
      </div>
    </div>
  )
}
