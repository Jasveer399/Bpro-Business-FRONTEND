import React, { useState } from "react";
import FormHeading from "../../../ui/FormHeading";
import FormInput from "../../../ui/FormInput";
import { useForm } from "react-hook-form";
import TextareaInput from "../../../ui/TextareaInput";
import { ImageUp, Plus, X } from "lucide-react";
import { addBlogAsync } from "../../../Redux/Features/blogsSlice";
import { useDispatch, useSelector } from "react-redux";
import Snackbars from "../../../ui/Snackbar";
import Loader from "../../../ui/Loader";

function AddBlogsForm({ closeDialog }) {
  const dispatch = useDispatch();

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch
  } = useForm({
    defaultValues: {
      status: 'active'
    }
  });

  const [imageContainers, setImageContainers] = useState([{ id: 0, file: null }]);
  const [snackbar, setSnackbar] = useState({ open: false, type: "", text: "" }); 
  const { status, error } = useSelector((state) => state.blogs);

  const addBannerHandler = async (data) => {
    const formData = new FormData();
    formData.append('blogname', data.blogname);
    formData.append('blogtags', data.blogtags);
    formData.append('blogContent', data.blogContent);
    formData.append('status', data.status);

// Append each file to the FormData with the key 'images'
    imageContainers.forEach(container => {
      if (container.file) {
        formData.append('images', container.file);
      }
    });

    try {
      const res = await dispatch(addBlogAsync(formData)).unwrap();
      if (res.status) {
        setSnackbar({ open: true, type: "success", text: res.message });
      } else {
        setSnackbar({ open: true, type: "error", text: res.message });
      }
      closeDialog();
    } catch (error) {
      console.error("Failed to add blog:", error);
    }
  };

  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    setImageContainers(prevContainers =>
      prevContainers.map(container =>
        container.id === id ? { ...container, file } : container
      )
    );
  };

  const addMoreImages = () => {
    setImageContainers(prev => [...prev, { id: prev.length, file: null }]);
  };

  const removeImage = (id) => {
    setImageContainers(prev => {
      const newContainers = prev.filter(container => container.id !== id);
      return newContainers.length === 0 ? [{ id: 0, file: null }] : newContainers;
    });
  };

  return (
    <>
      <FormHeading title="Add Blogs" closeDialog={closeDialog} />
      <div>
        <form onSubmit={handleSubmit(addBannerHandler)} className="px-16 mt-4 space-y-4 text-colorText2">
          <div className="flex gap-10">
            <FormInput
              label="Enter Blog Name"
              type="text"
              {...register("blogname", { required: "Blog Name is required" })}
              error={errors.blogname?.message}
              width="w-72"
            />
            <FormInput
              label="Enter Tags"
              type="text"
              {...register("blogtags", { required: "Blog Tags is required" })}
              error={errors.blogtags?.message}
              width="w-72"
            />
          </div>

          {imageContainers.map((container) => (
            <div key={container.id} className="w-96 h-48 border-dotted border-2 border-blue rounded-xl flex flex-col justify-center items-center relative">
              {container.file ? (
                <>
                  <img
                    src={URL.createObjectURL(container.file)}
                    alt="Uploaded preview"
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(container.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    aria-label="Remove image"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <>
                  <p className="text-center">Upload Image</p>
                  <ImageUp
                    size={50}
                    className="text-blue text-xl font-bold cursor-pointer"
                    onClick={() => document.getElementById(`image-upload-${container.id}`).click()}
                  />
                  <input
                    id={`image-upload-${container.id}`}
                    type="file"
                    onChange={(e) => handleImageUpload(e, container.id)}
                    className="hidden"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(container.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    aria-label="Remove container"
                  >
                    <X size={16} />
                  </button>
                </>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addMoreImages}
            className="mt-2 flex items-center bg-blue text-white px-3 py-1 rounded-md"
          >
            <Plus size={16} className="mr-1" /> Add More Images
          </button>

          <TextareaInput
            label="Blog Content"
            type="text"
            {...register("blogContent", { required: "Content is required" })}
            error={errors.blogContent?.message}
            width="w-full"
          />
          <div className="flex justify-center mt-4">
            <button className="bg-blue px-3 rounded-md font-semibold dark:text-white py-1">{status === 'loading' ? <Loader /> : "Submit"}</button>
          </div>
        </form>
      </div>
      <Snackbars
        open={snackbar.open}
        type={snackbar.type}
        text={snackbar.text}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
}

export default AddBlogsForm;