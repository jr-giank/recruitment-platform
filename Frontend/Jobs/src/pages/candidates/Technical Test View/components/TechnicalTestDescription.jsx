import React, { useContext } from "react";
import { uid } from "uid";
import { authContext } from  '../../../../context/context'

const TechnicalTestDescription = ({techTest, setTechnicalTest}) => {
    console.log(techTest)
    const {auth} = useContext(authContext)

    

    const handleOnSubmit = (e) => {
      e.preventDefault()
      post('prueba/asignada/',{'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`},  formValues)
    }

  //aqui falta validar el text area que no se envie vacio y poner a funcionar el boton de enviar

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

        <h3 className='mb-1 font-bold font-poppins mt-4'> Subir enlace </h3>
        <textarea 
              rows='5' 
              name="enlaceTechTest" 
              id="enlaceTechTest" 
              placeholder='ingrese su prueba tecnica'
              className='w-full'
              // value={formValues.responsabilidades_puesto}
              // onChange={handleInputChanges}
              // onBlur={handleOnBlur}
            />
            <button 
              className='w-full mb-8 mt-8 bg-primary rounded-md text-white py-1 text-lg cursor-pointer disabled:bg-sixth disabled:cursor-default'
              // disabled={isDisabled}
              type='submit'
              onClick={handleOnSubmit}
            >
              Enviar
            </button>

      </div>

    </div>
  )

}
export default TechnicalTestDescription