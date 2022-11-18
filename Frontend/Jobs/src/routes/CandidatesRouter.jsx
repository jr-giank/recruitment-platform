import React from 'react'

import {Routes, Route } from 'react-router-dom'

import VacancyViewSingle from '../pages/candidates/Single Vacancy View/VacancyViewSingle'
import VacancyViewAll from '../pages/candidates/All Vacancy View/VacancyViewAll'
import SavedJobsPanel_Page from '../pages/candidates/Saved Jobs Panel/SavedJobsPanel_Page'
import ProfilePage from '../pages/candidates/Portfolio/ProfilePage'
import MessagesPage from '../pages/candidates/Messages/MessagesPage'
import TechnicalTestViewPage from '../pages/candidates/Technical Test View/TechnicalTestViewPage'

const CandidatesRouter = () => {
  return (
    <Routes>
        <Route path='/viewAllVacancies' element={<VacancyViewAll />} />
        <Route path='/viewSingleVacancy/:id' element={<VacancyViewSingle />} />
        <Route path='/panel-saved-jobs' element={<SavedJobsPanel_Page />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/message' element={<MessagesPage/>}/>
        <Route path='/technicalTest/:id' element={<TechnicalTestViewPage/>}/>
    </Routes>
  )
}

export default CandidatesRouter