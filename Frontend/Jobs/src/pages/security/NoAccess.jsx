import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoAccess = () => {

    const history = useNavigate()

    const handleOnClick = (e) => {
        e.preventDefault()
        history(-1)
    }

    return (
    <div className='mt-20 ml-16 m-auto'>
        <h4>Su perfil no tiene permisos para acceder a esta ruta</h4>
        <button className='bg-seventh text-white px-4 py-2 rounded-md' onClick={handleOnClick}>Volver</button>
    </div>
  )
}

export default NoAccess