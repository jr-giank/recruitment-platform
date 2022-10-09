import React from 'react'
import VacancyGridAll from './components/VacancyGridAll'

const VacancyViewAll = () => {
    return(
        <div className='w-full pt-2 mt-20 px-4'>
            <h1 className='text-center mt-10 font-bold text-2xl'>Vacantes disponibles</h1>
            <VacancyGridAll/>
            <VacancyGridAll/>
            <VacancyGridAll/>
        </div>
    )
}

export default VacancyViewAll