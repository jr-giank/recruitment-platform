import React from 'react'

const VacancyGrid = ({vacancy, setCurrentVacancy, currentVacancy}) => {
 
  const handleOnClick = (e) => {
    e.preventDefault()
    setCurrentVacancy(vacancy)
  }

  return (
    <div 
      className={`w-full border-b-fifth border-b pl-8 py-4 hover:bg-fifth cursor-pointer ${currentVacancy?.id === vacancy.id && 'bg-fifth'}`} 
      onClick={handleOnClick}>
       <h4 className='font-medium text-seventh'>{vacancy.nombre_puesto}</h4>
    </div>
  )
}

export default VacancyGrid