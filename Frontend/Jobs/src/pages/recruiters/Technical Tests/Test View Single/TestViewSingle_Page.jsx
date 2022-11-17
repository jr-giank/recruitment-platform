import React from 'react'
import { useContext } from 'react'
import { uid } from 'uid'
import { technicalTestContext } from '../../../../context/context'
import { Link } from 'react-router-dom'

import edit from '../../../../assets/icons/lapiz.png'

const TestViewSingle_Page = () => {

  const { techTest } = useContext(technicalTestContext)

  console.log(techTest)
  
  return (
    <div className='flex justify-center w-full mt-24 px-8' >
      <div className='w-3/5 mb-8'>

        <div className='flex justify-between'>
          <h2 className='font-bold font-poppins'>{techTest.titulo}</h2>
          <Link to='/app/recruiter/createTest' replace={true}>
            <img src={edit} alt="" className='w-10 h-10' title='Editar' />
          </Link>
        </div>
       
       <h4 className='mb-4'><strong>Vacante:</strong> {techTest.vacante.nombre_puesto}</h4>

        {
          techTest.mandato?.split("\n").map(text => (
            text === "" 
                ? 
                  <br key={uid()}/> 
                : 
                  <p key={uid()} className='text-justify'> {text} </p>
          ))
        }

        <h3 className='mb-1 font-bold font-poppins mt-4'> Tecnologías a utilizar </h3>
        {
          techTest.tecnologias?.split("\n").map(text => (
            text === "" 
                ? 
                  <br key={uid()}/> 
                : 
                  <p key={uid()} className='text-justify'> {text} </p>
          ))
        }

        <h3 className='mb-1 font-bold font-poppins mt-4'> ¿Cómo subir los resultados? </h3>
        {
          techTest.info_subida?.split("\n").map(text => (
            text === "" 
                ? 
                  <br key={uid()}/> 
                : 
                  <p key={uid()} className='text-justify'> {text} </p>
          ))
        }
      </div>
    </div>
  )
}

export default TestViewSingle_Page