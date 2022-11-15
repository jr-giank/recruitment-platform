import React from 'react'
import Board from './Boards/Board'
import { uid } from 'uid'

const RequestsBoardView = ({requests, setRequests, vacancyId, currentSection}) => {

  let requestStatus_A
  let requestStatus_P
  let requestStatus_E
  let requestStatus_O
  let requestStatus_S
  let requestStatus_D

  if(currentSection === 1){
    requestStatus_A = requests.filter(req => req.status === "A")
    requestStatus_P = requests.filter(req => req.status === "P")
    requestStatus_E = requests.filter(req => req.status === "E")
    requestStatus_O = requests.filter(req => req.status === "O")
    requestStatus_S = requests.filter(req => req.status === "S")
  }

  else{
    requestStatus_D = requests.filter(req => req.status === "D")
  }

    return (
    <div className={`flex ${currentSection === 1 && 'w-[1500px]'} pb-8 flex-row px-4  bg-white mt-8 `}>

      {
        currentSection === 1 ? (
          <>
            <Board key={uid()} requests={requestStatus_A} title={'Aplicados'}       setRequests={setRequests} vacancyId={vacancyId} />
            <Board key={uid()} requests={requestStatus_P} title={'Prueba Técnica'}  setRequests={setRequests} vacancyId={vacancyId} />
            <Board key={uid()} requests={requestStatus_E} title={'Para Entrevista'} setRequests={setRequests} vacancyId={vacancyId} />
            <Board key={uid()} requests={requestStatus_O} title={'Entrevistados'}   setRequests={setRequests} vacancyId={vacancyId} />
            <Board key={uid()} requests={requestStatus_S} title={'Seleccionados'}   setRequests={setRequests} vacancyId={vacancyId} />
          </>
        )
        : 
          <Board key={uid()} requests={requestStatus_D} title={'Descartados'} setRequests={setRequests} vacancyId={vacancyId} />
      }

    </div>
  )
}

export default RequestsBoardView