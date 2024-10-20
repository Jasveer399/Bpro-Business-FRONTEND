import React from 'react'

function LocationCard() {
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='w-44 h-40'>
        <img src='/mumbai.png' className='rounded-md w-full h-full object-cover' />
        </div>
        <h1 className='font-semibold mt-1'>Mumbai</h1>
    </div>
  )
}

export default LocationCard