import React from 'react'

const layout = ({children}) => {
  return (
    <div className='flex-col items-center mt-2 ml-4 mr-2 space-y-2'>
        {children}
    </div>
  )
}

export default layout;