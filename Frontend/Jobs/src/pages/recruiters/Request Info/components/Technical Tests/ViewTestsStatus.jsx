import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { authContext } from '../../../../../context/context'
import { get } from '../../../../../services/services'
import Loading from '../../../../../sharedComponents/ui/Loading'
import { BASE_URL_FILES } from '../../../../../constants/baseURL'

const ViewTestsStatus = ({vacancyId}) => {
  
  const [ assignedTests, setAssignedTests ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true) 

  const { auth } = useContext(authContext)

  useEffect(()=> {
    get(`prueba/vacante/${vacancyId}/`,  {"Authorization":`Bearer ${auth.token}`})
    .then(res => {
      if(res.exito){
        console.log(res.data)
        setAssignedTests([...res.data])
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
              
        // Renderizar el <table>  unicamente si se tienen pruebas técnicas asignadas.
        assignedTests.length > 0 
        ?
        (<table>
          <thead>
            <tr className='text-left border-b border-fifth text-[15px] text-twelve'>
              <th>Foto</th>
              <th>Nombre </th>
              <th>Prueba Técnica</th>
              <th>Asignado el</th>
              <th>Fecha Limite</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {
            assignedTests.map(assign => (
                <tr className='border-b border-fifth hover:bg-nineth text-[14px] ' key={assign.id}>
                  <td className='py-2'> <img src={`${BASE_URL_FILES}${assign.candidato.foto}`} className='w-16 h-16 rounded-full ml-2' alt="" /> </td>
                  <td className='py-2'> <h5 > {assign.candidato.nombre} {assign.candidato.apellido} </h5></td>
                  <td className='py-2'>  {assign.prueba.titulo}</td>
                  <td className='py-2'>  {assign.fecha_asignacion}</td>
                  <td className='py-2'>  {assign.fecha_limite}</td>

                  <td className='flex  mt-4  items-center py-2'>
                    <span className={`${assign.status === "En curso" ? 'bg-[#D3C90D] ': 'bg-secondary'} rounded-full w-4 h-4`}> </span> 
                    <div className='flex flex-col'>
                      <span className='ml-2'>{assign.status}</span>
                      
                      {
                        assign.solucion !== null && 
                          <a href={assign.solucion} target='blank' className='text-seventh text-[12px] hover:underline ml-2'>
                            Ver Solucion
                          </a> 
                      }
                    </div>

                  </td>
                
                </tr>
              ))
            }
          </tbody>

      </table>)
      :
        <p className='text-center'>No tienes pruebas técnicas asignadas para esta vacante</p>
            )
      }

    </div>
  )
}

export default ViewTestsStatus