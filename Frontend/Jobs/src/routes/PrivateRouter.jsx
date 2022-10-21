import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { authContext } from '../context/context'
import NoAccess from '../pages/security/NoAccess'
import CandidatesRouter from './CandidatesRouter'
import RecruitersRouter from './RecruitersRouter'

const PrivateRouter = () => {

    const {auth} = useContext(authContext)

    return (
    <Routes>
        <Route 
          path='/' 
          element={auth.rol === 0 ? <Navigate to='/app/candidate/viewAllVacacies' /> : <Navigate to='/app/recruiter/viewVacancies' />} 
        />
        <Route path='/candidate/*' element={auth.rol === 0 ? <CandidatesRouter /> : <NoAccess />} />
        <Route path='/recruiter/*' element={auth.rol === 1 ? <RecruitersRouter /> : <NoAccess />}/>
    </Routes>
  )
}

export default PrivateRouter