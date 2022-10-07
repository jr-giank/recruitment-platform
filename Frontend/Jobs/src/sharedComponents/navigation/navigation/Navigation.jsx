import React from 'react'

const Navigation = () => {
  return (
    <nav className='w-full flex justify-between items-center pr-3 bg-primary h-16 text-white'>

    <div>
      <h2 className='text-white ml-4  font-extrabold'>ItJobs.Net</h2>
    </div>

      <div className='flex items-center'>
        Cervecería Nacional
        <img 
          src="https://i.pinimg.com/originals/82/48/3b/82483b829d1a39580360a6fef506072d.png" 
          alt=""
          className='w-10 h-10 rounded-full ml-2' />
      </div>
    </nav>
  )
}

export default Navigation