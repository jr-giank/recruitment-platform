import React from 'react'

import SavedGrid from '../components/SaveGrid'

const SavedJobs = ({vacancies, setVacancies}) => {

    return (
    <div>
        {
            vacancies.length > 0 ?
            vacancies.map(vac => (
                <SavedGrid key={vac.id} vacancy={vac} setVacancies={setVacancies} /> 
            ))
            : <h4 className='text-center text-[#ddd] font-bold'>No Tienes Vacantes Guardadas</h4>
        }
    </div>
  )
}

export default SavedJobs