import React from 'react'
import { Portal } from 'react-portal'

const PortfolioModal = ({children, expanded, onCloseModal}) => {
  
  return (
    <Portal node={document.getElementById("portal")}>
      <div className={`bg-white modal_content ${expanded && 'expanded' } max-h-[80%] overflow-auto overflow-x-hidden`}>
        <div className='flex justify-between mr-4 border-b border-b-fifth w-full pl-3 pr-1 py-1'>
          <h3 className='font-bold'>Formulario</h3>      
          <button className='px-4 py-1 hover:bg-fifth hover:rounded-full text-[20px]' onClick={onCloseModal}>X</button>      
        </div>
        {children}
      </div>
    </Portal>
  )
}

export default PortfolioModal