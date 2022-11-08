import React from 'react'

import ExperienceGrid from './ExperienceGrid'

const Experience = ({data, onHandleOpenModal, handleOpenForEdit, setCandidateData}) => {
  
  return (
    <div className='flex flex-col'>

            <div className='flex justify-center'>
                <button className='bg-eleventh w-full py-2' onClick={onHandleOpenModal}>
                    + Agregar Nuevo
                </button>
            </div>

      {
        data.experiencia_laboral.length > 0 
          ?
            data.experiencia_laboral.map(exp => (
              <ExperienceGrid key={exp.id} exp={exp} handleOpenForEdit={handleOpenForEdit} setCandidateData={setCandidateData}  />
            ))
          :  <h5 className='m-auto mt-4 text-sixth '>No tienes ninguna información sobre experiencia laboral</h5>
      }

    </div>
  )
}

export default Experience