import React from 'react'

import {Routes, Route } from 'react-router-dom'

import VacancyViewSingle from '../pages/candidates/Single Vacancy View/VacancyViewSingle'
import VacancyViewAll from '../pages/candidates/All Vacancy View/VacancyViewAll'
import SavedJobsPanel_Page from '../pages/candidates/Saved Jobs Panel/SavedJobsPanel_Page'

const CandidatesRouter = () => {
  return (
    <Routes>
        <Route path='/viewAllVacancies' element={<VacancyViewAll />} />
        <Route path='/viewSingleVacancy/:id' element={<VacancyViewSingle />} />
        <Route path='/panel-saved-jobs' element={<SavedJobsPanel_Page />} />
    </Routes>
  )
}

export default CandidatesRouter