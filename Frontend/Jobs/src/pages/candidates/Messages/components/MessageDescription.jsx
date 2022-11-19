import React, {useState, useEffect, useContext} from 'react'
import { put } from '../../../../services/services'
import { authContext } from '../../../../context/context'

const MessageDescription = ({message, setMessage}) => {
    const {auth} = useContext(authContext)
    console.log(message)

    useEffect(() => {
        const modifiedMessage = {...message.mensaje} 
        modifiedMessage.status = 'V'
        modifiedMessage.usuario = null
        put(`mensaje/${modifiedMessage.id}/`, {'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}` }, modifiedMessage)
        .then((res) => {
            if(res.exito){
                console.log(res)
                setMessage(modifiedMessage)
            }
        })
    }, [])

    return(
        <>
        <div className="overflow-hidden bg-fifth shadow sm:rounded-lg w-full">
            <div className=" flex px-4 py-5 sm:px-6">
                <h1 className="text-lg font-bold leading-6 text-gray-900">{message.mensaje.usuario.email}</h1>
                <p className="mt-1 ml-20 max-w-2xl text-sm text-gray-500">Recibido: {message.mensaje.fecha}</p>
            </div>
        </div>
        <div>
            <h3 className="m-3 text-lg font-medium leading-6 text-gray-900">Asunto: {message.mensaje.motivo_mensaje}</h3>
            <p className='m-5'>{message.mensaje.texto}</p>
        </div>
        </>
    )
}
export default MessageDescription