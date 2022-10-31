import React from 'react'
import { useForm } from '../../../../../hooks/useForm'

import facebook from '../../../../../assets/icons/facebook.png'
import twitter from '../../../../../assets/icons/twitter.png'
import instagram from '../../../../../assets/icons/instagram.png'
import github from '../../../../../assets/icons/github-sign.png'
import linkedin from '../../../../../assets/icons/linkedin.png'
import email from '../../../../../assets/icons/email.png'
import pagina from '../../../../../assets/icons/pagina.png'

const FormContact = () => {

  const [ formValues, handleInputChanges ] = useForm({
    "correo_contacto": "",
    "url_github":"",
    "url_linkedin": "",
    "url_instagram": "",
    "url_twitter":"",
    "url_facebook": "",
    "url_pagina_personal":""
  })

  return (
    <form className='flex flex-col px-3'>

      <div className='flex items-center w-full'>
        <img src={email} alt="" className='w-9 h-9 ' />
        <input 
          type="text" 
          name="correo_contacto" 
          id="" 
          value={formValues.contacto}
          className='flex-grow ml-2' 
          onChange={handleInputChanges}
          placeholder='Correo de contacto' 
        />
      </div>
      
      <div className='flex items-center w-full'>
        <img src={linkedin} alt="" className='w-8 h-8 ' />
        <input 
          type="text" 
          name="url_linkedin" 
          id="" 
          value={formValues.url_linkedin} 
          onChange={handleInputChanges}
          className='flex-grow ml-2' 
          placeholder='URL cuenta de Linkedin' 
        />
      </div>
    
      <div className='flex items-center w-full'>
        <img src={github} alt="" className='w-8 h-8 ' />
        <input 
          type="text" 
          name="url_github" 
          id="" 
          value={formValues.url_github} 
          onChange={handleInputChanges}
          className='flex-grow ml-2' 
          placeholder='URL cuenta de Github' 
        />
      </div>
      
      <div className='flex items-center w-full'>
        <img src={instagram} alt="" className='w-8 h-8 ' />
        <input 
          type="text" 
          name="url_instagram" 
          id="" 
          value={formValues.url_instagram} 
          onChange={handleInputChanges}
          className='flex-grow ml-2' 
          placeholder='URL cuenta de Instagram' 
        />
        
      </div>
      
      <div className='flex items-center w-full'>
        <img src={twitter} alt="" className='w-8 h-8 ' />
        <input 
          type="text" 
          name="url_twitter" 
          id="" 
          value={formValues.url_twitter} 
          onChange={handleInputChanges}
          className='flex-grow ml-2' 
          placeholder='URL cuenta de Twitter' 
        />
        
      </div>
      
      <div className='flex items-center w-full'>
        <img src={facebook} alt="" className='w-8 h-8 ' />
        <input 
          type="text" 
          name="url_facebook" 
          id="" 
          value={formValues.url_facebook} 
          onChange={handleInputChanges}
          className='flex-grow ml-2' 
          placeholder='URL cuenta de Facebook' 
        />

      </div>
      
      <div className='flex items-center w-full'>
        <img src={pagina} alt="" className='w-8 h-8 ' />        
        <input 
          type="text" 
          name="url_pagina_personal" 
          id="" 
          value={formValues.url_pagina_personal} 
          onChange={handleInputChanges}
          className='flex-grow ml-2' 
          placeholder='URL Página Personal' 
        />  
      </div>
          
    <div className='w-full flex mt-6 text-[14px]'>
      <button className='bg-seventh text-white py-2 rounded-md px-3'>Agregar</button>
      <button className='bg-fifth  py-2 rounded-md px-3 ml-3'>Cancelar</button>
    </div>

  </form>
  )
}

export default FormContact