import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Chip, Avatar, Divider } from '@mui/material';
import { Calendar, MessageSquare, User, ArrowLeft } from 'lucide-react';
import { getSingleBlogAsync } from '../../../Redux/Features/blogsSlice';

const BlogView = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { blogs, status, error } = useSelector((state) => state.blogs);
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        dispatch(getSingleBlogAsync(id));
    }, [dispatch, id]);

    useEffect(() => {
        const currentBlog = blogs.find(b => b.id === id);
        if (currentBlog) {
            setBlog(currentBlog);
        }
    }, [blogs, id]);

    if (status === 'loading') {
        return <div className="flex justify-center h-[90%] items-center dark:bg-darkPrimary text-colorText2 dark:text-colorText">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 h-[90%] text-center dark:bg-darkPrimary">Error: {error}</div>;
    }

    if (!blog) {
        return <div className="text-center dark:bg-darkPrimary text-colorText2 dark:text-colorText h-[90%]">Blog not found</div>;
    }

    return (
        <div className="w-full h-[90%] px-20 py-8 overflow-y-auto dark:bg-darkPrimary text-colorText2 dark:text-colorText custom-scrollbar">
            <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
            >
                <ArrowLeft size={20} className="mr-2" />
                Back to Blogs
            </button>

            <img
                src={blog.images[0]?.url || "/api/placeholder/400/300"}
                alt={blog.name}
                className="w-full h-64 object-cover rounded-xl shadow-lg mb-8"
            />

            <Typography variant="h2" className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">
                {blog.name}
            </Typography>

            <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <Calendar size={18} className="mr-2" />
                    <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <User size={18} className="mr-2" />
                    <span>{blog.author || 'Anonymous'}</span>
                </div>
                <Chip label={blog.tags} color="primary" size="small" />
            </div>

            <Divider className="mb-6" />

            <Typography variant="body1" className="text-lg leading-relaxed mb-8 text-gray-700 dark:text-gray-200">
                {blog.content}
            </Typography>

            <Divider className="mb-6" />

            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Avatar src={blog.authorAvatar || "/api/placeholder/40/40"} />
                    <div>
                        <Typography variant="subtitle1" className="font-semibold">{blog.author || 'Anonymous'}</Typography>
                        <Typography variant="body2" className="text-gray-600 dark:text-gray-400">Author</Typography>
                    </div>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                    <MessageSquare size={18} className="mr-2" />
                    <span>{blog.commentCount || 0} comments</span>
                </div>
            </div>
        </div>
    );
};

export default BlogView;