import React from 'react'

function ShopsCategoryCard({ imageUrl, title }) {
    return (
        <div className='flex flex-col gap-2 items-center'>
            <img src={imageUrl} className='px-5 py-5 bg-[#ebeaff] rounded-lg w-20 h-20' alt="" />
            <h1>{title}</h1>
        </div>
    )
}

export default ShopsCategoryCard