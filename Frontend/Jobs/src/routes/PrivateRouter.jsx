import React, { useContext } from 'react'
import { useReducer } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { authContext, technicalTestContext } from '../context/context'
import ProfilePage from '../pages/candidates/Portfolio/ProfilePage'
import SchedulePage from '../pages/Schedule/SchedulePage'
import NoAccess from '../pages/security/NoAccess'
import Room from '../pages/video calling/Room'
import { technicalTestReducer } from '../reducers/TechnicalTest'
import CandidatesRouter from './CandidatesRouter'
import RecruitersRouter from './RecruitersRouter'

const PrivateRouter = () => {

    const {auth} = useContext(authContext)
    const [ techTest, dispatch ] = useReducer(technicalTestReducer, {} )

    return (
    <technicalTestContext.Provider value={{techTest, dispatch}} >
    <Routes>
        <Route 
          path='/' 
          element={auth.rol === 0 ? <Navigate to='/app/candidate/viewAllVacancies' /> : <Navigate to='/app/recruiter/viewVacancies' />} 
          />
        <Route path='/candidate/*' element={auth.rol === 0 ? <CandidatesRouter /> : <NoAccess />} />
        <Route path='/recruiter/*' element={auth.rol === 1 ? <RecruitersRouter /> : <NoAccess />}/>
        <Route path='/candidateProfile/:id' element={<ProfilePage />} />
        <Route path='/diary' element={<SchedulePage />}/>
        <Route path='/video-room' element={<Room />}/>
    </Routes>
  </technicalTestContext.Provider>   
  )
}

export default PrivateRouter