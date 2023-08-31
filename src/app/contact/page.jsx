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
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
      })
    });

    const {msg, success} = await res.json();
    
    setError(msg);
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
          <form className={styles.form} onSubmit={handleSubmit} autoComplete='on' >
            <input 
              type="text" 
              onChange={(e)=> setName(e.target.value)}
              value={name}
              id='name'
              placeholder='name' 
              className={styles.input} />
            <input 
              type="text" 
              onChange={(e)=> setEmail(e.target.value)}
              value={email}
              id='email'
              placeholder='email@gmail.com' 
              className={styles.input} />
            <textarea 
            placeholder='messages ...' 
            onChange={(e)=> setMessage(e.target.value)}
            value={message}
            id='message'
            cols={30} 
            rows={10} 
            className={styles.textarea}/>
            <button className={styles.sendBtn} type='submit'>Send</button>
          </form>
          <div className={styles.eme}>
            { (error.length !== 0) && 
                error.map((e) => {
                <div className={styles.errorMessage}>{e}</div>
                })
            }
          </div>
      </div>
    </div>
  )
}

export default Contact