import React from 'react'
import ProjectGrid from './ProjectGrid'

const Projects = ({data, onHandleOpenModal, handleOpenForEdit, setCandidateData}) => {
  return (
    <div>
            <div className='flex justify-center'>
                <button className='bg-eleventh w-full py-2' onClick={onHandleOpenModal}>
                    + Agregar Nuevo
                </button>
            </div>

            {
              data.proyectos.length > 0
              ? 
                data.proyectos.map(proj => (
                  <ProjectGrid key={proj.id} project={proj} handleOpenForEdit={handleOpenForEdit} setCandidateData={setCandidateData} />
                ))
              :  <h5 className='text-center mt-4 text-sixth '>No tienes ninguna información sobre proyectos</h5>
            }

    </div>
  )
}

export default Projects