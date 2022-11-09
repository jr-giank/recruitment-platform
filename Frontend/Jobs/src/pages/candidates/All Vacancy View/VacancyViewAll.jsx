import React, {useEffect, useState, useContext }from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { authContext } from '../../../context/context'
import { get } from '../../../services/services'
import Filters from '../../../sharedComponents/filters/Filters'
import Loading from '../../../sharedComponents/ui/Loading'
import VacancyGridAll from './components/VacancyGridAll'

const filtersInitialState = {
  category: [], 
  modalidad: [], 
  exp: "", 
  job_type:[], 
  countries:[]
}

const VacancyViewAll = () => {

    const [ vacancies, setVacancies ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ filtersVisible, setFiltersVisible ] = useState(false)
    const [ filters, setFilters ] = useState({...filtersInitialState})
    const [ params, setParams ] = useSearchParams()
    const location = useLocation()

    const { auth } = useContext(authContext)

    useEffect(()=>{

      setIsLoading(true)
   
      if(location.search){
        get(`vacantes/filtrar/${location.search}`, {"Authorization":`Bearer ${auth.token}`})
        .then(data => {
          setVacancies(data)
          setIsLoading(false)
        })
      }
      else{
        get ('vacantes/', {"Authorization":`Bearer ${auth.token}`},)
        .then(({data})=> {
          setVacancies(data)
          console.log(data)
          setIsLoading(false)
        })
      }
    }, [params])

    // Limpiar filtros y limpiar elementos checks
    const handleOnCleanFilters = () => {

      setFilters({...filtersInitialState})
      const checks = document.querySelectorAll(".checkbox_filter, .radio_filter")
  
      Array.prototype.map.call(checks, element => {
          element.checked = false    
        });

        setParams()
    }

    const handleOnApplyFilters = (e) => {
      e.preventDefault()

      // SET QUERY PARAMS
      const filteredCategories =  filters.category.join(",")
      const filteredJobType    =  filters.job_type.join(",")
      const filteredModalidad  =  filters.modalidad.join(",")  
      const filteredCountries  =  filters.countries.join(",")

      let experiencia = ""

      if(filters.exp){
        experiencia = filters.exp === "Si" ? true : false
      }

      setParams({
        categoria__in: filteredCategories,
        forma_trabajo__in: filteredJobType,
        experiencia,
        tipo_trabajo__in : filteredModalidad,
        empresa_pais__in: filteredCountries
      })
    } 

    return(
      <>
      {
        filtersVisible 
          ? (          
          <div className='w-full min-w-[1250px] pl-20 pr-16 flex justify-between py-4 bg-white border-b border-sixth text-tenth mt-[60px] fixed'>
              <h3 className='font-medium border-r border-sixth px-2'>Filtrado</h3>
              <Filters 
                setFiltersVisible={setFiltersVisible} 
                filters={filters} 
                setFilters={setFilters} 
                handleOnCleanFilters={handleOnCleanFilters}
                handleOnApplyFilters={handleOnApplyFilters}
              />
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
                      vacancy.status ==="ABIERTA" &&
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