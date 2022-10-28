import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { authContext } from '../../../../context/context'
import { f_delete } from '../../../../services/services'

const SaveGrid = ({vacancy, setVacancies}) => {

   const { auth } = useContext(authContext) 

   const onHandleRemove = (e) => {
        e.preventDefault()
        f_delete(`vacante/eliminar/guardada/${auth.user_id}/${vacancy.vacante.id}/`, {"Authorization":`Bearer ${auth.token}`})
        .then(data => {
            if(data.exito){
                setVacancies(vacancies => vacancies.filter(vac => vac.id !== vacancy.id))
            }else{
                alert("Error al eliminar vacante guardada. Intente nuevamente")
            }
        })
   }

  return (

    <div className='border-b w-full border-fifth pl-4 pr-4 py-4 '>

        <div className='flex gap-4'>
            <img className='w-16 h-16 rounded-full 'src={`http://127.0.0.1:8000${vacancy.vacante.empresa.foto}`} alt="Scopic Software" />
        
            <div className='flex flex-col'>
                <h4 className='font-bold'>{vacancy.vacante.nombre_puesto}               
                    <span className='border-solid border-2 border-nineth rounded bg-nineth m-2 text-sm'>jornada completa</span>
                    <span className='border-solid border-2 border-nineth rounded bg-nineth m-2 text-sm'>remoto</span>
                </h4>
                <div>
                    <Link className='justify-center text-[12px] border border-sixth rounded-lg cursor-pointer mr-3 mt-5 py-2 px-4 hover:bg-secondary ' to= {`/app/candidate/viewSingleVacancy/${vacancy.vacante.id}`} >Ver vacante</Link> 
                    <button className='justify-center cursor-pointer text-[12px] mt-5 py-1.5 rounded-lg px-4 hover:bg-tertiary border border-sixth' onClick={onHandleRemove}>Dejar de guardar</button>  

                </div>

                {/* <p className='text-base'>Scopic Software</p>
                <ul className='flex space-x-4'>
                    <li><h5 className='font-bold'>Ubicación</h5> Spain</li>
                    <li><h5 className='font-bold'>Publicado</h5>29 septiembre de 2022</li>
                    <li><h5 className='font-bold'>Categoria</h5>Backend Developer</li>
                </ul> */}
            </div>
        </div>

    </div>

    

  )
}

export default SaveGrid