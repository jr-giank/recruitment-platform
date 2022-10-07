import React from 'react'
import VacancyDescription from '../Vacancy View/components/VacancyDescription'
import VacancyGrid from '../Vacancy View/components/VacancyGrid'

const VacancyViewPage = () => {
  return (
    <div className='flex w-full h-full'>

      <div className='w-1/3 border-r-fifth border-r h-full pt-2'>
        <h1 className='text-center font-bold text-2xl'>Tus Vacantes anunciadas</h1>
        <VacancyGrid name={"Ingeniero de Software"}/>
        <VacancyGrid name={"Desarrollador Web Senior"}/>
        <VacancyGrid name={"Desarrollador Web Junior"}/>
        <VacancyGrid name={"Desarrollador Móvil iOS"}/>
        <VacancyGrid name={"Desarrollador Python"}/>
        <VacancyGrid name={"Desarrollador Android"}/>
      </div>

      <div className='w-2/3 overflow-y-auto'>
        <VacancyDescription />
      </div>

    </div>
  )
}

export default VacancyViewPage