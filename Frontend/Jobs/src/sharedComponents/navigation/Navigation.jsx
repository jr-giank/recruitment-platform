import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { authContext } from '../../context/context'
import Filters from '../filters/Filters'
import CandidatesMenu from './CandidatesMenu'
import RecruitersMenu from './RecruitersMenu'

const Navigation = () => {

  const { auth } = useContext(authContext)

  const location = useLocation()

  const onAccount = (e) => {
    e.preventDefault()
    document.getElementById("account").classList.toggle("hidden")
  }

  return (
    <nav className='w-full flex justify-between flex-wrap items-center  bg-primary pt-1 text-white fixed top-0 '>
    
    <div className='bg-primary w-full pt-1 px-8 flex justify-between items-center'>
    <div>
      <h2 className='text-white ml-4  font-extrabold'>ItJobs.Net</h2>
    </div>
      <div className='flex items-center justify-center'>
      {auth.rol === 1 && <RecruitersMenu onAccount={onAccount} />}
      {auth.rol === 0 && <CandidatesMenu onAccount={onAccount} />}
      </div>
    </div>

    {
      // Si el usuario que está en linea tiene el rol de candidato tendrá las opciones de filtrado de vacantes.
      // Para visualizar dichos filtros se debe encontrar en la seccion de vacantes
      (auth.rol === 0 && location.pathname === '/app/candidate/viewAllVacancies') 
        &&  
      (<div className='w-full flex px-32 justify-between py-4 bg-white border-b border-sixth text-black'>
                            <h3 className='font-medium border-r border-sixth px-2'>Filtrado</h3>
                            <Filters />
                          </div>
        )
    }
    </nav>
  )
}

export default Navigation