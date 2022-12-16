import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import { authContext } from '../../../../../context/context'
import { useForm } from '../../../../../hooks/useForm'
import { get, post } from '../../../../../services/services'
import { BASE_URL_FILES } from '../../../../../constants/baseURL'

const AssignTest = ({candidate, vacancyId, setCurrentModalSection}) => {

  const { auth } = useContext(authContext)
  const [ tests, setTests ] = useState([]) 

  const [ formValues, handleInputChanges ] = useForm({
    candidato: candidate.id,
    prueba: "",
    fecha_limite: ""
  }) 

  useEffect(() => {
    get(`prueba/${auth.empresa_id}/`,  {"Authorization":`Bearer ${auth.token}`} )
    .then(res => {
      if(res.exito){
        setTests([...res.data.filter(cTest => cTest.vacante.id === parseInt(vacancyId))])
      }
    })

  }, [])

  const handleGoBack = (e) => {
    e.preventDefault()
    setCurrentModalSection(1)
  }

  const handleSubmit=(e) => {
    e.preventDefault()

    if(formValues.prueba === "" || formValues.fecha_limite === ""){
      Swal.fire("Campos incompletos", "Asegurese de llenar los campos correctamebte", "error")
      return
    }

    post('prueba/asignada/', {'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`},  formValues)
    .then(res => {
      if(res.exito){
        Swal.fire("Asignación completada", "La prueba técnica ha sido asignada exitosamente", "success")
        setCurrentModalSection(1)
      }else{
        Swal.fire("Error al registrar asignación", "La prueba técnica no pudo ser asignada. Posiblemente ya ha asignado esta prueba anteriormente al candidato. De no ser así, intente nuevamente", "error")
      }
    }).catch(e => {
      Swal.fire("Error", "Hubo un error al conectarse al servidor", "error")
    })
  }

  return (
    <>
    <div className='flex items-center px-8 mt-4'>    
      <img  
        src={`${BASE_URL_FILES}${candidate.foto}`} alt={`${candidate.nombre} ${candidate.apellido}` } 
        className='w-16 h-16 rounded-full' 
      />
      <h5 className='font-semibold ml-4'>{candidate.nombre} {candidate.apellido}</h5>
    </div>
      <form className='flex flex-col w-full px-8 justify-between h-4/5' action="">
        <div className='flex flex-col'>
            <select name="prueba" value={formValues.prueba} onChange={handleInputChanges}>
                <option value="">Prueba Técnica a Realizar</option>
                {
                  tests.map(cTest => (
                    <option key={cTest.id} value={cTest.id}>{cTest.titulo}</option> 
                    ))
                }
            </select>

            <div className='flex flex-col mt-3'>
                <label htmlFor="testDeadline" className='font-semibold'>
                    Fecha Límite de entrega
                </label>
                <input type="date" name="fecha_limite" value={formValues.fecha_limite} onChange={handleInputChanges} id="testDeadline" />
            </div>

          </div>

          <div className='ml-auto'>
            <button className='bg-seventh text-white py-1 px-2 rounded-md' onClick={handleSubmit}>
              Asignar
            </button>
            <button className='bg-fifth  py-1 px-2 rounded-md ml-2' onClick={handleGoBack}>
              Volver
            </button>
          </div>
      </form>
    </>
  )
}

export default AssignTest