import React from 'react'
import { useContext } from 'react'
import { Portal } from 'react-portal'
import Swal from 'sweetalert2'
import { authContext } from '../../../../context/context'
import { useForm } from '../../../../hooks/useForm'
import { f_delete } from '../../../../services/services'

const ModalDelete = ({setIsVacancyDelOpen, setVacancies, vacancy, setCurrentVacancy}) => {

    const { auth } = useContext(authContext)

    const [ formValues, handleInputChanges ] = useForm({
        texto: "",
        motivo_mensaje: ""
    }) 

    const onCloseModal = () => {
        setIsVacancyDelOpen(false);
        document.getElementById("portal").classList.remove("modal_show-modal")
    }

    const handleDelete = (e) => {
        e.preventDefault()
        
        if(formValues.texto.length < 10 || formValues.motivo_mensaje === ""){
            Swal.fire("Datos incompletos", "Asegúrese de llenar los campos correctamente. El motivo debe ser bien explicado.", "error")
            return
        }

        formValues.usuario = auth.user_id

        f_delete(`vacante/${vacancy.id}/`, 
                { 'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`}, formValues )
        .then(res => {
            if(res.exito){
                  Swal.fire("Vacante eliminada", "La vacante ha sido eliminada")
                  setVacancies(vacancies => vacancies.filter(vac => vac.id !== vacancy.id))
                  onCloseModal()
                  setCurrentVacancy(null)
            }
            else{
                Swal.fire("Error al eliminar Vacante", "La Vacante no pudo ser eliminada", "error")
                console.log(res)
            }
        })
    }

    return (
        <Portal node={document.getElementById("portal")}>
        <div className={`bg-white modal_content max-h-[80%] overflow-auto overflow-x-hidden`}>
        <div className='flex justify-between mr-4 border-b border-b-fifth w-full pl-3 pr-1 py-1'>
            <h3 className='font-bold'>Eliminar Vacante</h3>      
            <button className='px-4 py-1 hover:bg-fifth hover:rounded-full text-[20px]' onClick={onCloseModal}>X</button>      
        </div>

        <div className='w-full px-4'>
            <h5 className='font-bold'>Leer</h5>
            <small>
                En ITJob.Net nos aseguramos de garantizar que los solicitantes tendrán una respuesta a su solicitud. Es por esta razón, que para nosotros es importante que al momento de eliminar una vacante, se de una explicación acerca del motivo de eliminación. Los candidatos recibirán una copia de este mensaje, garantizando de esta forma que tendrán una respueta a su solicitud. Tome en cuenta que al eliminar esta vacante, no podrá revertir los cambios, por lo que le solicitamos que si lo que desea es editar la puede editar; de no ser así, puede proceder a llenar la siguiente información para eliminarla.
            </small>

            <div className='mt-4'>
                <h4 className='font-bold'>Motivo de eliminación</h4>
                <div>
                    <input 
                        type="radio"
                        name="motivo_mensaje" 
                        id="inpr1" 
                        value='El Puesto ha sido ocupado' 
                        onChange={handleInputChanges} 
                    />
                    <label htmlFor="inpr1" className='text-[14px] ml-2'>El puesto ha sido ocupado</label>
                </div>

                <div>
                    <input 
                        type="radio" 
                        name="motivo_mensaje" 
                        id="inpr2" 
                        value='El Puesto ya no es necesario' 
                        onChange={handleInputChanges} 
                    />
                    <label htmlFor="inpr2" className='text-[14px] ml-2'>El puesto ya no es necesario</label>
                </div>

                <div>
                    <input 
                        type="radio" 
                        name="motivo_mensaje" 
                        id="inpr3" 
                        value='Mala estructura de la vacante'
                        onChange={handleInputChanges} 
                    />
                    <label htmlFor="inpr3" className='text-[14px] ml-2'>Mala Estructura de la Vacante</label>
                </div>

                <div>
                    <input 
                        type="radio" 
                        name="motivo_mensaje" 
                        id="inpr4" 
                        value='Mala estructura de vacante'
                        onChange={handleInputChanges}     
                    />
                    <label htmlFor="inpr4" className='text-[14px] ml-2'>Otro</label>
                </div>
                
                <textarea 
                    name="texto" 
                    id="" 
                    value={formValues.texto} 
                    onChange={handleInputChanges}  
                    rows="8"
                    className='w-full' 
                    placeholder='Motivo de la eliminación de la vacante' />
            </div>

            <div className='w-full flex mt-4 text-[14px]'>
                <button className='bg-fourth text-white py-2 rounded-md px-3' onClick={handleDelete}>Eliminar</button>
                <button className='bg-fifth  py-2 rounded-md px-3 ml-3' onClick={onCloseModal}>Cancelar</button>
            </div>

        </div>
        
        </div>
    </Portal>
    )
}

export default ModalDelete