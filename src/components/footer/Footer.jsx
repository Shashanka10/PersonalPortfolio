"use client";
import React from 'react';
import Image from 'next/image';
import { Link } from '@nextui-org/react';

const Footer = () => {
  return (
    <div className="flex justify-between items-center h-[50px]">
      <div className="ml-10 font-sans">© 2023 Shashanka. All rights reserved.</div>
      <div className="flex mr-10 gap-4 cursor-pointer opacity-80">
        <Link href='https://www.facebook.com/luitel.shashanka/'><Image src="/facbook.png" width={20} height={20} alt='Facebook logo' /></Link>
        <Link href='https://github.com/Shashanka10'><Image src="/gitt.png" width={20} height={20} alt='Github logo' /></Link>
        <Link href='https://www.instagram.com/_shashankaa10/'><Image src="/insta.png" width={20} height={20} alt='Instagram logo' /></Link>
        <Link href='https://twitter.com/_shashanka10'><Image src="/twitterX.png" width={20} height={20} alt='Twitter logo' /></Link>
      </div>
    </div>
  )
}

export default Footer;