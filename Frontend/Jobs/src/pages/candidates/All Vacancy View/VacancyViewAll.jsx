import React, {useEffect, useState}from 'react'
import { get } from '../../../services/services'
import Loading from '../../../sharedComponents/ui/Loading'
import VacancyGridAll from './components/VacancyGridAll'

const VacancyViewAll = () => {

    const [ vacancies, setVacancies ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    
    useEffect(() => {
      setIsLoading(true)
      get('vacantes/')
      .then(data=> {
        setVacancies(data)
        setIsLoading(false)
      })
    }, [])

    return(
        <div className='flex flex-col items-center justify-center w-full pt-2 mt-20 px-8'>
          {
            isLoading ? <Loading /> :
            (
              <>
              <h1 className='text-center mt-10 font-bold text-2xl'>Vacantes disponibles</h1>
                {
                  vacancies.map(vacancy => (
                    <VacancyGridAll key={vacancy.id} vacancy={vacancy} />
                    ))
                  })
              </>
              )
            }
        </div>
    )
}

export default VacancyViewAll