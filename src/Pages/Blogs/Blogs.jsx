import { Plus } from 'lucide-react'
import React, { useEffect } from 'react'
import AddBlogsForm from '../../Components/Forms/Blogs/AddBlogsForm';
import Dialog from '../../ui/Dialog';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogsAsync } from '../../Redux/Features/blogsSlice';
import BlogCardGrid from '../../Components/Forms/Blogs/BlogCardGrid';

function Blogs() {

    const { status, error, blogs } = useSelector((state) => state.blogs);
    const dispatch = useDispatch()
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchBlogsAsync());
        }
    }, [dispatch, status])

    // console.log("blogs =>", blogs)



    return (
        <div className="w-full  h-full pt-20 dark:bg-darkPrimary dark:text-darkTextGreyColor text-neutral-800 px-5 overflow-y-auto">
            <div className='w-full flex justify-between pt-5 px-10'>
                <h1 className='text-3xl font-bold'>Blogs</h1>
                <Dialog
                    trigger={
                        <button className='bg-blue rounded-md py-1 px-3 flex justify-center font-semibold text-white gap-2'>Add Blogs</button>
                    }
                    width="w-[80%]"
                    height="h-[98%]"
                >
                    <AddBlogsForm />
                </Dialog>
            </div>
            <div className="container mx-auto">
                <BlogCardGrid data={blogs} />
            </div>
        </div>
    )
}

export default Blogs
