import React from 'react'
import { useReducer } from 'react'
import {Routes, Route} from 'react-router-dom'
import { technicalTestContext } from '../context/context'

import VacancyRequestsPage from '../pages/recruiters/Request Info/VacancyRequests'
import TestRegistration_Page from '../pages/recruiters/Technical Tests/Test Registration/TestRegistration_Page'
import TechnicalTestView_Page from '../pages/recruiters/Technical Tests/Tests View/TechnicalTestsView_Page'
import VacancyRegistrationPage from '../pages/recruiters/Vacancy Registration/VacancyRegistrationPage'
import VacancyViewPage from '../pages/recruiters/Vacancy View/VacancyViewPage'
import TestViewSingle_Page from '../pages/recruiters/Technical Tests/Test View Single/TestViewSingle_Page'
import SchedulePage from '../pages/recruiters/Schedule/SchedulePage'

import { technicalTestReducer } from '../reducers/TechnicalTest'

const RecruitersRouter = () => {
      
  const [ techTest, dispatch ] = useReducer(technicalTestReducer, {} )
    
  return (
        <technicalTestContext.Provider value={{techTest, dispatch}} >         
            <Routes>
                  <Route path='/createVacancy' element={<VacancyRegistrationPage />} />
                  <Route path='/viewVacancies' element={<VacancyViewPage />} />
                  <Route path='/viewVacancyRequests/:id/:vacancyName' element={<VacancyRequestsPage />} />
                  <Route path='/createTest' element={<TestRegistration_Page />} />
                  <Route path='/viewTests' element={<TechnicalTestView_Page />} />
                  <Route path='/viewTest/:id' element={<TestViewSingle_Page />} />
                  <Route path='/diary' element={<SchedulePage/>}/>
            </Routes>
        </technicalTestContext.Provider>
  )
}

export default RecruitersRouter