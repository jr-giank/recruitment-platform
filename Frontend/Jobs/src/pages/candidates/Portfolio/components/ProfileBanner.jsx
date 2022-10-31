import React, { useContext } from 'react'
import { authContext } from '../../../../context/context'
const ProfileBanner = () => {

    const { auth } = useContext(authContext)

return (

    <div className='w-1/4 flex items-center h-full'>
        <div className='bg-white flex flex-col items-center w-full h-96 shadow-md ml-2 pt-4 px-4'>
        <img 
            src={`http://127.0.0.1:8000${auth.foto}`}  
            alt=""
            className='w-36 h-36 rounded-full' 
        />
        <div>
            <h4 className='font-bold'>{auth.first_name} {auth.last_name}</h4>
            <small className='font-bold text-sixth'>Ingeniero en Software</small>
        </div>
        <small className='text-justify mt-3'>
          Hola, mi nombre es {auth.first_name} {auth.last_name}. Soy un desarrollador de software especializado en tecnologias Java con 10 años de experiencia y amante del desarrollo en el lado del servidor. Si quieres contactarte conmigo puedes contactarme a través de una de las vías que propongo en mi portafolio.
        </small>
        </div>
    </div>
)
}

export default ProfileBanner