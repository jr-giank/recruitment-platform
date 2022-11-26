import React from 'react'
import { useContext } from 'react'
import Swal from 'sweetalert2'
import { authContext } from '../../../../../context/context'
import { useForm } from '../../../../../hooks/useForm'
import { post } from '../../../../../services/services'

const FormNewInterview = ({vacancyId}) => {

    const [ formValues, handleInputChanges, reset] = useForm({
        fecha: "",
        hora: ""
    })

    const { auth } = useContext(authContext)

    const handleOnSubmit = (e) => {
        e.preventDefault()

        if(formValues.fecha === "" || formValues.hora == ""){
            Swal.fire("Datos incompletos", "Asegúrese de llenar los campos", "error")
            return 
        }

        const scheduleToSend = {...formValues}
        scheduleToSend.empresa = auth.empresa_id
        scheduleToSend.vacante = parseInt(vacancyId)
      //  scheduleToSend.candidato = 5;

        post('entrevista/',  
             {'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`},  
             scheduleToSend
            )
        .then(res => {
            console.log(res)
            if(res.exito){
                Swal.fire("Horario Registrado", "El horario ha sido registrado", "success")
            }
        })
    }

  return (
    <form className='flex flex-col justify-between h-full w-full px-4'>
       
       <div className='flex flex-col'>
            <div className='flex flex-col mt-4'>

                <label htmlFor="" className='font-bold text-[17px]'>
                    Fecha de la Entrevista
                </label>
                <input 
                    type="date" 
                    name="fecha" 
                    id="" 
                    value={formValues.fecha} 
                    onChange={handleInputChanges}
                    placeholder='Fecha de la Entrevista' 
                />
                </div>

                <div className='flex flex-col mt-4'>
                    <label htmlFor="" className='font-bold text-[17px]'>
                        Hora de la Entrevista
                    </label>
                    <input 
                        type="time" 
                        name="hora"  
                        id="" 
                        value={formValues.hora}  
                        onChange={handleInputChanges}
                        placeholder='Hora de la Entrevista'
                    />
                </div>
       </div>

        <div className='flex justify-end'>
            <button className='bg-seventh text-white py-1 rounded-md mt-4 px-1' onClick={handleOnSubmit}>
                Guardar Horario
            </button>
        </div>
    </form>
  )
}

export default FormNewInterview