import React from 'react'
import BoardGrid from './BoardGrid'

const Board = ({requests, title}) => {
  return (
      <div className='bg-eleventh w-[270px] h-[500px] px-2 ml-4 rounded-lg'>
        <h5 className='font-bold pb-4'>{title}</h5>
        <div className='overflow-auto'>
            {
                requests.map(req => (
                    <>
                        <BoardGrid key={req} request={req} />
                        <BoardGrid key={req} request={req} />
                    </>
                ))
            }
        </div>
    </div>
  )
}

export default Board