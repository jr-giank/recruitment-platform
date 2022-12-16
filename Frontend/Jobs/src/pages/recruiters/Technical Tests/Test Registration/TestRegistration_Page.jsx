import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'

import { authContext, technicalTestContext } from '../../../../context/context'
import { useForm } from '../../../../hooks/useForm'
import { get, post, put } from '../../../../services/services'
import { types } from '../../../../reducers/types'

import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

const TestRegistration_Page = () => {
 
  const { techTest, dispatch } = useContext(technicalTestContext)
  const { auth } = useContext(authContext)

  const history = useNavigate()

  const [ formValues, handleInputChanges ] = useForm({
    empresa:     auth.empresa_id,
    titulo:      techTest.toEdit ? techTest.titulo      :  "",
    mandato:     techTest.toEdit ? techTest.mandato     :  "",
    tecnologias: techTest.toEdit ? techTest.tecnologias :  "",
    info_subida: techTest.toEdit ? techTest.info_subida :  "",
    vacante:     techTest.toEdit ? techTest.vacante.id  : ""
  })

  const [ vacancies, setVacancies ] = useState([])

  useEffect(()=> {
    get(`vacantes/empresa/${auth.empresa_id}/`, {"Authorization":`Bearer ${auth.token}`})
    .then(res => {
      if(res.exito){
        setVacancies([...res.data])
      }
    })

  }, [])

  useEffect(()=>{ 
    return()=> {
      dispatch({type: types.remove})
    }
  }, [])

  const handleOnSubmit = (e) => {
    e.preventDefault()

    let method;

        // Encapsular el método de peticion correspondiente 
        if(techTest.toEdit){
          method = () => put(`prueba/${auth.empresa_id}/`, 
                              {'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`},  
                              formValues
                            ) 
        } 
        else{
          method = () =>  post(`prueba/`,{'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`},  formValues)
        }
    
          method()
            .then((data) => {
              if(data.status === 200){
                history('/app/recruiter/viewTests')
                Swal.fire("Cambios guardados", "La información ha sido guardada exitosamente", 'success')
              }
              else{
                Swal.fire("Error al guardar cambios", "Los cambios no se pudieron guardar correctamente", "error")
                console.log(data)
              }
          }).catch(e => {
            Swal.fire("Error", "Hubo un error al conectarse al servidor", "error")
          })   
      }

  return (
    <div className='w-full flex items-center justify-center pt-8 mt-16'>
      <form action="" className='flex flex-col w-[70%] border bg-white  border-fifth shadow-lg py-4 px-12 rounded-lg min-w-[350px] mb-12'>

          <h1 className='text-center font-bold'>Prueba Técnica</h1>

          <input 
            type="text" 
            name="titulo" 
            placeholder='Título de la Prueba' 
            autoComplete='off'
            value={formValues.titulo}  
            onChange={handleInputChanges}
          />

          <select name="vacante" value={formValues.vacante} onChange={handleInputChanges}>
            <option value="" defaultValue={true}>Seleccione la Vacante Correspondiente</option>

            {
              vacancies.map(vac => (
                <option value={vac.id} key={vac.id} >
                  {vac.nombre_puesto}
                </option>
              ))
            }
          </select>

          <textarea 
              rows='12' 
              name="mandato" 
              placeholder='Instrucciones de la prueba Técnica'
              value={formValues.mandato}
              onChange={handleInputChanges}
            />

          <textarea 
              rows='8' 
              name="tecnologias" 
              placeholder='Tecnologías a Utilizar'
              value={formValues.tecnologias}
              onChange={handleInputChanges}
            />

          <textarea 
              rows='8' 
              name="info_subida" 
              placeholder='Información sobre como subir la prueba'
              value={formValues.info_subida}
              onChange={handleInputChanges}
            />

          <button 
              className='mt-8 bg-primary rounded-md text-white py-1 text-lg cursor-pointer disabled:bg-sixth disabled:cursor-default'
              type='submit'
              onClick={handleOnSubmit}
            >
              {techTest.toEdit ? 'Guardar Cambios' : 'Registrar' } 
            </button>

      </form>
    </div>
  )
}

export default TestRegistration_Page