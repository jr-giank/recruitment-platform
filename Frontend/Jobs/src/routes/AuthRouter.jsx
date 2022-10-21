import React from 'react'
import {Routes, Route} from 'react-router-dom';
import SignInPage from '../pages/login/SignInPage';
import CompanyRegistrationPage from '../pages/recruiters/Company Registration/CompanyRegistrationPage';

const AuthRouter = () => {
  return (
    <Routes>
        <Route path='/login' element={<SignInPage />} />
        <Route path='/recruiter/signUp' element={<CompanyRegistrationPage />} />
    </Routes>
  )
}

export default AuthRouter