import React from 'react'

function PopularTags({tags}) {
    return (
        <div className='border border-gray-200 w-96 rounded-lg'>
            <h1 className='text-lg text-gray-700 border-b border-gray-200 pl-5 py-2'>Popular Tags</h1>
            <div className='grid grid-cols-3 gap-5 p-2'>
                {tags.map((tag, index) => (
                    <div className='p-1 border border-gray-200 rounded-lg text-center hover:bg-[#2e3192] hover:text-white text-gray-600 cursor-pointer'>
                        <h1 className='text-sm'>{tag.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PopularTags
