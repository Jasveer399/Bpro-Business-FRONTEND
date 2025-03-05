import React, { useEffect } from 'react'
import Navbar from '../../Components/Home/Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogsAsync } from '../../../Redux/Features/blogsSlice';
import ShowBlogCard from '../../Components/Blogs/ShowBlogCard';
import PopularTags from '../../Components/Blogs/PopularTags';
import SearchBlog from '../../Components/Blogs/SearchBlog';
import { tags } from '../../../Utils/tags';
import Header from '../../Components/Home/Header';

function Allblogs() {
    const { status, error, blogs } = useSelector((state) => state.blogs);
    const dispatch = useDispatch()
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchBlogsAsync());
        }
    }, [dispatch, status])

    console.log("blogs =>", blogs);

    return (
        <>
            <Navbar />
            <div className='mx-3'>
                <Header />
            </div>
            <img src="header-banner.jpg" alt="productLisiting" className='w-full h-72 object-cover relative' />
      <h1 className='flex flex-col md:text-6xl text-4xl font-semibold text-white absolute top-56 md:left-20 left-5 gap-4'>Blogs <span className='text-xl'>Home | Blogs</span></h1>
            {/* <div className='bg-[#2e3192] w-full h-40 mt-20 flex flex-col gap-4 justify-center items-center'>
                <h1 className='text-5xl text-white'>Blog-List</h1>
                <h1 className='text-white'>Home / Blogs / Blog-List</h1>
            </div> */}
            <div className='flex gap-5 mx-40 mt-20'>
                <div className='w-3/5 flex flex-col gap-5'>
                    {blogs.map(blog => <ShowBlogCard imageUrl={blog?.image} title={blog?.name} content={blog?.content} date={blog?.createdAt} id={blog?.id}/>)}
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
