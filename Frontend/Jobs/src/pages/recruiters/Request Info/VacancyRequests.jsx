import React, { useContext, useEffect, useState } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import { authContext } from '../../../context/context'
import { get, put } from '../../../services/services'
import Loading from '../../../sharedComponents/ui/Loading'
import FormNewInterview from './components/Interviews/FormNewInterview'
import InterviewsAvailable from './components/Interviews/InterviewsAvailable'
import RequestActionModal from './components/RequestActionModal'
import RequestsBoardView from './components/RequestsBoardView'
import AssignTest from './components/Technical Tests/AssignTest'
import CandidatesAvailable_forTest from './components/Technical Tests/CandidatesAvailable_forTest'
import ViewTestsStatus from './components/Technical Tests/ViewTestsStatus'

const VacancyRequestsPage = () => {

    const {id, vacancyName} = useParams()

    const [ request, setRequests] = useState([])
    const [ isLoading, setIsLoading ] = useState(false)
    const [ currentSection, setCurrentSection ] = useState(1)
    const [ isModalOpen, setIsModalOpen ] = useState(false)
    const [ currentModalSection, setCurrentModalSection ] = useState(1)
    const [ currentCandidate, setCurrentCandidate ] = useState({})
    const [ vacancy, setVacancy ] = useState({})

    const history = useNavigate()

    const {auth} = useContext(authContext)

    useEffect(() => {
        setIsLoading(true)
        get(`solicitudes/vacante/${id}/`, {"Authorization":`Bearer ${auth.token}`})
        .then(({data}) => {
            setRequests(data)
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {
        // Peticion para obtener la vacante
        get(`vacante/${id}/`, {"Authorization":`Bearer ${auth.token}`})
        .then(res => {
            if(res.exito){
                setVacancy({...res.data[0]})
            }
        })
    }, [])

    const onHandleModal = (e, sect) => {
        e.preventDefault()
        if(sect){
            setCurrentModalSection(sect)
        }
        setIsModalOpen(true)
        document.getElementById("portal").classList.add("modal_show-modal")
    }

    const onCloseModal = () => {

        setIsModalOpen(false);
        setCurrentModalSection(1)
        document.getElementById("portal").classList.remove("modal_show-modal")
    }

    const goBack = () => {
        history(-1)
    }

    const handleCloseVacancy = (e) => {
        e.preventDefault()
    
        Swal.fire({
          title: "Cerrar Vacante",
          text : "¿Estás seguro de que deseas cerrar esta vacante? Esta acción es irreversible y ya no se podrán hacer mas solicitudes a esta vacante",
          icon: "warning",
          showDenyButton: true,
          showConfirmButton: true,
          confirmButtonText : "Aceptar",
          denyButtonText: "Cancelar"
        })
        .then(result => {
    
          if(result.isConfirmed){
            
                // Cerrar Vacante
                put(`vacante/${id}/`, 
                {'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`}, 
                {...toUpdate, status: 'C', empresa: auth.empresa_id, categoria: toUpdate?.categoria.id } )
                
                .then(res => {
                    if(res.exito){
                        Swal.fire("Cerrada", "La vacante ha sido cerrada")
                    }
                    else{
                        Swal.fire("Cerrada", "La vacante no se pudo cerrar correctamente", "error")
                    }
                }).catch(e => {
                    Swal.fire("Error", "Hubo un error al conectarse al servidor", "error")
                  })
          }
        })
      }

    return (
            <div className='w-full h-[89%] flex flex-wrap pt-2 mt-16 bg-white overflow-auto'>
             {
                isLoading 
                    ? <Loading /> 
                    :(
                      <>
                        <div className='flex flex-wrap h-1/4'>

                            <button className='ml-8 hover:underline' onClick={goBack} >
                                <small className='text-seventh'>  Volver atrás</small>
                            </button>
                            <h3 className='font-bold ml-8 w-full'>Panel de Administración de Solicitudes</h3>
                            <h4 className='ml-8 w-full'><strong>Puesto: </strong> {vacancyName}</h4>

                            <div className='border-b flex justify-between border-sixth w-full min-w-[1200px] mx-8 mt-4'>
                            
                            <div>
                                <button 
                                    onClick={()=>setCurrentSection(1)} 
                                    className={`text-tenth ml-3 px-2 text-[14px] ${currentSection === 1 && 'border-b-4 border-b-primary'}`}>
                                    Solicitudes En Curso
                                </button>

                                <button 
                                    onClick={()=>setCurrentSection(2)} 
                                    className={`text-tenth ml-3 px-2 text-[14px] ${currentSection === 2 && 'border-b-4 border-b-primary'}`}>
                                    Solicitudes Descartadas
                                </button>
                                
                                <button 
                                    onClick={()=>setCurrentSection(3)} 
                                    className={`text-tenth ml-3 px-2 text-[14px] ${currentSection === 3 && 'border-b-4 border-b-primary'}`}
                                    >
                                    Pruebas Técnicas en Curso
                                </button>
                                
                                <button 
                                    onClick={()=>setCurrentSection(4)}
                                    className={`text-tenth ml-3 px-2 text-[14px] ${currentSection === 4 && 'border-b-4 border-b-primary'}`} 
                                >
                                    Entrevistas Programadas
                                </button>
                            </div>

                            <div className='flex items-center mb-2'>  
                                <button className='bg-nineth text-[12px]  py-1 px-1 rounded-md' onClick={onHandleModal}>
                                    Asignar Pruebas Técnicas
                                </button>
                                <button className='bg-fifth text-[12px]  py-1 px-1 rounded-md ml-2' onClick={(e)=>onHandleModal(e, 3)}>
                                    Agendar Entrevista
                                </button>
                                {
                                    vacancy.status === "CERRADA" ? <p className='text-[12px] ml-2'>Cerrada</p> : 
                                    <button className='bg-fourth text-[12px] text-white py-1 px-1 rounded-md ml-2' onClick={handleCloseVacancy}>
                                        Cerrar Vacante
                                    </button>
                                }
                            </div>
                        </div>
                    </div>

                        { (currentSection === 1 || currentSection === 2)  &&
                            <RequestsBoardView 
                                requests={request} 
                                setRequests={setRequests} 
                                vacancyId={id} 
                                currentSection={currentSection}  
                            />
                        }
                        {
                            currentSection === 3 && 
                                <div className='w-full overflow-x-auto h-3/4'>
                                    <ViewTestsStatus vacancyId={id} />
                                </div>
                        }
                        {
                            currentSection === 4 &&
                            <div className='w-full overflow-x-auto h-3/4'> 
                                <InterviewsAvailable vacancyId={id} vacancyName={vacancyName}  />
                            </div>
                        }
                    </>
                    )} 

                    {
                        isModalOpen && 

                        <RequestActionModal onCloseModal={onCloseModal} >

                            {
                                currentModalSection === 1  &&
                                    
                                        <CandidatesAvailable_forTest 
                                            candidates={request.filter(req => req.status ==='P')} 
                                            setCurrentModalSection={setCurrentModalSection}
                                            setCurrentCandidate={setCurrentCandidate} />
                            }

                            {
                                currentModalSection === 2 &&
                                    <AssignTest 
                                        candidate={currentCandidate} 
                                        vacancyId={id} 
                                        setCurrentModalSection={setCurrentModalSection}    
                                    />
                            }
                                
                            {
                                currentModalSection === 3 &&

                                    <FormNewInterview vacancyId={id} />
                            }
                            
                        </RequestActionModal>
                    }
                </div>
  )
}

export default VacancyRequestsPage