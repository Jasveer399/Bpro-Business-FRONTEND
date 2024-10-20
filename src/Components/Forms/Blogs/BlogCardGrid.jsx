import React from 'react';
import { Calendar, MessageSquare, ArrowUpRight } from 'lucide-react';
import { Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BlogCard = ({ blog }) => {

  const navigate =  useNavigate();
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full bg-white dark:bg-darkgrey shadow-lg dark:shadow-black border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl dark:hover:shadow-indigo-500/20 group">
      <div className="relative">
        <img
          src={blog.images[0]?.url}
          alt={blog.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 sm:p-6">
        <h2 className="font-bold text-xl sm:text-2xl text-gray-800 dark:text-gray-100 mb-2 line-clamp-2">
          {blog.name}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {blog.content}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center space-x-2">
            <Calendar size={16} />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          {/* <div className="flex items-center space-x-2">
            <MessageSquare size={16} />
            <span>0 comments</span>
          </div> */}
        </div>
      </div>
      <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-0">
        <button className="w-full bg-blue hover:bg-blue/80 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out flex items-center justify-center" onClick={() => navigate(`/blogview/${blog.id}`)}>
          Read More
          <ArrowUpRight size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

const BlogCardGrid = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 sm:p-6">
      {data.map((blog) => (
        <BlogCard key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogCardGrid;