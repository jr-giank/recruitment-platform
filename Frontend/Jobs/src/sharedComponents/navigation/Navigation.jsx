import React, { useContext } from 'react'
import { authContext } from '../../context/context'
import CandidatesMenu from './CandidatesMenu'
import RecruitersMenu from './RecruitersMenu'

const Navigation = () => {

  const { auth } = useContext(authContext)

  const onAccount = (e) => {
    e.preventDefault()
    document.getElementById("account").classList.toggle("hidden")
  }

  return (
    <nav className='w-full flex justify-between flex-wrap items-center  bg-primary pt-1 text-white fixed top-0 z-50'>
    
        <div className='bg-primary w-full pt-1 px-8 flex justify-between items-center'>
          <div>
            <h2 className='text-white ml-4  font-extrabold'>ItJobs.Net</h2>
          </div>
            <div className='flex items-center justify-center'>
            {auth.rol === 1 && <RecruitersMenu onAccount={onAccount} />}
            {auth.rol === 0 && <CandidatesMenu onAccount={onAccount} />}
            </div>
        </div>
    </nav>
  )
}

export default Navigation