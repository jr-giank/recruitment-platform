import React from 'react'
import facebook from '../../../../../assets/icons/facebook.png'
import twitter from '../../../../../assets/icons/twitter.png'
import instagram from '../../../../../assets/icons/instagram.png'
import github from '../../../../../assets/icons/github-sign.png'
import linkedin from '../../../../../assets/icons/linkedin.png'
import email from '../../../../../assets/icons/email.png'
import pagina from '../../../../../assets/icons/pagina.png'
import ContactGrid from './ContactGrid'

const Contacts = ({candidateData, onHandleOpenModal }) => {

  return (
    <div className='flex flex-col'>

      <div className='flex justify-center'>
          <button className='bg-eleventh w-full py-2' onClick={onHandleOpenModal}>
              + Agregar Nuevo
          </button>
      </div>

        {
          candidateData.url_github && <ContactGrid name={'Github'} url={candidateData.url_github} pic={github} />
        }

        {
          candidateData.url_linkedin &&  <ContactGrid name={'Linkedin'} url={candidateData.url_linkedin} pic={linkedin} />
        }

        {
          candidateData.url_instagram && <ContactGrid name={'Instagram'} url={candidateData.url_instagram} pic={instagram} /> 
        }

        {
          candidateData.url_twitter &&  <ContactGrid name={'Twitter'} url={candidateData.url_twitter} pic={twitter} />
        }

        {
          candidateData.url_facebook &&  <ContactGrid name={'Facebook'} url={candidateData.url_facebook} pic={facebook} />
        }

        {
          candidateData.url_web && <ContactGrid name={'Página Web Personal'} url={candidateData.url_web} pic={pagina} />
        }
      
    </div>
  )
}

export default Contacts