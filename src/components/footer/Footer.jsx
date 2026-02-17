"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className="flex justify-between items-center bg-[#141414] text-white px-4 md:px-10 py-2 z-40">
      <div className="sm:ml-4 md:ml-6 font-sans text-[9px] sm:text-sm md:text-base">&copy; 2023 Shashanka. All rights reserved.</div>
      <div className="flex md:mr-6 gap-1 sm:gap-2 sm:mr-4 sm md:gap-3 cursor-pointer opacity-80">
        <Link href='https://www.facebook.com/luitel.shashanka/'><Image src="/facbook.png" width={20} height={20} alt='Facebook logo' className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6' /></Link>
        <Link href='https://github.com/Shashanka10'><Image src="/gitt.png" width={20} height={20} alt='Github logo' className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6' /></Link>
        <Link href='https://www.instagram.com/_shashankaa10/'><Image src="/insta.png" width={20} height={20} alt='Instagram logo' className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6' /></Link>
        <Link href='https://twitter.com/_shashanka10'><Image src="/twitterX.png" width={20} height={20} alt='Twitter logo' className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6' /></Link>
        <Link href='https://www.linkedin.com/in/shashanka-luitel/'><Image src="/linkedin.png" width={20} height={20} alt='Twitter logo' className='w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6' /></Link>
      </div>
    </div>
  );
};

export default Footer;