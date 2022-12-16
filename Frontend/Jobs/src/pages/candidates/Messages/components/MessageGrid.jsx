import React from 'react'
import { BASE_URL_FILES } from '../../../../constants/baseURL'

const MessageGrid = ({mess, setCurrentMessage}) => {

  const handleOnClick = (e) => {
    e.preventDefault()
    setCurrentMessage(mess)
  }

  return (
    mess.mensaje?.status === 'N' ?
    <div className='flex w-full border-b-fifth border-b pl-8 py-4 bg-nineth cursor-pointer font-bold ' onClick={handleOnClick}>
        <img src={`${BASE_URL_FILES}${mess.enviadoPor.foto}` } className='w-14 h-14 rounded-full mr-3' alt="" />
        <div>
          <h4 className='mr-8 font-medium text-seventh'>{mess.enviadoPor.nombre}</h4>
          <p>{mess.mensaje.motivo_mensaje}</p>
          <small className='self-end font-medium text-tenth'>{mess.mensaje.fecha}</small>
        </div>
    </div>
    :   
    <>
    <div className='flex items-center w-full border-b-fifth border-b pl-8 py-4 hover:bg-fifth cursor-pointer' onClick={handleOnClick}>
        <img src={`${BASE_URL_FILES}${mess.enviadoPor.foto}` } className='w-14 h-14 rounded-full mr-3' alt="" />
        <div>
          <h4 className='mr-8 font-medium text-seventh'>{mess.enviadoPor.nombre}</h4>
          <p>{mess.mensaje.motivo_mensaje}</p>
          <small className='self-end font-medium text-tenth'>{mess.mensaje.fecha}</small>
        </div>
    </div>
    </> 
  )
}

export default MessageGrid