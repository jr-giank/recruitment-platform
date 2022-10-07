import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import CompanyRegistrationPage from '../pages/recruiters/CompanyRegistrationPage'
import Navigation from '../sharedComponents/navigation/navigation/Navigation'

const AppRouter = () => {
  return (
    <>
    <Navigation />
      <Router>
          <Routes>
              <Route path='/'  element={<CompanyRegistrationPage /> } />
              <Route path='/recruiter/signUp' element={<CompanyRegistrationPage />} />
              <Route path='/recruiter/createVacancy' element={<CompanyRegistrationPage />} />
              <Route path='/recruiter/viewVacancies' element={<CompanyRegistrationPage />} />
          </Routes>
      </Router>
    </>
  )
}

export default AppRouter