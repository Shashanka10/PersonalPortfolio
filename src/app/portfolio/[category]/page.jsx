import React from 'react'
import styles from "./page.module.css"
import Button from '@/components/Button/Button'
import Image from 'next/image'
import Img from "../../../../public/ill_1.jpg"
import Img1 from "../../../../public/anger.png"
import Img2 from "../../../../public/death.jpg"

const Category = ({params}) => {
  console.log(params)
  return (
    <div className={styles.container}>
      <h2>{params.category}</h2>
      <div className={styles.item}>
          <div className={styles.content}>
            <h1>Drive Me Away</h1>
            <p>As we embark on our drive together, the world around us seems to transform 
              into a canvas of endless possibilities. The open road stretches ahead, inviting 
              us to venture into the unknown and embrace the freedom that comes with each passing mile. 
              The soft hum of the engine provides a soothing melody, blending harmoniously with the 
              rhythm of our conversations and laughter. The gentle breeze caresses our faces, 
              carrying whispers of distant places and stories waiting to be told. With every turn, 
              we discover hidden gems nestled in picturesque landscapes, each one unfolding a new 
              chapter of our journey. Time seems to suspend, allowing us to savor every moment, 
              every shared experience. As we navigate the winding roads, our connection deepens, 
              intertwining our souls in a symphony of togetherness. The world outside may be vast, 
              but within the confines of this car, it feels like our own little universe. 
              So, let's continue this enchanting drive, embracing the spontaneity, forging 
              unforgettable memories, and embracing the sheer joy of being in each other's company.</p>
            <Button text="See more" url="#" />
          </div>
          <div className={styles.imgContainer}>
            <Image 
            fill={true}
            src={Img} 
            className={styles.img}
            alt=''/>
          </div>
      </div>
      <div className={styles.item}>
          <div className={styles.content}>
            <h1>Blood in Anger</h1>
            <p>As the sun sets, painting the sky in fiery hues, a surge of raw emotion courses 
              through my veins, setting my blood ablaze in a torrent of anger. My clenched fists 
              tremble with a primal intensity, eager to release the seething fury that burns within. 
              Each breath I take feels heavy, weighted with the weight of grievances and injustices. 
              The world around me blurs as my vision narrows, consumed by a singular focus. In this moment, 
              I am a tempest, a force to be reckoned with. The very air crackles with the electricity of my rage, 
              and I am propelled forward by an indomitable will. This blood in anger becomes a driving force, 
              a relentless surge that demands retribution, justice, and an unyielding resolve.</p>
            <Button text="See more" url="#" />
          </div>
          <div className={styles.imgContainer}>
            <Image 
            fill={true}
            src={Img1} 
            className={styles.img}
            alt=''/>
          </div>
      </div>
      <div className={styles.item}>
          <div className={styles.content}>
            <h1>Poison in My Drink</h1>
            <p>As I hold the glass to my lips, a sinister realization dawns upon me. The once innocent elixir 
              that promises refreshment now bears the taint of poison. My heart quickens its pace, sensing the 
              impending danger that lurks within. I am torn between temptation and self-preservation, the allure 
              of the forbidden mingling with the instinct to survive. The liquid swirls in the glass, mirroring 
              the chaos of my thoughts. I am left with a chilling uncertainty, grappling with the knowledge that
               within this innocuous vessel lies a malevolent secret, ready to unleash its venomous power upon my 
               unsuspecting soul.</p>
            <Button text="See more" url="#" />
          </div>
          <div className={styles.imgContainer}>
            <Image 
            fill={true}
            src={Img2} 
            className={styles.img}
            alt=''/>
          </div>
      </div>
    </div>
  )
}

export default Category