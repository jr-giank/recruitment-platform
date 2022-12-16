import React, {useContext, useEffect, useState} from 'react'
import VacancyDescriptionSingle from './components/VacancyDescriptionSingle'
import { useParams } from 'react-router-dom'
import { get } from '../../../services/services'
import Loading from '../../../sharedComponents/ui/Loading'
import { authContext } from '../../../context/context'
import Swal from 'sweetalert2'

const VacancyViewSingle = () => {

    const location = useParams()
    const [ vacancy, setVacancy ] = useState(null)
    const [ isLoading, setIsLoading] = useState(true)
    
    const { auth } = useContext(authContext)

    useEffect(() => {
        get(`vacante/${location.id}/`, {"Authorization":`Bearer ${auth.token}`})
        .then((res)=> {

          if(res.exito){
            get(`solicitudes/vacante/${location.id}/`,   { "Authorization":`Bearer ${auth.token}` })
            .then(res2 => {
              if(res2.exito){
                setVacancy({...res.data[0], cantidadSolicitudes: res2.data.length})
              }else{
                setVacancy({...res.data[0]})
              }
              setIsLoading(false)
            })
          }
      }).catch(e => {
        Swal.fire("Error", "Hubo un error al conectarse al servidor", "error")
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