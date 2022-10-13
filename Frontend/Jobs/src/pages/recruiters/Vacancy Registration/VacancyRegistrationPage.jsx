import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { validateVacancyForm } from '../../../helpers/validators/ValidateVacancyRegistration'
import { useForm } from '../../../hooks/useForm'
import { post } from '../../../services/services'

const VacancyRegistrationPage = () => {

  const [ formValues, handleInputChanges, handleCheckChanges ] = useForm({
    nombre_puesto:"Desarrollador Backend Java",
    categoria: 1,
    tipo_trabajo: "TEMPORAL",
    forma_trabajo: "REMOTO",
    experiencia: 'true',
    responsabilidades_puesto: "Crear API REST.\nMantenimiento de componentes ya existentes.",
    requisitos_obligatorios: "5 años de experiencia en Java.\nPor lo menos un año de experiencia en HTML, CSS y JS.\nConocimiento de algún framework como React o Angular\nGit\nMetodología Scrum",
    requisitos_opcionales: "Manejo de Docker\nConocimientos de AWS",
    beneficios: "Plan de seguro médico familiar. \n1 mes de vacaciones al año.",
    hora_entrada: "08:00",
    hora_salida: "16:00",
    empresa: 1,
    horario_trabajo:"8:00 a.m - 5:00 p.m",
    salario_min:75000,
    salario_max: 95000,
    companyDescription: true
  })

  const [ errors, setErrors ] = useState([
      {name:"nombre_puesto", message: null, touched: false},
      {name:"categoria", message: null, touched: false},
      {name:"tipo_trabajo", message: null, touched: false},
      {name:"forma_trabajo",message: null, touched: false},
      {name:"responsabilidades_puesto",message: null, touched: false},
      {name:"requisitos_obligatorios",message: null, touched: false},
      {name: "salary", message:null},
      {name: "horario_trabajo", message:null, touched: false},
  ]) 

  const [ isDisabled, setIsDisabled ] = useState(true)

  const history = useNavigate()

  useEffect(()=> {
    
    const remainingErrors = errors.filter(error => error.message !== null || error.touched === false)
    
    if(remainingErrors.length === 0){
      setIsDisabled(false)
    }
    
  }, [errors])

  const handleOnSubmit = (e) => {
    e.preventDefault()

    formValues.experiencia = formValues.experiencia === 'true' ? true: false
    formValues.horario_trabajo = `${formValues.hora_entrada}-${formValues.hora_salida}`
    
    post('vacantes/',{'Content-Type': 'application/json'}, formValues)
        .then(() => {
            Swal.fire("Vacante Guardada", "La vacante se ha guardado correctamente", 'success')
            history('/recruiter/viewVacancies')
      })   
  }

  const handleOnBlur = (e) =>{

    let error;
    let errorName;

    if(e.target.name === 'salario_max' || e.target.name === 'salario_min'){
      error = validateVacancyForm(e.target.name,  parseFloat(formValues.salario_min), parseFloat(formValues.salario_max))
      errorName = "salary"
    }
    else if(e.target.name === 'hora_entrada' || e.target.name === 'hora_salida'){
      error = validateVacancyForm(e.target.name,  formValues.hora_entrada, formValues.hora_salida)
      errorName = "horario_trabajo"
    }
    else{
      error = validateVacancyForm(e.target.name, e.target.value)
      errorName = e.target.name
    }

    setErrors([...errors.map(errorObject => (errorObject.name === errorName)
                                            ? {...errorObject, message: error, touched: true}
                                            : errorObject
                                        )])
    }

  return (
    <>
      <div action="" className='w-full flex items-center justify-center pt-8 mt-16'>
          
          <form className='flex flex-col w-1/2 border  border-fifth shadow-lg py-4 px-12 rounded-lg min-w-[350px] mb-12'>
            <h1 className='text-center font-bold'>Nueva Vacante</h1>

              <input 
                type="text" 
                name="nombre_puesto" 
                id="nombre_puestoInp" 
                placeholder='Nombre del Puesto'
                className={`${errors[0].message !== null && 'border-fourth shadow-md'}`}
                value={formValues.nombre_puesto}
                onChange={handleInputChanges}
                onBlur={handleOnBlur}
              />
              {errors[0].message !== null && <small className='text-fourth'>{errors[0]?.message}</small>}
              
              <select name="categoria" id="" value={formValues.categoria} onChange={handleInputChanges} onBlur={handleOnBlur}  
              className={`${errors[1].message !== null && 'border-fourth shadow-md'}`}>

                <option value="">  Categoría</option>
                <option value={1}> Desarrollo Web</option>
                <option value={2}> Desarrollo Móvil</option>
                <option value={3}> Desarrollo Frontend</option>
                <option value={4}> Desarrollo Backend</option>
                <option value={5}> Desarrollo de VideoJuegos</option>
                <option value={6}> QA Automation</option>
                <option value={7}> Inteligencia Artificial</option>
              
              </select>
              {errors[1].message !== null && <small className='text-fourth'>{errors[1].message}</small>}

            <select name="tipo_trabajo" value={formValues.tipo_trabajo} onChange={handleInputChanges} id="" onBlur={handleOnBlur}
             className={`${errors[2].message !== null && 'border-fourth shadow-md'}`}>
                
                <option value="">Tipo de Trabajo</option>
                <option value="TEMPORAL">A Tiempo Completo</option>
                <option value="INDEFINIDO">Medio tiempo</option>
                <option value="Por Contrato">Por Contrato</option>
            
            </select>
            {errors[2].message !== null && <small className='text-fourth'>{errors[2].message}</small>}

            <select name="forma_trabajo" id="" value={formValues.forma_trabajo} onChange={handleInputChanges} onBlur={handleOnBlur}
             className={`${errors[3].message !== null && 'border-fourth shadow-md'}`}>
            
                <option value="">Modalidad</option>
                <option value="REMOTO">Remoto</option>
                <option value="PRESENCIAL">Presencial</option>
                <option value="HIBRIDO">Híbrido</option>
            
            </select>
            {errors[3].message !== null && <small className='text-fourth'>{errors[3].message}</small>}

            <fieldset className='mt-2'>
              <legend className='font-semibold'>Requiere experiencia</legend>
              <span className=''>
                <input 
                  type="radio"
                  name="experiencia" 
                  id="noExperience"
                  value={false}
                  checked={formValues.experiencia === 'false'} 
                  onChange={handleInputChanges}
                />
                <label className='ml-1' htmlFor="noExperienice">No</label>
              </span>

              <span className='ml-4'>
                <input
                  type="radio" 
                  name="experiencia"
                  id="reqExperience" 
                  value={true}
                  checked={formValues.experiencia === 'true'} 
                  onChange={handleInputChanges} 
                  />
                <label className='ml-1' htmlFor="reqExperience">Si</label>
              </span>
            </fieldset>

            <textarea 
              rows='8' 
              name="responsabilidades_puesto" 
              id="responsabilidades_puesto" 
              placeholder='Responsabilidades del puesto'
              className={`${errors[4].message !== null && 'border-fourth shadow-md'}`}
              value={formValues.responsabilidades_puesto}
              onChange={handleInputChanges}
              onBlur={handleOnBlur}
            />
            {errors[4].message !== null && <small className='text-fourth'>{errors[4].message}</small>}

            <textarea 
              rows='8' 
              name="requisitos_obligatorios" 
              placeholder="Requisitos obligatorios del puesto"
              className={`${errors[5].message !== null && 'border-fourth shadow-md'}`}
              id='vacancyReqInp'
              value={formValues.requisitos_obligatorios}
              onChange={handleInputChanges}
              onBlur={handleOnBlur}
            /> 
            {errors[5].message !== null && <small className='text-fourth'>{errors[5].message}</small>}
            
            <textarea 
              rows='8' 
              name="requisitos_opcionales" 
              placeholder="Requisitos Opcionales" 
              id='opReqInp' 
              value={formValues.requisitos_opcionales}
              onChange={handleInputChanges}
            />
            <textarea 
              rows='8' 
              name="beneficios" 
              placeholder="Beneficios del Puesto" 
              id='beneficiosInp' 
              value={formValues.beneficios}
              onChange={handleInputChanges} 
            />
            
            <fieldset className='mt-2'>
              <legend className='font-semibold'>Horario de Trabajo</legend>
              <input 
                type="time" 
                className='p-1' 
                name="hora_entrada" 
                value={formValues.hora_entrada}
                onChange={handleInputChanges}
                onBlur={handleOnBlur}
              />

              <input 
                type="time" 
                className='p-1 ml-2' 
                name="hora_salida" 
                id="Hora de Salida" 
                value={formValues.hora_salida}
                onChange={handleInputChanges}
                onBlur={handleOnBlur}
              />
            </fieldset>
            {errors[7].message !== null && <small className='text-fourth'>{errors[7].message}</small>}

            <fieldset className='mt-2'>
              <legend className='font-semibold'>Rango Salarial a Ofrecer</legend>
              
              <input 
                className='w-32' 
                name='salario_min' 
                type="number"
                placeholder='Desde' 
                value={formValues.salario_min}
                onChange={handleInputChanges}
                onBlur={handleOnBlur} 
              />
              
              <input 
                className='w-32 ml-4' 
                name='salario_max' 
                type="number" 
                placeholder='Hasta'
                value={formValues.salario_max}
                onChange={handleInputChanges}
                onBlur={handleOnBlur} 
              />

            </fieldset>
            {errors[6].message !== null && <small className='text-fourth'>{errors[6].message}</small>}

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
            
          </form>
      </div>
    </>

  )
}

export default VacancyRegistrationPage