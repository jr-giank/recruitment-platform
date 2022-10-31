import React from 'react'
import { useState } from 'react'
import { useForm } from '../../../../../hooks/useForm'

const FormProjects = () => {
  
  const [ formValues, handleInputChanges ] = useForm({
    nombre: "",
    descripcion_proyecto:"",
    tecnologias:"",
    url_repositorio:"",
    url_demo:""
  }) 

  const [ image, setImage ] = useState(null)
  const [ readedImage, setReadedImage ] = useState(null)

   // IMAGE HANDLER
   const imageHandler = (e) =>{
    const reader = new FileReader();
    reader.onload = () => {
      reader.readyState === 2 && setImage(reader.result)
    }
    reader.readAsDataURL(e.target.files[0]);
    setReadedImage(e.target.files[0])
  }

  return (
    <form className='flex flex-col  px-3'>
      <input 
        type="text" 
        name="nombre" 
        id="" 
        value={formValues.nombre} 
        onChange={handleInputChanges}
        placeholder='Nombre del Proyecto' 
      />
      
      <textarea 
        name="descripcion_proyecto" 
        id=""  
        value={formValues.descripcion_proyecto}
        onChange={handleInputChanges}
        rows={6} 
        placeholder='Descripción del Proyecto' 
      />

      <textarea 
        name="tecnologias" 
        id="" 
        value={formValues.tecnologias} 
        onChange={handleInputChanges}
        rows={6}
        placeholder='Tecnologías Utilizadas'
      />
      
      <input 
        name="url_repositorio" 
        id="" 
        value={formValues.url_repositorio} 
        onChange={handleInputChanges}  
        placeholder='URL del Repositorio'
      />
      
      <input 
        name="url_demo" 
        id="" 
        value={formValues.url_demo}
        onChange={handleInputChanges} 
        placeholder='URL del Demo'
      />

      <div className='flex items-center ml-4'>
        <div className=' bg-fifth w-32 h-32 mt-4'>
         {image && <img src={image} alt="" className='w-full h-full' /> }
        </div>
       <label className='text-gray mt-5 pointer ml-4'>
          <input 
            type="file"
            name='profPicture'
            accept='image/*'
            className='hidden'
            onChange={imageHandler}
            />
          <p className='text-center cursor-pointer hover:underline'>Seleccionar imagen del proyecto</p> 
        </label>     
    </div>

      <div className='w-full flex mt-6 text-[14px]'>
        <button className='bg-seventh text-white py-2 rounded-md px-3'>Agregar</button>
        <button className='bg-fifth  py-2 rounded-md px-3 ml-3'>Cancelar</button>
      </div>

    </form>
  )
}

export default FormProjects