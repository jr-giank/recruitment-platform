import React, { useEffect, useContext} from 'react'
import { put } from '../../../../services/services'
import { authContext } from '../../../../context/context'
import { BASE_URL_FILES } from '../../../../constants/baseURL'

const MessageDescription = ({message, setMessage}) => {

    const {auth} = useContext(authContext)

    useEffect(() => {
        if (message.mensaje.status === 'V'){
            return 
        }
        
        const modifiedMessage = {...message.mensaje} 
        modifiedMessage.status = 'V'
        modifiedMessage.usuario = message.mensaje.usuario.id
        put(`mensaje/${modifiedMessage.id}/`, {'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}` }, modifiedMessage)
        .then((res) => {
            if(res.exito){
                console.log(res)
                setMessage(messages => messages.map(msj => msj.id === res.data.id ? {...msj, mensaje:res.data} : msj))
            }
        })
    }, [message])

    return(
        <>
        <div className="overflow-hidden bg-fifth shadow  w-full">
            <div className=" flex px-4 py-5 sm:px-6">
            <img src={`${BASE_URL_FILES}${message.enviadoPor.foto}` } className='w-14 h-14 rounded-full mr-3' alt="" />
            <div>
                <h1 className="text-lg font-bold leading-6 text-gray-900">{message.enviadoPor.nombre}</h1>
                <small className="mt-1 max-w-2xl text-sm text-gray-500">Recibido: {message.mensaje.fecha}</small>
            </div>
            </div>
        </div>
        <div>
            <h3 className="m-3 text-lg font-medium leading-6 text-gray-900"><strong>Asunto:</strong> {message.mensaje?.motivo_mensaje}</h3>
            <p className='m-5'>{message.mensaje?.texto}</p>
        </div>
        </>
    )
}
export default MessageDescription