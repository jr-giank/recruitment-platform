import React, {useContext} from 'react'
import { useState } from 'react';
import { useEffect } from 'react'
import { authContext, inVideoContext } from '../../context/context'
import { f_delete, get, post } from '../../services/services';

import Controls from './components/Controls';
import Video from './components/Video';

import { useClient, useMicrophoneAndCamera, config } from './video.config';

const Room = () => {

  const token = window.sessionStorage.getItem("token")
  const room_id = window.sessionStorage.getItem("room_id")
  const uid = window.sessionStorage.getItem("uid")
  
  const { auth } = useContext(authContext)
  const { setInVideo } = useContext(inVideoContext)
  const [ users, setUsers ] = useState([])
  const [ start, setStart ] = useState(false)
  const [ usersInCall, setUsersInCall  ] = useState([])

  const client = useClient()
  const { ready, tracks } = useMicrophoneAndCamera();

  useEffect(() => {
    
    window.addEventListener("beforeunload", handleDelete )

    const user_id = auth.rol === 1 ? auth.empresa_id : auth.candidato_id
    const nombre_usuario = auth.rol === 1 ? auth.nombre_empresa : `${auth.first_name} ${auth.last_name}`
    const foto = `http://127.0.0.1:8000${auth.foto}`

    get(`llamada/acceso/${auth.rol}/${user_id}/${room_id}/`, {"Authorization":`Bearer ${auth.token}`})
    .then(res => {
      if(res.exito){
        post('llamada/create_member/', 
          {"Content-Type": "application/json","Authorization":`Bearer ${auth.token}`},
          {room_id, uid, nombre_usuario, foto } 
          )
        .then(res => {
          get(`llamada/get_members/${room_id}/`, 
          {"Authorization":`Bearer ${auth.token}`} 
          )
            .then(res => {
              if(res.exito){
                setUsersInCall([...res.data])
              }
            })
        })
      }
    })

    return () => {
      client.removeAllListeners()
      client.leave()
      setInVideo(false)
      window.removeEventListener("beforeunload", handleDelete )
    }
  }, [])

  useEffect(()=> {
  
    const getMembers = async()=>{
      let usersOnline = await get(`llamada/get_members/${room_id}/`, {"Authorization":`Bearer ${auth.token}`} )
      setUsersInCall([...usersOnline.data])
    }

    setInVideo(true)

    const init = async (name) => {
    
      client.on("user-published", async (user, mediaType) => {
      
        await client.subscribe(user, mediaType);

        if(mediaType === "video"){
          let joinedMember = await get(`llamada/get_member/${user.uid}/${room_id}/`, {"Authorization":`Bearer ${auth.token}`})
          setUsers(prevUsers => [...prevUsers, {data:user, nombre_usuario: joinedMember.data.nombre_usuario} ])
          await getMembers()
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
          setUsers(prevUsers => prevUsers.filter(User => User.data.uid !== user.uid ));
        }
      })
      
      client.on("user-left", user => {
            setUsers(prevUsers => prevUsers.filter(User => User.data.uid !== user.uid ));
            setUsersInCall(usersInCall => usersInCall.filter(User => User.uid !== user.uid  ))
      })

      try{
        await client.join(config.appId, name, token, uid)
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
        init(room_id)
      }catch(e){
        console.log(e)
      }
  }
}, [client, ready, tracks])


  const handleDelete = () => {
    f_delete('llamada/delete_member/',  
    {"Content-Type": "application/json","Authorization":`Bearer ${auth.token}`},
    {uid, room_name: room_id } )
  }

  return (
    <main className='flex bg-dark h-full'>

      <section className='w-3/4 h-[84%]'>
        <h4 className='text-white ml-4 mt-4'>Sala: {room_id} </h4>
       
      {
        start && tracks && (
          <Video tracks={tracks} users={users}  />
          )
        }

      {
        ready && tracks &&(
          <Controls tracks={tracks} setStart={setStart}  room_name={room_id} uid={uid}  />
          )
        }
      
      </section>

      <div className='flex flex-col mt-12 w-[21%] ml-8 h-[84%] overflow-auto text-white bg-dark2 rounded-md px-3 py-2'>
          <h3 className='font-bold text-center'>Usuarios En Linea</h3>
          <div className='flex flex-col'>
            { usersInCall.map(user => (
              <div key={user.uid} className='flex items-center w-full mt-4'>
                <img src={user.foto} className='rounded-full w-12 h-12' />
                <p className='ml-4'>{user.nombre_usuario}</p>
                </div>
            ))}
          </div>
      </div>
    </main>
  )
}

export default Room