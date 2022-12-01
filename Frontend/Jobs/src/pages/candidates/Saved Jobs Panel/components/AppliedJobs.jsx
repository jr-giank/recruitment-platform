import React from 'react'

import AppliedJobsGrid from './AppliedJobsGrid'

const AppliedJobs = ({requests, setVacancies}) => {

    return (
    <div>
        {
            requests.length > 0 ?
            requests.map(req => (
                <AppliedJobsGrid key={req.id} request={req} /> 
            ))
            : <h4 className='text-center text-[#ddd] font-bold'>No has aplicado a ninguna vacante</h4>
        }
    </div>
  )
}

export default AppliedJobs