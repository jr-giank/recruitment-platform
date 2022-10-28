import React, {useContext, useState}from 'react'
import Swal from 'sweetalert2';
import { authContext } from '../../../../context/context';
import { useForm } from '../../../../hooks/useForm';
import { post } from '../../../../services/services';

const AplicationGrid = ({vacancyId, onCloseModal}) => {

    const { auth } = useContext(authContext);
    const [selectedFile, setSelectedFile] = useState();


    const [ formValues, handleInputChanges ] = useForm({
        mensaje:"",
    })

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = (e) => {
        e.preventDefault()

        formValues.vacante = vacancyId;
        formValues.candidato = auth.candidato_id
        formValues.status = 'A'

        post('crear/solicitud/', {'Content-Type': 'application/json'}, formValues)
        .then((data)=> {
            if(data.exito){
                Swal.fire("Solicitud Enviada","Se ha enviado la solicitud correctamente", "success")
                onCloseModal()
            }else{
                Swal.fire("Error al enviar","Hubo un error al procesar esta solicitud. Intentelo nuevamente", "error")
            }
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

            <div className='px-2 flex flex-col items-center w-full'>
                <h4 className='w-full text-lg font-medium'>Curriculum vitae</h4>
                <input type="file" name="file" className='w-full' accept='application/pdf' onChange={changeHandler} />
                <button className='bg-primary text-white text-sm w-[50%] mt-6 px-10 py-2 ' onClick={handleSubmission}>
                Enviar
            </button>
            </div>
            
            

        </div>
    )


}
export default AplicationGrid