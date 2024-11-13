import { Calendar } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ShowBlogCard = ({ imageUrl, date, title, content, id }) => {
    const navigate = useNavigate();
    return (
        <div className="relative bg-white shadow-md rounded-lg overflow-hidden p-6  border border-gray-200">
            {/* Featured Ribbon */}
            {/* <div className="absolute top-0 left-0 bg-orange-500 text-white font-semibold py-1 px-3 text-xs transform rotate-45 -translate-y-2 -translate-x-6">
                Featured
            </div> */}

            <div className='flex'>
                {/* Image Placeholder */}
                <div className="w-40 h-40 bg-gray-300 rounded mb-4 overflow-hidden">
                    <img src={imageUrl} alt="Thumbnail" className="object-cover h-full w-full" />
                </div>

                {/* Content */}
                <div className="ml-6">
                    <div className="text-gray-600 text-sm flex items-center space-x-4 mb-2">
                        <span className="flex items-center">
                            <Calendar size={18} className='mr-2' /> {date.split('T')[0]}
                        </span>
                        {/* <span className="flex items-center">
                            <i className="mr-1">👤</i> Nissy Sten
                        </span> */}
                        {/* <span className="flex items-center">
                            <i className="mr-1">💬</i> 4 Comments
                        </span> */}
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        {title}
                    </h2>
                    <p className="text-gray-500 text-sm mb-4">
                        {content}
                    </p>

                    {/* Button */}
                    <button className="bg-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700" onClick={() => navigate(`/BlogDetails/${id}`)}>
                        Read More
                    </button>
                </div>
            </div>

            {/* Category Tag */}
            {/* <div className="absolute bottom-0 left-0 bg-green-500 text-white px-3 py-1 text-xs rounded-tr-lg">
                Restaurant
            </div> */}
        </div>
    );
};

export default ShowBlogCard;
