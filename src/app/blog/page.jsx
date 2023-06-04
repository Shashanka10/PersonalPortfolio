import React from 'react'
import styles from "./page.module.css"
import Link from 'next/link'
import Image from 'next/image'
import Isolation from "../../../public/isolation.png"
import Devil from "../../../public/devil.jpg"
import Love from "../../../public/love.jpg"
import Planet from "../../../public/planet.png"
import Superman from "../../../public/superman.jpg"


async function getData() {
  const res = await fetch("http://localhost:3000/api/posts",{ 
    cache: 'no-store', 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
 
  return res.json();
}

const Blog = async() => {
  const data = await getData()
  return (
    <div className={styles.blog}>
      {data.map((item) => (
      <Link href="/blog/testID" className={styles.container} key={item.id}>
          <div className={styles.imgContainer}>
            <Image 
              src={Isolation} 
              width={350}
              height={200}
              className={styles.img}
             alt=''/>
          </div>
          <div className={styles.content}>
            <h1>{item.title}</h1>
            <p>{item.body}</p>
          </div>
          </Link>
          ))} 
      </div>
  )
}

export default Blog