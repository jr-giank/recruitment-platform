import React, { useEffect, useState } from 'react'
import { validateCompanyRegistrationForm } from '../../../helpers/validators/validateCompanyRegistration'
import { useForm } from '../../../hooks/useForm'
import {  getCountries, post } from '../../../services/services'

import { useLogin } from '../../../hooks/useLogin'

const CompanyRegistrationPage = () => {

  const [ formValues, handleInputChanges ] = useForm({
    nombre:"",
    email: "",
    password: "",
    correo_vacantes: "",
    descripcion_empresa: "",
    telefono: "",
    pais: "",
    direccion: "",
    url_web: "",
    url_facebook: "",
    url_instagram: "",
    url_twitter: ""
  })

  const [ errors, setErrors ] = useState([
      {name:"nombre", message: null, touched: false},
      {name:"email", message: null, touched: false},
      {name:"password",message: null, touched: false},
      {name:"correo_vacantes", message: null, touched: false},
      {name:"descripcion_empresa",message: null, touched: false},
      {name:"direccion",message: null, touched: false},
      {name:"telefono",message: null},
      {name:"url_web",message: null},
      {name:"url_facebook",message: null},
      {name:"url_instagram",message: null,},
      {name:"url_twitter",message: null,},
      {name:"pais",message: null, touched: false},
  ]) 

  const [ image, setImage ] = useState(null)
  const [ readedImage, setReadedImage ] = useState(null)
  const [ isDisabled, setIsDisabled ] = useState(true)
  const [countries, setCountries ] = useState([])
  const [ currentSection, setCurrentSection ] = useState(1)

  const setLogged = useLogin()

  /* currentSection es la sección del formulario que se muestra: 
    1: Información de la cuenta
    2: Información de la compañía
    3: Foto de perfil de la compañía
  */
  
  useEffect(() => {
    // Peticion al servidor para traer los países
    getCountries().then(data => setCountries(data))
  }, [])

  useEffect(()=> {
    
    const remainingErrors = errors.filter(error => error.message !== null || error.touched === false)

    if(remainingErrors.length === 0 && image !== null){
      setIsDisabled(false)
    }

  }, [errors, image])

  // IMAGE HANDLER
  const imageHandler = (e) =>{
    const reader = new FileReader();
    reader.onload = () => {
      reader.readyState === 2 && setImage(reader.result)
    }
    reader.readAsDataURL(e.target.files[0]);
    setReadedImage(e.target.files[0])
  }

  const handleChangeSection = (e, forward) => {
    e.preventDefault()
    forward ? setCurrentSection(sect => sect + 1) : setCurrentSection(sect => sect - 1)
  }

  const handleOnBlur = (e) => {
    const error = validateCompanyRegistrationForm(e.target.name, e.target.value)

    setErrors([...errors.map(errorObject => (errorObject.name === e.target.name)
                                            ? {...errorObject, message: error, touched: true}
                                            : errorObject
                                        )])
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    formValues.foto = readedImage

    const dataToSend = new FormData()

    dataToSend.append("nombre", formValues.nombre)
    dataToSend.append("email", formValues.email)
    dataToSend.append("password", formValues.password)
    dataToSend.append("correo_vacantes", formValues.correo_vacantes)
    dataToSend.append("direccion", formValues.direccion)
    dataToSend.append("pais", formValues.pais)
    dataToSend.append("descripcion_empresa", formValues.descripcion_empresa)
    dataToSend.append("telefono", formValues.telefono)
    dataToSend.append("url_web", formValues.url_web)
    dataToSend.append("url_instagram", formValues.url_instagram)
    dataToSend.append("url_facebook", formValues.url_facebook)
    dataToSend.append("url_twitter", formValues.url_twitter)
    dataToSend.append("foto", formValues.foto)

    post('register/empresa/', {}, dataToSend, true)
    .then(data => {

      if(data.exito){
         setLogged({...data.token})
      }
    })

  }

  return (
    <form action="" className='w-full flex items-center justify-center pt-8 overflow-auto mt-20'>

        <div className='flex flex-col w-1/2 border bg-white border-fifth shadow-lg py-4 px-12 rounded-lg mb-12 min-w-[350px]'>
            <h1 className='text-center font-bold'>Nueva Cuenta</h1>

            {
              currentSection === 1 && 
           
              (<fieldset className='flex flex-col mt-4'>
                <h4 className='font-semibold'>Datos de la cuenta</h4>
                <input 
                    type="text" 
                    name="email" 
                    id="email" 
                    placeholder='Correo Electrónico'
                    className={`${errors[1].message !== null && 'border-fourth shadow-md'}`}
                    value={formValues.email}
                    onChange={handleInputChanges}
                    onBlur={handleOnBlur}
                  />
                  {errors[1].message !== null && <small className='text-fourth'>{errors[1]?.message}</small>}

                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder='Contraseña'
                    className={`${errors[2].message !== null && 'border-fourth shadow-md'}`}
                    value={formValues.password}
                    onChange={handleInputChanges}
                    onBlur={handleOnBlur}
                  />
                  {errors[2].message !== null && <small className='text-fourth'>{errors[2]?.message}</small>}
              </fieldset>              
             )}

             {
              currentSection === 2 &&

              (<fieldset className='flex flex-col mt-4'>
                <h4 className='font-semibold'>Datos de la empresa</h4>
                <input 
                    type="text" 
                    name="nombre" 
                    id="nombre" 
                    placeholder='Escriba el nombre de la empresa'
                    className={`${errors[0].message !== null && 'border-fourth shadow-md'}`}
                    value={formValues.nombre}
                    onChange={handleInputChanges}
                    onBlur={handleOnBlur}
                  />
                  {errors[0].message !== null && <small className='text-fourth'>{errors[0]?.message}</small>}

                <input 
                    type="text" 
                    name="correo_vacantes" 
                    id="correo_vacantes" 
                    placeholder='Correo Electrónico para Vacantes'
                    className={`${errors[3].message !== null && 'border-fourth shadow-md'}`}
                    value={formValues.correo_vacantes}
                    onChange={handleInputChanges}
                    onBlur={handleOnBlur}
                  />
                  {errors[3].message !== null && <small className='text-fourth'>{errors[3].message}</small>}
                
                <textarea  
                    name="descripcion_empresa" 
                    id="descripcion_empresa" 
                    placeholder='Descripción de la Empresa'
                    rows = '8'
                    className={`${errors[4].message !== null && 'border-fourth shadow-md'}`}
                    value={formValues.descripcion_empresa}
                    onChange={handleInputChanges}
                    onBlur={handleOnBlur}
                  />
                  {errors[4].message !== null && <small className='text-fourth'>{errors[4].message}</small>}

                  <select name="pais" 
                    className={`${errors[11].message !== null && 'border-fourth shadow-md'}`} 
                    onChange={handleInputChanges} value={formValues.pais} onBlur={handleOnBlur}
                  >
                      <option value="">País</option>
                      {
                        countries.map(country => (
                          <option key={country.name} value={country.name}>{country.name}</option>
                        ))
                      }
                  </select>
                  {errors[11].message !== null && <small className='text-fourth'>{errors[11].message}</small>}

                  <input 
                    type="text" 
                    name="direccion" 
                    id="direccion" 
                    placeholder='Ubicación de la Empresa'
                    className={`${errors[5].message !== null && 'border-fourth shadow-md'}`}
                    value={formValues.direccion}
                    onChange={handleInputChanges}
                    onBlur={handleOnBlur}
                  />
                  {errors[5].message !== null && <small className='text-fourth'>{errors[5].message}</small>}
                  
                  <input 
                    type="text" 
                    name="telefono" 
                    id="telefono" 
                    placeholder='Número de Teléfono'
                    className={`${errors[6].message !== null && 'border-fourth shadow-md'}`}
                    value={formValues.telefono}
                    onChange={handleInputChanges}
                    onBlur={handleOnBlur}
                  />
                  {errors[6].message !== null && <small className='text-fourth'>{errors[6].message}</small>}
                  
                  <input 
                    type="text" 
                    name="url_web" 
                    id="url_web" 
                    placeholder='URL de tu página Web'
                    className={`${errors[7].message !== null && 'border-fourth shadow-md'}`}
                    value={formValues.url_web}
                    onChange={handleInputChanges}
                    onBlur={handleOnBlur}
                  />
                  {errors[7].message !== null && <small className='text-fourth'>{errors[7].message}</small>}
                  
                  <input 
                    type="text" 
                    name="url_facebook" 
                    id="url_facebook" 
                    placeholder='URL de Facebook'
                    className={`${errors[8].message !== null && 'border-fourth shadow-md'}`}
                    value={formValues.url_facebook}
                    onChange={handleInputChanges}
                    onBlur={handleOnBlur}
                  />
                  {errors[8].message !== null && <small className='text-fourth'>{errors[8].message}</small>}

                  <input 
                    type="text" 
                    name="url_instagram" 
                    id="url_instagram" 
                    placeholder='URL de Instagram'
                    className={`${errors[9].message !== null && 'border-fourth shadow-md'}`}
                    value={formValues.url_instagram}
                    onChange={handleInputChanges}
                    onBlur={handleOnBlur}
                  />
                  {errors[9].message !== null && <small className='text-fourth'>{errors[9].message}</small>}

                  <input 
                    type="text" 
                    name="url_twitter" 
                    id="url_twitter" 
                    placeholder='URL de Twitter'
                    className={`${errors[10].message !== null && 'border-fourth shadow-md'}`}
                    value={formValues.url_twitter}
                    onChange={handleInputChanges}
                    onBlur={handleOnBlur}
                  />
                  {errors[10].message !== null && <small className='text-fourth'>{errors[10].message}</small>}
            </fieldset>
            )}

            {
              currentSection === 3 && (
                <fieldset className='flex flex-col mt-4'>
                  <h4 className='font-semibold'>Foto de Perfil empresarial</h4>
                  <div className='w-full flex justify-center mt-4'> 
                    <div className={`${!image &&  'bg-fifth'} rounded-full h-40 w-40`}>  
                    {image && <img src={image} className='h-full w-full' alt="" />} </div>
                  </div>

                  <label className='text-gray mt-5 pointer'>
                    <input 
                      type="file"
                      name='profPicture'
                      accept='image/*'
                      className='hidden'
                      onChange={imageHandler}
                    />
                    <p className='text-center cursor-pointer hover:underline'>Seleccionar foto</p> 
                  </label>      
                </fieldset>
              )
            }

            <div className='mt-8'>
            {
              currentSection > 1 && (
                <button 
                  className='text-seventh float-left ml-auto cursor-pointer hover:underline' 
                    onClick={(e)=>handleChangeSection(e, false)}
                >
                  Atrás
                </button>
              )
            }

            {
              currentSection < 3 && (
                <button 
                  className='text-seventh float-right text-right cursor-pointer hover:underline' 
                  onClick={(e)=>handleChangeSection(e, true)}
                >
                  Siguiente
                </button>
              )
            }
            </div>

            {
              currentSection === 3 && (
                <button 
                  className='mt-8 bg-primary rounded-md text-white py-1 text-lg cursor-pointer disabled:bg-sixth disabled:cursor-default'
                  disabled={isDisabled}
                  type='submit'
                  onClick={handleOnSubmit}
                >
                  Registrar
                </button>
              )
            }
        </div>
    </form>
  )
}

export default CompanyRegistrationPage