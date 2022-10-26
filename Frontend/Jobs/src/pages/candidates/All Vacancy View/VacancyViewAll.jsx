import React, {useEffect, useState}from 'react'
import { get } from '../../../services/services'
import Filters from '../../../sharedComponents/filters/Filters'
import Loading from '../../../sharedComponents/ui/Loading'
import VacancyGridAll from './components/VacancyGridAll'

const VacancyViewAll = () => {

    const [ vacancies, setVacancies ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ filtersVisible, setFiltersVisible ] = useState(false)
    
    useEffect(() => {
      setIsLoading(true)
      get('vacantes/')
      .then(({data})=> {
        setVacancies(data)
        setIsLoading(false)
        console.log(data)
      })
    }, [])

    return(
      <>
      {
        filtersVisible 
          ? (          
          <div className='w-full min-w-[1250px] pl-20 pr-16 flex justify-between py-4 bg-white border-b border-sixth text-tenth mt-[60px] fixed'>
              <h3 className='font-medium border-r border-sixth px-2'>Filtrado</h3>
              <Filters setFiltersVisible={setFiltersVisible} />
          </div>
        )
        :(<button className={`text-black py-1 mt-14 ml-8 hover:underline`} onClick={()=>setFiltersVisible(true)}>Ver Filtros</button>)
      }
          <div className={`flex flex-col items-center justify-center w-full ${filtersVisible && 'mt-36'} px-8`}>
            {
              isLoading ? <Loading /> :
              (
                <>
                <h1 className='text-center font-bold text-2xl'>Vacantes disponibles</h1>
                  {
                    vacancies.map(vacancy => (
                      <VacancyGridAll key={vacancy.id} vacancy={vacancy} />
                      ))
                    }
                </>
                )
              }
          </div>
        </>
    )
}

export default VacancyViewAll