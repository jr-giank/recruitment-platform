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
            console.log(res)
            //condicional
            // necesita id de la empresa en modifiedMessage para poder hacer el cambio
        })
    }, [])

    return(
        <>
        <div className="overflow-hidden bg-white shadow sm:rounded-lg w-full">
            <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium leading-6 text-gray-900">{message.mensaje.usuario}</h2>
                <h3 className="text-lg font-medium leading-6 text-gray-900">Asunto: {message.mensaje.motivo_mensaje}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{message.mensaje.fecha}</p>
            </div>
        </div>
        <div>
            <p>{message.mensaje.texto}</p>
        </div>
        </>

    )
}
export default MessageDescription