import React, { useContext, useEffect, useState } from 'react'

import { authContext } from '../../../context/context'
import { get } from '../../../services/services'
import Loading from '../../../sharedComponents/ui/Loading'
import VacancyDescription from '../Vacancy View/components/VacancyDescription'
import VacancyGrid from '../Vacancy View/components/VacancyGrid'

const VacancyViewPage = () => {

  const {auth} = useContext(authContext)

  const [ vacancies, setVacancies ] = useState([])
  const [ currentVacancy, setCurrentVacancy ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ optionStatus, setOptionStatus ] = useState("ABIERTA")
 
  useEffect(() => {
    setIsLoading(true)

    get(`vacantes/empresa/${auth.empresa_id}/`, { "Authorization":`Bearer ${auth.token}` })
    .then(({data}) => {
      console.log(data)
      setVacancies(data)
      setIsLoading(false)
    })
  }, [])

  const handleChangeStatus = (e, status) => {
    e.preventDefault()
    
    if(status !== optionStatus){
      setOptionStatus(status)
      setCurrentVacancy(null)
    }
  }

  return (
    
    <div className='flex w-full mt-14 h-[91%]'>
      {
        isLoading 
        ? <Loading isLoading={isLoading} /> 
        : (
            <>
               { vacancies.length > 0
                ?
                  (
                    <>
                      <div className='w-1/3 border-r-fifth border-r pt-2 overflow-y-auto'>
                        <h1 className='text-center font-bold text-2xl'>Tus Vacantes anunciadas</h1>
                        <div className='w-full flex justify-center mt-2 border-b border-b-sixth'>  
                          
                          <button 
                            className={`text-tenth font-bold hover:border-b-2 ${optionStatus === "ABIERTA" && 'border-b-2'}`} 
                            onClick={(e)=>handleChangeStatus(e, "ABIERTA")}
                          >
                            Abiertas
                          </button>
                          
                          <button 
                            className={`text-tenth font-bold ml-8 hover:border-b-2 ${optionStatus === "CERRADA" && 'border-b-2'}`}  
                            onClick={(e)=>handleChangeStatus(e, "CERRADA")}
                          >
                            Cerradas
                          </button>
                        
                        </div>
                      {
                        vacancies.map(vacancy => (
                          vacancy.status === optionStatus &&
                             <VacancyGrid key={vacancy.id} vacancy={vacancy} setCurrentVacancy={setCurrentVacancy} currentVacancy={currentVacancy} />
                          ))
                      }
                    </div>

                    <div className='w-2/3 overflow-y-auto'>
                      {
                          currentVacancy ?
                            <VacancyDescription vacancy={currentVacancy} setVacancies={setVacancies}  />
                          :
                          <h4 className='text-center mt-8 text-sixth font-bold'>Selecciona tus vacantes</h4>
                      }
                        
                    </div>
                  </>
               )
               : 
                <h4 className='text-center m-auto w-full text-tenth font-bold'>
                  No tienes vacantes anunciadas. ¡Empieza a anunciar vacantes!
                </h4> 
               }
            </>
            )
        }
      </div>
  )
}
export default VacancyViewPage