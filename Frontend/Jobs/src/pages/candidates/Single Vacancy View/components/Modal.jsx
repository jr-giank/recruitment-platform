import React from 'react'
import {Link} from 'react-router-dom'
import {Portal} from 'react-portal'
import AplicationGrid from './AplicationGrid'

const Modal = ({setIsVacancyReqOpen, vacancyId}) => {

    const onCloseModal = () => {
        setIsVacancyReqOpen(false);
        document.getElementById("portal").classList.remove("modal_show-modal")
    }

    return(
        <Portal node={document && document.getElementById("portal")}>
            <div className='modal_content h-[79%]'>
                <div className='flex justify-between border-b border-b-fifth pb-2'>
                    <h3 className='font-semibold ml-2 '>Aplicar a vacante</h3>
                    <button className='text-xl py-1 px-3 hover:bg-fourth hover:text-white' onClick={onCloseModal}>X</button> 
                </div>
                <div className='overflow-y-auto px-2'>
                    <AplicationGrid vacancyId={vacancyId} onCloseModal={onCloseModal} />                              
                </div>
            </div>
                {/* <Link to='/recruiters/createVacancy'>Navegar</Link> */}
        </Portal>
    )

}

export default Modal