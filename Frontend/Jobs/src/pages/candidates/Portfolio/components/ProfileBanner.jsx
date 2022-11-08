import React, { useContext } from 'react'
import { authContext } from '../../../../context/context'

import editar  from '../../../../assets/icons/editar.png'
import { useState } from 'react'

const ProfileBanner = ({setEditableData, setIsEdited, title, message }) => {

    const { auth } = useContext(authContext)
    const [ messageEdit, setMessageEdit ] = useState(false)
    const [ messageEdited, setMessageEdited ] = useState(message || "") 

    const handleSubmitChanges = (e) => {
        setEditableData(data => ({...data, mensage_presentacion:messageEdited}))
        setIsEdited(true)
        setMessageEdit(false)
    }

    return (    
        <div className='w-1/4 flex items-center h-full'>
            <div className='bg-white flex flex-col items-center w-full h-[410px] shadow-md ml-2 pt-4 px-4'>
            <img 
                src={`http://127.0.0.1:8000${auth.foto}`}  
                alt=""
                className='w-36 h-36 rounded-full' 
            />
            <div>
                <h4 className='font-bold'>{auth.first_name} {auth.last_name}</h4>
                <small className='font-bold text-sixth'>{title}</small>
            </div>

            { messageEdit 
            ? <div>
                <textarea name="" id="" cols="30" rows="5" value={messageEdited} onChange={(e)=>setMessageEdited(e.target.value)} />
                
                <button className='text-[12px] bg-seventh text-white py-1 px-1 rounded-sm' onClick={handleSubmitChanges}>
                    Guardar Cambios
                </button>
                
                <button className='text-[12px] bg-tenth text-white ml-4 py-1 px-1 rounded-sm' onClick={()=>setMessageEdit(false)}>
                    Cancelar
                </button>
            </div>
            :
                <div className='flex flex-col items-end w-full'>
                <button> <img src={editar} alt="" className='w-5 h-5' onClick={()=>setMessageEdit(true)} /> </button>
                    <small className='text-justify mt-3 w-full'>
                        {message} 
                    </small>
                </div>
            }
            </div>
        </div>
    )
}

export default ProfileBanner