import React, { useEffect, useMemo, useState } from 'react'
import Navbar from '../../Components/Home/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogsAsync, getSingleBlogAsync } from '../../../Redux/Features/blogsSlice';
import PopularTags from '../../Components/Blogs/PopularTags';
import SearchBlog from '../../Components/Blogs/SearchBlog';
import { useNavigate, useParams } from 'react-router-dom';
import { tags } from '../../../Utils/tags';
import { Calendar } from 'lucide-react';

function BlogDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { blogs, status, error } = useSelector((state) => state.blogs);
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        if (blogs.length === 0) {
            dispatch(fetchBlogsAsync());
        }
        dispatch(getSingleBlogAsync(id));
    }, [dispatch, id, blogs.length]);
    const currentBlog = useMemo(() => blogs.find(b => b.id === id), [blogs, id]);


    if (status === 'loading') {
        return <div className="flex justify-center h-full items-center dark:bg-darkPrimary text-colorText2 dark:text-colorText">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 h-full text-center dark:bg-darkPrimary">Error: {error}</div>;
    }

    if (!currentBlog) {
        return <div className="text-center dark:bg-darkPrimary text-colorText2 dark:text-colorText h-full">Blog not found</div>;
    }

    return (
        <>
            <Navbar />
            <div className='bg-[#2e3192] w-full h-40 mt-20 flex flex-col gap-4 justify-center items-center'>
                <h1 className='text-5xl text-white'>Blog-Detail</h1>
                <h1 className='text-white'>Home / Blogs / Blog-Detail</h1>
            </div>
            <div className='flex gap-5 mx-40 mt-10'>
                <div className='w-3/5 flex flex-col gap-5 p-5 bg-white border border-gray-200 rounded-2xl'>
                    <img src={currentBlog?.image} alt="" className='w-full h-96 object-cover rounded-xl' />
                    <span className="flex items-center gap-2">
                        <Calendar size={18} /> {currentBlog?.createdAt.split('T')[0]}
                    </span>
                    <h1 className='text-3xl text-gray-500'>{currentBlog?.name}</h1>
                    <h1 className='text-gray-500'>{currentBlog?.content}</h1>
                </div>
                <div>
                    <SearchBlog />
                    <PopularTags tags={tags} />
                </div>
            </div>
        </>
    )
}

export default BlogDetails
