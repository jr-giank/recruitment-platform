import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { authContext } from '../../context/context'

import { get, getCountries } from '../../services/services'

import FiltersWithCheckBox from './FiltersWithCheckBox'
import FilterWithRButton from './FilterWithRButton'

const Filters = ({setFiltersVisible, filters, setFilters, handleOnCleanFilters, handleOnApplyFilters}) => {

    const [ countries, setCountries ] = useState([])
    const [ openFilter, setOpenFilter ] = useState(null)
    const firstRendered = useRef(false)
    const displayedFilter = useRef(false)
    const [ categoriesName, setCategoriesName ] = useState([])
    const [ categoriesId, setCategoriesId ] = useState([])
    
    const { auth } = useContext(authContext)

    const filterOutsideClick = useCallback((e)=>{
        if(displayedFilter.current && !document.getElementById(`${openFilter}`).contains(e.target)){
            document.getElementById(`${openFilter}`).classList.add("hidden")
            displayedFilter.current = false
            setOpenFilter(null)
            window.removeEventListener("click", filterOutsideClick) // Remover listener
            return
        }
        displayedFilter.current = true
    }, [openFilter])

    useEffect(() => {
        // Peticion al servidor para traer los países
        getCountries().then(data =>{
            const countries = data.map(country => country.name)
            setCountries([...countries])
        })
      }, [])

    useEffect(()=>{
        get('categorias/', {"Authorization":`Bearer ${auth.token}`} )
        .then(({data}) => {
            let categoriesId = data.map(cat => cat.id)
            let categoriesName = data.map(cat => cat.nombre)
            setCategoriesName([...categoriesName])
            setCategoriesId([...categoriesId])
        })
    }, [])

    // AGREGAR UN LISTENER PARA ESCUCHAR CUANDO SE LE DA UN CLICK A UN ELEMENTO FUERA DEL FILTRO QUE ESTA ABIERTO
    useEffect(()=> {

        if(!firstRendered.current){
            firstRendered.current = true
            return
        } 

        if(openFilter === null){
            return
        }
        window.addEventListener("click", filterOutsideClick)
    }, [openFilter])

    const handleShowFilter = (id) => {
        document.getElementById(`${id}`).classList.toggle("hidden")
        console.log(id)
        setOpenFilter(id)
    }

    return (
        <>
                <button 
                    className='rounded-xl px-4 py-1 border border-fifth font-semibold text-[17px] hover:bg-secondary  hover:text-white'
                    onClick={()=>handleShowFilter("category_filter")}
                >
                    Categorias
                </button>

                <span 
                    className='hidden absolute bg-white top-16 left-48 rounded-lg shadow-md text-[15px] py-2 h-80 overflow-auto' 
                    id='category_filter'
                >
                    <FiltersWithCheckBox 
                        itemsList={categoriesName} 
                        setFilters={setFilters} 
                        filters={filters} 
                        target={"category"}
                        valuesItems={categoriesId} />
                </span>

                <button
                    className='rounded-xl px-3 py-1 border border-fifth font-semibold text-[17px]  hover:bg-secondary hover:text-white'
                    onClick={()=>handleShowFilter("modalidad_filter")}
                >
                    Tipo de Contrato
                </button>

                <span 
                    className='hidden absolute bg-white top-16 left-80 rounded-lg shadow-md text-[15px] py-2' 
                    id='modalidad_filter'
                >
                    <FiltersWithCheckBox    
                        itemsList={["Contrato Por Tiempo Indefinido", "Contrato Temporal"]}
                        setFilters={setFilters} 
                        filters={filters} 
                        target={"modalidad"} 
                        valuesItems={["INDEFINIDO", "TEMPORAL"]}
                    />
                </span>

                <button
                    className='rounded-xl px-3 py-1 border border-fifth font-semibold text-[17px] hover:bg-secondary hover:text-white'
                    onClick={()=>handleShowFilter("exp_filter")}
                >
                    Requiere Experiencia
                </button>

                <span 
                    className='hidden absolute bg-white top-16 left-[545px] rounded-lg shadow-md py-2' 
                    id='exp_filter'
                >
                    <FilterWithRButton 
                        itemsList={["Si", "No"]} 
                        setFilters={setFilters} 
                        filters={filters} 
                        target={"exp"} 
                    />
                </span>

                <button
                    className='rounded-xl px-3 py-1 border border-fifth font-semibold text-[17px] hover:bg-secondary hover:text-white'
                    onClick={()=>handleShowFilter("jobType_filter")}
                >
                    Modalidad
                </button>

                <span 
                    className='hidden absolute bg-white top-16 left-[730px] rounded-lg shadow-md text-[15px] py-2' id='jobType_filter'
                >
                    <FiltersWithCheckBox 
                        setFilters={setFilters} 
                        filters={filters} 
                        target={"job_type"} 
                        itemsList={["Presencial", "Híbrido", "Remoto"]} 
                        valuesItems={["PRESENCIAL", "HIBRIDO", "REMOTO"]}
                    />
                </span>

                <button
                    className='rounded-xl px-3 py-1 border border-fifth font-semibold text-[17px] hover:bg-secondary hover:text-white'
                    onClick={()=>handleShowFilter("country_filter")}
                >
                    País
                </button>

                <span 
                    className='hidden absolute bg-white top-16 left-[700px] rounded-lg shadow-md text-[14px] h-80 overflow-auto py-2' 
                    id='country_filter'
                >
                    <FiltersWithCheckBox 
                        itemsList={countries} 
                        setFilters={setFilters} 
                        filters={filters} 
                        target={"countries"}
                    />
                </span>

                <span className='border-l border-sixth px-2'>
                    <button 
                        className='px-3 py-1 text-seventh rounded-md ml-2 hover:underline'
                        onClick={handleOnApplyFilters}
                    >
                        Aplicar
                    </button>
                    <button 
                        className='px-3 py-1  text-seventh rounded-md ml-2 hover:underline' 
                        onClick={handleOnCleanFilters}
                    >
                        Reestablecer
                    </button>
        
                <button className='ml-8 hover:underline' onClick={()=>setFiltersVisible(false)}>
                    <small>Cerrar</small>
                </button>

            </span>
        </>
  )
}
export default Filters