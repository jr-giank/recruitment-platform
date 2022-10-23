import React from 'react'

const FilterWithRButton = ({itemsList}) => {
  return (
    <div className='flex flex-col'>
        {
            itemsList.map(item => (
                <div className='flex items-center pl-3 pr-12'>
                    <input key={item} type="radio" name={item} id="" value={item} className='radio_filter' />
                    <label htmlFor="" className='ml-2 mt-1'>{item}</label>
                </div>
            ))
        }
    </div>
  )
}

export default FilterWithRButton