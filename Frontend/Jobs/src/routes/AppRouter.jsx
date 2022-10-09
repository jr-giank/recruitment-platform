import React from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import CompanyRegistrationPage from '../pages/recruiters/Company Registration/CompanyRegistrationPage'
import VacancyRegistrationPage from '../pages/recruiters/Vacancy Registration/VacancyRegistrationPage'
import VacancyViewPage from '../pages/recruiters/Vacancy View/VacancyViewPage'
import VacancyViewAll from '../pages/candidates/All Vacancy View/VacancyViewAll'
import VacancyViewSingle from '../pages/candidates/Single Vacancy View/VacancyViewSingle'

import Navigation from '../sharedComponents/navigation/navigation/Navigation'

const AppRouter = () => {
  return (
    <>
    <Navigation />
      <Router>
          <Routes>
              <Route path='/'  element={<VacancyViewPage /> } />
              <Route path='/recruiter/signUp' element={<CompanyRegistrationPage />} />
              <Route path='/recruiter/createVacancy' element={<VacancyRegistrationPage />} />
              <Route path='/recruiter/viewVacancies' element={<VacancyViewPage />} />
              <Route path='/candidates/viewAllVacancies' element={<VacancyViewAll />} />
              <Route path='/candidates/viewSingleVacancy' element={<VacancyViewSingle />} />

          </Routes>
      </Router>
    </>
  )
}

export default AppRouter