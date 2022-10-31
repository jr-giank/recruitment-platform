import React, { useState } from 'react'

import remove from '../../../../../assets/icons/eliminar.png'
import editar  from '../../../../../assets/icons/editar.png'

const Experience = ({experiences, onHandleOpenModal}) => {

  const [ isExpanded, setIsExpanded ] = useState(false)

  return (
    <div className='flex flex-col'>

            <div className='flex justify-center'>
                <button className='bg-eleventh w-full py-2' onClick={onHandleOpenModal}>
                    + Agregar Nuevo
                </button>
            </div>

      <div className='flex justify-between border-b border-fifth px-3 py-2'>

        <div className='flex flex-col w-[85%]'>
          
          <h4 className='text-primary font-black'>
            Newtech
          </h4>

          <p className=''>
            Desarrollador Backend Java
          </p>

          <small className='italic'>
            2017 - 2022
          </small>

        {
          isExpanded && (
                <p className='ml-4 my-2'>
                  Hola, mi nombre es Tokio Cosmo Vision. Soy un desarrollador de software especializado en tecnologias Java con 10 años de experiencia y amante del desarrollo en el lado del servidor. Si quieres contactarte conmigo puedes contactarme a través de una de las vías que propongo en mi portafolio.
              </p>
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
              <img src={editar} alt="" className='w-7 h-7 mx-3' />
              <img src={remove} alt="" className='w-7 h-7 mx-3' />
        </div>
        
      </div>
    </div>
  )
}

export default Experience