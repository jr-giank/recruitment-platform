import React, { useContext } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { uid } from "uid";
import { authContext } from  '../../../../context/context'
import { put } from "../../../../services/services";
import validator from "validator";

const TechnicalTestDescription = ({techTest, setTechnicalTest, deadLine}) => {
    
    const {auth} = useContext(authContext)
    const [ urlResult, setUrlResult ] = useState("")

    const handleOnSubmit = (e) => {
      e.preventDefault()
      
      if(urlResult === "" || !validator.isURL(urlResult) ){
        Swal.fire("Inválido", "Ingrese una URL válida con los resultados de su prueba técnica", "error")
        return
      }

      if(deadLine < new Date()){
        Swal.fire("Inválido", "Operaacion inválida. Ya ha pasado la fecha límite", "error")
        return
      }

      const results = {...techTest}
      results.status = "F"
      results.candidato = auth.candidato_id
      results.solucion = urlResult
      results.prueba = techTest.prueba.id

      put(`prueba/asignada/${techTest.id}/`,{'Content-Type': 'application/json', "Authorization":`Bearer ${auth.token}`}, results)
      .then(res => {
        if(res.exito){
          Swal.fire("Registrado", "Prueba técnica subida correctamente", "success" )
          setTechnicalTest({...res.data})
        }else{
          console.log(res)
          Swal.fire("Error al subir", "La prueba técnica no pudo ser subida correctamente", "error" )
        }
      })
    }

  //aqui falta validar el text area que no se envie vacio y poner a funcionar el boton de enviar

    return(
      <div className='flex justify-center w-full mt-10 px-8' >
      <div className='w-3/5 mb-8'>

        <div className='flex justify-between'>
          <h2 className='font-bold font-poppins'>{techTest?.prueba?.titulo}</h2>
        </div>
       
       <h4 className='mb-4'><strong>Vacante:</strong> {techTest.prueba?.vacante.nombre_puesto}</h4>

        {
          techTest.prueba?.mandato?.split("\n").map(text => (
            text === "" 
                ? 
                  <br key={uid()}/> 
                : 
                  <p key={uid()} className='text-justify'> {text}  </p>
          ))
        }

        <h3 className='mb-1 font-bold font-poppins mt-4'> Tecnologías a utilizar </h3>
        {
          techTest.prueba?.tecnologias?.split("\n").map(text => (
            text === "" 
                ? 
                  <br key={uid()}/> 
                : 
                  <p key={uid()} className='text-justify'> {text} </p>
          ))
        }

        <h3 className='mb-1 font-bold font-poppins mt-4'> ¿Cómo subir los resultados? </h3>
        {
          techTest.prueba?.info_subida?.split("\n").map(text => (
            text === "" 
                ? 
                  <br key={uid()}/> 
                : 
                  <p key={uid()} className='text-justify'> {text}</p>
          ))
        }

        {
          deadLine < new Date() && techTest.status === "En curso"
          ?
            <h4 className="mt-12 text-center pb-8 text-tenth">La fecha límite para subir los resultados de esta prueba ha expirado.</h4>
          :
            // Siempre y cuando la fecha limite no haya pasado
            techTest.status === "En curso" ?
            (
              <>
                <h3 className='mb-1 font-bold font-poppins mt-4'> Subir enlace </h3>
                <textarea 
                      rows='5' 
                      name="enlaceTechTest" 
                      id="enlaceTechTest" 
                      placeholder='URL con resultados de la prueba técnica'
                      className='w-full'
                      value={urlResult}
                      onChange={(e)=>setUrlResult(e.target.value)}
                    />
                    <button 
                      className='w-full mb-8 mt-8 bg-primary rounded-md text-white py-1 text-lg cursor-pointer disabled:bg-sixth disabled:cursor-default'
                      type='submit'
                      onClick={handleOnSubmit}
                    >
                      Enviar
                    </button>
              </>
            )
            :
            <h4 className="mt-12 text-center pb-8 text-tenth">Usted ya ha subido los resultados de su prueba técnica</h4>
          }
      </div>
    </div>
  )

}
export default TechnicalTestDescription