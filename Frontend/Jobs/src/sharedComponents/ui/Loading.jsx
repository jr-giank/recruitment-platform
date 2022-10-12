import React from 'react'

import MoonLoader from 'react-spinners/MoonLoader'

const Loading = ({isLoading}) => {
  return (
        <div className='m-auto'>
            <MoonLoader
            color='#1B3351'
            loading={isLoading}
            size={40}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>
  )
}

export default Loading