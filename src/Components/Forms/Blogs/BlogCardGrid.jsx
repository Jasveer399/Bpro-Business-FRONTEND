import React from "react";
import { Calendar, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import Loader from "../../../ui/Loader";

const BlogCardGrid = ({ data, status }) => {
  // Check if data exists and is in the correct format
  const blogs = data?.data ? [data.data] : Array.isArray(data) ? data : [];

  return (
    <>
      {status === "loading" ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : blogs.length > 0 ? (
        blogs.map((blog) => (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mt-5 mx-8">
            <BlogCard key={blog.id} blog={blog} />
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center py-5 font-[600]">
          <div>No blogs Available</div>
        </div>
      )}
    </>
  );
};

export default BlogCardGrid;

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  console.log("Blog data in Blog Card ==>", blog);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Add null check for blog
  if (!blog) return null;

  return (
    <div className="bg-white dark:bg-darkComponet dark:text-colorText rounded-lg shadow-md p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{blog.name}</h2>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}

      {/* <p
        className="text-gray-600 mb-4 dark:text-colorText"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(blog.content).slice(1, 50),
        }}
      /> */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm text-gray-500 dark:text-colorText ">
            {formatDate(blog.createdAt)}
          </span>
        </div>
      </div>

      <button
        onClick={() => navigate(`/blogview/${blog.id}`)}
        className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-800"
      >
        Read More
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  );
};
