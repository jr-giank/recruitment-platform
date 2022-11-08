import React from 'react'
import pdfIcon from '../../../../../assets/icons/pdf.png'
import remove from '../../../../../assets/icons/eliminar.png'

const Cvs = ({cv1, cv2, setEditableData, onHandleOpenModal, setIsEdited}) => {
  
    const handleRemovePdf = (e, target) => {
        setEditableData(data => ({...data, [target]: null}))
        setIsEdited(true)
    }

    return (
        <div className='flex flex-col'>

        {
            (cv1 === null || cv2 === null) && (
                <div className='flex justify-center'>
                    <button className='bg-eleventh w-full py-2' onClick={onHandleOpenModal}>
                        + Agregar Nuevo
                    </button>
                </div>
            )
        }
            {
                cv1 && (
                    <div className='w-full flex items-center justify-between shadow-md py-3 px-3 mt-4'>
                        <div className='flex items-center'>
                            <img src={pdfIcon} alt="" />
                            <p className='ml-2'>Este es el nombre del archivo PDF</p>
                            <a href={`http://127.0.0.1:8000${cv1}`} 
                                target='blanck'
                                className='text-[12px] bg-fourth text-white h-5 rounded-lg px-2 ml-4'
                            >
                                Ver PDF
                            </a>
                        </div>
                       <button> <img src={remove} onClick={handleRemovePdf} alt="" className='w-7' /> </button>
                    </div>
                )
            }

            {
                cv2 && (
                    <div className='w-full flex justify-between shadow-md py-3 px-3'>
                    <div className='flex items-center'>
                        <img src={pdfIcon} alt="" />
                        <p className='ml-2'>Este es el nombre del archivo PDF</p>
                        <a href={`http://127.0.0.1:8000${cv2}`} 
                            target='blanck'
                            className='text-[12px] bg-fourth text-white h-5 rounded-lg px-2 ml-4'
                        >
                            Ver PDF
                        </a>
                    </div>
                    <button> <img src={remove} onClick={handleRemovePdf} alt="" className='w-7' /> </button>
                </div>
                )
            }
        </div>
  )
}

export default Cvs