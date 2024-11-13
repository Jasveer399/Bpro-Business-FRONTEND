import React, { useEffect } from 'react'
import Navbar from '../../Components/Home/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogsAsync } from '../../../Redux/Features/blogsSlice';
import ShowBlogCard from '../../Components/Blogs/ShowBlogCard';
import PopularTags from '../../Components/Blogs/PopularTags';
import SearchBlog from '../../Components/Blogs/SearchBlog';
import { tags } from '../../../Utils/tags';

function Allblogs() {
    const { status, error, blogs } = useSelector((state) => state.blogs);
    const dispatch = useDispatch()
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchBlogsAsync());
        }
    }, [dispatch, status])

    return (
        <>
            <Navbar />
            <div className='bg-[#2e3192] w-full h-40 mt-20 flex flex-col gap-4 justify-center items-center'>
                <h1 className='text-5xl text-white'>Blog-List</h1>
                <h1 className='text-white'>Home / Blogs / Blog-List</h1>
            </div>
            <div className='flex gap-5 mx-40 mt-10'>
                <div className='w-3/5 flex flex-col gap-5'>
                    {blogs.map(blog => <ShowBlogCard imageUrl={blog?.images[0]?.url} title={blog?.name} content={blog?.content} date={blog?.createdAt} id={blog?.id}/>)}
                </div>
                <div>
                    <SearchBlog />
                    <PopularTags tags={tags} />
                </div>
            </div>
        </>
    )
}

export default Allblogs
