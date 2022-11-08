import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Swal from 'sweetalert2'
import { authContext } from '../../../../../context/context'
import { useForm } from '../../../../../hooks/useForm'
import { post, put } from '../../../../../services/services'

const FormProjects = ({ onCloseModal, setCandidateData, currentDoc }) => {
  
  console.log(currentDoc)

  const [ formValues, handleInputChanges ] = useForm({
  nombre: currentDoc?.nombre || "",
    descripcion_proyecto: currentDoc?.descripcion || "",
    tecnologias: currentDoc?.tecnologias_utilizadas || "",
    fecha_creacion: currentDoc?.fecha_creacion || "",
    url_repositorio: currentDoc?.url_repositorio || "",
    url_demo: currentDoc?.url_demo || ""
  }) 

  const location = useLocation()

  const { auth } = useContext(authContext)

  const foto_proyecto = currentDoc.foto_proyecto 
                                        ? `http://127.0.0.1:8000${currentDoc.foto_proyecto}` 
                                        :  null

  const [ image, setImage ] = useState( foto_proyecto )
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

  const handleSubmit = (e) => {
    e.preventDefault()

    formValues.foto_proyecto = readedImage
    formValues.candidato_id = auth.candidato_id
    
    const dataToSend = new FormData()
    
    dataToSend.append("candidato", formValues.candidato_id)
    dataToSend.append("nombre", formValues.nombre)
    dataToSend.append("descripcion", formValues.descripcion_proyecto)
    dataToSend.append("tecnologias_utilizadas", formValues.tecnologias)
    dataToSend.append("fecha_creacion", formValues.fecha_creacion)
    dataToSend.append("url_demo", formValues.url_demo)
    dataToSend.append("url_repositorio", formValues.url_repositorio)
    dataToSend.append("foto_proyecto", formValues.foto_proyecto)

    let method;

    if(location.search){
      method = () => put(`proyecto/${currentDoc.id}/`,  {"Authorization":`Bearer ${auth.token}`}, dataToSend, true)
    }
    else{
      method = () => post('proyecto/',  {"Authorization":`Bearer ${auth.token}`}, dataToSend, true)
    }

    method()
    .then(res => {
      if(res.exito){
        
        const { data } = res
        onCloseModal()
        
        if(location.search){
          Swal.fire("Cambios guardados", "Cambios guardados exitosamente", "success")
          setCandidateData(
            currentData => ({...currentData, 
                          proyectos : currentData.proyectos.map(projecto => projecto.id === currentDoc.id ? data : projecto) }))
        }
        else{
          Swal.fire("Proyecto registrado", "Proyecto Registrado exitosamente", "success")
          setCandidateData(currentData => ({...currentData, proyectos : [...currentData.proyectos, data]}))
        }
      }
      else{
        Swal.fire("Error", "La información del proyecto no se pudo guardar correctamente", "error")
      }
    })
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
        type='text'
        id="" 
        value={formValues.url_repositorio} 
        onChange={handleInputChanges}  
        placeholder='URL del Repositorio'
      />
      
      <input 
        name="url_demo"
        type='text' 
        id="" 
        value={formValues.url_demo}
        onChange={handleInputChanges} 
        placeholder='URL del Demo'
      />

      <input 
        name="fecha_creacion" 
        type='date'
        id="" 
        value={formValues.fecha_creacion}
        onChange={handleInputChanges} 
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
        <button className='bg-seventh text-white py-2 rounded-md px-3' onClick={handleSubmit}>Agregar</button>
        <button className='bg-fifth  py-2 rounded-md px-3 ml-3'>Cancelar</button>
      </div>

    </form>
  )
}

export default FormProjects