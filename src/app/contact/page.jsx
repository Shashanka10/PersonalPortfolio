import React from 'react'
import styles from "./page.module.css"
import contact from "../../../public/contact.png"
import Image from 'next/image'
import Button from '@/components/Button/Button'

export const metadata = {
  title: 'My Contact',
  description: 'contact page',
}

const Contact = () => {
  return (
    <div className={styles.contact}>
      <h1>Let's Keep in Touch</h1>
      <div className={styles.content}>
          <div className={styles.imgContainer}>
            <Image src={contact} alt="my_contact" className={styles.img} fill={true} />
          </div>
          <form className={styles.form}>
            <input type="text" placeholder='name' className={styles.input} />
            <input type="text" placeholder='email' className={styles.input} />
            <textarea 
            placeholder='message ...' 
            cols={30} 
            rows={10} 
            className={styles.textarea}/>
            <Button url="#" text='Send'/>
          </form>
      </div>
    </div>
  )
}

export default Contact