import React, { useState } from 'react'

import Cvs from './cv/Cvs'
import TechStack from './tech-stack/TechStack'
import Experience from './experience/Experience'
import Projects from './projects/Projects'
import Contacts from './contact/Contacts'

import PortfolioModal from './PortfolioModal'

import FormCv from './cv/FormCv'
import FormTech from './tech-stack/FormTech'
import FormExp from './experience/FormExp'
import FormProjects from './projects/FormProjects'
import FormContact from './contact/FormContact'

const Portfolio= () => {

  const [ currentSection, setCurrentSection ] = useState(1)
  const [ isOpenModal, setIsOpenModal ] = useState(false)

  const onHandleOpenModal = (e) => {
    e.preventDefault()
    setIsOpenModal(true)
    document.getElementById("portal").classList.add("modal_show-modal")
  }

  return (
    <div className='w-3/4 flex justify-center px-4'>

      <div className='w-[90%] bg-white rounded-md shadow-md overflow-auto'>
        <div className='flex justify-around w-full border-b-2 border-fifth py-2 text-tenth font-bold'>
          <button 
          className={`hover:border-b-4 hover:border-b-secondary ${currentSection === 1 && 'border-b-4 border-b-secondary'}`} 
          onClick={()=>setCurrentSection(1)}
          >
            Curriculum
          </button>
          <button 
            className={`hover:border-b-4 hover:border-b-secondary ${currentSection === 2 && 'border-b-4 border-b-secondary'}`} 
            onClick={()=>setCurrentSection(2)}
          >
            Herramientas
          </button>
          
          <button 
            className={`hover:border-b-4 hover:border-b-secondary ${currentSection === 3 && 'border-b-4 border-b-secondary'}`} 
            onClick={()=>setCurrentSection(3)}
            >
              Experiencia Profesional
            </button>
          
          <button 
            className={`hover:border-b-4 hover:border-b-secondary ${currentSection === 4 && 'border-b-4 border-b-secondary'}`} 
            onClick={()=>setCurrentSection(4)}
            >
              Proyectos
            </button>
          
          <button 
            className={`hover:border-b-4 hover:border-b-secondary ${currentSection === 5 && 'border-b-4 border-b-secondary'}`} 
            onClick={()=>setCurrentSection(5)}
            >
              Contacto
          </button>

        </div>
      
          { currentSection === 1 && <Cvs onHandleOpenModal={onHandleOpenModal} /> }
          
          { currentSection === 2 && (<TechStack onHandleOpenModal={onHandleOpenModal} />) }
          
          { currentSection === 3 && (<Experience onHandleOpenModal={onHandleOpenModal} />) }

          { currentSection === 4 && (<Projects onHandleOpenModal={onHandleOpenModal} />) }

          { currentSection === 5 && (<Contacts onHandleOpenModal={onHandleOpenModal} />) }

      </div>

          {
            isOpenModal && (
              <PortfolioModal setIsOpenModal={setIsOpenModal} >
                  { currentSection === 1 && <FormCv /> }

                  { currentSection === 2 && <FormTech /> }

                  { currentSection === 3 && <FormExp /> }
                  
                  { currentSection === 4 && <FormProjects /> }
                  
                  { currentSection === 5 && <FormContact /> }
                                  
              </PortfolioModal>
            )
          }
    </div>
  )
}

export default Portfolio