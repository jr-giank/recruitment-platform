import React from "react";
import { uid } from "uid";

const TechnicalTestDescription = ({techTest, setTechnicalTest}) => {
    console.log(techTest)
    return(
      <div className='flex justify-center w-full mt-24 px-8' >
      <div className='w-3/5 mb-8'>

        <div className='flex justify-between'>
          <h2 className='font-bold font-poppins'>{techTest[0]?.titulo}</h2>
        </div>
       
       <h4 className='mb-4'><strong>Vacante:</strong> {techTest[0]?.vacante.nombre_puesto}</h4>

        {
          techTest[0]?.mandato?.split("\n").map(text => (
            text === "" 
                ? 
                  <br key={uid()}/> 
                : 
                  <p key={uid()} className='text-justify'> {text}  </p>
          ))
        }

        <h3 className='mb-1 font-bold font-poppins mt-4'> Tecnologías a utilizar </h3>
        {
          techTest[0]?.tecnologias?.split("\n").map(text => (
            text === "" 
                ? 
                  <br key={uid()}/> 
                : 
                  <p key={uid()} className='text-justify'> {text} </p>
          ))
        }

        <h3 className='mb-1 font-bold font-poppins mt-4'> ¿Cómo subir los resultados? </h3>
        {
          techTest[0]?.info_subida?.split("\n").map(text => (
            text === "" 
                ? 
                  <br key={uid()}/> 
                : 
                  <p key={uid()} className='text-justify'> {text}</p>
          ))
        }
      </div>
    </div>
  )

}
export default TechnicalTestDescription