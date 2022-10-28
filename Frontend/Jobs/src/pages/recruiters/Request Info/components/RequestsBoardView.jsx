import React from 'react'
import Board from './Board'
import { uid } from 'uid'

const RequestsBoardView = ({requests}) => {

  const requestStatus_A = requests.filter(req => req.status === "A")
  const requestStatus_P = requests.filter(req => req.status === "P")
  const requestStatus_E = requests.filter(req => req.status === "E")
  const requestStatus_ER = requests.filter(req => req.status === "ER")
  const requestStatus_C = requests.filter(req => req.status === "C")

    return (
    <div className='flex w-[1400px] pb-8 flex-row px-4  bg-white mt-8  '>
        <Board key={uid()} requests={requestStatus_A} title={'Aplicados'} />
        <Board key={uid()} requests={requestStatus_P} title={'Prueba Técnica'} />
        <Board key={uid()} requests={requestStatus_E} title={'Para Entrevista'} />
        <Board key={uid()} requests={requestStatus_ER} title={'Entrevistados'} />
        <Board key={uid()} requests={requestStatus_C} title={'Seleccionados'} />
    </div>
  )
}

export default RequestsBoardView