import React, { useContext, useEffect, useState } from 'react'

import { authContext } from '../../../context/context'
import { get } from '../../../services/services'
import Loading from '../../../sharedComponents/ui/Loading'
import VacancyDescription from '../Vacancy View/components/VacancyDescription'
import VacancyGrid from '../Vacancy View/components/VacancyGrid'


const VacancyViewPage = () => {

  const {auth} = useContext(authContext)
 
  const [ vacancies, setVacancies ] = useState([])
  const [ currentVacancy, setCurrentVacancy ] = useState({})
  const [ isLoading, setIsLoading ] = useState(false)


  useEffect(() => {
    setIsLoading(true)

    get(`vacantes/empresa/3/`)
    .then(({data}) => {
      setVacancies(data)
      if(data.length > 0){
        setCurrentVacancy(data[0])
      }
      setIsLoading(false)
    })
  }, [])

  return (
    
    <div className='flex w-full mt-14 h-[91%]'>
      {
        isLoading 
        ? <Loading isLoading={isLoading} /> 
        : (
            <>
              <div className='w-1/3 border-r-fifth border-r pt-2 overflow-y-auto'>
                <h1 className='text-center font-bold text-2xl'>Tus Vacantes anunciadas</h1>
                {
                  vacancies.map(vacancy => (
                    <VacancyGrid key={vacancy.id} vacancy={vacancy} setCurrentVacancy={setCurrentVacancy} />
                    ))
                  }
              </div>

              <div className='w-2/3 overflow-y-auto'>
                <VacancyDescription vacancy={currentVacancy} />
              </div>
            </>
          )
        }
      </div>
  )
}
export default VacancyViewPage