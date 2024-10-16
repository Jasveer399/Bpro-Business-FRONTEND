import React from 'react';

const ShowDealerData = ({ icon, title, count }) => {
    return (
        <div className="bg-brand-color-3 h-1/2 rounded-lg p-4 text-white shadow-md relative overflow-hidden">
            <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2 rounded-md">
                   {icon}
                   <div className='text-white'>
                   <p className="text-4xl font-bold ">{count}</p>
                   <p className="text-xl font-semibold">{title}</p>
                   </div>
                </div>
                <div className='bg-[#1a77d2] p-2 rounded-full w-48 h-48 absolute -top-28 -right-0 opacity-0 translate-y-[-50px] animate-fadeInDown' />
                <div className='bg-[#1565c0] p-2 rounded-full w-48 h-48 absolute -top-12 -right-20 opacity-0 translate-y-[50px] animate-fadeInUp' />
            </div>
        </div>
    );
};

export default ShowDealerData;