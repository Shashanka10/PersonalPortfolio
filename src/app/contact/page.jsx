'use client';
import React, { useState } from 'react'
import styles from "./page.module.css"
import contact from "../../../public/contact.png"
import Image from 'next/image'

export const metadata = {
  title: 'My Contact',
  description: 'contact page',
}

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const[error, setError] = useState([]);
  const[success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Name: ", name);
    console.log("Email: ", email);
    console.log("Message: ", message);

    const res = await fetch ("/api/auth/contact", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      })
    });

    const {msg, success} = await res.json();
    setError(msg);
    setSuccess(success);

    if(success){
      setName("");
      setEmail("");
      setMessage("");
    }
  }
  return (
    <div className={styles.contact}>
      <h1>Let's Keep in Touch</h1>
      <div className={styles.content}>
          <div className={styles.imgContainer}>
            <Image src={contact} alt="my_contact" className={styles.img} width={300} height={300} />
          </div>
          <form className={styles.form} onSubmit={handleSubmit} >
            <input 
              type="text" 
              onChange={e=> setName(e.target.value)}
              value={name}
              placeholder='name' 
              className={styles.input} />
            <input 
              type="text" 
              onChange={e=> setEmail(e.target.value)}
              value={email}
              placeholder='email@gmail.com' 
              className={styles.input} />
            <textarea 
            placeholder='messages ...' 
            onChange={e=> setMessage(e.target.value)}
            value={message}
            cols={30} 
            rows={10} 
            className={styles.textarea}/>
            <button className={styles.sendBtn} type='submit'>Send</button>
            <div className={styles.error}>
            {
              error && error.map((e) => {
                <div className={`${success? styles.success :styles.errorMessage}`}>{e}</div>
              })
            }
          </div>
          </form>
      </div>
    </div>
  )
}

export default Contact