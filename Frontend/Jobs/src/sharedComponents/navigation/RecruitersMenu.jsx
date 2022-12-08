import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../../context/context'
import { types } from '../../reducers/types'

import empleo from '../../assets/icons/empleo.png'
import nueva from '../../assets/icons/registro.png'
import logout from '../../assets/icons/desconectar.png'
import test from '../../assets/icons/desarrollo-web.png'
import calendar from '../../assets/icons/calendar.png'
import videocall from '../../assets/icons/videocall.png'

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
        
        <Link className={`flex flex-col items-center px-2 `}
              to='/app/recruiter/createVacancy' 
        >
            <img src={nueva} alt="" className='w-7 h-7' />
            <small>Nueva</small>
        </Link>


        <Link className={`flex flex-col items-center px-2 ` } 
            to='/app/recruiter/viewTests' 
        >
            <img src={test} alt="" className='w-7 h-7' />
            <small>Pruebas</small>
        </Link>
        
        <Link className={`flex flex-col items-center px-2 ` } 
            to='/app/diary' 
        >
            <img src={calendar} alt="" className='w-7 h-7' />
            <small>Agenda</small>
        </Link>

        <span className='ml-6 cursor-pointer' onClick={onAccount}>
          <img 
            src={`http://127.0.0.1:8000${auth.foto}`} 
            alt=""
            className='w-7 h-7 rounded-full ml-2' 
            />
            <small>Cuenta</small>
        </span>

        <div id='account' className="hidden absolute text-black bg-white top-14 right-2 w-48 shadow-lg pb-2">
          
          <div className='flex flex-col w-full items-center justify-center mt-2'>
            <img src={`http://127.0.0.1:8000${auth.foto}`} 
              alt=""
              className='w-14 h-14 rounded-full ml-2' 
            />
            <p>{auth.nombre_empresa}</p>

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