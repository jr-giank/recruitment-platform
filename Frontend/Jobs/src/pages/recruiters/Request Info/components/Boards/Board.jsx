import React from 'react'
import BoardGrid from './BoardGrid'
import { uid } from 'uid'

const Board = ({requests, title, setRequests, vacancyId}) => {

  return (
      <div className='bg-eleventh w-[300px] h-[500px] px-2 ml-4 rounded-lg'>
        <h5 className='font-bold pb-4'>{title}</h5>
        <div className='overflow-auto'>
            {
                requests.map(req => (
                    <BoardGrid key={uid()}  request={req} setRequests={setRequests} vacancyId={vacancyId} />
                ))
            }
        </div>
    </div>
  )
}

export default Board