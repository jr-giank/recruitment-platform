import React from 'react'

const MessageGrid = ({mess, setCurrentMessage}) => {
     console.log(mess)
  const handleOnClick = (e) => {
    e.preventDefault()
    setCurrentMessage(mess)
  }


  return (
    mess.status === 'N' ?
    <div className='w-full border-b-fifth border-b pl-8 py-4 bg-nineth cursor-pointer font-bold ' onClick={handleOnClick}>
        <h4 className='font-medium text-seventh'>{mess.mensaje.usuario}</h4>
        <h4 className='font-medium text-seventh'>{mess.mensaje.fecha}</h4>
    </div>
    :    
    <div className='w-full border-b-fifth border-b pl-8 py-4 hover:bg-fifth cursor-pointer' onClick={handleOnClick}>
        <h4 className='font-medium text-seventh'>{mess.mensaje.usuario}</h4>
        <h4 className='font-medium text-seventh'>{mess.mensaje.fecha}</h4>
    </div>
    
  )
}

export default MessageGrid