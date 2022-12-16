import React, {useContext, useState}from 'react'
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { BASE_URL_FILES } from '../../../../constants/baseURL';
import { authContext } from '../../../../context/context';
import { useForm } from '../../../../hooks/useForm';
import { get, post } from '../../../../services/services';
import Loading from '../../../../sharedComponents/ui/Loading';

const AplicationGrid = ({vacancyId, onCloseModal}) => {

    const { auth } = useContext(authContext);
    const [selectedFile, setSelectedFile] = useState(null);
    const [ isLoading, setIsLoading] = useState(true)
    const [ candidateData, setCandidateData ] = useState({})
    const [ isDisabled, setIsDisabled ] = useState(false)

    const [ formValues, handleInputChanges ] = useForm({
        cv_url: "",
        mensaje:"",
    })

    useEffect(()=> {
        setIsLoading(true)
        get(`candidato/${auth.candidato_id}/`, {"Authorization":`Bearer ${auth.token}`})
        .then(res => {
          if(res.exito){
            setCandidateData({...res.data.candidato[0]})

            if(!res.data.candidato[0].cv_1 && !res.data.candidato[0].cv_2 ){
                setIsDisabled(true)
            }
        }
        setIsLoading(false)
        })
      }, [])

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleSubmission = (e) => {
        e.preventDefault()

        if(formValues.mensaje === "" || formValues.cv_url === ""){
            Swal.fire("Datos incompletos","Asegurese de escribir su motivacion y seleccionar una vacante", "error")
            return;
        }

        const requestToSent = {...formValues}

        requestToSent.vacante = vacancyId;
        requestToSent.candidato = auth.candidato_id
        requestToSent.status = 'A'
        requestToSent.cv_url = `${BASE_URL_FILES}${formValues.cv_url}`

        post('solicitud/', {'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`},requestToSent)
        .then((data)=> {
            if(data.exito){
                Swal.fire("Solicitud Enviada","Se ha enviado la solicitud correctamente", "success")
                onCloseModal()
            }else{
                console.log(data)
                Swal.fire("Error al enviar","Hubo un error al procesar esta solicitud. Posiblemente ya ha enviado una solicitud anteriormente a esta vacante. En caso de no ser así Intentelo nuevamente", "error")
            }
        }).catch(e => {
          Swal.fire("Error", "Hubo un error al conectarse al servidor", "error")
        })
	};

    return(
        <div className='py-2'>
            <div className='px-2'>
                <h4 className='text-lg font-medium'>Carta de presentacion</h4>
                <textarea  
                    name="mensaje" 
                    id="mensaje" 
                    placeholder='¿Porque soy el indicado para este empleo?'
                    rows = '9'
                    value={formValues.mensaje}
                    onChange={handleInputChanges}
                    className='w-full text-[14px]'
                />
            </div>


            {
                isLoading ? <div className='m-auto flex justify-center'> <Loading /> </div>
                
                :
            <div className='px-2 flex flex-col items-center w-full'>
                <h4 className='w-full text-lg font-medium'>Seleccione su Curriculum Vitae</h4>
                
                {
                    // Cuando el candidato tiene alguno de los 2 cvs incluidos
                    (candidateData.cv_1 || candidateData.cv_2) 
                        ?      
                    (<div className='w-full'>

                        {
                        // Si el cv_1 esta incluido
                            candidateData.cv_1 &&  (
                            <div>
                                <input type="radio" name="cv_url" id="cv_1u" value={candidateData.cv_1} onChange={handleInputChanges} />
                                <label className='text-[13px]' htmlFor="cv_1u">{candidateData.cv1_nombre}</label>
                            </div>)
                        }
                        
                        {
                        // Si el cv_2 esta incluido
                            candidateData.cv_2 &&  (
                            <div>
                                <input type="radio" name="cv_url" id="cv_2u" value={candidateData.cv_2} onChange={handleInputChanges} />
                                <label className='text-[13px]' htmlFor="cv_2u">{candidateData.cv2_nombre}</label>
                            </div>)
                        }
                    </div>)
                    : <p className='mt-3' >No podrá hacer solicitud a esta vacante si no tiene Cvs Registrados en su perfil</p> 
                }

            <button className='bg-primary text-white text-sm w-[50%] mt-6 px-10 py-2 'onClick={handleSubmission} disabled={isDisabled}>
                Enviar
            </button>
            </div>
        }
        </div>
    )
}
export default AplicationGrid