import React from 'react'
import {Routes, Route} from 'react-router-dom';
import SignInPage from '../pages/login/SignInPage';
import CompanyRegistrationPage from '../pages/recruiters/Company Registration/CompanyRegistrationPage';
import CandidatesRegistrationPage from '../pages/candidates/Candidates Registration/CandidatesRegistrationPage'

const AuthRouter = () => {
  return (
    <Routes>
        <Route path='/login' element={<SignInPage />} />
        <Route path='/recruiter/signUp' element={<CompanyRegistrationPage />} />
        <Route path='/candidates/signUp' element={<CandidatesRegistrationPage />} />
    </Routes>
  )
}

export default AuthRouter