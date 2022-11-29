import React from 'react'

const MessageGrid = ({mess, setCurrentMessage}) => {
     console.log(mess)
  const handleOnClick = (e) => {
    e.preventDefault()
    setCurrentMessage(mess)
  }


  return (
    mess.mensaje?.status === 'N' ?
    <div className='flex w-full border-b-fifth border-b pl-8 py-4 bg-nineth cursor-pointer font-bold ' onClick={handleOnClick}>
        <h4 className='mr-8 font-medium text-seventh'>{mess.mensaje.usuario.email}</h4>
        <h4 className='self-end font-medium text-seventh'>{mess.mensaje.fecha}</h4>
    </div>
    :    
    <div className='flex w-full border-b-fifth border-b pl-8 py-4 hover:bg-fifth cursor-pointer' onClick={handleOnClick}>
        <h4 className='mr-8 '>{mess.mensaje?.usuario.email}</h4>
        <h4 className='self-end'>{mess.mensaje?.fecha}</h4>
    </div>
    
  )
}

export default MessageGrid