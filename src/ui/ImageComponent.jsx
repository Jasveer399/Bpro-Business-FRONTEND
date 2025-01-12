import React, { useState } from "react";
import { NodeViewWrapper } from "@tiptap/react";
import "../style/editor.css";
import {
  Trash2,
  Replace,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { deleteFile } from "../Utils/Helper";

export const ImageComponent = ({ node, updateAttributes, deleteNode }) => {
  const [showControls, setShowControls] = useState(false);
  const [isResizing, setIsResizing] = useState(false);

  const handleDelete = async () => {
    if (node.attrs.src) {
      try {
        await deleteFile(node.attrs.src);
        deleteNode();
      } catch (error) {
        console.error("Error deleting image:", error);
        // You might want to show an error message to the user here
      }
    } else {
      deleteNode();
    }
  };

  const handleResize = (e, direction) => {
    e.preventDefault();
    const delta = direction === "increase" ? 200 : -200;
    const currentWidth =
      node.attrs.width === "auto" ? 300 : parseInt(node.attrs.width);
    const newWidth = Math.max(100, currentWidth + delta);
    updateAttributes({ width: `${newWidth}px` });
  };

  const handleImageReplace = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event) => {
      if (!event.target.files?.length) return;
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          updateAttributes({ src: e.target.result });
        }
      };
      reader.readAsDataURL(file);
    };
    input.click();
  };

  const handleAlignment = (alignment) => {
    const alignmentClass = `image-align-${alignment}`;
    updateAttributes({ class: alignmentClass });
  };

  return (
    <NodeViewWrapper
      className={`image-component relative group ${node.attrs.class || ""}`}
    >
      <div
        className="relative inline-block"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <img
          src={node.attrs.src}
          alt={node.attrs.alt || ""}
          style={{
            width: node.attrs.width,
            height: node.attrs.height,
          }}
          className={`max-w-full transition-all duration-200 rounded-lg ${
            isResizing ? "pointer-events-none" : ""
          }`}
        />

        {showControls && (
          <div className="absolute top-2 right-2 flex gap-2 bg-white rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => handleAlignment("left")}
              title="Align Left"
            >
              <AlignLeft className="w-4 h-4" />
            </button>
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => handleAlignment("center")}
              title="Align Left"
            >
              <AlignCenter className="w-4 h-4" />
            </button>
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={() => handleAlignment("right")}
              title="Align Right"
            >
              <AlignRight className="w-4 h-4" />
            </button>
            <div className="w-px bg-gray-200" />
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={(e) => handleResize(e, "decrease")}
              title="Decrease Size"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={(e) => handleResize(e, "increase")}
              title="Increase Size"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <div className="w-px bg-gray-200" />
            <button
              className="p-1 hover:bg-gray-100 rounded"
              onClick={handleImageReplace}
              title="Replace Image"
            >
              <Replace className="w-4 h-4" />
            </button>
            <button
              className="p-1 hover:bg-gray-100 rounded text-red-500"
              onClick={handleDelete}
              title="Delete Image"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </NodeViewWrapper>
  );
};
