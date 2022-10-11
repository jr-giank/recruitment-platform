import React, { useState } from 'react'
import bag from '../../../../assets/icons/maleta.png'
import check from '../../../../assets/icons/garrapata.png'
import xSymbol from '../../../../assets/icons/simbolo-x.png'
import sitOnPc from '../../../../assets/icons/lanza-libre.png'
import VacancyRequests from './VacancyRequests'
import { uid } from 'uid';

const VacancyDescription = ({vacancy}) => {
  
  const [ isVacancyReqOpen, setIsVacancyReqOpen ] = useState(false)

  const handleModalRequests = (e) => {
    e.preventDefault()
    setIsVacancyReqOpen(true)
    document.getElementById("portal").classList.add("modal_show-modal")
  }

  return (
    <>
      <div className='flex flex-col px-4 w-full mb-4'>

        <div>
          <h2 className='font-semibold mt-2'>{vacancy.nombre_puesto}</h2>
          <small>150 Solicitudes</small>
        </div>

        <div className='mt-2'>
          <p><strong>Categoria</strong>: Desarrollo Web </p> 
          <p className='flex items-center mt-2'>
            <strong>Requiere Experiencia: </strong> 
            {vacancy.experiencia} <img className='w-4 h-4 ml-2' src={vacancy.experiencia ? check : xSymbol } alt="" /> </p> 
          <p className='flex items-center mt-1'><img src={bag} className='w-5 h-5 mr-2' alt="" />{vacancy.tipo_trabajo}</p> 
          <p className='flex items-center mt-1'><img src={sitOnPc} className='w-5 h-5 mr-2' alt="" /> {vacancy.forma_trabajo} </p> 
        </div>

        <div className='mt-4'>
          <h4 className='font-semibold pb-2'>Descripción de la Vacante</h4>
          <p>
            Lorem isum lorem ipsum lorem ipsum lorem ipsum lorem ipsum llorem lorem lorem lorem lorem lorem lorem lorem lorem lorem orem lorem lorem lorem lorem lorem lorem lorem lorem lorem orem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem  orem 
          </p>
        </div>

        <div className='mt-4'>
          <h4 className='font-semibold pb-2'>Responsabilidades del Puesto</h4>
          <pre className='font-inter'>
            <ul className='list-disc pl-6 text-[14px]'>
              {
                vacancy?.responsabilidades_puesto?.split("\n").map(text => (
                  <li key={uid()}>{text}</li>
                ))
              }
            </ul>
          </pre>
        </div>

        <div className='mt-4'>
          <h4 className='font-semibold pb-2'>Requisitos del Puesto</h4>
          <ul className='list-disc pl-6 text-[14px]'>
            {
              vacancy?.requisitos_obligatorios?.split("\n").map(text => (
                <li key={uid()}>{text}</li>
              ))
            }
          </ul>
        </div>

        <div className='mt-4'>
          <h4 className='font-semibold pb-2'>Requisitos opcionales</h4>
          <ul className='list-disc pl-6 text-[14px]'>
            {
              vacancy?.requisitos_opcionales?.split("\n").map(text => (
                <li key={uid()}>{text}</li>
              ))
            }
          </ul>
        </div>

        <div className='mt-4'>
          <h4 className='font-semibold pb-2'>Beneficios del Puesto</h4>
          <ul className='list-disc pl-6 text-[14px]'>
            {
              vacancy?.beneficios?.split("\n").map(text => (
                <li key={uid()}>{text}</li>
              ))
            }
          </ul>
        </div>

        <div className='mt-4'>
          <h4 className='font-semibold pb-2'>Rango Salarial</h4>
            <p>RD${vacancy.salario_min} - RD${vacancy.salario_max} </p>
        </div>

        <div className='flex justify-center items-center w-full'>
          <button className='bg-secondary text-white rounded-md px-6 py-2' onClick={handleModalRequests}>Ver Solicitudes</button>
          <button className='bg-fourth text-white rounded-md px-6 ml-4 py-2'>Cerrar Vacantes</button>
        </div>
      </div>

      {
        isVacancyReqOpen && (
          <VacancyRequests setIsVacancyReqOpen={setIsVacancyReqOpen} id={vacancy.id} />
        )
      }
    </>
  )
}

export default VacancyDescription