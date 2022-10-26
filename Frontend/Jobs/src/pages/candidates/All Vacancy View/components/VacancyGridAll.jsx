import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const VacancyGridAll = ({vacancy}) => {
   const history = useNavigate()
   Link
  return (

    //poner las variables que vienen de vacancy, pais ni fecha esta disponible, categoria viene en numero

    <div className='w-full border-solid border-2 border-fifth rounded-md mt-5 mb-5 pl-4 pr-4 py-4 '>

        <div className='flex gap-4'>
            <img className='w-24 ' src="https://i.pinimg.com/originals/82/48/3b/82483b829d1a39580360a6fef506072d.png" alt="Scopic Software" />
        
            <div>
                <h4 className='font-bold text-xl'>{vacancy.nombre_puesto}             
                    <span className='border-solid border-2 border-nineth rounded bg-nineth m-2 text-sm'>{vacancy.tipo_trabajo}</span>
                    <span className='border-solid border-2 border-nineth rounded bg-nineth m-2 text-sm'>{vacancy.forma_trabajo}</span>
                </h4>
                <p className='text-base'>{vacancy.empresa}</p>
                <ul className='flex space-x-4'>
                    <li><h5 className='font-bold'>Ubicación</h5> Spain</li>
                    <li><h5 className='font-bold'>Publicado</h5>{vacancy.fecha}</li>
                    <li><h5 className='font-bold'>Categoria</h5>Backend Developer</li>
                </ul>
            </div>
        </div>

        <Link className='flex justify-center cursor-pointer w-full mt-5 p-2 hover:bg-secondary border-solid border-2 border-eighth rounded' to= {`/app/candidate/viewSingleVacancy/${vacancy.id}`} >Ver vacante</Link>  
    </div>

    

  )
}

export default VacancyGridAll