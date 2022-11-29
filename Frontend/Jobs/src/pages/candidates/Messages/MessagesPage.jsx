import React, { useContext, useEffect, useState } from 'react'
import Loading from '../../../sharedComponents/ui/Loading'
import { authContext } from '../../../context/context'
import { get } from '../../../services/services' 
import MessageDescription from '../Messages/components/MessageDescription'
import MessageGrid from '../Messages/components/MessageGrid'

const MessagesPage = () => {

    const {auth} = useContext(authContext)
    const [ isLoading, setIsLoading ] = useState(false)
    const [ currentMessage, setCurrentMessage ] = useState(null)
    const [ message, setMessage ] = useState([])

    useEffect(() => {
        setIsLoading(true)
        get(`mensajes/${auth.user_id}/`, { "Authorization":`Bearer ${auth.token}` })
        .then((res) => {
            if (res.exito){
              console.log(res.data)
              setMessage(res.data.mensaje.map((msg, i) =>({...msg, enviadoPor: res.data.enviado_por[i]} )).reverse())
            }
            setIsLoading(false)
        })
    }, [])

    
    return(
        <div className='flex w-full mt-14 h-[91%]'>
        {
          isLoading 
          ? <Loading isLoading={isLoading} /> 
          : (
              <>
                 { message.length > 0 
                 ?
                    (
                      <>
                        <div className='w-1/3 border-r-fifth border-r pt-2 overflow-y-auto'>
                          <h1 className='text-center font-bold text-2xl'>Bandeja de entrada</h1>
                        {
                          message.map(mess => (
                               <MessageGrid key={mess.id} mess={mess} setCurrentMessage={setCurrentMessage} />
                            ))
                        }
                      </div>
  
                      <div className='w-2/3 overflow-y-auto'>
                        {
                            currentMessage ?
                              <MessageDescription message={currentMessage} setMessage={setMessage}  />
                            :
                            <h4 className='text-center mt-8 text-sixth font-bold'>Selecciona un mensaje</h4>
                        }
                          
                      </div>
                    </>
                 )
                 : 
                  <h4 className='text-center m-auto w-full text-tenth font-bold'>
                    No hay mensajes nuevos.
                  </h4> 
                 }
              </>
              )
          }
        </div>
    )

}
export default MessagesPage