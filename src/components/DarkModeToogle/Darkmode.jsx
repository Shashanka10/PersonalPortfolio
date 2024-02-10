"use client"

import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const Darkmode = () => {
    const {toggle , mode} = useContext(ThemeContext);
  return (
    <div className="flex relative cursor-pointer justify-center items-center p-1 border border-solid border-teal-400 rounded-2xl" onClick={toggle}>
        <div className="text-xs">🌙</div>
        <div className="text-xs">🔆</div>
        <div 
        className="w-4 h-4 absolute bg-green-500 rounded-full" 
        style={mode === "light" ? {left:"2px"} : {right:"2px"}} />
    </div>
  )
}

export default Darkmode;