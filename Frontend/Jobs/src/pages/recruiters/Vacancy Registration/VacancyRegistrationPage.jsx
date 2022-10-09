import React, { useEffect, useState } from 'react'
import { validateVacancyForm } from '../../../helpers/validators/ValidateVacancyRegistration'
import { useForm } from '../../../hooks/useForm'

const VacancyRegistrationPage = () => {

  const [ formValues, handleInputChanges, handleCheckChanges ] = useForm({
    vacancyName:"Desarrollador Backend Java",
    category: "Desarrollo Backend",
    jobType: "Tiempo Completo",
    jobWay: "Remoto",
    experience: "Si",
    duties: "Crear API REST.\nMantenimiento de componentes ya existentes.",
    requirements: "5 años de experiencia en Java.\nPor lo menos un año de experiencia en HTML, CSS y JS.\nConocimiento de algún framework como React o Angular\nGit\nMetodología Scrum",
    optional: "Manejo de Docker\nConocimientos de AWS",
    benefits: "Plan de seguro médico familiar. \n1 mes de vacaciones al año.",
    beginTime: "08:00",
    endTime: "16:00",
    salaryFrom:75000,
    salaryTo: 95000,
    companyDescription: true
  })

  const [ errors, setErrors ] = useState([
      {name:"vacancyName", message: null, touched: false},
      {name:"category", message: null, touched: false},
      {name:"jobType", message: null, touched: false},
      {name:"jobWay",message: null, touched: false},
      {name:"duties",message: null, touched: false},
      {name:"requirements",message: null, touched: false},
  ]) 

  const [ isDisabled, setIsDisabled ] = useState(true)

  useEffect(()=> {
    
    const remainingErrors = errors.filter(error => error.message !== null || error.touched === false)
    
    if(remainingErrors.length === 0){
      setIsDisabled(false)
    }
    
  }, [errors])

  const handleOnSubmit = (e) => {
    e.preventDefault()
  }

  const handleOnBlur = (e) =>{
    const error = validateVacancyForm(e.target.name, e.target.value)

    setErrors([...errors.map(errorObject => (errorObject.name === e.target.name)
                                            ? {...errorObject, message: error, touched: true}
                                            : errorObject
                                        )])
    }

  return (
    <>
      <form action="" className='w-full flex items-center justify-center pt-8 overflow-auto mt-20'>
          
          <div className='flex flex-col w-1/2 border border-fifth shadow-lg py-4 px-12 rounded-lg mb-12 min-w-[350px]'>
            <h1 className='text-center font-bold'>Nueva Vacante</h1>

              <input 
                type="text" 
                name="vacancyName" 
                id="vacancyNameInp" 
                placeholder='Nombre del Puesto'
                className={`${errors[0].message !== null && 'border-fourth shadow-md'}`}
                value={formValues.vacancyName}
                onChange={handleInputChanges}
                onBlur={handleOnBlur}
              />
              {errors[0].message !== null && <small className='text-fourth'>{errors[0]?.message}</small>}
              
              <select name="category" id="" value={formValues.category} onChange={handleInputChanges} onBlur={handleOnBlur}  
              className={`${errors[1].message !== null && 'border-fourth shadow-md'}`}>

                <option value="">Categoría</option>
                <option value="Desarrollo Web">Desarrollo Web</option>
                <option value="Desarrollo Movil">Desarrollo Móvil</option>
                <option value="Desarrollo Frontend">Desarrollo Frontend</option>
                <option value="Desarrollo Backend">Desarrollo Backend</option>
                <option value="Desarrollo de VideoJuegos">Desarrollo de VideoJuegos</option>
                <option value="QA Automation">QA Automation</option>
                <option value="Inteligencia Artificial">Inteligencia Artificial</option>
              
              </select>
              {errors[1].message !== null && <small className='text-fourth'>{errors[1].message}</small>}

            <select name="jobType" value={formValues.jobType} onChange={handleInputChanges} id="" onBlur={handleOnBlur}
             className={`${errors[2].message !== null && 'border-fourth shadow-md'}`}>
                
                <option value="">Tipo de Trabajo</option>
                <option value="Tiempo Completo">A Tiempo Completo</option>
                <option value="Medio Tiempo">Medio tiempo</option>
                <option value="Por Contrato">Por Contrato</option>
            
            </select>
            {errors[2].message !== null && <small className='text-fourth'>{errors[2].message}</small>}

            <select name="jobWay" id="" value={formValues.jobWay} onChange={handleInputChanges} onBlur={handleOnBlur}
             className={`${errors[3].message !== null && 'border-fourth shadow-md'}`}>
            
                <option value="">Modalidad</option>
                <option value="Remoto">Remoto</option>
                <option value="Presencial">Presencial</option>
                <option value="Híbrido">Híbrido</option>
            
            </select>
            {errors[3].message !== null && <small className='text-fourth'>{errors[3].message}</small>}

            <fieldset className='mt-2'>
              <legend className='font-semibold'>Requiere experiencia</legend>
              <span className=''>
                <input 
                  type="radio"
                  name="experience" 
                  id="noExperience"
                  value="No"
                  checked={formValues.experience === "No"} 
                  onChange={handleInputChanges}
                  />
                <label className='ml-1' htmlFor="noExperienice">No</label>
              </span>

              <span className='ml-4'>
                <input
                  type="radio" 
                  name="experience"
                  id="reqExperience" 
                  value="Si"
                  checked={formValues.experience === "Si"} 
                  onChange={handleInputChanges} 
                  />
                <label className='ml-1' htmlFor="reqExperience">Si</label>
              </span>
            </fieldset>

            <textarea 
              rows='8' 
              name="duties" 
              id="duties" 
              placeholder='Responsabilidades del puesto'
              className={`${errors[4].message !== null && 'border-fourth shadow-md'}`}
              value={formValues.duties}
              onChange={handleInputChanges}
              onBlur={handleOnBlur}
            />
            {errors[4].message !== null && <small className='text-fourth'>{errors[4].message}</small>}

            <textarea 
              rows='8' 
              name="requirements" 
              placeholder="Requisitos obligatorios del puesto"
              className={`${errors[5].message !== null && 'border-fourth shadow-md'}`}
              id='vacancyReqInp'
              value={formValues.requirements}
              onChange={handleInputChanges}
              onBlur={handleOnBlur}
            /> 
            {errors[5].message !== null && <small className='text-fourth'>{errors[5].message}</small>}
            
            <textarea 
              rows='8' 
              name="optional" 
              placeholder="Requisitos Opcionales" 
              id='opReqInp' 
              value={formValues.optional}
              onChange={handleInputChanges}
            />
            <textarea 
              rows='8' 
              name="benefits" 
              placeholder="Beneficios del Puesto" 
              id='benefitsInp' 
              value={formValues.benefits}
              onChange={handleInputChanges} 
            />
            
            <fieldset className='mt-2'>
              <legend className='font-semibold'>Horario de Trabajo</legend>
              <input 
                type="time" 
                className='p-1' 
                name="beginTime" 
                value={formValues.beginTime}
                onChange={handleInputChanges} 
              />

              <input 
                type="time" 
                className='p-1 ml-2' 
                name="endTime" 
                id="Hora de Salida" 
                value={formValues.endTime}
                onChange={handleInputChanges} 
              />
            </fieldset>

            <fieldset className='mt-2'>
              <legend className='font-semibold'>Rango Salarial a Ofrecer</legend>
              
              <input 
                className='w-32' 
                name='salaryFrom' 
                type="number"
                placeholder='Desde' 
                value={formValues.salaryFrom}
                onChange={handleInputChanges} 
              />
              
              <input 
                className='w-32 ml-4' 
                name='salaryTo' 
                type="number" 
                placeholder='Hasta'
                value={formValues.salaryTo}
                onChange={handleInputChanges} 
              />

            </fieldset>

            <fieldset className='mt-4'>
              <input 
                type="checkbox" 
                id='companyDescription' 
                name='companyDescription' 
                checked={formValues.companyDescription}
                onChange={handleCheckChanges}
                />
              <label htmlFor="companyDescription" className='ml-2'>Incluir Descripción de la empresa</label>
            </fieldset>

            <button 
              className='mt-8 bg-primary rounded-md text-white py-1 text-lg cursor-pointer disabled:bg-sixth disabled:cursor-default'
              disabled={isDisabled}
              type='submit'
              onClick={handleOnSubmit}
            >
              Registrar
            </button>
            
          </div>
      </form>
    </>

  )
}

export default VacancyRegistrationPage