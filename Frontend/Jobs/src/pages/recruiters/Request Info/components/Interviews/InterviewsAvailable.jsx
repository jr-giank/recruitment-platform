import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { authContext } from '../../../../../context/context'
import { get } from '../../../../../services/services'
import Loading from '../../../../../sharedComponents/ui/Loading'

const InterviewsAvailable = ({vacancyId}) => {

  const [ schedule, setSchedules ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)
  
  const { auth } = useContext(authContext)

  useEffect(() => {
    get(`entrevista/vacante/${vacancyId}/`, { "Authorization":`Bearer ${auth.token}` })
    .then(res => {
      if(res.exito){
        setSchedules(res.data)
      }
      setIsLoading(false)
    })
  }, [])

  return (
    <div className='flex flex-col mx-10 mt-8'>
      {
        isLoading 
          ? 
            <Loading />
          :
            (
              
        // Renderizar el <table>  unicamente si se tienen horarios de entrevistas configurados para esa vacante.
        schedule.length > 0 
        ?
        (<table>
          <thead>
            <tr className='text-left border-b border-fifth text-[15px] text-twelve'>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Seleccionado Por</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {
            schedule.map(sch => (
                <tr className='border-b border-fifth hover:bg-nineth text-[14px] ' key={sch.id}>
                  <td className='py-2'>  {sch.fecha}</td>
                  <td className='py-2'>  {sch.hora}</td>
                  <td className='py-2'>
                    {
                      sch.candidato ? (
                        <div className='flex items-center'>
                          <img src={`http://127.0.0.1:8000${sch.candidato.foto}`} className='w-10 h-10 rounded-full ml-2' alt="" />
                          <p className='ml-2'>{sch.candidato.nombre} {sch.candidato.apellido}</p> 
                        </div>
                      )
                      : <p>N/A</p>
                    } 
                  </td>
                  <td className='py-2'> <h5 > {sch.completa ? "Completada" : "Pendiente"} </h5></td>

                </tr>
              ))
            }
          </tbody>

      </table>)
      :
        <p className='text-center'>No tienes horarios de entrevistas configurados para esta vacante</p>
            )
      }

    </div>
  )
}

export default InterviewsAvailable