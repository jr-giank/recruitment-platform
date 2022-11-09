import React from 'react'

import remove from '../../../../../assets/icons/eliminar.png'
import editar  from '../../../../../assets/icons/editar.png'
import { useState } from 'react'
import { f_delete } from '../../../../../services/services'
import { authContext } from '../../../../../context/context'
import { useContext } from 'react'
import Swal from 'sweetalert2'
import { uid } from 'uid'

const ExperienceGrid = ({exp , handleOpenForEdit, setCandidateData}) => {

    const [ isExpanded, setIsExpanded ] = useState(false)

    const { auth } = useContext(authContext)

    const handleRemove = (e) => {
      e.preventDefault()

      Swal.fire({
        title: "Eliminar Experiencia",
        text : "¿Estás seguro de que deseas eliminar esta experiencia laboral?",
        showDenyButton: true,
        showConfirmButton: true,
        confirmButtonText : "Aceptar",
        denyButtonText: "Cancelar"
      })
      .then(result => {

        if(result.isConfirmed){
                f_delete(`experiencia/${exp.id}/`, { "Authorization":`Bearer ${auth.token}`})
                .then(res => {
                  if(res.exito){
                    setCandidateData(currentData => ({...currentData, 
                                                experiencia_laboral: currentData.experiencia_laboral.filter(expL => expL.id !== exp.id) }) )

                  }
                })
        }
      })
    }
    
    return (
    <div className='flex justify-between border-b border-fifth px-3 py-2'>

          <div className='flex flex-col w-[85%]'>
            
            <h4 className='text-primary font-black'>
              {exp.nombre_empresa}
            </h4>
  
            <p className=''>
              {exp.nombre_puesto}
            </p>
  
            <small className='italic'>
              {exp.fecha_inicio} - {exp.fecha_final}
            </small>
  
          {
            isExpanded && (
                  <ul className='ml-8 my-2 text-[15px] list-disc'>
                    {
                      exp.responsabilidades.split("\n").map(resp => (
                        <li key={uid()}>{resp}</li>
                    ))
                    }
                </ul>
            )
          }
  
            <button className='w-20' onClick={()=>setIsExpanded(!isExpanded)}>
              <small className='text-seventh hover:underline'>
                {isExpanded? 'Ver menos' : 'Ver más' }
              </small>
            </button>
          
            <div>
  
            </div>
          </div>
  
          <div className='flex items-center h-full'>
                <button> <img src={editar} alt="" className='w-7 h-7 mx-3' onClick={(e) => handleOpenForEdit(e, exp) } /></button> 
                <button> <img src={remove} alt="" className='w-7 h-7 mx-3' onClick={handleRemove} /></button> 
          </div>
          
        </div>
  )
}

export default ExperienceGrid