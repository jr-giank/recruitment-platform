import React, { useEffect, useState } from 'react'
import { useForm } from '../../../hooks/useForm'
import {validateCandidatesRegistrationForm} from '../../../helpers/validators/validateCandidatesRegistration'
import { get, getCountries } from '../../../services/services'

const CandidatesRegistrationPage = () => {

    const [ formValues, handleInputChanges ] = useForm({
        name:"",
        lastName:"",
        sex: "",
        email: "",
        password: "",
        birthday: "",
        phoneNumber: "",
        pais: "",
        ocupation:""
      })

      const [ errors, setErrors ] = useState([
        {name:"name", message: null, touched: false},
        {name:"lastName", message: null, touched: false},
        {name:"email", message: null, touched: false},
        {name:"password",message: null, touched: false},
        {name:"sex",message: null, touched: false},
        {name:"ocupation",message: null, touched: false},
        {name:"phoneNumber",message: null},
        {name:"birthday",message: null},
        {name:"pais",message: null, touched: false},
    ]) 
  
    const [ image, setImage ] = useState(null)
    const [ readedImage, setReadedImage ] = useState(null)
    const [ isDisabled, setIsDisabled ] = useState(true)
    const [countries, setCountries ] = useState([])
    const [ currentSection, setCurrentSection ] = useState(1)
  
    /* currentSection es la sección del formulario que se muestra: 
  
      1: Información de la cuenta
      2: Información del usuario
      3: Foto de perfil del usuario
  
    */
  
    useEffect(() => {
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
        const error = validateCandidatesRegistrationForm(e.target.name, e.target.value)
    
        setErrors([...errors.map(errorObject => (errorObject.name === e.target.name)
                                                ? {...errorObject, message: error, touched: true}
                                                : errorObject
                                            )])
      }
    
      const handleOnSubmit = (e) => {
        //Implementar el radio button
        e.preventDefault()
        formValues.image = readedImage
      }

    return(
        <form action="" className='w-full flex items-center justify-center pt-8 overflow-auto mt-20'>

        <div className='flex flex-col w-1/2 border border-fifth shadow-lg py-4 px-12 rounded-lg mb-12 min-w-[350px]'>
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
                    className={`${errors[2].message !== null && 'border-fourth shadow-md'}`}
                    value={formValues.email}
                    onChange={handleInputChanges}
                    onBlur={handleOnBlur}
                  />
                  {errors[2].message !== null && <small className='text-fourth'>{errors[2]?.message}</small>}

                <input 
                    type="password" 
                    name="password" 
                    id="password" 
                    placeholder='Contraseña'
                    className={`${errors[3].message !== null && 'border-fourth shadow-md'}`}
                    value={formValues.password}
                    onChange={handleInputChanges}
                    onBlur={handleOnBlur}
                  />
                  {errors[3].message !== null && <small className='text-fourth'>{errors[3]?.message}</small>}
              </fieldset>              
             )}

             {
              currentSection === 2 &&

              (<fieldset className='flex flex-col mt-4'>
                <h4 className='font-semibold'>Datos Personales</h4>
                <input 
                    type="text" 
                    name="name" 
                    id="name" 
                    placeholder='Escriba su nombre'
                    className={`${errors[0].message !== null && 'border-fourth shadow-md'}`}
                    value={formValues.name}
                    onChange={handleInputChanges}
                    onBlur={handleOnBlur}
                  />
                  {errors[0].message !== null && <small className='text-fourth'>{errors[0]?.message}</small>}

                <input 
                    type="text" 
                    name="lastName" 
                    id="lastName" 
                    placeholder='Escriba su apellido'
                    className={`${errors[1].message !== null && 'border-fourth shadow-md'}`}
                    value={formValues.apellido}
                    onChange={handleInputChanges}
                    onBlur={handleOnBlur}
                  />
                  {errors[1].message !== null && <small className='text-fourth'>{errors[1].message}</small>}
                
                <fieldset className='mt-2'>
                    <legend className='font-semibold'>Sexo</legend>
                    <span className=''>
                        <input 
                        type="radio"
                        name="sex" 
                        id="Fem"
                        value={'F'}
                        checked={formValues.sex === 'F'} 
                        onChange={handleInputChanges}
                        />
                        <label className={`${errors[4].message !== null && 'border-fourth shadow-md'}`} htmlFor="F">F</label>
                    </span>

                    <span className='ml-4'>
                        <input
                        type="radio" 
                        name="sex"
                        id="Male" 
                        value={'M'}
                        checked={formValues.sex === 'M'} 
                        onChange={handleInputChanges} 
                        />
                        <label className={`${errors[4].message !== null && 'border-fourth shadow-md'}`} htmlFor="M">M</label>
                    </span>
                </fieldset>
                  {errors[4].message !== null && <small className='text-fourth'>{errors[4].message}</small>}

                  <select name="pais" 
                    className={`${errors[8].message !== null && 'border-fourth shadow-md'}`} 
                    onChange={handleInputChanges} value={formValues.pais} onBlur={handleOnBlur}
                  >
                      <option value="">País</option>
                      {
                        countries.map(country => (
                          <option key={country.name} value={country.name}>{country.name}</option>
                        ))
                      }
                  </select>
                  {errors[8].message !== null && <small className='text-fourth'>{errors[8].message}</small>}

                  <input 
                    type="text" 
                    name="ocupation" 
                    id="ocupation" 
                    placeholder='ocupacion'
                    className={`${errors[5].message !== null && 'border-fourth shadow-md'}`}
                    value={formValues.ocupation}
                    onChange={handleInputChanges}
                    onBlur={handleOnBlur}
                  />
                  {errors[5].message !== null && <small className='text-fourth'>{errors[5].message}</small>}
                  
                  <input 
                    type="text" 
                    name="phoneNumber" 
                    id="phoneNumber" 
                    placeholder='Número de Teléfono'
                    className={`${errors[6].message !== null && 'border-fourth shadow-md'}`}
                    value={formValues.phoneNumber}
                    onChange={handleInputChanges}
                    onBlur={handleOnBlur}
                  />
                  {errors[6].message !== null && <small className='text-fourth'>{errors[6].message}</small>}
                  
                  
                  
            </fieldset>
            )}

            {
              currentSection === 3 && (
                <fieldset className='flex flex-col mt-4'>
                  <h4 className='font-semibold'>Foto de Perfil</h4>
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

export default CandidatesRegistrationPage