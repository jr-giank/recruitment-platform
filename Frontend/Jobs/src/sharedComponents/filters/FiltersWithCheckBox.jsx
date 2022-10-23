import React from 'react'

const FiltersWithCheckBox = ({itemsList}) => {

  return (
    <div className='flex flex-col'>
        {
            itemsList.map(item => (
                <div key={item} className='flex items-center px-3'>
                    <input type="checkbox" name={item} id={`${item}`} value={item} className='checkbox_filter' />
                    <label htmlFor={`${item}`} className='ml-4 mt-3'>{item}</label>
                </div>
            ))
        }
    </div>
  )
}

export default FiltersWithCheckBox