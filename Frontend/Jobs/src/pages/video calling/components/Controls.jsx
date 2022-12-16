import React from 'react'
import microphone from '../../../assets/icons/microphone.svg'
import leave from '../../../assets/icons/leave.svg'
import video from '../../../assets/icons/video.svg'
import { useClient } from '../video.config'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { f_delete } from '../../../services/services'
import { authContext } from '../../../context/context'
import { useContext } from 'react'

const Controls = ({tracks, setStart, uid, room_name }) => {

    const { auth } = useContext(authContext)

    const client = useClient()
    const [ trackState, setTrackState] = useState({video:true, audio:true})
   
    const history = useNavigate()

    const mute = async(type) => {
        if(type === "audio"){
            await tracks[0].setEnabled(!trackState.audio)
            setTrackState(ps=> ({...ps, audio: !ps.audio}))
        }
        if(type === "video"){
            await tracks[1].setEnabled(!trackState.video)
            setTrackState(ps=> ({...ps, video: !ps.video}))
        }
    }

    const leaveChannel = async (e) => {
        await client.leave()
        client.removeAllListeners()
        tracks[0].close()
        tracks[1].close()
        setStart(false)
      
        await f_delete('llamada/delete_member/',  
                    {"Content-Type": "application/json","Authorization":`Bearer ${auth.token}`},
                    {uid, room_name })
    }

    return (
    <section id='controls-wrapper' className='flex w-full justify-center gap-x-[0.5em] fixed bottom-2' >
    <div className={`icon-wrapper p-2 ${trackState.audio ? 'bg-secondary': 'bg-fourth'}  rounded-full`} onClick={() => mute("audio")}>
      <img className='h-6 w-6 cursor-pointer rounded-md' id='mic-btn' src={microphone} alt="" />
    </div>
    <div className={`icon-wrapper p-2 ${trackState.video ? 'bg-secondary': 'bg-fourth'}  rounded-full`}  onClick={() => mute("video")} >
      <img className='h-6 w-6 cursor-pointer ' id='video-btn' src={video} alt="" />
    </div>
    <div className='icon-wrapper p-2 bg-fourth rounded-full' onClick={() => {leaveChannel(); history('/app/diary')} }>
      <img className='h-6 w-6 cursor-pointer rounded-md' id='leave-btn' src={leave} alt="" />
    </div>
</section>
  )
}

export default Controls