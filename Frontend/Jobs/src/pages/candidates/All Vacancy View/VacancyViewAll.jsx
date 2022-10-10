import React, {useEffect, useState}from 'react'
import { get } from '../../../services/services'
import VacancyGridAll from './components/VacancyGridAll'

const VacancyViewAll = () => {

    const [ vacancies, setVacancies ] = useState([])
    
    useEffect(() => {
      get('vacantes/')
      .then(data=> {
        setVacancies(data)
      })
    }, [])

    return(
        <div className='w-full pt-2 mt-20 px-8'>
            <h1 className='text-center mt-10 font-bold text-2xl'>Vacantes disponibles</h1>
            {
          vacancies.map(vacancy => (
            <VacancyGridAll key={vacancy.id} vacancy={vacancy} />
          ))
        }
        </div>
    )
}

export default VacancyViewAll