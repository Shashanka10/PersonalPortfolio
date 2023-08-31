"use client";
import React from 'react'
import styles from "./footer.module.css"
import Image from 'next/image'
import { Link } from '@nextui-org/react'

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.copyright}>© 2023 Shashanka. All rights reserved.</div>
      <div className={styles.socials}>
        <Link href='https://www.facebook.com/luitel.shashanka/'><Image src="/facbook.png" width={20} height={20} className={styles.icon} alt='Facebook logo' /></Link>
        <Link href='https://github.com/Shashanka10'><Image src="/gitt.png" width={20} height={20} className={styles.icon} alt='Github logo' /></Link>
        <Link href='https://www.instagram.com/_shashankaa10/'><Image src="/insta.png" width={20} height={20} className={styles.icon} alt='Instagram logo' /></Link>
        <Link href='https://twitter.com/_shashanka10'><Image src="/twitterX.png" width={20} height={20} className={styles.icon} alt='Twitter logo' /></Link>
      </div>
    </div>
  )
}

export default Footer