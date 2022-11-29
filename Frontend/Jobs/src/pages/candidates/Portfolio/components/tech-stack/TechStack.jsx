import React from 'react'
import { useContext } from 'react'
import remove from '../../../../../assets/icons/eliminar.png'
import { authContext } from '../../../../../context/context'
import { f_delete } from '../../../../../services/services'

const TechStack = ({data, setCandidateData, onHandleOpenModal}) => {

  const { auth } = useContext(authContext)

  const handleRemove = (e, id) => {
    e.preventDefault()
    f_delete(`tecnologia/${id}/`, { "Authorization":`Bearer ${auth.token}`})
    setCandidateData(currentData => ({...currentData, tecnologias: currentData.tecnologias.filter(tech => tech.id !== id) }) )
  }

  return (
    <div className='flex flex-col py-1'>

        {
            auth.candidato_id &&
                <div className='flex justify-center'>
                    <button className='bg-eleventh w-full py-2' onClick={onHandleOpenModal}>
                        + Agregar Nuevo
                    </button>
                </div>
        }

        {
            data.tecnologias.length === 0
                ?  
                    <h5 className='m-auto mt-4 text-sixth '>No tienes ninguna información sobre herramientas</h5>
                :
                    data.tecnologias.map(tech => (
                        <div className='flex justify-between py-3 px-3' key={tech.id}>
                            <div className='flex w-full items-center'>
                                <h4 className='font-bold text-primary w-1/5'>{tech.nombre_tecnologia}</h4>

                                <span className='w-1/4 bg-fifth h-3 rounded-full'>
                                    
                                    {
                                        tech.nivel_conocimiento === 'Básico' &&(
                                            <p className='w-1/4 bg-sixth h-full rounded-full'></p>
                                        )
                                    }

                                    {
                                        tech.nivel_conocimiento === 'Intermedio' && (
                                            <p className='w-1/2 bg-[#D3C90D] h-full rounded-full'></p>
                                        )
                                    }
                                    
                                    {
                                        tech.nivel_conocimiento === 'Profesional' && (
                                            <p className='w-3/4 bg-seventh h-full rounded-full'></p>
                                        )
                                    }

                                    {
                                        tech.nivel_conocimiento === 'Avanzado' && (
                                            <p className='w-full bg-secondary h-full rounded-full'></p>
                                        )
                                    }

                                </span> <small className='text-[12px] ml-2'> {tech.nivel_conocimiento} </small >
                            </div>
                            {
                            auth.candidato_id 
                                &&
                                <button onClick={(e)=>handleRemove(e, tech.id)}>
                                    <img src={remove} alt="" className='w-7' />
                                </button>
                            }
                        </div>
                    ))
        }

    </div>
  )
}

export default TechStack