import React from 'react'
import { useContext } from 'react'
import Swal from 'sweetalert2'
import { authContext } from '../../../../context/context'
import { useForm } from '../../../../hooks/useForm'
import { put } from '../../../../services/services'

const FormAnswerRequest = ({request, setRequests, onCloseModal, vacancyId}) => {
  
    const [ formValues, handleInputChanges ] = useForm({
        motivo_mensaje: "",
        texto:""
    })

    const { auth } = useContext(authContext)

    const hanldeSubmitAnswer = (e) => {
        e.preventDefault()

        if(formValues.motivo_mensaje === "" || formValues.texto === ""){
            Swal.fire("Llenar Formulario", "Debe llenar todos los campos del formulario", "error")
            return
        }

        const requestModified = {...request}

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

        //requestModified.status = 'A'

        requestModified.candidato = request.candidato.id
        requestModified.vacante = vacancyId

        console.log(requestModified)

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
         })
    }

    return (
    
    <form>

        <div className='flex mt-1'>
                <img  src={`http://127.0.0.1:8000${request.candidato.foto}`} className='w-16 h-16 rounded-full'/>
                <span className='ml-2'>
                   <h4>{request.candidato.nombre} {request.candidato.apellido}</h4>
                <p className='text-sixth font-medium w-full'>{request.candidato.titulo_personal}</p>
            </span>
        </div>

        <div className='w-full px-4 mt-4'>
            <h5 className='font-bold text-fourth'>Leer</h5>
            <small>
                En ITJob.Net nos aseguramos de garantizar que los solicitantes tendrán una respuesta a su solicitud. Es por esta razón, que para nosotros es importante que al momento de dar una respuesta a una solicitud, se le envíe un mensaje al candidato, ya sea de aprobación a su solicitud o explicando su descarte. En caso de descartar, le instamos a que proporcione una retroalimentación de mejora al candidato para que pueda mejorar sus solicitudes a próximas vacantes que solicite.
            </small>

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
                {/* <button className='bg-fifth  py-2 rounded-md px-3 ml-3' onClick={onCloseModal}>Cancelar</button> */}
            </div>

        </div>

        
    </form>
  )
}

export default FormAnswerRequest