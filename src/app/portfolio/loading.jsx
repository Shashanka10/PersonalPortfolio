"use client"
import React from 'react'
import { BeatLoader } from 'react-spinners'

const LoadingPortfolio = () => {
  return (
    <div className='flex justify-center items-center'>
      <BeatLoader
        color='green' 
      />
    </div>
  )
}

export default LoadingPortfolio