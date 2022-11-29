import React from 'react'

const ScheduleGrid = ({interview, lastInterview}) => {
  
    return (
    <>
        {
            // Esta comparacion busca agrupar la agenda de entrevista por cada fecha distinta comparando la fecha de la entrevista
            // actual recibida con la fecha de la entrevista anterior para determiar cuando cambio la fecha.
            // Si la fecha anterior es false, quiere decir que es el primer horario que se está renderizando.
            (!lastInterview || interview.fecha !== lastInterview.fecha) 
             && 
             <h3 className='font-bold text-seventh mt-4 w-full'>{interview.fecha}</h3> 
        }
        <div className='flex justify-between flex-wrap w-full mt-4 border border-fifth px-3 shadow py-4'>
        <div>
            <h4 className='font-semibold'>Hora</h4>
            <p>{interview.hora}</p>
        </div>

        <div>
            <h4 className='font-semibold'>Entrevista A:</h4>
            <div className='flex items-center'>
                <img 
                    src={`http://127.0.0.1:8000${interview.candidato.foto}`} 
                    className='w-7 h-7 rounded-full mr-2' 
                    alt="" 
                    />
                <p>{interview.candidato.nombre} {interview.candidato.apellido}</p>
            </div>
        </div>

        <div>
            <h4 className='font-semibold'>Vacante:</h4>
            <p>{interview.vacante.nombre_puesto}</p>
        </div>

        <div>
            <h4 className='font-semibold'>Room Id</h4>
            <p>{interview.roomId || "axacsdfktgsf"}</p>
        </div>
    </div>
  </>
  )
}

export default ScheduleGrid