import React from 'react'
import { useForm } from '../../../../../hooks/useForm'

const FormExp = () => {

  const [ formValues, handleInputChanges ] = useForm({
    empresa: "",
    puesto:"",
    responsabilidades : "",
    fecha_inicio : "",
    fecha_final : ""
  })

  return (
    <form className='flex flex-col px-3'>
      <input type="text" name="empresa" value={formValues.empresa} onChange={handleInputChanges} id="" placeholder='Nombre de la Empresa' />
      <input type="text" name="puesto" value={formValues.puesto} onChange={handleInputChanges} id="" placeholder='Puesto de Trabajo' />
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
        <button className='bg-seventh text-white py-2 rounded-md px-3'>Agregar</button>
        <button className='bg-fifth  py-2 rounded-md px-3 ml-3'>Cancelar</button>
      </div>

    </form>
  )
}

export default FormExp