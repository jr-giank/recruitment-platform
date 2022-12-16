import React, { useState } from 'react'

import { useSearchParams } from 'react-router-dom'

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

const Portfolio= ({candidateData, setCandidateData, editableData, setEditableData, setIsEdited }) => {

  const [ currentSection, setCurrentSection ] = useState(1)
  const [ isOpenModal, setIsOpenModal ] = useState(false)
  const [ currentDoc, setCurrentDoc ] = useState(null)

  const [ params, setParams ] = useSearchParams()

  const onHandleOpenModal = (e) => {
    e.preventDefault()
    setIsOpenModal(true)
    document.getElementById("portal").classList.add("modal_show-modal")
  }

  const onCloseModal = () => {
    setIsOpenModal(false);
    document.getElementById("portal").classList.remove("modal_show-modal")
    setParams()
    setCurrentDoc(null)
}

const handleOpenForEdit = (e, exp) => {
  setCurrentDoc({...exp})
  onHandleOpenModal(e)
  setParams({cardType : "Edit"})
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
      
          { currentSection === 1 && <Cvs cv1 ={candidateData.candidato[0].cv_1}  
                                         cv2 ={candidateData.candidato[0].cv_2} 
                                         cv1_nombre ={candidateData.candidato[0].cv1_nombre} 
                                         cv2_nombre ={candidateData.candidato[0].cv2_nombre} 
                                         onHandleOpenModal={onHandleOpenModal}
                                         setEditableData={setEditableData}
                                         setIsEdited={setIsEdited}
                                    /> }
          
          { currentSection === 2 && (<TechStack 
                                    data={candidateData} 
                                    setCandidateData={setCandidateData} 
                                    onHandleOpenModal={onHandleOpenModal} />) }
          
          { currentSection === 3 && (<Experience 
                                  data={candidateData}  
                                  setCandidateData={setCandidateData} 
                                  onHandleOpenModal={onHandleOpenModal} 
                                  handleOpenForEdit={handleOpenForEdit} 
                                  />) }

          { currentSection === 4 && (<Projects 
                                  data={candidateData}
                                  setCandidateData={setCandidateData} 
                                  onHandleOpenModal={onHandleOpenModal} 
                                  handleOpenForEdit={handleOpenForEdit}  />) }

          { currentSection === 5 && (<Contacts onHandleOpenModal={onHandleOpenModal} candidateData={candidateData.candidato[0]} />) }

      </div>

          {
            isOpenModal && (
              <PortfolioModal setIsOpenModal={setIsOpenModal} onCloseModal={onCloseModal}
               >
                  { currentSection === 1 && <FormCv 
                                            onCloseModal={onCloseModal} 
                                            setEditableData={setEditableData}
                                            editableData={editableData}
                                            setIsEdited={setIsEdited}  /> }

                  { currentSection === 2 && <FormTech 
                                              setIsOpenModal={setIsOpenModal} 
                                              onCloseModal={onCloseModal} 
                                              setCandidateData={setCandidateData} 
                                              /> }

                  { currentSection === 3 && <FormExp 
                                              onCloseModal={onCloseModal} 
                                              setCandidateData={setCandidateData}
                                              currentDoc={currentDoc} /> }
                  
                  { currentSection === 4 && <FormProjects 
                                            onCloseModal={onCloseModal} 
                                            setCandidateData={setCandidateData}
                                            currentDoc={currentDoc} /> }
                  
                  { currentSection === 5 && <FormContact 
                                            onCloseModal={onCloseModal} 
                                            setEditableData={setEditableData}
                                            candidateData={candidateData.candidato[0]}
                                            setIsEdited={setIsEdited} 
                                            /> }
                                  
              </PortfolioModal>
            )
          }
    </div>
  )
}

export default Portfolio