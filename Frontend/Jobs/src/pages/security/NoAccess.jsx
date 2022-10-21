import React from 'react'
import { useNavigate } from 'react-router-dom'

const NoAccess = () => {

    const history = useNavigate()

    const handleOnClick = (e) => {
        e.preventDefault()
        history(-1)
    }

    return (
    <div className='mt-16'>
        <h4>Su perfil no tiene permisos para acceder a esta ruta</h4>
        <button onClick={handleOnClick}>Volver</button>
    </div>
  )
}

export default NoAccess