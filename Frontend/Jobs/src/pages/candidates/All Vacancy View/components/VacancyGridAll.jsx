import React from 'react'
import { Link } from 'react-router-dom'

const VacancyGridAll = ({vacancy}) => {

    const isServerUrl = vacancy.empresa.foto.includes("http://127.0.0.1:8000") ? true : false

  return (
    
    <div className='w-full border-solid border-2 border-fifth rounded-md mt-5 mb-5 pl-4 pr-4 py-4 '>

        <div className='flex gap-4'>
            <img className='w-24 ' src={isServerUrl ? vacancy.empresa.foto :`http://127.0.0.1:8000${vacancy.empresa.foto}`} alt="Scopic Software" />
        
            <div>
                <h4 className='font-bold text-xl'>{vacancy.nombre_puesto}             
                    <span className='border-solid border-2 border-nineth rounded bg-nineth m-2 text-sm'>{vacancy.tipo_trabajo}</span>
                    <span className='border-solid border-2 border-nineth rounded bg-nineth m-2 text-sm'>{vacancy.forma_trabajo}</span>
                </h4>
                <p className='text-base'>{vacancy.empresa.nombre}</p>
                <ul className='flex space-x-4'>
                    <li><h5 className='font-bold'>Ubicación</h5> {vacancy.empresa.pais}</li>
                    <li><h5 className='font-bold'>Publicado</h5>{vacancy.fecha}</li>
                    <li><h5 className='font-bold'>Categoria</h5>{vacancy.categoria.nombre}</li>
                </ul>
            </div>
        </div>

        <Link className='flex justify-center cursor-pointer w-full mt-5 p-2 hover:bg-secondary border-solid border-2 border-eighth rounded' to= {`/app/candidate/viewSingleVacancy/${vacancy.id}`} >Ver vacante</Link>  
    </div>

    

  )
}

export default VacancyGridAll