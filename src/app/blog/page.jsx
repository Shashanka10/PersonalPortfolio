import React from 'react'
import styles from "./page.module.css"
import Link from 'next/link'
import Image from 'next/image'

async function getData() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const Blog = async() => {
  const data = await getData()
  return (
    <div className={styles.blog}>
      {data.map((item) => (
      <Link href={`/blog/${item._id}`} className={styles.container} key={item.id}>
          <div className={styles.imgContainer}>
            <Image 
              src={item.img} 
              width={350}
              height={200}
              className={styles.img}
             alt=''/>
          </div>
          <div className={styles.content}>
            <h1>{item.title}</h1>
            <p>{item.desc}</p>
          </div>
          </Link>
          ))} 
      </div>
  )
}

export default Blog