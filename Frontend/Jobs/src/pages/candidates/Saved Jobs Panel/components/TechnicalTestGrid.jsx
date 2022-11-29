import React from 'react'
import {  useNavigate } from 'react-router-dom'

const TechnicalTestGrid = ({test}) => {

    const history =  useNavigate()

    const handleNavigate = (e) => {
        e.preventDefault()
        history(`/app/candidate/technicalTest/${test.id}`)
    }

    return (
    <div className='border-b w-full border-fifth pl-4 pr-4 py-4 '>

        <div className='flex gap-4'>
            <div className='flex'>
                <img src={`http://127.0.0.1:8000${test?.prueba.vacante.empresa.foto}` } className='w-14 h-14 rounded-full mr-3' alt="" />  
                
                <div className='flex flex-col'>
                    <h4 className='font-bold'>{test?.prueba.vacante.empresa.nombre}</h4>
                    <h3>
                        {test?.prueba.titulo}
                    </h3>
                    <p><strong>Fecha limite:</strong> {test?.fecha_limite}</p>
                    {test.status === "Finalizada" &&  <p className='mt-1'>Prueba Finalizada</p>}
                    <div className='mt-4'>
                        <button className='justify-center text-[12px] border border-sixth rounded-lg cursor-pointer mr-3  py-2 px-4 hover:bg-secondary ' onClick={handleNavigate} >Ver prueba</button> 
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default TechnicalTestGrid