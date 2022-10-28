import React, {useContext, useEffect, useState} from 'react'
import VacancyDescriptionSingle from './components/VacancyDescriptionSingle'
import { useParams } from 'react-router-dom'
import { get } from '../../../services/services'
import Loading from '../../../sharedComponents/ui/Loading'
import { authContext } from '../../../context/context'

const VacancyViewSingle = () => {

    const location = useParams()
    const [ vacancy, setVacancy ] = useState({})
    const [ isLoading, setIsLoading] = useState(false)
    
    const { auth } = useContext(authContext)

    useEffect(() => {
      setIsLoading(true)
        get(`obtener/vacante/${location.id}/`, {"Authorization":`Bearer ${auth.token}`})
        .then(({data})=> {
          setVacancy({...data[0]})
          setIsLoading(false)
        })
      }, [])

    return(
        <div className='flex justify-center mt-20 '>
          { isLoading ? <Loading /> :( 
            <div className=' w-2/3'>
              <VacancyDescriptionSingle vacancy={vacancy} />
            </div>
            )
          }
        </div>
    )

}

export default VacancyViewSingle