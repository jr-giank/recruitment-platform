import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { authContext } from '../../../../../context/context'
import { f_delete, get, put } from '../../../../../services/services'
import Loading from '../../../../../sharedComponents/ui/Loading'
import eliminar from '../../../../../assets/icons/eliminar.png'
import marcar from '../../../../../assets/icons/correct.png'
import Swal from 'sweetalert2'
import { BASE_URL_FILES } from '../../../../../constants/baseURL'

const InterviewsAvailable = ({vacancyId, vacancyName }) => {

  const [ schedule, setSchedules ] = useState([])
  const [ isLoading, setIsLoading ] = useState(true)

  const { auth } = useContext(authContext)

  useEffect(() => {
    get(`entrevista/vacante/${vacancyId}/`, { "Authorization":`Bearer ${auth.token}` })
    .then(res => {
      if(res.exito){
        setSchedules([...res.data])
      }
      setIsLoading(false)
    })
  }, [])

  const handleDelete = (e,sch) => {
    e.preventDefault()

    let schToDelete = {};

    if(sch.candidato){
        schToDelete = {
          usuario: auth.user_id,
          texto: `El horario que seleccionaste para la entrevista de la vacante ${vacancyName} ha sido eliminado. Favor agendar otro horario de los disponibles.`, 
        motivo_mensaje: "Eliminación de horario de vacante"
      }
    }

    Swal.fire({
      title: "Eliminar Horario",
      text : "¿Estás seguro de que deseas eliminar este horario? Se le enviará una notificación automática al candidato que ha agendado este horario de parte de su empresa.",
      icon: "warning",
      showDenyButton: true,
      showConfirmButton: true,
      confirmButtonText : "Aceptar",
      denyButtonText: "Cancelar"
    })
    .then(result => {

      if(result.isConfirmed){
                f_delete(`entrevista/${sch.id}/`, 
                    {'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`}, 
                    schToDelete )
               .then(res => {
              if(res.exito){
                setSchedules(schedules => schedules.filter( s => s.id !== sch.id))
                Swal.fire("Eliminado", "El horario ha sido eliminado")
              }
          })
      }
    })
  }

  const handleMarkCompleted = (e, sch) => {

    const schCopy = {...sch, completa:true}
    schCopy.empresa = schCopy.vacante.empresa.id
    schCopy.candidato = schCopy.candidato ?  schCopy.candidato.candidato_id : null
    schCopy.vacante = schCopy.vacante.id

    console.log(schCopy)

    put(`entrevista/${sch.id}/`, {'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`}, schCopy)
    .then(res => {
      console.log(res)
        if(res.exito){
            Swal.fire("Agenda de entrevista", "La Entrevista ha sido marcada como completada", "success")
            console.log(schedule)
            setSchedules(schedule.map(sch => sch.id === res.data.id ? res.data : sch))
        }
        else{
            Swal.fire("Error", "Los cambios no se pudieron guardar", "error")
        }
    }).catch(e => {
      Swal.fire("Error", "Hubo un error al conectarse al servidor", "error")
    })
  }

  return (
    <div className='flex flex-col mx-10 mt-8'>
      {
        isLoading 
          ? 
            <Loading />
          :
            (
              
        // Renderizar el <table>  unicamente si se tienen horarios de entrevistas configurados para esa vacante.
        schedule.length > 0 
        ?
        (<table>
          <thead>
            <tr className='text-left border-b border-fifth text-[15px] text-twelve'>
              <th>Fecha</th>
              <th>Hora</th>
              <th className='text-center'>Seleccionado Por</th>
              <th>Status</th>
              <th className='text-center'>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {
            schedule.map(sch => (
                <tr className='border-b border-fifth hover:bg-nineth text-[14px] ' key={sch.id}>
                  <td className='py-2'>  {sch.fecha}</td>
                  <td className='py-2'>  {sch.hora}</td>
                  <td className='py-2'>
                    {
                      sch.candidato ? (
                        <div className='flex justify-center items-center'>
                          <img src={`${BASE_URL_FILES}${sch.candidato.foto}`} className='w-10 h-10 rounded-full ml-2' alt="" />
                          <p className='ml-2'>{sch.candidato.nombre} {sch.candidato.apellido}</p> 
                        </div>
                      )
                      : <p className='text-center'>N/A</p>
                    } 
                  </td>
                  <td className='py-2'> <h5 > {sch.completa ? "Completada" : "Pendiente"} </h5></td>
                  <td className='flex justify-center py-2'>
                    <button> 
                      <img src={eliminar} onClick={(e)=>handleDelete(e,sch)} className='w-6 h-6' alt="" /> 
                    </button>
                    {
                      !sch.completa &&
                      <button className='ml-4'> 
                        <img title='Marcar Como Realizada' src={marcar} onClick={(e)=>handleMarkCompleted(e,sch)} className='w-6 h-6' alt="" /> 
                      </button>
                    }
                  </td>
                </tr>
              ))
            }
          </tbody>

      </table>)
      :
        <p className='text-center'>No tienes horarios de entrevistas configurados para esta vacante</p>
            )
      }

    </div>
  )
}

export default InterviewsAvailable