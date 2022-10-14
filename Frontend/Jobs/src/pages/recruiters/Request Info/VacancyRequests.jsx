import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import RequestGrid from './components/RequestGrid'
import { get } from '../../../services/services'
import Loading from '../../../sharedComponents/ui/Loading'

const VacancyRequestsPage = () => {

    const {id} = useParams()
    const [ request, setRequests] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        get(`solicitudes/vacante/${id}/`)
        .then(({data}) => {
            setRequests(data)
            setIsLoading(false)
        })
    }, [])

    return (
        <>
            <div className='w-full flex items-center justify-center pt-8 mt-16'>
             {
                isLoading 
                    ? <Loading /> 
                    :(
                        <div className='w-3/4 overflow-y-auto px-2'>
                            {
                                request.length > 0 ?
                                (<ul>
                                    {
                                        request.map(req => (
                                            <RequestGrid key={req.id}  request={req} />
                                            ))
                                     }    
                                </ul>
                                )
                                : <h3 className='text-sixth text-center mt-4'>No hay solicitudes en esta vacante</h3>            
                            }
                        </div>
                    )
                }
                </div>
             </>
  )
}

export default VacancyRequestsPage