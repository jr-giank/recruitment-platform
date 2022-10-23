import React, { useEffect, useState } from 'react'
import { getCountries } from '../../services/services'
import FiltersWithCheckBox from './FiltersWithCheckBox'
import FilterWithRButton from './FilterWithRButton'

const Filters = () => {

    const [ countries, setCountries ] = useState([]) 

    useEffect(() => {
        // Peticion al servidor para traer los países
        getCountries().then(data =>{
            const countries = data.map(country => country.name)
            setCountries([...countries])
        })
      }, [])

    const handleShowFilter = (id) => {
        document.getElementById(`${id}`).classList.toggle("hidden")
    }

    return (
        <>
            {/* <div> */}
                <button 
                    className='rounded-lg px-4 py-1 border border-fifth hover:bg-secondary hover:text-white'
                    onClick={()=>handleShowFilter("category_filter")}
                >
                    Categorias
                </button>

                <span 
                    className='hidden absolute bg-white top-32 left-48 rounded-lg shadow-md text-[15px] py-2 h-80 overflow-auto' id='category_filter'
                >
                    <FiltersWithCheckBox itemsList={["Desarrollo Web", "Desarrollo Móvil", "Inteligencia Artificial", "QA", "Desarrollo Frontend", "Desarrollo Backend", "Desarrollo Blockchain", "Desarrollo de VideoJuegos", "Ciencia de Datos"]} />
                </span>

                <button
                    className='rounded-lg px-3 py-1 border border-fifth  hover:bg-secondary hover:text-white'
                    onClick={()=>handleShowFilter("modalidad_filter")}
                >
                    Modalidad
                </button>

                <span className='hidden absolute bg-white top-32 left-96 rounded-lg shadow-md text-[15px] py-2' id='modalidad_filter'>
                    <FiltersWithCheckBox itemsList={["Presencial", "Híbrido", "Remoto"]} />
                </span>

                <button
                    className='rounded-lg px-3 py-1 border border-fifth hover:bg-secondary hover:text-white'
                    onClick={()=>handleShowFilter("exp_filter")}
                >
                    Requiere Experiencia
                </button>

                <span className='hidden absolute bg-white top-32 left-[545px] rounded-lg shadow-md py-2' id='exp_filter'>
                    <FilterWithRButton itemsList={["Si", "No"]} />
                </span>

                <button
                    className='rounded-lg px-3 py-1 border border-fifth hover:bg-secondary hover:text-white'
                    onClick={()=>handleShowFilter("jobType_filter")}
                >
                    Tipo de Contrato
                </button>

                <span className='hidden absolute bg-white top-32 left-[630px] rounded-lg shadow-md text-[15px] py-2' id='jobType_filter'>
                    <FiltersWithCheckBox itemsList={["Contrato por tiempo Indefinido", "Contrato Temporal", "Contrato a Medio Tiempo"]} />
                </span>

                <button
                    className='rounded-lg px-3 py-1 border border-fifth hover:bg-secondary hover:text-white'
                    onClick={()=>handleShowFilter("country_filter")}
                >
                    País
                </button>

                <span className='hidden absolute bg-white top-32 left-[700px] rounded-lg shadow-md text-[14px] h-80 overflow-auto py-2' id='country_filter'>
                    <FiltersWithCheckBox itemsList={countries} />
                </span>
            {/* </div> */}
        </>
  )
}
export default Filters