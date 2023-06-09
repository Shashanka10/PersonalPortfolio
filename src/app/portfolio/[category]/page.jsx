import React from 'react'
import styles from "./page.module.css"
import Button from '@/components/Button/Button'
import Image from 'next/image'
import { items } from './data.js'
import { notFound } from 'next/navigation'

const getData = (cat)=> {

  const data = items[cat];
  if (data) {
    return data;
  }
  return notFound();
}

const Category = ({params}) => {
  const data = getData(params.category);
  return (
    <div className={styles.container}>
      <h2>{params.category}</h2>
      {data.map(item=> (
      
      <div className={styles.item} key={item.id}>
          <div className={styles.content}>
            <h1>{item.title}</h1>
            <p>{item.desc}</p>
            <Button text="See more" url="#" />
          </div>
          <div className={styles.imgContainer}>
            <Image 
            width={350}
            height={350}
            src={item.img} 
            className={styles.img}
            alt=''/>
          </div>
      </div>
      ))}
    </div>
  )
}

export default Category