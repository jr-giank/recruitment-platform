import React, { useContext } from 'react'
import { authContext } from '../../context/context'
import { types } from '../../reducers/types'
import CandidatesMenu from './CandidatesMenu'
import RecruitersMenu from './RecruitersMenu'

const Navigation = () => {

  const  { auth, dispatch } = useContext(authContext)

  const onAccount = (e) => {
    e.preventDefault()
    document.getElementById("account").classList.toggle("hidden")
  }

  const handleLogout = () => {
    dispatch({type:types.logout})
    window.localStorage.removeItem("itJobToken")
  }

  return (
    <nav className='w-full flex justify-between items-center px-8  bg-primary h-[9%] text-white fixed top-0 '>

    <div>
      <h2 className='text-white ml-4  font-extrabold'>ItJobs.Net</h2>
    </div>

      <div className='flex items-center justify-center'>

      {auth.rol === 1 && <RecruitersMenu onAccount={onAccount} />}
      {auth.rol === 0 && <CandidatesMenu onAccount={onAccount} />}

        {/* <span className='ml-6 cursor-pointer' onClick={onAccount}>
          <img 
            src="https://i.pinimg.com/originals/82/48/3b/82483b829d1a39580360a6fef506072d.png" 
            alt=""
            className='w-7 h-7 rounded-full ml-2' 
            />
            <small>Cuenta</small>
        </span> */}

        {/* <div id='account' className="hidden absolute text-black bg-white top-14 right-2 w-48 shadow-lg">
          
          <div className='flex flex-col w-full items-center justify-center mt-2'>
            <img src="https://i.pinimg.com/originals/82/48/3b/82483b829d1a39580360a6fef506072d.png" 
              alt=""
              className='w-14 h-14 rounded-full ml-2' 
            />
            <p>Cervecería Nacional</p>

            <div className='w-full flex flex-col mt-4'>
              <button className='px-2 py-1 text-left hover:bg-fifth' onClick={handleLogout}>
                <small>Cerrar Sesión</small>
              </button>
              <button className='px-2 py-1 text-left hover:bg-fifth'><small>Cerrar Sesión</small></button>
              <button className='px-2 py-1 text-left hover:bg-fifth'><small>Cerrar Sesión</small></button>
            </div>
          </div>
        </div> */}

      </div>
    </nav>
  )
}

export default Navigation