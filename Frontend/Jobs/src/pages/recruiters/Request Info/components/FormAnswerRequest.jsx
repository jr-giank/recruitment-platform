import React from 'react'
import { useContext } from 'react'
import Swal from 'sweetalert2'
import { BASE_URL_FILES } from '../../../../constants/baseURL'
import { authContext } from '../../../../context/context'
import { useForm } from '../../../../hooks/useForm'
import { put } from '../../../../services/services'

const FormAnswerRequest = ({request, setRequests, onCloseModal, vacancyId}) => {
  
    const { auth } = useContext(authContext)

    const [ formValues, handleInputChanges ] = useForm({
        usuario: auth.user_id,
        motivo_mensaje: "",
        texto:""
    })

    const hanldeSubmitAnswer = (e) => {
        e.preventDefault()


        if(formValues.motivo_mensaje === "" || formValues.texto === ""){
            Swal.fire("Llenar Formulario", "Debe llenar todos los campos del formulario", "error")
            return
        }

        const requestModified = {...request, ...formValues}

        if(formValues.motivo_mensaje === 'Aprobacion'){
            switch(request.status){
                case 'A':
                    requestModified.status = 'P'
                    break;
                case 'P':
                    requestModified.status = 'E'
                    break;
                case 'E':
                    requestModified.status = 'O'
                    break;
                case 'O':
                    requestModified.status = 'S'
            }
        }
        else{
            requestModified.status = "D"
        }
        
        requestModified.candidato = request.candidato.id
        requestModified.vacante = parseInt(vacancyId)

        put(`solicitud/${request.id}/`,  { 'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`}, requestModified )
        .then(res => {
             console.log(res)
             if(res.exito){
                 Swal.fire("Solicitud Actualizada", "El estado de la solicitud ha sido actualizada exitosamente", "success")
                 setRequests(requests => requests.map(req => req.id === request.id ? {...res.data} : req))
                 onCloseModal()
             }
             else{
                 Swal.fire("Error al actualizar", "La solicitud no pudo ser actualizada. Intente nuevamente", "error")
             }
         }).catch(e => {
            Swal.fire("Error", "Hubo un error al conectarse al servidor", "error")
          })
    }

    return (
    
    <form>

        <div className='flex mt-1 ml-3'>
                <img  src={`${BASE_URL_FILES}${request.candidato.foto}`} className='w-16 h-16 rounded-full'/>
                <span className='ml-2'>
                   <h4>{request.candidato.nombre} {request.candidato.apellido}</h4>
                <p className='text-sixth font-medium w-full'>{request.candidato.titulo_personal}</p>
            </span>
        </div>

        <div className='w-full px-4 mt-4'>
            <h5 className='font-bold text-fourth'>LEER</h5>
            
            <p className='text-justify'>
                <small >
                    En ITJob.Net nos aseguramos de garantizar que los solicitantes tendrán una respuesta a su solicitud. Es por esta razón, que para nosotros es importante que al momento de dar una respuesta a una solicitud, se le envíe un mensaje al candidato, ya sea de aprobación a su solicitud o explicando su descarte. En caso de descartar, le instamos a que proporcione una retroalimentación de mejora al candidato para que pueda mejorar sus solicitudes a próximas vacantes que solicite.
                </small>
            </p>

            <div className='mt-4'>
                <h4 className='font-bold'>Seleccione el tipo de respuesta</h4>
                <div>
                    <input 
                        type="radio"
                        name="motivo_mensaje" 
                        id="inpr1" 
                        value='Aprobacion' 
                        onChange={handleInputChanges} 
                    />
                    <label htmlFor="inpr1" className='text-[14px] ml-2'>Aprobar Solicitud y pasar a próxima fase</label>
                </div>

                <div>
                    <input 
                        type="radio" 
                        name="motivo_mensaje" 
                        id="inpr2" 
                        value='Descartado' 
                        onChange={handleInputChanges} 
                    />
                    <label htmlFor="inpr2" className='text-[14px] ml-2'>Descartar Solicitud</label>
                </div>        
                
                <textarea 
                    name="texto" 
                    id="" 
                    value={formValues.texto} 
                    onChange={handleInputChanges}  
                    rows="8"
                    className='w-full' 
                    placeholder='Mensaje de Respuesta a Solicitud' />
            </div>

            <div className='w-full flex mt-4 text-[14px]'>
                <button className='bg-tenth text-white py-2 rounded-md px-3' onClick={hanldeSubmitAnswer}>Enviar Respuesta</button>
            </div>
        </div>
    </form>
  )
}

export default FormAnswerRequest