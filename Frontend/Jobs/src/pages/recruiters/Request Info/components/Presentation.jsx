import React from 'react'
import { Portal } from 'react-portal'
import persona from '../../../../assets/icons/pruebapersona.jpg'

const Presentation = ({request, setIsVacancyReqOpen}) => {
  
    const onCloseModal = () => {
        setIsVacancyReqOpen(false);
        document.getElementById("portal").classList.remove("modal_show-modal")
    }

    return (
    <Portal node={document.getElementById("portal")}>
        <div className='modal_content h-[80%]'>
                <div className='flex justify-between border-b border-b-fifth pb-2'>
                    <h3 className='font-semibold ml-2 mt-1 '>Solicitud</h3>
                    <button className='text-xl py-1 px-3 hover:bg-fourth hover:text-white' onClick={onCloseModal}>X</button> 
                </div>
                <div className='px-2 py-2 h-full'>
                    
                    <div className='flex'>
                        <img src={persona} alt="" className='w-16 h-16 rounded-full'/>
                        <span className='ml-2'>
                            <h4>{request.candidato}</h4>
                            <p className='text-sixth font-medium'>Ingeniero En Software</p>
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
            </div>
    </Portal>
  )
}

export default Presentation