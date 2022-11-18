import React from "react";
import TechnicalTestGrid from "./TechnicalTestGrid";

const TechnicalTest = ({test, setTechnicalTest}) => {


  return (
    <div>
        {
            test.length > 0 ?
            test.map(prueba => (
                <TechnicalTestGrid key={prueba.id} test={prueba}  /> 
            ))
            : <h4 className='text-center text-[#ddd] font-bold'>No hay ninguna prueba tecnica disponible</h4>
        }
    </div>
  )
}


export default TechnicalTest
