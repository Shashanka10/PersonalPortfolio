"use client"
import { AnimatePresence } from 'framer-motion'
import React from 'react'

const FrameProvider = ({children}) => {
  return (
    <AnimatePresence>{children}</AnimatePresence>
  )
}

export default FrameProvider