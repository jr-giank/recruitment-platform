import React from 'react'
import bag from '../../../../assets/icons/maleta.png'
import check from '../../../../assets/icons/garrapata.png'
import xSymbol from '../../../../assets/icons/simbolo-x.png'
import sitOnPc from '../../../../assets/icons/lanza-libre.png'

const VacancyDescription = () => {
  return (
    <div className='flex flex-col px-4 w-full mb-20'>

      <div>
        <h2 className='font-semibold mt-2'>Desarrollador Web</h2>
        <small>150 Solicitudes</small>
      </div>

      <div className='mt-2'>
        <p><strong>Categoria</strong>: Desarrollo Web </p> 
        <p className='flex items-center mt-2'><strong>Requiere Experiencia</strong> : Si <img className='w-5 h-5 ml-2' src={check} alt="" /> </p> 
        <p className='flex items-center mt-1'><img src={bag} className='w-5 h-5 mr-2' alt="" />Jornada Completa</p> 
        <p className='flex items-center mt-1'><img src={sitOnPc} className='w-5 h-5 mr-2' alt="" /> Remoto </p> 
      </div>

      <div className='mt-4'>
        <h4 className='font-semibold pb-2'>Descripción de la Vacante</h4>
        <p>
          Lorem isum lorem ipsum lorem ipsum lorem ipsum lorem ipsum llorem lorem lorem lorem lorem lorem lorem lorem lorem lorem orem lorem lorem lorem lorem lorem lorem lorem lorem lorem orem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem  orem 
        </p>
      </div>

      <div className='mt-4'>
        <h4 className='font-semibold pb-2'>Responsabilidades del Puesto</h4>
        <p>
          Lorem isum lorem ipsum lorem ipsum lorem ipsum lorem ipsum llorem lorem lorem lorem lorem lorem lorem lorem lorem lorem orem lorem lorem lorem lorem lorem lorem lorem lorem lorem orem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem  lorem 
        </p>
      </div>

      <div className='mt-4'>
        <h4 className='font-semibold pb-2'>Requisitos del Puesto</h4>
        <ul className='flex flex-col list-disc pl-6'>
          <li><p className='text-[14px]'>React Js</p> </li>
          <li><p>2 años de experiencia en Angular</p> </li>
          <li><p>API REST en ASP.NET</p> </li>
          <li><p>Git</p> </li>
          <li><p>Inglés Avanzado</p> </li>
        </ul>
      </div>


      <div className='mt-4'>
        <h4 className='font-semibold pb-2'>Requisitos opcionales</h4>
        <ul className='flex flex-col list-disc pl-6'>
          <li> <p>Experiencia en AWS</p> </li>
          <li> <p>Conocimientos en Docker</p> </li>
          <li> <p>Conocimientos en PHP</p> </li>
        </ul>
      </div>

      <div className='mt-4'>
        <h4 className='font-semibold pb-2'>Beneficios del Puesto</h4>
        <ul className='flex flex-col list-disc pl-6'>
          <li> <p>Plan de Seguro médico</p> </li>
          <li> <p>1 mes de vacaciones al año</p> </li>
          <li> <p>Suscripción a un Gimnasio</p> </li>
        </ul>
      </div>

      <div className='mt-4'>
        <h4 className='font-semibold pb-2'>Rango Salarial</h4>
          <p>RD$75,000 - RD$95,000</p>
      </div>

      <div className='flex justify-center items-center w-full'>
         <button className='bg-secondary text-white rounded-md px-6 py-2'>Ver Solicitudes</button>
         <button className='bg-fourth text-white rounded-md px-6 ml-4 py-2'>Cerrar Vacantes</button>
      </div>
    </div>
  )
}

export default VacancyDescription