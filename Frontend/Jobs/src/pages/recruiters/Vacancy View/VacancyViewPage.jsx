import React, { useEffect, useState } from 'react'
import { get } from '../../../services/services'
import VacancyDescription from '../Vacancy View/components/VacancyDescription'
import VacancyGrid from '../Vacancy View/components/VacancyGrid'

const VacancyViewPage = () => {

  const [ vacancies, setVacancies ] = useState([])
  const [ currentVacancy, setCurrentVacancy ] = useState({})
  
  useEffect(() => {
    get('vacantes/')
    .then(data=> {
      setVacancies(data)
      if(data.length > 0){
        setCurrentVacancy(data[0])
      }
    })
  }, [])

  return (
    <div className='flex w-full mt-20'>

      <div className='w-1/3 border-r-fifth border-r pt-2 overflow-auto'>
        <h1 className='text-center font-bold text-2xl'>Tus Vacantes anunciadas</h1>
        {
          vacancies.map(vacancy => (
            <VacancyGrid key={vacancy.id} vacancy={vacancy} setCurrentVacancy={setCurrentVacancy} />
          ))
        }
      </div>

      <div className='w-2/3 overflow-y-auto h-full'>
        <VacancyDescription vacancy={currentVacancy} />
      </div>

    </div>
  )
}

export default VacancyViewPage