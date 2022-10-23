import React from 'react'

const FilterWithRButton = ({itemsList, setFilters, filters, target}) => {
  
  const handleOnCheck = (e) => {
    setFilters({...filters, [target]:e.target.value})
  }

  return (
    <div className='flex flex-col'>
        {
            itemsList.map(item => (
                <div className='flex items-center pl-3 pr-12' key={item}>
                    <input type="radio" name={target} id={item} value={item} className='radio_filter' onChange={handleOnCheck} />
                    <label htmlFor={item} className='ml-2 mt-1'>{item}</label>
                </div>
            ))
        }
    </div>
  )
}

export default FilterWithRButton