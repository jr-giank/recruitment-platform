import React from 'react'
import { useNavigate, Link } from 'react-router-dom'

const SaveGrid = () => {
   const history = useNavigate()
   Link
  return (

    //ESTO ESTA MAL ARREGLARLO

    <div className='w-full border-solid border-2 border-fifth rounded-md mt-5 mb-5 pl-4 pr-4 py-4 '>

        <div className='flex gap-4'>
            <img className='w-24 ' src="https://i.pinimg.com/originals/82/48/3b/82483b829d1a39580360a6fef506072d.png" alt="Scopic Software" />
        
            <div>
                <h4 className='font-bold text-xl'>Desarrollador Web             
                    <span className='border-solid border-2 border-nineth rounded bg-nineth m-2 text-sm'>jornada completa</span>
                    <span className='border-solid border-2 border-nineth rounded bg-nineth m-2 text-sm'>remoto</span>
                </h4>

                <p className='text-base'>Scopic Software</p>
                <ul className='flex space-x-4'>
                    <li><h5 className='font-bold'>Ubicación</h5> Spain</li>
                    <li><h5 className='font-bold'>Publicado</h5>29 septiembre de 2022</li>
                    <li><h5 className='font-bold'>Categoria</h5>Backend Developer</li>
                </ul>
            </div>
        </div>

        <Link className='flex-1 justify-center cursor-pointer mr-3 mt-5 py-3 px-20 hover:bg-secondary border-solid border-2 border-eighth rounded' to= {`/candidates/viewSingleVacancy/1`} >Ver vacante</Link> 
        <button className='flex-1  justify-center cursor-pointer mt-5 py-2.5 px-20 hover:bg-tertiary border-solid border-2 border-eighth rounded'>Eliminar vacante</button>  
    </div>

    

  )
}

export default SaveGrid