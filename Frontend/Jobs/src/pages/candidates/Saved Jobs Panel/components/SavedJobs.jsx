import React, { useContext, useEffect } from 'react'
import { authContext } from '../../../../context/context'
import SavedGrid from '../components/SaveGrid'

const SavedJobs = ({vacancies}) => {

    return (
    <div>
        {
            vacancies.length > 0 ?
            vacancies.map(vac => (
                <SavedGrid key={vac.id} vacancy={vac} /> 
            ))
            : <h4 className='text-center text-[#ddd] font-bold'>No Tienes Vacantes Guardadas</h4>
        }
    </div>
  )
}

export default SavedJobs