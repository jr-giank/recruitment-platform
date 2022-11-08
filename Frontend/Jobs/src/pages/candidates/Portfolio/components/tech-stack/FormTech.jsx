import React from 'react'
import { useContext } from 'react'
import Swal from 'sweetalert2'
import { authContext } from '../../../../../context/context'
import { useForm } from '../../../../../hooks/useForm'
import { post } from '../../../../../services/services'

const FormTech = ({onCloseModal, setCandidateData}) => {

  const { auth } = useContext(authContext)

  const [ formValues, handleInputChange ] = useForm({
    nombre_tecnologia: "",
    nivel_conocimiento: ""
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    formValues.candidato = auth.candidato_id

    post('tecnologia/', {'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`}, formValues)
    .then(res => {
      if(res.exito){
        const { data } = res
        onCloseModal()
        setCandidateData(currentData => ({...currentData, tecnologias:[...currentData.tecnologias, data]}) )
        Swal.fire("Tecnología Registrada", "Herramienta agregada exitosamente", "success")
      }else{
        Swal.fire("Error al Registrar", "Ha habido un error al agregar la herramienta", "error")
      }
    })
  }

  return (
    <form className='flex flex-wrap justify-center w-full px-3'>
      <input 
        type="text" 
        name="nombre_tecnologia"
        placeholder='Tecnología o herramienta' 
        id="" 
        value={formValues.nombre_tecnologia}
        onChange={handleInputChange} 
      />
      <select name="nivel_conocimiento" className='ml-5' id="" value={formValues.nivel_conocimiento} onChange={handleInputChange}>
        <option value="" defaultValue={true}> Nivel de conocimiento</option>
        <option value="A"> Básico</option>
        <option value="B">Intermedio</option>
        <option value="C">Avanzado</option>
        <option value="D">Experto</option>
      </select>

    <div className='w-full flex mt-6 ml-8 text-[14px]'>
      <button className='bg-seventh text-white py-2 rounded-md px-3' onClick={handleSubmit}>Agregar</button>
      <button className='bg-fifth  py-2 rounded-md px-3 ml-3' onClick={onCloseModal}>Cancelar</button>
    </div>

    </form>
  )
}

export default FormTech