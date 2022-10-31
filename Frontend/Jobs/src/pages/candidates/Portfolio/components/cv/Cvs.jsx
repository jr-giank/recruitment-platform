import React from 'react'
import pdfIcon from '../../../../../assets/icons/pdf.png'
import remove from '../../../../../assets/icons/eliminar.png'

const Cvs = ({cvs, onHandleOpenModal}) => {
  
    return (
        <div className='flex flex-col'>
{/* 
            {
                cvs.map(cv => (
                    <div className='flex items-center shadow-md py-3'>
                    <img src={pdfIcon} alt="" />
                    <p>Este es el nombre del archivo PDF</p>
                </div>
                ))
            } */}

            <div className='flex justify-center'>
                <button className='bg-fifth w-full py-2' onClick={onHandleOpenModal}>
                    + Agregar Nuevo
                </button>
            </div>

            <div className='w-full flex items-center justify-between shadow-md py-3 px-3 mt-4'>
                <div className='flex items-center'>
                    <img src={pdfIcon} alt="" />
                    <p className='ml-2'>Este es el nombre del archivo PDF</p>
                    <a href="https://www.youtube.com/c/AneudysSantos/videos" 
                        target='blanck'
                        className='text-[12px] bg-fourth text-white h-5 rounded-lg px-2 ml-4'
                    >
                        Ver PDF
                    </a>
                </div>
                <img src={remove} alt="" className='w-7' />
            </div>

            <div className='w-full flex justify-between shadow-md py-3 px-3'>
                <div className='flex items-center'>
                    <img src={pdfIcon} alt="" />
                    <p className='ml-2'>Este es el nombre del archivo PDF</p>
                    <a href="https://www.youtube.com/c/AneudysSantos/videos" 
                        target='blanck'
                        className='text-[12px] bg-fourth text-white h-5 rounded-lg px-2 ml-4'
                    >
                        Ver PDF
                    </a>
                </div>
                <img src={remove} alt="" className='w-7' />
            </div>
        </div>
  )
}

export default Cvs