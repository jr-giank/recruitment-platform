import React, { useState } from 'react'
import { uid } from 'uid'

/*
  target: el nombre de la lista de filtros a la cual hara referencia este componente.
  itemsList: la lista de items que contiene el filtro.
*/

const FiltersWithCheckBox = ({itemsList, setFilters, filters, target, valuesItems}) => {

  const [ withItemsId, setWithItemsId ] = useState( valuesItems ? true : false) 

  const handleOnCheck = (e) => {

    // Agregar un elemento al filtrado siempre y cuando el elemento este checked
    if(e.target.checked){
      setFilters({...filters,  [target]:[...filters[target], e.target.value]})
      return
    }
    
    // En caso de querer eliminar un elemento del filtrado
    const removedItemFilter = filters[target].filter(item => item !== e.target.value)
    setFilters({...filters, [target]: [...removedItemFilter]})
  }

  return (
    <div className='flex flex-col'>
        {
            itemsList.map((item, i) => (
                <div key={item} className='flex items-center px-3'>
                    
                    <input 
                      type="checkbox" 
                      name={item} 
                      id={item} 
                      value={withItemsId ? valuesItems[i] : item}
                      className='checkbox_filter' 
                      onChange={handleOnCheck} 
                    />
                    <label htmlFor={item} className='ml-4 mt-3'>{item}</label>
                </div>
            ))
        }
    </div>
  )
}

export default FiltersWithCheckBox