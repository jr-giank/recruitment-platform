import React from 'react'
import CandidatesAvailable_forTest_grid from './CandidatesAvailable_forTest_grid'

const CandidatesAvailable_forTest = ({candidates, setCurrentModalSection, setCurrentCandidate}) => {
  
  return (
    <div>
      {
        candidates.map(cand => (
          <CandidatesAvailable_forTest_grid 
            key={cand.id} 
            candidate={cand.candidato} 
            setCurrenModalSection={setCurrentModalSection}
            setCurrentCandidate={setCurrentCandidate} />
        ))
      }

    </div>
  )
}

export default CandidatesAvailable_forTest