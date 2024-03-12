"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Illustration from "../../../public/illustration.png";
import Website from "../../../public/websites.jpg";
import Application from "../../../public/apps.jpg";
 
const Portfolio = () => {
  return (
    <div className="flex-col sm:flex w-full space-y-7 p-5 md:p-16 lg:p-24 mt-8 sm:mt-0 z-40 rounded-2xl bg-[#1A1A1A]">
      <h1 className="flex justify-center text-2xl sm:text-3xl md:text-4xl font-bold text-white">Choose a Gallery</h1>
      <div className="flex-col space-y-6 z-40">
        <div className='relative sm:flex'>
          <Link href="/portfolio/illustrations" className="flex-col">
            <Image 
              src={Illustration}
              width={1000}
              height={1000}
              alt='Image of illus'
              className='object-cover w-full h-full rounded-2xl'
            />
            <span className="absolute bottom-6 left-6 text-cyan-100 text-4xl font-bold hover:text-cyan-500">Illustrations </span>
          </Link>
          </div>
          <div className='relative'>
          <Link href="/portfolio/websites" className="flex-col">
          <Image 
              src={Website}
              width={1000}
              height={1000}
              pos
              alt='Image of webs'
              className='object-cover w-full h-full rounded-2xl'
            />
            <span className="absolute bottom-6 left-6 text-cyan-100 text-4xl font-bold hover:text-cyan-500">Websites </span>
          </Link>
          </div>
          <div className='relative'>
          <Link href="/portfolio/applications" className="flex-col">
          <Image 
              src={Application}
              width={1000}
              height={1000}
              alt='Image of apps'
              className='object-cover w-full h-full rounded-2xl'
            />
            <span className="absolute bottom-6 left-6 text-cyan-100 text-4xl font-bold hover:text-cyan-500">Applications </span>
          </Link>
          </div>
      </div>
    </div>
  )
}

export default Portfolio