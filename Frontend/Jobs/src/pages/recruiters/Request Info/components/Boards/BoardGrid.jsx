import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import pdf from '../../../../../assets/icons/pdf.png'
import FormAnswerRequest from '../FormAnswerRequest'
import ReqPresentation from '../ReqPresentation'
import RequestActionModal from '../RequestActionModal'

const BoardGrid = ({request, setRequests, vacancyId}) => {

    const [ isModalOpen, setIsModalOpen] = useState(false)
    const [ actionType, setActionType ] = useState(1)

    const onHandleModal = (e, type) => {
        e.preventDefault()
        setActionType(type)
        setIsModalOpen(true)
        document.getElementById("portal").classList.add("modal_show-modal")
    }
     
    const onCloseModal = () => {
        setIsModalOpen(false);
        document.getElementById("portal").classList.remove("modal_show-modal")
    }

  return (
    <>
    <div className='bg-white flex flex-col w-full pt-3 pb-5 mt-2 rounded-lg'>
        
        <div className='flex'>
            <img 
                src={`http://127.0.0.1:8000${request.candidato.foto}`} 
                alt=""
                className='w-12 h-12 rounded-full ml-2' 
            />
            <span className='ml-2 flex flex-col w-3/4'>
                <Link to={`/app/candidateProfile/${request.candidato.id}`} className='hover:underline'>
                    <small className='font-bold mb-0 shrink-1'>{request.candidato.nombre} {request.candidato.apellido} </small>
                </Link>
                <small className='text-sixth font-medium'>{request.candidato.titulo_personal}</small>   
            </span>
        </div>

        <div className='flex w-full justify-end mt-3 pr-4'>
            <button className='bg-seventh px-1 text-[10px] text-white rounded-lg' onClick={(e)=>onHandleModal(e, 1)} >
                Presentacion
            </button>
                <a href={request.cv_url}
                  className='flex px-2  ml-2 rounded-lg cursor-pointer text-[10px] text-center border border-[#E5252A] hover:bg-fourth hover:text-white'
                  target='_blanck'
                  >
                    <img src={pdf} alt="" className='w-4 h-4 mt-1' />
                    <p className='text-center'>CV</p>
                </a>
                <button className='bg-secondary px-1 text-[10px] text-white rounded-lg ml-2' onClick={(e)=>onHandleModal(e, 2)} >
                    Responder
                </button>
        </div>

    </div>
        {
            isModalOpen && (
            <RequestActionModal onCloseModal={onCloseModal} >
                    {
                        actionType === 1 
                                    ? 
                                        <ReqPresentation request={request}  /> 
                                    : 
                                        <FormAnswerRequest 
                                            request={request} 
                                            setRequests={setRequests} 
                                            onCloseModal={onCloseModal}
                                            vacancyId={vacancyId}    
                                        />
                    }
                </ RequestActionModal >
            )
        }
    </>
  )
}

export default BoardGrid