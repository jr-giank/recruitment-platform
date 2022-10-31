import React from 'react'

const ContactGrid = ({name, pic, url, showUrl}) => {
  return (
    <div className='flex items-center border-b border-b-fifth py-2 px-3'>
        <img src={pic} alt="" className='w-8 h-8' />
        <a href={url} target='blanck' className='ml-3'> 
            <p>{name}</p>
        </a>
    </div>
  )
}

export default ContactGrid