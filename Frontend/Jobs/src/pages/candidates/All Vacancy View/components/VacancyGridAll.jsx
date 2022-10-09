import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const VacancyGridAll = () => {
   const history = useNavigate()
   Link
  return (

    <div className='w-full border-solid border-2 border-fifth rounded-md mt-5 mb-5 pl-2 pr-2 py-4 '>

        <div className='flex gap-4'>
            <img className='w-24 ' src="https://emplea.do/img/logo.png" alt="Scopic Software" />
        
            <div>
                <h4 className='font-bold text-xl'>Remote Technical Lead             
                    <span className='border-solid border-2 border-nineth rounded bg-nineth m-2 text-sm'>Independiente</span>
                    <span className='border-solid border-2 border-nineth rounded bg-nineth m-2 text-sm'>Remoto</span>
                </h4>
                <p className='text-base'>Scopic Software</p>
                <ul className='flex space-x-4'>
                    <li><h5 className='font-bold'>Ubicación</h5> Spain</li>
                    <li><h5 className='font-bold'>Publicado</h5>29 septiembre de 2022</li>
                    <li><h5 className='font-bold'>Categoria</h5>Backend Developer</li>
                </ul>
            </div>
        </div>

        <Link className=' flex cursor-pointer w-full mt-5 p-2 hover:bg-secondary border-solid border-2 border-eighth rounded' to='/candidates/viewSingleVacancy' >Ver vacante</Link>  
    </div>

    

  )
}

export default VacancyGridAll