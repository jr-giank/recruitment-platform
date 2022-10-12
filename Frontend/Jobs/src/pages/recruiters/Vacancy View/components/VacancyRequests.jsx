import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {Portal} from 'react-portal'
import RequestGrid from './RequestGrid'
import { get } from '../../../../services/services'

const VacancyRequests = ({setIsVacancyReqOpen, id}) => {

    const [ request, setRequests] = useState([])

    useEffect(() => {
        get(`solicitudes/vacante/${id}/`)
        .then(data => {
            setRequests(data)
            console.log(data)
        })
    }, [])

    const onCloseModal = () => {
        setIsVacancyReqOpen(false);
        document.getElementById("portal").classList.remove("modal_show-modal")
    }

    return (
        <Portal node={document && document.getElementById("portal")}>
            <div className='modal_content h-[70%]'>
                <div className='flex justify-between border-b border-b-fifth pb-2'>
                    <h2 className='font-semibold ml-2 '>Solicitudes</h2>
                    <button className='text-xl py-1 px-3 hover:bg-fourth hover:text-white' onClick={onCloseModal}>X</button> 
                </div>
                <div className='overflow-y-auto px-2'>
                    <ul>
                        {
                            request.map(req => (
                                <RequestGrid key={req.id}  request={req} />
                            ))
                        }    
                    </ul>            
                </div>
            </div>
                {/* <Link to='/recruiters/createVacancy'>Navegar</Link> */}
        </Portal>
  )
}

export default VacancyRequests