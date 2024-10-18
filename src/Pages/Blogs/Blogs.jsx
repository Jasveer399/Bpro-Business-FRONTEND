import { Plus } from 'lucide-react'
import React from 'react'
import AddBlogsForm from '../../Components/Forms/Blogs/AddBlogsForm';
import Dialog from '../../ui/Dialog';

function Blogs() {
    return (
        <div className="w-full  h-[90%] dark:bg-darkPrimary dark:text-darkTextGreyColor text-neutral-800 px-5">
            <div className='w-full flex justify-between pt-5 px-10'>
                <h1 className='text-3xl font-bold'>Blogs</h1>
                <Dialog
                    trigger={
                        <button className='bg-blue rounded-md py-1 px-3 flex justify-center gap-2'><Plus />Add Blogs</button>
                    }
                    width="w-[30%]"
                    height="h-[62%]"
                >
                    <AddBlogsForm />
                </Dialog>
            </div>
        </div>
    )
}

export default Blogs
