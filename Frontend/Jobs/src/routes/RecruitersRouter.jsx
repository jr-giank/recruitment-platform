import React from 'react'
import {Routes, Route} from 'react-router-dom'
import VacancyRequestsPage from '../pages/recruiters/Request Info/VacancyRequests'
import VacancyRegistrationPage from '../pages/recruiters/Vacancy Registration/VacancyRegistrationPage'
import VacancyViewPage from '../pages/recruiters/Vacancy View/VacancyViewPage'

const RecruitersRouter = () => {
  return (
    <Routes>
          <Route path='/createVacancy' element={<VacancyRegistrationPage />} />
          <Route path='/viewVacancies' element={<VacancyViewPage />} />
          <Route path='/viewVacancyRequests/:id' element={<VacancyRequestsPage />} />
    </Routes>
  )
}

export default RecruitersRouter