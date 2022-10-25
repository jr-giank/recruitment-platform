import React, { useState } from 'react'
import persona from '../../../../assets/icons/pruebapersona.jpg'
import pdf from '../../../../assets/icons/pdf.png'
import Presentation from './Presentation'

const BoardGrid = ({request}) => {

    const [ isVacancyReqOpen, setIsVacancyReqOpen] = useState(false)

    const onHandleModal = (e) => {
        e.preventDefault()
        setIsVacancyReqOpen(true)
        document.getElementById("portal").classList.add("modal_show-modal")
      }    

  return (
    <>
    <div className='bg-white flex flex-wrap w-full pt-3 pb-5 mt-2 rounded-lg'>
        <img 
            src={persona} 
            alt=""
            className='w-12 h-12 rounded-full ml-2' 
        />
        <span className='ml-2 flex flex-col'>
            <small className='font-bold mb-0'>{request.candidato}</small>
            <small className='text-sixth font-medium'>Ingeniero en Software</small>   
        </span>
        
        <div className='flex w-full justify-end mr-4'>
        <button className='bg-seventh px-1 text-[10px] text-white rounded-lg' onClick={onHandleModal} >Presentacion</button>
                <a href={request.cv_url}
                  className='flex px-2  ml-2 rounded-lg cursor-pointer text-[10px] text-center border border-[#E5252A] hover:bg-fourth hover:text-white'
                  target='_blanck'
                  >
                    <img src={pdf} alt="" className='w-4 h-4 mt-1' />
                    <p className='text-center'>CV</p>
                </a>

        </div>

    </div>
        {
            isVacancyReqOpen && (
                <Presentation setIsVacancyReqOpen={setIsVacancyReqOpen} request={request} />
            )
        }
    </>
  )
}

export default BoardGrid