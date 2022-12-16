import React from 'react'
;
const ScheduleGrid = ({date, setPickedDate, isPickedByUserOnline, isAvailableToPick}) => {

  const disabledRadio = date.candidato || !isAvailableToPick

  return (

    <div className='py-2 px-4 flex justify-between border-b border-b-fifth'>
        <div className='flex items-center mb-2'>
         
          <input 
            type="radio" 
            value={ `${date.fecha} ${date.hora}` ?? ""}   
            onChange={(e)=>setPickedDate(date)}
            name="date" 
            className='w-4 h-4' 
            id={`radio-${date.id}`}
            disabled={disabledRadio}
            checked={isPickedByUserOnline}
          />
          
          <label htmlFor={`radio-${date.id}`} className='ml-2 text-sm flex flex-col'>
            <p>Fecha: {date.fecha.split("-").reverse().join("-")}</p>
            <p>hora: {date.hora}</p> 
          </label>
        </div>

        {
          date.candidato &&
           <p>Ocupado</p>
        }
    </div>
  )
}

export default ScheduleGrid