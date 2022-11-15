import React from 'react'

const ReqPresentation = ({request}) => {
  return (
    <div className='px-2 py-2 h-full'>
                    
    <div className='flex'>
        <img  src={`http://127.0.0.1:8000${request.candidato.foto}`} className='w-16 h-16 rounded-full'/>
        <span className='ml-2'>
            <h4>{request.candidato.nombre} {request.candidato.apellido}</h4>
            <p className='text-sixth font-medium w-full'>{request.candidato.titulo_personal}</p>
        </span>
    </div>
    <div className='overflow-y-auto border border-fifth rounded-lg mt-4 h-[70%] py-2 px-3'>
        <pre>
            <p className='font-inter whitespace-normal'>
                {request.mensaje}
            </p>                      
        </pre>
    </div>
</div>
  )
}

export default ReqPresentation