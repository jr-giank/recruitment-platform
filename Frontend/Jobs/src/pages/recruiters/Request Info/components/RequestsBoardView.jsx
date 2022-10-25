import React from 'react'
import Board from './Board'

const RequestsBoardView = ({requests}) => {

    return (
    <div className='flex w-[1400px] pb-8 flex-row px-4  bg-white mt-8  '>
        <Board requests={requests} title={'Aplicados'} />
        <Board requests={requests} title={'Prueba Técnica'} />
        <Board requests={requests} title={'Para Entrevista'} />
        <Board requests={requests} title={'Entrevistados'} />
        <Board requests={requests} title={'Seleccionados'} />
    </div>
  )
}

export default RequestsBoardView