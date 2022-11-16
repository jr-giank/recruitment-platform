import React from 'react'
import { useContext } from 'react'
import { technicalTestContext } from '../../../../context/context'

const TestViewSingle_Page = () => {

  const { techTest } = useContext(technicalTestContext)
  
  return (
    <div>
    {techTest.mandato}
    </div>
  )
}

export default TestViewSingle_Page