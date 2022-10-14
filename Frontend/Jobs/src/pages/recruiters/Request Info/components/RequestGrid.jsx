import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import persona from '../../../../assets/icons/pruebapersona.jpg'
import Presentation from './Presentation'
import pdf from '../../../../assets/icons/pdf.png'

const RequestGrid = ({request}) => {

    const [ isVacancyReqOpen, setIsVacancyReqOpen] = useState(false)

    const onHandleModal = (e) => {
        e.preventDefault()
        setIsVacancyReqOpen(true)
        document.getElementById("portal").classList.add("modal_show-modal")
      }    

    return (
    <>
        <div className='flex justify-between items-center border-b border-b-fifth py-2'>

            <span className='flex items-center'>
                <img 
                src={persona} 
                alt=""
                className='w-20 h-20 rounded-full ml-2' />
                <div className='ml-2 mr-8'>
                    <h3 className='font-medium' >{request.candidato}</h3>
                    <p className='text-sixth font-medium'>Ingeniero en Software</p>
                </div>

                <button className='bg-seventh px-1 py-2 text-[12px] text-white rounded-lg' onClick={onHandleModal}>Presentacion</button>
                <a href={request.cv_url}
                  className='flex px-2 py-1 ml-2 rounded-lg cursor-pointer text-[12px] text-center border border-[#E5252A] hover:bg-fourth hover:text-white'
                  target='_blanck'
                >
                    <img src={pdf} alt="" className='w-4 h-4' />
                    <p className='text-center'>CV</p>
                </a>
            </span>

            <span className='flex flex-col'>
                <h4 className='font-semibold'>Status</h4>
                <p className='text-center'>A</p>
            </span>

        </div>

        {
            isVacancyReqOpen && (
                <Presentation setIsVacancyReqOpen={setIsVacancyReqOpen} request={request} />
            )
        }

    </>
  )
}

export default RequestGrid