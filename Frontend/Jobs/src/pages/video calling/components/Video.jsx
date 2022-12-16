import React from 'react'
import { AgoraVideoPlayer } from 'agora-rtc-react'

const Video = ({tracks, users}) => {

    return (
    <section id="video-streams" className='flex flex-wrap w-full h-full px-3 bg-dark2 ml-3 rounded-md overflow-auto'>
 
        <div
            className={`min-w-[33%] ${users.length === 0 && 'w-full'} px-2 max-h-[80%] min-h-[350px] mt-4 mb-8 `} 
        >
            <div className='user-name-wrapper'><span className='user-name text-white' > Yo</span></div>
            <AgoraVideoPlayer 
                videoTrack={tracks[1]} 
                className='video-player' 
            />
          </div> 

          {
            users.length > 0 &&
                users.map((user, i) => {
                    if(user.data.videoTrack){

                        return(
                            <div
                                key={user.data.uid}
                                className={`min-w-[33%] ${(users.length > 3 && i === users.length - 1 && i%2 !== 0) && 'w-full' } px-2 max-h-[80%] min-h-[350px] mt-4 mb-8`} 
                                id={`user-container-${user.data.uid}`}
                            >
                                <div className='user-name-wrapper'><span className='user-name text-white' >{user.nombre_usuario}</span></div>
                                <AgoraVideoPlayer videoTrack={user.data.videoTrack} className='video-player' />
                            </div> 
                    )}
                    else{
                        return null
                    }
          })}
  </section>
  )
}

export default Video