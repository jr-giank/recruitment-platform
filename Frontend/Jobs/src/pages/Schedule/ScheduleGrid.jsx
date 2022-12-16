import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { BASE_URL_FILES } from '../../constants/baseURL'
import { authContext } from '../../context/context'
import { get } from '../../services/services'

const ScheduleGrid = ({interview, lastInterview, isRecruiter}) => {

    const history = useNavigate()
    const { auth } = useContext(authContext)

    const handleAccessVideo = (e) => {
        e.preventDefault()
        get(`llamada/get_token/${interview.room_id}/`, {"Authorization":`Bearer ${auth.token}`})
        .then(res => {
            window.sessionStorage.setItem("token", res.data.token)
            window.sessionStorage.setItem("uid", res.data.uid)
            window.sessionStorage.setItem("room_id", interview.room_id)
            history('/app/video-room', {replace: true})
        })
    }
  
    return (
    <>
    {
            // Esta comparacion busca agrupar la agenda de entrevista por cada fecha distinta comparando la fecha de la entrevista
            // actual recibida con la fecha de la entrevista anterior para determiar cuando cambio la fecha.
            // Si la fecha anterior es false, quiere decir que es el primer horario que se está renderizando.
            (!lastInterview || interview.fecha !== lastInterview.fecha) 
             && 
             <h3 className='font-bold text-seventh mt-4 w-full'>{interview.fecha.split("-").reverse().join("-")}</h3> 
        }
        <div className='flex justify-between flex-wrap w-full mt-4 border border-fifth px-3 shadow py-4'>
        <div>
            <h4 className='font-semibold'>Hora</h4>
            <p>{interview.hora}</p>
        </div>

        {
            isRecruiter ?
                <div>
                    <h4 className='font-semibold'>Entrevista A:</h4>
                    <div className='flex items-center'>
                        <img 
                            src={`${BASE_URL_FILES}${interview.candidato.foto}`} 
                            className='w-7 h-7 rounded-full mr-2' 
                            alt="" 
                            />
                        <p>{interview.candidato.nombre} {interview.candidato.apellido}</p>
                        </div>
                </div>

            : 
            <div>
                <h4 className='font-semibold'>Empresa:</h4>
                <div className='flex items-center'>
                    <img 
                        src={`${BASE_URL_FILES}${interview.vacante.empresa.foto}`} 
                        className='w-7 h-7 rounded-full mr-2' 
                        alt="" 
                        />
                    <p>{interview.vacante.empresa.nombre}</p>
                    </div>
            </div>
        }

        <div>
            <h4 className='font-semibold'>Vacante:</h4>
            <p>{interview.vacante.nombre_puesto}</p>
        </div>

        <div className='flex flex-col'>
            <button
             className='bg-seventh text-white text-[14px] px-2 py-1 rounded-md' onClick={handleAccessVideo}>
                Acceder a Videollamada
            </button>
            <div>
                <small className='font-semibold'>Room Id:  </small>
                <small>{interview.room_id || "axacsdfktgsf"}</small>
            </div>
        </div>
    </div>
  </>
  )
}

export default ScheduleGrid