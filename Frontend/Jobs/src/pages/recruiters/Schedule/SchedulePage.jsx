import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { authContext } from '../../../context/context'
import { get } from '../../../services/services'
import Loading from '../../../sharedComponents/ui/Loading'
import ScheduleGrid from './ScheduleGrid'

const SchedulePage = () => {
    
    const { auth } = useContext(authContext)
    const [ interviews, setInterviews ] = useState([])
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(()=> {
        get(`entrevista/empresa/${auth.empresa_id}/`, { "Authorization":`Bearer ${auth.token}` })
        .then(res => {
            if(res.exito){
                setInterviews(res.data)
            }
            setIsLoading(false)
        })
    }, [])

  return (
    <div className='flex flex-col items-center justify-center w-full mt-24 px-8' >

        <h2 className='w-3/5 font-bold'>Agenda de Entrevistas Laborales</h2>       

        {
        isLoading 
            ?  
             <div className='flex justify-center mt-8'>< Loading /></div>   
            :(
            <div className='flex flex-col items-center w-3/5 mb-8'>
            {
                interviews.map((interview, i) => (         
                    interview.candidato 
                     &&
                        <ScheduleGrid 
                            key={interview.id} 
                            interview={interview} 
                            lastInterview= {interviews[i-1]}
                        />
            ))
            }
         { interviews.length === 0 && <p className='mt-8'>No tienes entrevistas pendientes </p> }
        </div>)
        }
    </div>
  )
}

export default SchedulePage