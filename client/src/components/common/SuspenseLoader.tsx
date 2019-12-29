import React from 'react'

const SuspenseLoader = () => {
  return (
    <div className='suspense-loader'>
      <div className='suspense-center'>
        <img src='/assets/favicon/favicon-192x192.png' alt='icon' />
        <h1>VAMK Lukkari</h1>
        <h2>Loading</h2>
      </div>
    </div>
  )
}

export default SuspenseLoader
