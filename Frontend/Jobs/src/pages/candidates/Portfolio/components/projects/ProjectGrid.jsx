import React, { useState } from 'react'

import remove from '../../../../../assets/icons/eliminar.png'
import editar  from '../../../../../assets/icons/editar.png'

const ProjectGrid = ({project}) => {

    const [ isExpanded, setIsExpanded ] = useState(false)

    return (
        <>
            <div className='flex justify-between w-full px-3 mt-2 border-b border-b-fifth py-2'>
                    <div className='flex w-4/5'>
                        <img 
                            src="https://qph.cf2.quoracdn.net/main-qimg-afcf3c83cf0d1cb9af7c8b1825491b6f-lq" 
                            alt=""
                            className={`${isExpanded ? 'w-56 h-40' : 'w-28' }`} 
                        />
                        <div className='flex flex-col justify-center ml-3'>
                            <h3 className='text-tenth'>Agenda de Contactos</h3>
                            <button className='text-left hover:underline w-[30%]' onClick={(()=>setIsExpanded(!isExpanded))}>
                                <small className='text-seventh'>{isExpanded ? 'Ver menos': 'Ver más'} </small>
                            </button>
                            
                            {
                                isExpanded && (
                                    <>
                                        <small>
                                            Lorem ipsum lore ipsum lorem ipsum lorem ipsum lorem ipsum Lorem ipsum lore ipsum lorem ipsum lorem ipsum lorem ipsum Lorem ipsum lore ipsum lorem ipsum lorem ipsum lorem ipsum Lorem ipsum lore ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum Lorem ipsum lore ipsum lorem ipsum lorem ipsum lorem ipsum
                                        </small>

                                        <div className='flex flex-col '>
                                            <h4>Tecnologías Utilizadas</h4>
                                            <ul className='list-disc ml-4'>
                                                <li><small>Django</small></li>
                                                <li><small>Python</small></li>
                                                <li><small>Js</small></li>
                                                <li><small>React JS</small></li>
                                                <li><small>Tailwind</small></li>
                                            </ul>
                                        </div>

                                        <div>
                                            <a href="" className='bg-seventh text-white px-2 text-[12px] py-1'>Ver Repositorio</a>
                                            <a href="" className='ml-4 bg-seventh text-white px-2 text-[12px] py-1'>Ver Demo</a>
                                        </div>
                                    </>
                                )
                            }

                        </div>
                    </div>

                    <div className='flex items-center h-full'>
                        <img src={editar} alt="" className='w-7 h-7 mx-3' />
                        <img src={remove} alt="" className='w-7 h-7 mx-3' />
                    </div>
            </div>
{/* 
        {
            isExpanded &&
            <div>
                <ProjectExpanded project={project} />
            </div>
        } */}
    </>
  )
}

export default ProjectGrid