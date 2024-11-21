import React from 'react'

function ListingCard({count, name, colorCode}) {
  return (
    <>
    <div className={`w-full h-36 m-4 flex flex-col pl-10 rounded-md shadow-lg justify-center text-white ${colorCode}`}>
        <h2 className='font-bold text-2xl'>{count}</h2>
        <p>{name}</p>
    </div>
    </>
  )
}

export default ListingCard