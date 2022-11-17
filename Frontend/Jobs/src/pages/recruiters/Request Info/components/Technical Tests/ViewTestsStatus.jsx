import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { authContext } from '../../../../../context/context'
import { get } from '../../../../../services/services'
import persona from '../../../../../assets/icons/pruebapersona.jpg'

const ViewTestsStatus = ({vacancyId}) => {
  
  const [ assignedTests, setAssignedTests ] = useState([])

  const { auth } = useContext(authContext)

  useEffect(()=> {
    get(`prueba/vacante/${vacancyId}/`,  {"Authorization":`Bearer ${auth.token}`})
    .then(res => {
      if(res.exito){
        console.log(res.data)
        setAssignedTests([...res.data])
      }
    })

  }, [])

  return (
    <div className='flex flex-col mx-10 mt-8'>

      <table>
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
          {Array.from([1, 2, 3, 5, 6].map(assign => (
            <tr className='border-b border-fifth hover:bg-nineth text-[14px] ' key={assign}>
              <td className='py-2'> <img src={persona} className='w-16 h-16 rounded-full ml-2' alt="" /> </td>
              <td className='py-2'> <h5 > Julio Tupesito Encara</h5></td>
              <td className='py-2'>  API REST Django</td>
              <td className='py-2'>  16/11/2022</td>
              <td className='py-2'>  20/11/2022</td>
              <td className='flex mt-4  items-center py-2'>
                <span className='bg-secondary rounded-full w-4 h-4'> </span> 
                <span className='ml-2'>Finalizada</span> 
              </td>
            </tr>
          )))}
          
        </tbody>
      </table>

    </div>
  )
}

export default ViewTestsStatus