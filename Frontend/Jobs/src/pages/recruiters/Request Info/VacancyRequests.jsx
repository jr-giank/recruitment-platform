import React, { useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import { get } from '../../../services/services'
import Loading from '../../../sharedComponents/ui/Loading'
import RequestsBoardView from './components/RequestsBoardView'

const VacancyRequestsPage = () => {

    const {id} = useParams()
    const [ request, setRequests] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const history = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        get(`solicitudes/vacante/${id}/`)
        .then(({data}) => {
            setRequests(data)
            setIsLoading(false)
        })
    }, [])

    const goBack = () => {
        history(-1)
    }

    return (
            <div className='w-full h-[89%] flex flex-wrap pt-2 mt-16 bg-white overflow-auto'>
             {
                isLoading 
                    ? <Loading /> 
                    :(
                      <>
                        <button className='ml-8 hover:underline' onClick={goBack} >
                            <small>  Volver atrás</small>
                        </button>
                        <h3 className='font-bold ml-8 w-full'>Panel de Administración de Solicitudes</h3> 

                        <div className='border-b flex justify-between border-sixth w-full mx-8 mt-4'>
                        
                        <div>
                            <button className='text-tenth ml-3 px-2 text-[14px]'>Solicitudes</button>
                            <button className='text-tenth ml-3 px-2 text-[14px]'>Pruebas Técnicas en Curso</button>
                            <button className='text-tenth ml-3 px-2 text-[14px]'>Entrevistas Programadas</button>
                            <button className='text-tenth ml-3 px-2 text-[14px]'>Feedback</button>
                        </div>

                        <div className='mb-2'>
                            <button className='bg-fourth text-[14px] text-white py-1 px-1 rounded-md'>Cerrar Vacante</button>
                        </div>

                    </div>
                    <div className='w-full overflow-x-auto'>
                         <RequestsBoardView requests={request} />
                    </div>
                   
                    </>
                    )}             
                </div>
  )
}

export default VacancyRequestsPage