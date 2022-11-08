import React, {useContext, useEffect, useState}from 'react'
import { authContext } from '../../../context/context'
import { get } from '../../../services/services'
import Loading from '../../../sharedComponents/ui/Loading'
import AppliedJobs from './components/AppliedJobs'
import SavedJobs from './components/SavedJobs'

const SavedJobsPanel_Page = () => {

    const { auth  } = useContext(authContext)
    const [ vacancies, setVacancies ] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ cardType, setCardType ] = useState(1)

    useEffect(()=>{
      setIsLoading(true)
      if(cardType === 1){
        get(`vacante/guardada/${auth.user_id}/`,{ "Authorization":`Bearer ${auth.token}` })
        .then(data => {
            if(data.exito){
              setVacancies([...data.data])
            }
            else{
              setVacancies([])
            }
            setIsLoading(false)
        })        
      }
      else{
        get(`solicitudes/candidato/${auth.candidato_id}/`,{ "Authorization":`Bearer ${auth.token}` })
        .then(data => {
          console.log(data)
          if(data.exito){
            setVacancies([...data.data])
          }
          else{
            setVacancies([])
          }
          setIsLoading(false)
      })        
      }
     }, [cardType])

    const handleCardType = (e, card) => {
      e.preventDefault()
      setIsLoading(true)
      setCardType(card)
     } 
    
    return(
        <div className='flex flex-col items-center justify-center w-full pt-24 px-8 '>
          {
            <>
            <div className='bg-white w-3/5   rounded-lg shadow-lg'>
              
              <h1 className='text-left mt-4 text-tenth text-2xl ml-4'>Mis Vacantes</h1>
              <div className='ml-4 mt-4 mb-4'>
                
                <button 
                  className='rounded-lg border border-fifth text-tenth px-3 py-1 text-[18px] font-bold hover:bg-secondary hover:text-white'
                  onClick={(e)=> handleCardType(e, 1)}
                >
                  Guardado
                </button>
                
                <button 
                  className='ml-4 rounded-lg border border-fifth text-tenth px-3 py-1 text-[18px] font-bold hover:bg-secondary hover:text-white'
                  onClick={(e)=> handleCardType(e, 2)}
                >
                  Mis Aplicaciones
                </button>  
              </div>
              {
                isLoading 
                ? <div className='w-full flex justify-center mt-4 mb-4'> <Loading /> </div> 
                : (
                    cardType === 1 
                      ?
                        <SavedJobs vacancies={vacancies} setVacancies={setVacancies} />
                      :(
                          <AppliedJobs vacancies={vacancies} setVacancies={setVacancies} />
                      )
                )
              }
          
                </div>
              </>
            }
        </div>
    )
}

export default SavedJobsPanel_Page