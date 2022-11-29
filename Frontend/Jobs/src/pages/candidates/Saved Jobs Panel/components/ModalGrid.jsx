import React, {useEffect, useState, useContext} from 'react'
import Loading from '../../../../sharedComponents/ui/Loading';
import { get } from '../../../../services/services';
import { authContext } from '../../../../context/context';
import Swal from 'sweetalert2';

const ModalGrid = ({id_vacante, onCloseModal}) => {

  const { auth } = useContext(authContext);
  const [ isLoading, setIsLoading] = useState(true)
  const [ isDisabled, setIsDisabled ] = useState(false)
  const [ date, setDate ] = useState({})

  useEffect(()=> {
    setIsLoading(true)
    get(`entrevista/vacante/${id_vacante}/`, {"Authorization":`Bearer ${auth.token}`})
    .then(res => {
      if(res.exito){
        setDate({...res.data})
        console.log(res)

        // if(res.data.){
        //     setIsDisabled(true) 
        // } AQUI DEBO VERIFICAR QUE HAYA UN RADIO BUTTON SELECCIONADO
        //arreglar la autorizacion
    }
    setIsLoading(false)
    })
  }, [])

  const handleSubmission = (e) => {
    e.preventDefault()

    post('entrevista/', {'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`},requestToSent)
    .then((data)=> {
        if(data.exito){
            Swal.fire("Horario guardado","Se ha agendado la entrevista correctamente", "success")
            onCloseModal()
        }else{
            console.log(data)
            Swal.fire("Error al seleccionar","Hubo un error al procesar esta solicitud. Intentelo nuevamente", "error")
        }
    })
  }


  return (

    <div className='py-2'>
        <div className='flex items-center mb-4 ml-5'>
          <input type="radio" value="" name="default-radio" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' id='default-radio-1'/>
          <label htmlFor="default-radio-1" className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>Fecha: {date.fecha} hora: {date.hora}</label>
        </div>
        {/* <div className='flex items-center mb-4 ml-5'>
          <input id="default-radio-2" type="radio" value="" name="default-radio" className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600' />
          <label for="default-radio-2" className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'>radio 2 {date.fecha}</label>
        </div>
        <div className='flex items-center ml-5'>
          <input className='form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2' type='radio' name='flexRadioDisabled' id='flexRadioDisable' disabled/>
          <label className='form-check-label inline-block text-gray-800 opacity-50' for="flexRadioDisabled">
            Disabled radio 3
          </label>
        </div> */}

        <div className='flex justify-center items-center w-full mt-5 mr-4'>
          <button className='bg-secondary text-white rounded-md px-20 py-2 mb-6 mt-6 mx-4' onClick={handleSubmission}>Guardar</button>
          <button className='bg-secondary text-white rounded-md px-20 py-2 mb-6 mt-6' >Borrar</button> 
        </div>
    </div>
  )
}

export default ModalGrid

// aqui falta el metodo de eliminar la seleccion, captar el valor del radio isButtonElement, no se esta accediendo correctamente al elemento de fecha y hora
// adecuar la distribucion de la ventana modal, desabilitar todas las otras opciones cuando se haya seleccionado una 