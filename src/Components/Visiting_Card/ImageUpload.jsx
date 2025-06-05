import React, { useState, useRef, useEffect } from "react";
import { X, Plus } from "lucide-react";

const ImageUpload = ({
  register,
  setValue,
  error,
  existingImage = null,
  onImageChange,
  onImageRemove,
  fieldName = "image",
}) => {
  const [preview, setPreview] = useState(existingImage);
  const fileInputRef = useRef(null);

  // Update preview when existingImage changes
  useEffect(() => {
    setPreview(existingImage);
  }, [existingImage]);

  const { ref, onChange, ...rest } = register(fieldName, {
    validate: {
      lessThan5MB: (file) =>
        !file || file.size <= 5000000 || "Image must be less than 5MB",
      acceptedFormats: (file) =>
        !file ||
        file.type.startsWith("image/") ||
        "Only image files are allowed",
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        return;
      }

      // Validate file size (5MB)
      if (file.size > 5000000) {
        return;
      }

      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreview(url);

      // Set the file value in the form
      setValue(fieldName, file, { shouldValidate: true });
      setValue("preview", url, { shouldValidate: true });
      // Call the onImageChange callback if provided
      onImageChange?.(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setValue(fieldName, null, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // Call the onImageRemove callback if provided
    onImageRemove?.();
  };

  return (
    <div className="flex flex-col">
      {!preview ? (
        <div
          className="w-20 h-20 bg-[#ECEBFF]  rounded-lg flex items-center justify-center cursor-pointers transition-colors group"
          onClick={() => fileInputRef.current?.click()}
        >
          <Plus
            size={50}
            className="w-8 h-8 text-primary  border-primary border-2 border-dashed group-hover:text-primary transition-colors p-1"
          />
        </div>
      ) : (
        <div className="relative w-20 h-20 rounded-lg overflow-hidden group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-200 flex items-center justify-center">
            <button
              type="button"
              onClick={removeImage}
              className="p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={(e) => {
          ref(e);
          fileInputRef.current = e;
        }}
        onChange={handleImageChange}
        {...rest}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500 text-center">{error}</p>
      )}
    </div>
  );
};

export default ImageUpload;
