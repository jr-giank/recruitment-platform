import React from 'react'
import { Link } from 'react-router-dom'

const TechnicalTestGrid = ({test}) => {
  return (
    <div className='border-b w-full border-fifth pl-4 pr-4 py-4 '>

        <div className='flex gap-4'>
            <div className='flex flex-col'>
                <h4 className='font-bold'>{test?.prueba.vacante.empresa.nombre}</h4>
                <h3>
                    {test?.prueba.titulo}
                </h3>
                <p><strong>Fecha limite:</strong> {test?.fecha_limite}</p>
                <div className='mt-4'>
                    <Link className='justify-center text-[12px] border border-sixth rounded-lg cursor-pointer mr-3 mt-5 py-2 px-4 hover:bg-secondary ' to= {`/app/candidate/technicalTest/${test.prueba.id}`} >Ver prueba</Link> 
                </div>
            </div>
        </div>

    </div>
  )
}

export default TechnicalTestGrid