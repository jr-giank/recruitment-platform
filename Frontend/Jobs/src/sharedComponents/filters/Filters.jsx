import React, { useCallback, useEffect, useRef, useState } from 'react'

import { get, getCountries } from '../../services/services'

import FiltersWithCheckBox from './FiltersWithCheckBox'
import FilterWithRButton from './FilterWithRButton'

const filtersInitialState = {
    category: [], 
    modalidad: [], 
    exp: "No", 
    job_type:[], 
    countries:[]
}

const Filters = ({setFiltersVisible}) => {

    const [ countries, setCountries ] = useState([])
    const [ openFilter, setOpenFilter ] = useState(null)
    const firstRendered = useRef(false)
    const displayedFilter = useRef(false)

    const [ filters, setFilters ] = useState({...filtersInitialState})
    const [ categories, setCategories ] = useState([])

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
        get('obtener/categorias/')
        .then(({data}) => {
            setCategories([...data.map(cat => cat.nombre)])
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
        setOpenFilter(id)
    }

    // Limpiar filtros y limpiar elementos checks
    const handleOnCleanFilters = () => {

        setFilters({...filtersInitialState})
        const checks = document.querySelectorAll(".checkbox_filter, .radio_filter")

        Array.prototype.map.call(checks, element => {
            element.checked = false    
        });
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
                        itemsList={categories} 
                        setFilters={setFilters} 
                        filters={filters} 
                        target={"category"} />
                </span>

                <button
                    className='rounded-xl px-3 py-1 border border-fifth font-semibold text-[17px]  hover:bg-secondary hover:text-white'
                    onClick={()=>handleShowFilter("modalidad_filter")}
                >
                    Modalidad
                </button>

                <span 
                    className='hidden absolute bg-white top-16 left-96 rounded-lg shadow-md text-[15px] py-2' 
                    id='modalidad_filter'
                >
                    <FiltersWithCheckBox    
                        itemsList={["Presencial", "Híbrido", "Remoto"]} 
                        setFilters={setFilters} 
                        filters={filters} 
                        target={"modalidad"} 
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
                    Tipo de Contrato
                </button>

                <span 
                    className='hidden absolute bg-white top-16 left-[630px] rounded-lg shadow-md text-[15px] py-2' id='jobType_filter'
                >
                    <FiltersWithCheckBox 
                        itemsList={["Contrato por tiempo Indefinido", "Contrato Temporal", "Contrato a Medio Tiempo"]} 
                        setFilters={setFilters} 
                        filters={filters} 
                        target={"job_type"} 
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