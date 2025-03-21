import { Calendar } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ShowBlogCard = ({ imageUrl, date, title, content, id }) => {
  const navigate = useNavigate();

  // Function to extract only meaningful content from HTML
  const extractContentFromHtml = (html) => {
    if (!html) return "";

    try {
      const temp = document.createElement("div");
      temp.innerHTML = html;

      // Remove all style elements
      const styleElements = temp.querySelectorAll("style");
      styleElements.forEach((style) => style.remove());

      // Find all paragraph elements
      const paragraphs = temp.querySelectorAll("p");

      // Extract text from paragraphs only
      let contentText = "";
      paragraphs.forEach((p) => {
        const pText = p.textContent || p.innerText || "";
        if (pText.trim()) {
          contentText += pText + " ";
        }
      });

      return contentText.trim();
    } catch (error) {
      console.error("Error extracting content from HTML:", error);
      return "";
    }
  };

  // Get a preview of the content (first 150 characters)
  const contentText = extractContentFromHtml(content);
  const contentPreview =
    contentText.substring(0, 150) + (contentText.length > 150 ? "..." : "");

  return (
    <div className="relative bg-white shadow-md rounded-lg overflow-hidden p-6 border border-gray-200">
      <div className="flex">
        {/* Image Placeholder */}
        <div className="w-40 h-40 bg-gray-300 rounded mb-4 overflow-hidden">
          <img
            src={imageUrl}
            alt="Thumbnail"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Content */}
        <div className="ml-6 max-w-md">
          <div className="text-gray-600 text-sm flex items-center space-x-4 mb-2">
            <span className="flex items-center">
              <Calendar size={18} className="mr-2" />{" "}
              {date?.split("T")[0] || "No date"}
            </span>
          </div>

          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {title || "Untitled"}
          </h2>

          {/* Display extracted and cleaned content preview */}
          <p className="text-gray-500 text-sm mb-4">{contentPreview}</p>

          <button
            className="bg-blue hover:bg-blue hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700"
            onClick={() => navigate(`/BlogDetails/${id}`)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowBlogCard;
