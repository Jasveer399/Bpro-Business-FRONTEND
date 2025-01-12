import React, { useState, useRef, useEffect } from "react";
import { X, Upload } from "lucide-react";

const ImageInput = ({
  register,
  setValue,
  error,
  label = "Cover Image",
  existingImage = null,
  onImageChange,
  onImageRemove,
}) => {
  const [preview, setPreview] = useState(existingImage);
  const fileInputRef = useRef(null);

  // Update preview when existingImage changes
  useEffect(() => {
    setPreview(existingImage);
  }, [existingImage]);

  const { ref, onChange, ...rest } = register("image", {
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
      setValue("image", file, { shouldValidate: true });

      // Call the onImageChange callback if provided
      onImageChange?.(file);
    }
  };

  const removeImage = () => {
    setPreview(null);
    setValue("image", null, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    // Call the onImageRemove callback if provided
    onImageRemove?.();
  };

  return (
    <div className="w-full flex flex-col items-start">
      <label className="text-[17px] ml-2 font-semibold text-primary">
        {label}
      </label>

      {!preview ? (
        <div
          className="mt-2 w-full h-[200px] border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-10 h-10 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Click to upload image</p>
          <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
        </div>
      ) : (
        <div className="mt-2 relative w-full h-[200px] rounded-xl overflow-hidden group">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
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

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default ImageInput;
