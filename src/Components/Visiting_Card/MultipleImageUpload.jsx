import React, { useState, useRef, useEffect } from "react";
import { X, Upload, ImageIcon } from "lucide-react";

const MultipleImageUpload = ({
  register,
  setValue,
  watch,
  error,
  label = "Gallery Images",
  name = "galleryImages",
  onImagesChange,
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  // Watch the form field value
  const watchedImages = watch(name);

  // Sync local state with form state
  useEffect(() => {
    if (watchedImages && Array.isArray(watchedImages)) {
      // If watchedImages contains File objects, convert them to display format
      const imageDisplayData = watchedImages.map((file) => {
        if (file instanceof File) {
          return {
            id: `${file.name}-${file.lastModified}`,
            file: file,
            preview: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
          };
        }
        return file;
      });
      setSelectedImages(imageDisplayData);
    }
  }, [watchedImages]);

  // Don't register the file input, handle it manually
  // const { ref, onChange, ...rest } = register(name);

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    // Accept all image files without size restrictions
    const validImages = fileArray.filter((file) =>
      file.type.startsWith("image/")
    );

    const newImages = [];
    let processedCount = 0;

    validImages.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImage = {
          id: `${file.name}-${file.lastModified}`,
          file: file,
          preview: e.target.result,
          name: file.name,
          size: file.size,
        };
        newImages.push(newImage);
        processedCount++;

        // When all files are processed, update the state and form
        if (processedCount === validImages.length) {
          const updatedImages = [...selectedImages, ...newImages];
          setSelectedImages(updatedImages);

          // Store only the File objects in the form
          const fileObjects = updatedImages.map((img) => img.file);
          console.log("Updated File Objects===>", fileObjects);
          setValue(name, fileObjects, { shouldValidate: true });
          onImagesChange?.(updatedImages);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeImage = (id) => {
    const updatedImages = selectedImages.filter((img) => img.id !== id);
    setSelectedImages(updatedImages);

    // Update form with remaining File objects
    const fileObjects = updatedImages.map((img) => img.file);
    setValue(name, fileObjects.length > 0 ? fileObjects : [], {
      shouldValidate: true,
    });
    onImagesChange?.(updatedImages);
  };

  const clearAll = () => {
    setSelectedImages([]);
    setValue(name, [], { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onImagesChange?.([]);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full max-w-4xl bg-white">
      <label className="text-[17px] ml-2 font-semibold text-primary mb-4 block">
        {label}
      </label>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? "border-[#2E3192] bg-[#ECEBFF]"
            : "border-gray-300 hover:border-[#2E3192]"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />

        {selectedImages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <ImageIcon className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-lg text-gray-600 mb-2">
              Drag and drop images here, or click to select
            </p>
            <p className="text-sm text-gray-500">
              Upload any image files • No size or quantity limits
            </p>
          </div>
        ) : (
          <div
            className={`flex items-center ${
              selectedImages.length > 0 ? "justify-between" : "justify-center"
            }`}
          >
            {/* Selected Images Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-[80%]">
              {selectedImages.map((image) => (
                <div key={image.id} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-200 hover:border-[#2E3192] transition-colors">
                    <img
                      src={image.preview}
                      alt={image.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Image Info */}
                  <div className="mt-2 text-sm">
                    <p className="text-gray-700 truncate font-medium">
                      {image.name}
                    </p>
                    <p className="text-gray-500">
                      {formatFileSize(image.size)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="ml-5">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#ECEBFF] text-sm text-[#2E3192] px-6 py-2 rounded-md hover:bg-[#ECEBFF]/80 transition-colors"
              >
                Add More
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Control Buttons */}
      {selectedImages.length > 0 && (
        <div className="flex gap-3 mt-4">
          <button
            type="button"
            onClick={clearAll}
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Clear All
          </button>
          <p className="flex items-center text-sm text-gray-600">
            {selectedImages.length} images selected
          </p>
        </div>
      )}

      {/* Error Display */}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default MultipleImageUpload;
