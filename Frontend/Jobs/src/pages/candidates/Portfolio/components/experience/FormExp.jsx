import React from 'react'
import { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { authContext } from '../../../../../context/context'
import { useForm } from '../../../../../hooks/useForm'
import { post, put } from '../../../../../services/services'

const FormExp = ({onCloseModal, setCandidateData, currentDoc}) => {

  const [ formValues, handleInputChanges ] = useForm({
    nombre_empresa:    currentDoc?.nombre_empresa || "",
    nombre_puesto:     currentDoc?.nombre_puesto || "",
    responsabilidades: currentDoc?.responsabilidades ||"",
    fecha_inicio :     currentDoc?.fecha_inicio || "",
    fecha_final :      currentDoc?.fecha_final || ""
  })

  const location = useLocation()

  const { auth } = useContext(authContext)

  const handleSubmit = (e) => {
    e.preventDefault()
    formValues.candidato = auth.candidato_id;

    let method;

    if(location.search){
      method = () => put(`experiencia/${currentDoc.id}/`,  {'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`}, formValues)
    }
    else{
      method = () => post('experiencia/',  {'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`}, formValues)
    }

    method()
    .then(res => {
      if(res.exito){
        const { data } = res
        onCloseModal()

        if(location.search){
          setCandidateData(
            currentData => ({...currentData, 
                          experiencia_laboral : currentData.experiencia_laboral.map(exp => exp.id === currentDoc.id ? data : exp) }))
        }
        else{
          setCandidateData(currentData => ({...currentData, experiencia_laboral : [...currentData.experiencia_laboral, data]}))
        }
      }

    })
  }

  return (
    <form className='flex flex-col px-3'>
      <input type="text" name="nombre_empresa" value={formValues.nombre_empresa} onChange={handleInputChanges} id="" placeholder='Nombre de la Empresa' />
      <input type="text" name="nombre_puesto" value={formValues.nombre_puesto} onChange={handleInputChanges} id="" placeholder='Puesto de Trabajo' />
      <textarea name="responsabilidades" value={formValues.responsabilidades} onChange={handleInputChanges} id="" placeholder='Responsabilidades y funciones' rows={7} />

     <div className='flex mt-4'>

        <div className='flex flex-col'>
          <label htmlFor="" className='font-bold'>Fecha de Inicio</label>
          <input name='fecha_inicio' type="date" value={formValues.fecha_inicio}  onChange={handleInputChanges} />
        </div>
        
        <div className='flex flex-col ml-4'>
          <label htmlFor="" className='font-bold'>Fecha de término</label>
          <input name='fecha_final' type="date" value={formValues.fecha_termino} onChange={handleInputChanges} />
        </div>
      </div>

      <div className='w-full flex mt-6 text-[14px]'>

        <button className='bg-seventh text-white py-2 rounded-md px-3' onClick={handleSubmit}>
          {location.search ? 'Guardar Cambios' : 'Agregar'}
        </button>
        <button className='bg-fifth  py-2 rounded-md px-3 ml-3' onClick={onCloseModal}>Cancelar</button>
      </div>

    </form>
  )
}

export default FormExp