import React, { useContext } from 'react'
import { authContext } from '../../../../context/context'

import editar  from '../../../../assets/icons/editar.png'
import { useState } from 'react'
import { BASE_URL_FILES } from '../../../../constants/baseURL'

const ProfileBanner = ({setEditableData, setIsEdited, candidateData }) => {

    const { auth } = useContext(authContext)
    const [ messageEdit, setMessageEdit ] = useState(false)
    const [ messageEdited, setMessageEdited ] = useState(candidateData.mensage_presentacion || "") 

    const handleSubmitChanges = (e) => {
        setEditableData(data => ({...data, mensage_presentacion:messageEdited}))
        setIsEdited(true)
        setMessageEdit(false)
    }

    return (    
        <div className='w-1/4 flex items-center h-full'>
            <div className='bg-white flex flex-col items-center w-full h-[410px] shadow-md ml-2 pt-4 px-4'>
            <img 
                src={`${BASE_URL_FILES}${candidateData.foto}`}  
                alt=""
                className='w-36 h-36 rounded-full' 
            />
            <div>
                <h4 className='font-bold'>{candidateData.nombre} {candidateData.apellido}</h4>
                <small className='font-bold text-sixth'>{candidateData.titulo_personal}</small>
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
                    {
                        auth.candidato_id &&
                        <button> 
                            <img src={editar} alt="" className='w-5 h-5' onClick={()=>setMessageEdit(true)} /> 
                        </button>
                    }
                    <small className='text-justify mt-3 w-full'>
                            {candidateData.mensage_presentacion} 
                    </small>
                </div>
            }
            </div>
        </div>
    )
}

export default ProfileBanner