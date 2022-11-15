import React , { useContext, useState } from 'react'
import bag from '../../../../assets/icons/maleta.png'
import check from '../../../../assets/icons/garrapata.png'
import xSymbol from '../../../../assets/icons/simbolo-x.png'
import sitOnPc from '../../../../assets/icons/lanza-libre.png'
import Modal from './Modal'
import {uid} from 'uid'
import { post } from '../../../../services/services'
import { authContext } from '../../../../context/context'
import Swal from 'sweetalert2'

const VacancyDescriptionSingle = ({vacancy}) => {

  const [ isVacancyReqOpen, setIsVacancyReqOpen ] = useState([])
  const { auth } = useContext(authContext)

  const handleModalRequests = (e) => {
    e.preventDefault()
    setIsVacancyReqOpen(true)
    document.getElementById("portal").classList.add("modal_show-modal")
  }

   const handleSaveRequests = (e) => {
     
      const values = {
          vacante: vacancy.id,
          usuario: auth.user_id
      }
      
      post('vacante/guardar/', {'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`}, values)
        .then(data => {
          if(data.exito){
            Swal.fire("Vacante Guardada", "La vacante se ha guardado correctamente", "success")
          }else{
            Swal.fire("Error al guardar", "La vacante no pudo ser guardada. Intente nuevamente", "error")
          }
        })
  }

    return (
      <>
        <div className='flex flex-col px-4  w-full mb-20  border-solid border-2 border-tertiary rounded-md bg-eighth'>
    
          <div>
            <h2 className='font-semibold mt-2'>{vacancy.nombre_puesto}</h2>
            <small>150 Solicitudes</small>
          </div>
    
          <div className='mt-2 '>
            <p><strong>Categoria</strong>: {vacancy.categoria?.nombre} </p> 
            <p className='flex items-center mt-2'>
            <strong>Requiere Experiencia: </strong> 
            {vacancy.experiencia} <img className='w-4 h-4 ml-2' src={vacancy.experiencia ? check : xSymbol } alt="" /> </p> 
          <p className='flex items-center mt-1'><img src={bag} className='w-5 h-5 mr-2' alt="" />{vacancy.tipo_trabajo}</p> 
          <p className='flex items-center mt-1'><img src={sitOnPc} className='w-5 h-5 mr-2' alt="" /> {vacancy.forma_trabajo} </p> 
          </div>
    
          <div className='mt-4'>
            <h4 className='font-semibold pb-2'>Descripción de la Vacante</h4>
            <p>
               { vacancy?.empresa?.descripcion_empresa }
            </p>
          </div>
    
          <div className='mt-4'>
            <h4 className='font-semibold pb-2'>Responsabilidades del Puesto</h4>
            <pre className='font-inter'>
            <ul className='list-disc pl-6 text-[14px] '>
              {
                vacancy?.responsabilidades_puesto?.split("\n").map(text => (
                  <li className='whitespace-normal' key={uid()}>{text}</li>
                ))
              }
            </ul>
          </pre>
          </div>
    
          <div className='mt-4'>
            <h4 className='font-semibold pb-2'>Requisitos del Puesto</h4>
            <ul className='flex flex-col list-disc pl-6 text-[14px]'>
              {
                vacancy?.requisitos_obligatorios?.split("\n").map(text => (
                  <li className='whitespace-normal' key={uid()}>{text}</li>
                ))
              }
            </ul>
          </div>
    
    
          <div className='mt-4'>
            <h4 className='font-semibold pb-2'>Requisitos opcionales</h4>
            <ul className='flex flex-col list-disc pl-6 text-[14px]'>
              {
                vacancy?.requisitos_opcionales?.split("\n").map(text => (
                  <li className='whitespace-normal' key={uid()}>{text}</li>
                ))
              }
            </ul>
          </div>
    
          <div className='mt-4'>
            <h4 className='font-semibold pb-2'>Beneficios del Puesto</h4>
            <ul className='flex flex-col list-disc pl-6 text-[14px]'>
              {
                vacancy?.beneficios?.split("\n").map(text => (
                  <li className='whitespace-normal' key={uid()}>{text}</li>
                ))
              }
            </ul>
          </div>
    
          <div className='mt-4'>
            <h4 className='font-semibold pb-2'>Rango Salarial</h4>
              <p>RD${vacancy.salario_min} - RD${vacancy.salario_max}</p>
          </div>
    
          <div className='flex justify-center items-center w-full'>
          <button className='bg-secondary text-white rounded-md px-20 py-2 mb-6 mt-6 mx-4' onClick={handleModalRequests}>Solicitar Vacante</button>
             {/* habilitar el metodo handleSaveRequests */}
             <button className='bg-secondary text-white rounded-md px-20 py-2 mb-6 mt-6' onClick={handleSaveRequests} >Guardar Vacante</button>
          </div>
        </div>

          {
            isVacancyReqOpen && (
            <Modal setIsVacancyReqOpen={setIsVacancyReqOpen} vacancyId={vacancy.id} />
            )
          }
        </>
      )
}

export default VacancyDescriptionSingle