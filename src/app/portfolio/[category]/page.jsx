import React from 'react'
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
    <div className="flex-col space-y-8 w-full p-5 md:p-16 lg:p-24 mt-8 sm:mt-0 z-40 rounded-2xl bg-[#1A1A1A]">
      <h2 className="text-cyan-50 text-lg justify-center flex">{params.category}</h2>
      {data.map(item=> (
      
      <div className="flex-col space-y-4" key={item.id}>
          <div>
            <Image 
            width={1000}
            height={1000}
            src={item.img} 
            className="object-cover w-full h-full rounded-xl"
            alt='Images'/>
          </div>
          <div className='space-y-1'>
            <h1 className="text-cyan-400 text-sm justify-start flex font-bold">{item.title}</h1>
            <p className="text-cyan-50 text-xs justify-start flex">{item.desc}</p>
          </div>
          <div className='flex justify-center'>
            <Button text="See more" url="#" />
          </div>
      </div>
      ))}
    </div>
  )
}

export default Category