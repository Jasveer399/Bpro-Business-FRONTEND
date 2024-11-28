import React from 'react'
import Header from '../../Home/Header'
import Navbar from '../../Home/Navbar'
import { Bookmark, ClockIcon, EyeIcon } from 'lucide-react'

function ProductDetail() {
  return (
    <>
      <Navbar />
      <Header />
      <div className='w-[90%] h-full flex my-8 mx-20 gap-5'>
        <div className='w-[70%] border border-gray-500 rounded-md'>
          <div className='flex gap-2 mx-20 text-gray-500 mt-6'>
            <h1 className='flex items-center gap-1'><ClockIcon size={14}/> January 16, 2023  |  </h1>
            <h1 className='flex items-center gap-1'><EyeIcon size={14}/> Views: 75  |  </h1>
            <h1 className='flex items-center gap-1'><Bookmark size={14}/> Id: 11017</h1>
          </div>
          <h1 className='text-3xl font-semibold mt-1 mx-20'>Title</h1>
        </div>
        <div className='w-[30%] bg-blue'>

        </div>
      </div>
    </>
  )
}

export default ProductDetail
