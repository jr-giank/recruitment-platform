import React, { useContext } from 'react'
import  { Link, useNavigate } from 'react-router-dom'

import ModalDelete from './ModalDelete'

import { authContext, vacancyContext } from '../../../../context/context'

import bag from '../../../../assets/icons/maleta.png'
import check from '../../../../assets/icons/garrapata.png'
import xSymbol from '../../../../assets/icons/simbolo-x.png'
import sitOnPc from '../../../../assets/icons/lanza-libre.png'
import edit from '../../../../assets/icons/editar.png'
import remove from '../../../../assets/icons/eliminar.png'

import { uid } from 'uid';

import { f_delete, get, put } from '../../../../services/services'

import { types } from '../../../../reducers/types'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { useEffect } from 'react'

const VacancyDescription = ({vacancy, setVacancies, setCurrentVacancy}) => {

  const history = useNavigate()
  const { dispatch2 } = useContext(vacancyContext)
  const { auth } = useContext(authContext)
  
  const [ vacancyDelOpen, setIsVacancyDelOpen ] = useState(false)
  const [ requestAmount, setRequestAmount ] = useState(0)

  useEffect(()=> {
    get(`solicitudes/vacante/${vacancy.id}/`,   { "Authorization":`Bearer ${auth.token}` })
    .then(res => {
      if(res.exito){
        setRequestAmount(res.data.length)
      }
    })
  }, [])

  // Configuracion sobre salario
  let salary;

  if(vacancy.salario_max && vacancy.salario_min){
    salary = `RD$ ${vacancy.salario_min} -- RD$ ${vacancy.salario_max}`
  }
  else if(vacancy.salario_min && !vacancy.salario_max){
    salary = `RD$ ${vacancy.salario_min}`
  }
  else if(vacancy.salario_max && !vacancy.salario_min){
    salary = `RD$ ${vacancy.salario_max}`
  }
  else{
    salary = "No Disponible"
  }

  const handleCloseVacancy = (e) => {
    e.preventDefault()

    Swal.fire({
      title: "Cerrar Vacante",
      text : "¿Estás seguro de que deseas cerrar esta vacante? Esta acción es irreversible y ya no se podrán hacer mas solicitudes a esta vacante",
      icon: "warning",
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText : "Aceptar",
      denyButtonText: "Cancelar"
    })
    .then(result => {

      if(result.isConfirmed){
                put(`vacante/${vacancy.id}/`, 
                    {'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`}, 
                    {...vacancy, status: 'C', empresa: auth.empresa_id, categoria:1 } )
               .then(res => {
              if(res.exito){
                // La vacante cerrada se reflejará en el state de todas las vacantes
                setVacancies(currentData => currentData.map(cur => cur.id === res.data.id ? res.data : cur))
                Swal.fire("Cerrada", "La vacante ha sido cerrada")
              }
          })
      }
    })
  }

  const handleEditMode = (e) => {
    dispatch2({type: types.add, payload: {...vacancy, toEdit: true}})
    history({pathname :'/app/recruiter/createVacancy'})
  }
  
  const onHandleModal = (e) => {
    e.preventDefault()
    if(requestAmount > 0){
      setIsVacancyDelOpen(true)
      document.getElementById("portal").classList.add("modal_show-modal")
    }
    else{
      deleteWithNoRequests()
    }
  }

  const deleteWithNoRequests = () => {
    
    Swal.fire({
      title: "Eliminar Vacante",
      text : "¿Estás seguro de que deseas eliminar esta Vacante? Esta acción no se puede revertir",
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText : "Aceptar",
      denyButtonText: "Cancelar"
    })
    .then(result => {
      if(result.isConfirmed){
              f_delete(`vacante/${vacancy.id}/`, 
                    { 'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`}, 
                    {
                      usuario: "",
                      texto: "",
                      motivo_mensaje: ""
                    })
              .then(res => {
                if(res.exito){
                  Swal.fire("Vacante eliminada", "La vacante ha sido eliminada")
                  setVacancies(vacancies => vacancies.filter(vac => vac.id !== vacancy.id))
                  setCurrentVacancy(null)
                }
                else{
                  Swal.fire("Error al eliminar Vacante", "La Vacante no pudo ser eliminada", "error")
                  console.log(res)
                }
              })
      }
    })

  }

  return (
    <>
      <div className='flex flex-col px-4 w-full mb-4'>

      <div className='w-full flex justify-between mt-2'>
          <span>
            <h2 className='font-semibold'>{vacancy.nombre_puesto}</h2>
            <small>{requestAmount} solicitudes</small>
          </span>
          <div className='mt-2'>
            <button onClick={handleEditMode}><img src={edit} alt="" className='w-6 h-6' /></button>
            <button><img src={remove} alt="" className='w-6 h-6 ml-4' onClick={onHandleModal} /></button>
          </div>
      </div>

        <div className='mt-2'>
          <p><strong>Categoria</strong>: {vacancy.categoria.nombre} </p> 
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

        <div className='mt-4 w-full'>
          <h4 className='font-semibold pb-2'>Responsabilidades del Puesto</h4>
          
            <pre className='font-inter'>
              <ul className='list-disc pl-6 text-[14px] w-full'>
                {
                  vacancy?.responsabilidades_puesto?.split("\n").map(text => (
                    <li className='whitespace-normal' key={uid()}><p>{text}</p></li>
                  ))
                }
              </ul>
            </pre>
          
        </div>

        <div className='mt-4'>
          <h4 className='font-semibold pb-2'>Requisitos del Puesto</h4>
          <ul className='list-disc pl-6 text-[14px] word-wrap'>
            {
              vacancy?.requisitos_obligatorios?.split("\n").map(text => (
                <li className='whitespace-normal' key={uid()}>{text}</li>
              ))
            }
          </ul>
        </div>

            <div className='mt-4'>
              <h4 className='font-semibold pb-2'>Requisitos opcionales</h4>
        {
          vacancy.requisitos_opcionales ? 
              <ul className='list-disc pl-6 text-[14px]'>
                {
                  vacancy?.requisitos_opcionales?.split("\n").map(text => (
                    <li className='whitespace-normal' key={uid()}>{text}</li>
                    ))
                }
              </ul>
          : <p>No Disponible</p>
        }
        </div>

          <div className='mt-4'>
          <h4 className='font-semibold pb-2'>Beneficios del Puesto</h4>
        {
          vacancy.beneficios ?
              <ul className='list-disc pl-6 text-[14px]'>
                {
                  vacancy?.beneficios?.split("\n").map(text => (
                    <li className='whitespace-normal' key={uid()}>{text}</li>
                  ))
                }
              </ul>
            : <p>No Disponible</p>
          }
          </div>

        <div className='mt-4'>
          <h4 className='font-semibold pb-2'>Rango Salarial</h4>
            <p>{salary}</p>
        </div>

        <div className='mt-4'>
          <h4 className='font-semibold pb-2'>Horario de Trabajo</h4>
            <p>{vacancy.horario_trabajo}</p>
        </div>

        <div className='flex justify-center items-center w-full'>
          
          <Link to={`/app/recruiter/viewVacancyRequests/${vacancy.id}/${vacancy.nombre_puesto}`} className='bg-secondary text-white rounded-md px-6 py-2'>
            Ver Solicitudes
          </Link>
          
          {
            vacancy.status === "ABIERTA" && 
              <button className='bg-fourth text-white rounded-md px-6 ml-4 py-2' onClick={handleCloseVacancy}>
                Cerrar Vacante
              </button>
          }
        </div>
      </div>
      {
       vacancyDelOpen && <ModalDelete 
                            setVacancies={setVacancies} 
                            setIsVacancyDelOpen={setIsVacancyDelOpen} 
                            vacancy={vacancy} 
                            setCurrentVacancy={setCurrentVacancy} 
                          /> 
      }
    </>
  )
}

export default VacancyDescription