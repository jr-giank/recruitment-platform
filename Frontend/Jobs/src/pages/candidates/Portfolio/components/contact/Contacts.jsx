import React from 'react'
import facebook from '../../../../../assets/icons/facebook.png'
import twitter from '../../../../../assets/icons/twitter.png'
import instagram from '../../../../../assets/icons/instagram.png'
import github from '../../../../../assets/icons/github-sign.png'
import linkedin from '../../../../../assets/icons/linkedin.png'
import email from '../../../../../assets/icons/email.png'
import pagina from '../../../../../assets/icons/pagina.png'
import ContactGrid from './ContactGrid'

const Contacts = ({contacts, onHandleOpenModal}) => {
  return (
    <div className='flex flex-col'>

      <div className='flex justify-center'>
          <button className='bg-eleventh w-full py-2' onClick={onHandleOpenModal}>
              + Agregar Nuevo
          </button>
      </div>

      <ContactGrid name={'elkanguro@outlook.com'} url={'https://github.com/bflorentino'} pic={email} />
      <ContactGrid name={'Github'} url={'https://github.com/bflorentino'} pic={github} />
      <ContactGrid name={'Linkedin'} url={'https://www.linkedin.com/in/bryan-xavier-florentino-montero-34b00620b/'} pic={linkedin} />
      <ContactGrid name={'Instagram'} url={'https://www.instagram.com/bflorentin0/'} pic={instagram} />
      <ContactGrid name={'Twitter'} url={'https://twitter.com/Bryan_X_F_M/'} pic={twitter} />
      <ContactGrid name={'Facebook'} url={'https://www.facebook.com/bryanxfm23'} pic={facebook} />
      <ContactGrid name={'Página Web Personal'} url={'https://github.com/bflorentino'} pic={pagina} />
    </div>
  )
}

export default Contacts