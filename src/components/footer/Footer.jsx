import React from 'react'
import styles from "./footer.module.css"
import Image from 'next/image'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.copyright}>© 2023 Shashanka. All rights reserved.</div>
      <div className={styles.socials}>
        <Image src="/facbook.png" width={15} height={15} className={styles.icon} alt='Facebook logo' />
        <Image src="/gitt.png" width={15} height={15} className={styles.icon} alt='Github logo' />
        <Image src="/insta.png" width={15} height={15} className={styles.icon} alt='Instagram logo' />
        <Image src="/twitt.png" width={15} height={15} className={styles.icon} alt='Twitter logo' />
      </div>
    </div>
  )
}

export default Footer