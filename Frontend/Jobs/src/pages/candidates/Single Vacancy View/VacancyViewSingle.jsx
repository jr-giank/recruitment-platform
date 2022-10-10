import React, {useEffect, useState} from 'react'
import VacancyDescriptionSingle from './components/VacancyDescriptionSingle'
import { useParams } from 'react-router-dom'
import { get } from '../../../services/services'

const VacancyViewSingle = () => {

    const location = useParams()
    const [ vacancy, setVacancy ] = useState({})

    useEffect(() => {
        get(`obtener/vacante/${location.id}`)
        .then(data=> {
          setVacancy({...data[0]})
          // console.log(data)
        })
      }, [])

    return(

        <div className='flex justify-center mt-20 '>
            <div className=' w-2/3'>
              <VacancyDescriptionSingle vacancy={vacancy} />
            </div>
        </div>
    )

}

export default VacancyViewSingle