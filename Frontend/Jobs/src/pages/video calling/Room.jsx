import React, {useContext} from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { authContext, inVideoContext } from '../../context/context'

import NoAccess from '../security/NoAccess'
import Controls from './components/Controls';
import Video from './components/Video';

import { CHANNEL, useClient, useMicrophoneAndCamera, config } from './video.config';

const Room = () => {
  
  const { setInVideo } = useContext(inVideoContext)
  const { inCall, setInCall } = useState(true)
  const { auth } = useContext(authContext)
  const [ users, setUsers ] = useState([])
  const [ start, setStart ] = useState(false)
  const [ usersInCall, setUsersInCall  ] = useState([auth.empresa_id ? auth.nombre_empresa : `${auth.first_name} ${auth.last_name}`])
  const client = useClient()
  const { ready, tracks } = useMicrophoneAndCamera();
 
  const history = useNavigate()

  if(!auth.candidato_id && !auth.empresa_id){
    return <NoAccess />
  }

  useEffect(()=> {

    return () => {
      client.removeAllListeners()
      client.leave()
      setInVideo(false)
    }
  }, [])

  useEffect(()=> {
  
    setInVideo(true)

    const init = async (name) => {
    
      client.on("user-published", async (user, mediaType) => {
      
        await client.subscribe(user, mediaType);
       
        if(mediaType === "video"){

            setUsers(prevUsers => [...prevUsers, user])
            setUsersInCall(usersInCall =>[...usersInCall, auth.empresa_id ? auth.nombre_empresa : `${auth.first_name} ${auth.last_name}` ])
        }

        if(mediaType === "audio"){
          user.audioTrack.play();
        }
      });
      
      client.on("user-unpublished", (user, mediaType) => {
        if(mediaType === "audio"){
          if(user.audioTrack){
            user.audioTrack.stop();
          }
        }
        if(mediaType === "video"){
         setUsers(prevUsers => prevUsers.filter(User => User.uid !== user.uid ));
        }
      })
      client.on("user-left", user => {
        setUsers(prevUsers => prevUsers.filter(User => User.uid !== user.uid ));
        setUsersInCall(usersInCall => usersInCall.filter(User => User.uid !== user.uid  ))
      })
      
      try{
        await client.join(config.appId, name, config.token, null) 
      }
      catch(error){
        console.log(error)
      }
      
      if(tracks){
        await client.publish([tracks[0], tracks[1]])
      }
      setStart(true)
    }

    if(ready && tracks){
      try{
        init(CHANNEL)
      }catch(e){
        console.log(e)
      }
  }
}, [CHANNEL, client, ready, tracks])

  return (
    <main className='flex bg-dark h-full'>

      <section className='w-3/4 h-[84%]'>
        <h4 className='text-white ml-4 mt-4'>Sala: vtasdasvasdfaw </h4>
       
      {
        start && tracks && (
          <Video tracks={tracks} users={users} usersInCall={usersInCall} />
          )
        }

      {
        ready && tracks &&(
          <Controls tracks={tracks} setStart={setStart} setInCall={setInCall}  />
          )
        }
      
      </section>

      <div className='flex flex-col mt-12 w-[21%] ml-8 h-[84%] overflow-auto text-white bg-dark2 rounded-md px-3 py-2'>
          <h3 className='font-bold text-center'>Usuarios En Linea</h3>
          <div className='flex flex-col'>
            { usersInCall.map(user => (
              <div key={user.uid} className='flex items-center w-full mt-4'>
                <img src={`http://127.0.0.1:8000${auth.foto}`} className='rounded-full w-12 h-12' />
                <p className='ml-4'>{user.uid || user}</p>
                </div>
            ))}
          </div>
      </div>

    </main>
  )
}

export default Room