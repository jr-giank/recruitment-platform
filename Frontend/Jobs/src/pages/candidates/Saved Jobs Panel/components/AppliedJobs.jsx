import React from 'react'

import AppliedJobsGrid from './AppliedJobsGrid'

const AppliedJobs = ({vacancies, setVacancies}) => {

    console.log(vacancies)

    return (
    <div>
        {
            vacancies.length > 0 ?
            vacancies.map(vac => (
                <AppliedJobsGrid key={vac.id} vacancy={vac} setVacancies={setVacancies} /> 
            ))
            : <h4 className='text-center text-[#ddd] font-bold'>No has aplicado a ninguna vacante</h4>
        }
    </div>
  )
}

export default AppliedJobs