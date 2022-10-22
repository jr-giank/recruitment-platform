import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../../context/context'
import { types } from '../../reducers/types'

import empleo from '../../assets/icons/empleo.png'
import nueva from '../../assets/icons/registro.png'
import logout from '../../assets/icons/desconectar.png'

const RecruitersMenu = ({onAccount}) => {

  const  { auth, dispatch } = useContext(authContext)

    const handleLogout = () => {
        dispatch({type:types.logout})
        window.localStorage.removeItem("itJobToken")
      }
    
    return (
    <div className='flex justify-around'>
        
        <Link className={`flex flex-col items-center px-2 ` } 
              to='/app/recruiter/viewVacancies' 
        >
            <img src={empleo} alt="" className='w-7 h-7' />
            <small>Vacantes</small>
        </Link>
        
        <Link className={`flex flex-col items-center ml-6 px-2 `}
              to='/app/recruiter/createVacancy' 
        >
            <img src={nueva} alt="" className='w-7 h-7' />
            <small>Nueva</small>
        </Link>

        <span className='ml-6 cursor-pointer' onClick={onAccount}>
          <img 
            src="https://i.pinimg.com/originals/82/48/3b/82483b829d1a39580360a6fef506072d.png" 
            alt=""
            className='w-7 h-7 rounded-full ml-2' 
            />
            <small>Cuenta</small>
        </span>

        <div id='account' className="hidden absolute text-black bg-white top-14 right-2 w-48 shadow-lg pb-2">
          
          <div className='flex flex-col w-full items-center justify-center mt-2'>
            <img src="https://i.pinimg.com/originals/82/48/3b/82483b829d1a39580360a6fef506072d.png" 
              alt=""
              className='w-14 h-14 rounded-full ml-2' 
            />
            <p>Cervecería Nacional</p>

            <div className='w-full flex flex-col mt-4'>
              <button className='flex justify-between px-2 py-1 text-left hover:bg-fifth' onClick={handleLogout}>
                <small>Cerrar Sesión</small>
                <img src={logout} alt="" className='w-6 h-6' />
              </button>
            </div>
          </div>
        </div>
    
    </div>
  )
}

export default RecruitersMenu