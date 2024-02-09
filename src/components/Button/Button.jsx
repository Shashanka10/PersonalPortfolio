import React from 'react';
import Link from 'next/link';

const Button = ({text,url}) => {
  return (
    <Link href={url}>
    <button className="p-3 transition ease-in-out delay-100 text-md font-medium bg-cyan-700 rounded-xl hover:translate-y-1 hover:scale-110 hover:bg-slate-500 duration-300">{text}</button>
    </Link>
  )
}

export default Button;