import React from 'react'
import {Portal} from 'react-portal'
import ModalGrid from './ModalGrid'

const Modal = ({setIsVacancyReqOpen}) => {

    const onCloseModal = () => {
        setIsVacancyReqOpen(false);
        document.getElementById("portal").classList.remove("modal_show-modal")
    }

  return (
     <Portal node={document && document.getElementById("portal")}>
            <div className='modal_content h-[50%]'>
                <div className='flex justify-between border-b border-b-fifth pb-2'>
                    <h3 className='font-semibold ml-2 '>Seleccionar horario de entrevista</h3>
                    <button className='text-xl py-1 px-3 hover:bg-fourth hover:text-white' onClick={onCloseModal}>X</button> 
                </div>
                <div className='overflow-y-auto px-2'>
                    <ModalGrid onCloseModal={onCloseModal}/>                            
                </div>
            </div>
        </Portal>
  )
}

export default Modal