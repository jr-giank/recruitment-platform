import React from 'react'
import ProjectGrid from './ProjectGrid'

const Projects = ({onHandleOpenModal}) => {
  return (
    <div>
            <div className='flex justify-center'>
                <button className='bg-eleventh w-full py-2' onClick={onHandleOpenModal}>
                    + Agregar Nuevo
                </button>
            </div>
      <ProjectGrid />
      <ProjectGrid />
      <ProjectGrid />
      <ProjectGrid />
      <ProjectGrid />
      <ProjectGrid />
      <ProjectGrid />
    </div>
  )
}

export default Projects