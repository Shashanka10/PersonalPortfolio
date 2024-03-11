import React from 'react';
import Link from 'next/link';

const Button = ({text,url}) => {
  return (
    <Link href={url}>
    <button className="text-white tracking-wider text-sm
                  p-2 lg:p-3 w-full border-2 border-[#282828] bg-[#706d6d24] rounded-xl
                   cursor-pointer flex justify-center transition ease-in-out delay-100 hover:translate-y-1 hover:scale-110 hover:bg-slate-500 duration-300">{text}</button>
    </Link>
  )
}

export default Button;