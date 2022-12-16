import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import {Portal} from 'react-portal'
import Swal from 'sweetalert2'
import shortUUID from 'short-uuid'

import { authContext } from '../../../../context/context'
import { get, put } from '../../../../services/services'
import Loading from '../../../../sharedComponents/ui/Loading'
import ScheduleGrid from './ScheduleGrid'

const ScheduleModal = ({setIsModalOpen, id_vacante}) => {

    const { auth } = useContext(authContext)

    const [ isLoading, setIsLoading ] = useState(true)
    const [ dates, setDates ] = useState([])
    const [ pickedDate , setPickedDate ] = useState(null) 
    const [ isAvailableToPick, setIsAvailableToPick ] = useState(true)

    useEffect(()=> {
        get(`entrevista/vacante/${id_vacante}/`, {"Authorization":`Bearer ${auth.token}`})
        .then(res => {
        if(res.exito){
            setDates([...res.data])
            setPickedDate(res.data.find(date => date.candidato && date.candidato.id === auth.candidato_id) || null)
            setIsAvailableToPick(!res.data.find(date => date.candidato && date.candidato.id === auth.candidato_id) ? true : false)
        }
            setIsLoading(false)
        })
    }, [])

    const onCloseModal = () => {
        setIsModalOpen(false);
        document.getElementById("portal").classList.remove("modal_show-modal")
    }

    const onHandleSubmitDate = (e, action) =>{

        e.preventDefault()

        if(!pickedDate && action === 1){
            Swal.fire("Seleccione una fecha", "Debe seleccionar una fecha para agendar", "error")
            return
        }

        if(!pickedDate && action === 0){
            Swal.fire("Error", "No tiene fecha agendada para borrar", "error")
            return
        }

        const pickedCopy = {...pickedDate}
        
        if(action === 1){
            pickedCopy.candidato = auth.candidato_id
            pickedCopy.room_id = shortUUID.generate()
            console.log(pickedCopy.room_id)
        }

        if(action === 0){
            pickedCopy.candidato = null
            pickedCopy.room_id = null
        }

        pickedCopy.empresa = pickedCopy.vacante.empresa.id
        pickedCopy.vacante = pickedCopy.vacante.id
        
        put(`entrevista/${pickedDate.id}/`, {'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`}, pickedCopy)
        .then(res => {
            if(res.exito){
                Swal.fire("Agenda de entrevista", "Cambios Guardados", "success")
                setDates(dates.map(date => res.data.id === date.id ? res.data : date))
                
                if(res.data.candidato){
                    setIsAvailableToPick(false)
                }else{
                    setIsAvailableToPick(true)
                    setPickedDate(null)
                }
            
            }else{
                Swal.fire("Error", "Los cambios no se pudieron guardar", "error")
                console.log(res)
            }
        })
    }

  return (
     <Portal node={document && document.getElementById("portal")}>
            <div className='modal_content h-[60%]'>
                <div className='flex justify-between border-b border-b-fifth pb-2'>
                    <h3 className='font-semibold ml-2 '>Seleccionar horario de entrevista</h3>
                    <button className='text-xl py-1 px-3 hover:bg-fourth hover:text-white' onClick={onCloseModal}>X</button> 
                </div>
                {
                    isLoading 
                        ? 
                            <Loading /> 
                        :
                        (
                        <>
                            <div className='overflow-y-auto px-2'>
                                {
                                    dates.map(date => (
                                        <ScheduleGrid 
                                            key={date.id}
                                            date={date} 
                                            setPickedDate={setPickedDate} 
                                            isPickedByUserOnline ={date.candidato && date?.candidato.id === auth.candidato_id}
                                            isAvailableToPick={isAvailableToPick}
                                        />
                                    ))
                                    }                       
                            </div>
                    {dates.length > 0 ?
                       (<div className='flex justify-center w-full mt-4'>
                            <button className='bg-seventh text-white py-1 px-1 rounded-md' onClick={(e) => onHandleSubmitDate(e, 1)}>
                                Guardar Seleccion
                            </button>
                            <button className='bg-fourth  text-white py-1 px-1 rounded-md ml-4' onClick={(e) => onHandleSubmitDate(e, 0)}>
                                Borrar Seleccion 
                            </button>
                        </div>
                    )
                    :
                    <p className='text-center'>No hay fechas de entrevistas configuradas para esta vacante</p>}
                    
                    </>
                    )
                }
            </div>
        </Portal>
  )
}

export default ScheduleModal