import React, { useState } from 'react'
import { useForm } from '../../../hooks/useForm'

const VacancyRegistrationPage = () => {

  const [ formValues, handleOnChanges ] = useForm({})

  return (
    <div className='w-full flex items-center justify-center pt-8'>
        <form action="" className='flex flex-col w-1/2 h-full overflow-y-auto border border-fifth pt-4 px-12 rounded-lg mb-12'>
          <h1 className='text-center font-bold'>Nueva Vacante</h1>
            <input type="text" name="vacancyName" id="" placeholder='Puesto de Trabajo' />
            
            <select name="category" id="">
              <option value="Desarrollo Web">Desarrollo Web</option>
              <option value="Desarrollo Movil">Desarrollo Móvil</option>
              <option value="Desarrollo Frontend">Desarrollo Frontend</option>
              <option value="Desarrollo Backend">Desarrollo Backend</option>
              <option value="Desarrollo de VideoJuegos">Desarrollo de VideoJuegos</option>
              <option value="QA Automation">QA Automation</option>
              <option value="Inteligencia Artificial">Inteligencia Artificial</option>
            </select>

          <select name="jobType" id="">
            <option value="Tiempo Completo">A Tiempo Completo</option>
            <option value="Medio Tiempo">Medio tiempo</option>
            <option value="Por Contrato">Por Contrato</option>
          </select>

          <select name="jobWay" id="">
            <option value="Remoto">Remoto</option>
            <option value="Presencial">Presencial</option>
            <option value="Híbrido">Híbrido</option>
          </select>

          <fieldset>
            <input type="radio" name="experience" id="noExperience" />
            <label htmlFor="noExperienice">No</label>
            <input type="radio" name="experience" id="reqExperience" />
            <label htmlFor="reqExperience">Si</label>
          </fieldset>

          <textarea rows='35' name="duties" id="" placeholder='Responsabilidades del puesto' />
          
          <textarea rows='35' name="requirements" placeholder="Requisitos obligatorios del puesto" />
          
          <textarea rows='35' name="optionalRequirements" placeholder="Requisitos Opcionales" />
          
          <textarea rows='35' name="benefits" placeholder="Beneficios del Puesto" />
          
          <fieldset>
            <legend>Horario de Trabajo</legend>
            <input type="time" name="beginTime" id="Hora de entrada" />
            <input type="time" name="endTime" id="Hora de Salida" />
          </fieldset>

          <fieldset>
            <legend>Rango Salarial a Ofrecer</legend>
            <input type="number" placeholder='Rango Inicial' />
            <input type="number" placeholder='Rango Final'/>
          </fieldset>
          
        </form>
    </div>
  )
}

export default VacancyRegistrationPage