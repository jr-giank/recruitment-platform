import React from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import edit from '../../../../../assets/icons/editar.png'
import more from '../../../../../assets/icons/mas.png'
import { technicalTestContext } from '../../../../../context/context'
import { types } from '../../../../../reducers/types'

const TestGrid = ({cTest}) => {

  const { dispatch } = useContext(technicalTestContext)

  const history = useNavigate()

  const handleNavigate = (e, navigateAction) => {
    
    e.preventDefault()

    dispatch({
      type : types.add,
      payload: {...cTest}      
    })

    if(navigateAction === 1){
      history(`/app/recruiter/viewTest/${cTest.id}`)
    }
    else{
      history('/app/recruiter/createTest')
    }
  }

  return (
    <div className='flex justify-between w-3/5 border border-fifth mt-2 px-2 shadow py-4'>
      <h4 className='text-twelve font-semibold text-poppins'>{cTest.titulo}</h4>
      
      <div>
        <button> <img src={more} onClick={(e)=> handleNavigate(e, 1)} alt="" className='w-6 h-6' title='Ver Más' /></button>
        <button> <img src={edit} onClick={(e)=> handleNavigate(e, 2)} alt="" className='w-6 h-6 ml-3' title='Editar' /> </button>
      </div>
    </div>
  )
}

export default TestGrid