import React, {useEffect, useState, useContext} from 'react'
import { get } from '../../../../services/services';
import { authContext } from '../../../../context/context';

const AgendaGrid = () => {

  const { auth } = useContext(authContext);
  const [ interview, setInterview ] = useState({})


  useEffect(()=> {
    get(`entrevista/candidato/${auth.candidato_id}/`, {"Authorization":`Bearer ${auth.token}`})
    .then(res => {
      if(res.exito){
        setDate({...res.data})
        console.log(res)
        }
    })
  }, [])
  return (
    <div>
      <p>Viernes 26 Noviembre 2022</p>
      <p>Vacante, empresa, roomID, fecha</p>
    </div>
  )
}

export default AgendaGrid