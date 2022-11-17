import React, {useEffect, useState, useContext} from 'react'
import { authContext } from '../../../../context/context'
import { get } from '../../../../services/services'
import TestGrid from './components/TestGrid'
import { Link } from 'react-router-dom'
import Loading from '../../../../sharedComponents/ui/Loading'

const TechnicalTestView_Page = () => {

  const [ techTests, setTechTests ] = useState([])
  const { auth } = useContext(authContext) 

  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(()=> {
    get(`prueba/${auth.empresa_id}/`, {"Authorization":`Bearer ${auth.token}`})
    .then(res => {
      if(res.exito){
        console.log(res)
        setTechTests([...res.data])
      }
      setIsLoading(false)
    })
  }, [])

  return (

    <div className='flex flex-col items-center justify-center w-full mt-24 px-8 mb-4' >

      <div className='flex justify-between w-3/5 mb-4'>
        <h2 className='font-bold'>Pruebas Técnicas Registradas</h2>
        <Link to='/app/recruiter/createTest' className='px-2 bg-seventh text-white py-1'>Nueva Prueba</Link>
      </div> 

      {
        isLoading 
        ?  
          <div className='flex justify-center mt-8'>< Loading /></div>   
        :
          <>
            {
              techTests.map(cTest => (
              <>
                  <TestGrid key={cTest.id} cTest = {cTest} />
                </>
              ))
            }
          
          { techTests.length === 0 && <p>No tienes pruebas técnicas creadas</p> }
          </>
        
        }
      </div>  
    )
}

export default TechnicalTestView_Page