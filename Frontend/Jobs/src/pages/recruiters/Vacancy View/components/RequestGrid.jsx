import React from 'react'

const RequestGrid = () => {
    return (
    <div className='flex justify-between items-center border-b border-b-fifth py-2'>
        <span className='flex items-center'>
            <img 
            src="https://i.pinimg.com/originals/82/48/3b/82483b829d1a39580360a6fef506072d.png" 
            alt=""
            className='w-10 h-10 rounded-full ml-2' />
            <p className='ml-2'>Juan Matos Salazar</p>
        </span>

        <button className='bg-primary text-white text-sm px-2 h-[28px]'>
            Ver Solicitud
        </button>

    </div>
  )
}

export default RequestGrid