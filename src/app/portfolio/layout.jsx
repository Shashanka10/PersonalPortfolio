import React from 'react'

const layout = ({children}) => {
  return (
    <div className='flex-col items-center mt-2 ml-4 mr-2 space-y-2'>
        <h1 className='text-cyan-500 font-bold font-serif text-2xl flex justify-center'>My Works</h1>
        {children}
    </div>
  )
}

export default layout;