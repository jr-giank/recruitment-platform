import React, { useState } from 'react'

import remove from '../../../../../assets/icons/eliminar.png'
import editar  from '../../../../../assets/icons/editar.png'
import { uid } from 'uid'
import { f_delete } from '../../../../../services/services'
import { authContext } from '../../../../../context/context'
import { useContext } from 'react'
import Swal from 'sweetalert2'
import { BASE_URL_FILES } from '../../../../../constants/baseURL'

const ProjectGrid = ({project, handleOpenForEdit, setCandidateData}) => {

    const [ isExpanded, setIsExpanded ] = useState(false)
    
    const { auth } = useContext(authContext)

    const handleRemove = (e) => {
        e.preventDefault()
  
        Swal.fire({
          title: "Eliminar Proyecto",
          text : "¿Estás seguro de que deseas eliminar este proyecto?",
          showDenyButton: true,
          showConfirmButton: true,
          confirmButtonText : "Aceptar",
          denyButtonText: "Cancelar"
        })
        .then(result => {
  
          if(result.isConfirmed){
                  f_delete(`proyecto/${project.id}/`, { "Authorization":`Bearer ${auth.token}`})
                  .then(res => {
                    if(res.exito){
                      setCandidateData(currentData => ({...currentData, 
                                                  proyectos: currentData.proyectos.filter(proj => proj.id !== project.id) }) )
  
                    }
                  })
          }
        })
      }

    return (
        <>
            <div className='flex justify-between w-full px-3 mt-2 border-b border-b-fifth py-2'>
                    <div className='flex w-4/5'>
                        <img 
                            src={`${BASE_URL_FILES}${project.foto_proyecto}`} 
                            alt=""
                            className={`${isExpanded ? 'w-56 h-40' : 'w-24 h-20' }`} 
                        />
                        <div className='flex flex-col justify-center ml-3'>
                            <h3 className='text-tenth'>{project.nombre}</h3>
                            <button className='text-left hover:underline w-[30%]' onClick={(()=>setIsExpanded(!isExpanded))}>
                                <small className='text-seventh'>{isExpanded ? 'Ver menos': 'Ver más'} </small>
                            </button>
                            
                            {
                                isExpanded && (
                                    <>
                                        <small>
                                           {project.descripcion}
                                        </small>

                                        <div className='flex flex-col '>
                                            <h4>Tecnologías Utilizadas</h4>
                                            <ul className='list-disc ml-4'>
                                                {
                                                    project?.tecnologias_utilizadas.split("\n").map(tec => (

                                                        <li key={uid()}>
                                                            <small>{tec}</small>
                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        </div>

                                        <div>
                                            <a href={project.url_repositorio} target='blanck' className='bg-seventh text-white px-2 text-[12px] py-1'>Ver Repositorio</a>

                                            {
                                                project.url_demo && <a href={project.url_demo} target='blanck' className='ml-4 bg-seventh text-white px-2 text-[12px] py-1'>Ver Demo</a>
                                            }
                   
                                        </div>
                                    </>
                                )
                            }

                        </div>
                    </div>
                    
                    {
                        auth.candidato_id 
                            &&  
                            <div className='flex items-center h-full'>
                                <button> <img src={editar} alt="" className='w-7 h-7 mx-3' onClick={(e) => handleOpenForEdit(e, project) } /> </button>
                                <button> <img src={remove} alt="" className='w-7 h-7 mx-3' onClick={handleRemove} /> </button>
                            </div>
                    }
            </div>

    </>
  )
}

export default ProjectGrid