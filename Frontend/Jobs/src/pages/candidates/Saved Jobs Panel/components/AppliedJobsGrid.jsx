import React, { useContext,useState } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../../../../context/context'
import ScheduleModal from './ScheduleModal'

const AppliedJobsGrid = ({request}) => {

   const { auth } = useContext(authContext) 
   const [ isModalOpen, setIsModalOpen ] = useState(false)
   
   const handleModalRequests = (e) => {
    e.preventDefault()
    setIsModalOpen(true)
    document.getElementById("portal").classList.add("modal_show-modal")
  }

  return (
    <>
    <div className='border-b w-full border-fifth pl-4 pr-4 py-4 '>

        <div className='flex gap-4'>
            {/* <img className='w-16 h-16 rounded-full 'src={`http://127.0.0.1:8000${vacancy.vacante.empresa.foto}`} alt="Scopic Software" /> */}
        
            <div className='flex flex-col'>
                <h4 className='font-bold'>{request?.vacante.nombre_puesto}               
                    <span className='border-solid border-2 border-nineth rounded bg-nineth m-2 text-sm'>jornada completa</span>
                    <span className='border-solid border-2 border-nineth rounded bg-nineth m-2 text-sm'>remoto</span>
                </h4>
                <p><strong>Status:</strong> {request?.status}</p>
                <div className='mt-4'>
                    
                    <Link className='justify-center text-[12px] border border-sixth rounded-lg cursor-pointer mr-3 mt-5 py-2 px-4 hover:bg-secondary ' to= {`/app/candidate/viewSingleVacancy/${request.vacante.id}`} >Ver vacante</Link> 

                    {
                        request.status === "E" &&
                            <button className='justify-center text-[12px] border border-sixth rounded-lg cursor-pointer mr-3 mt-5 py-2 px-4 hover:bg-secondary ' onClick={handleModalRequests} >
                                Seleccionar horario
                            </button> 
                    }
                </div>
            </div>
        </div>
    </div>

        {
            isModalOpen && (
                <ScheduleModal setIsModalOpen={setIsModalOpen} id_vacante={request.vacante.id} />
            )
        }
    </>
  )
}

export default AppliedJobsGrid