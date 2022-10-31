import React from 'react'
import ProfileBanner from './components/ProfileBanner'
import Portfolio from './components/Portfolio'

const ProfilePage = () => {
  return (
    <div className='mt-16 flex w-full h-[89%] py-4'>
        <ProfileBanner />
        <Portfolio />
    </div>
  )
}

export default ProfilePage