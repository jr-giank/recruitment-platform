import React from 'react'
import { useForm } from '../../../../../hooks/useForm'

const FormTech = () => {

  const [ formValues, handleInputChange ] = useForm({
    tecnologia_nombre: "",
    nivel_conocimiento: ""
  })

  return (
    <form className='flex flex-wrap justify-center w-full px-3'>
      <input 
        type="text" 
        name="tecnologia_nombre"
        placeholder='Tecnología o herramienta' 
        id="" 
        value={formValues.tecnologia_nombre}
        onChange={handleInputChange} 
      />
      <select name="nivel_conocimiento" className='ml-5' id="" value={formValues.nivel_conocimiento} onChange={handleInputChange}>
        <option value="" selected> Nivel de conocimiento</option>
        <option value="BASICO"> Básico</option>
        <option value="INTERMEDIO">Intermedio</option>
        <option value="AVANZADO">Avanzado</option>
        <option value="EXPERTO">Experto</option>
      </select>

    <div className='w-full flex mt-6 ml-8 text-[14px]'>
      <button className='bg-seventh text-white py-2 rounded-md px-3'>Agregar</button>
      <button className='bg-fifth  py-2 rounded-md px-3 ml-3'>Cancelar</button>
    </div>

    </form>
  )
}

export default FormTech