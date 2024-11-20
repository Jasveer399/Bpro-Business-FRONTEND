import React, { useState } from "react";
import { ImageUp, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../ui/FormInput";
import TextareaInput from "../../../ui/TextareaInput";
import { addBlogAsync } from "../../../Redux/Features/blogsSlice";
import Loader from "../../../ui/Loader";
import ChipsInput from "./ChipsInput";
import { TextAreaEditor } from "../../../ui/TextAreaEditor"
import { Alert, AlertTitle} from "@mui/material";


const AddBlogsForm = ({ closeDialog }) => {
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);
  const [imageContainers, setImageContainers] = useState([{ id: 0, file: null }]);
  const [notification, setNotification] = useState(null);
  const [blogContent, setBlogContent] = useState('');
  const { status, error } = useSelector((state) => state.blogs);
  const isSubmitting = status === 'loading';

  console.log("blogContent =>", blogContent);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    defaultValues: {
      status: 'active',
      blogname: '',
      blogContent: ''
    }
  });

  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      setImageContainers(prev =>
        prev.map(container =>
          container.id === id ? { ...container, file } : container
        )
      );
    }
  };

  const addMoreImages = () => {
    if (imageContainers.length < 6) {
      setImageContainers(prev => [...prev, { id: prev.length, file: null }]);
    }
  };

  const removeImage = (id) => {
    setImageContainers(prev => {
      const newContainers = prev.filter(container => container.id !== id);
      return newContainers.length === 0 ? [{ id: 0, file: null }] : newContainers;
    });
  };

  const onSubmit = async (data) => {
    // Validate if at least one image is uploaded
    const hasImages = imageContainers.some(container => container.file);
    if (!hasImages) {
      setNotification({ type: 'error', message: 'Please upload at least one image' });
      return;
    }

    // Validate if tags are added
    if (tags.length === 0) {
      setNotification({ type: 'error', message: 'Please add at least one tag' });
      return;
    }

    const formData = new FormData();
    formData.append('blogname', data.blogname);
    formData.append('blogtags', JSON.stringify(tags));
    formData.append('blogContent', blogContent);
    formData.append('status', data.status);

    // Append each file to FormData
    imageContainers.forEach(container => {
      if (container.file) {
        formData.append('images', container.file);
      }
    });

    try {
      const resultAction = await dispatch(addBlogAsync(formData));
      if (addBlogAsync.fulfilled.match(resultAction)) {
        setNotification({ type: 'success', message: 'Blog posted successfully!' });
        reset(); // Reset form
        setTags([]); // Reset tags
        setImageContainers([{ id: 0, file: null }]); // Reset images
        if (closeDialog) closeDialog();
      } else {
        throw new Error(resultAction.error.message);
      }
    } catch (err) {
      setNotification({
        type: 'error',
        message: err.message || 'Failed to post blog'
      });
    }
  };

  return (
    <div className="w-full mx-auto p-8 bg-white rounded-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Create New Blog Post</h2>
      </div>

      {notification && (
        <Alert
          className={`mb-6 ${notification.type === 'error' ? 'bg-red-50' : 'bg-green-50'}`}
          onClick={() => setNotification(null)}
        >
          <h1>{notification.message}</h1>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-6 flex-wrap">
          <FormInput
            label="Blog Title"
            width="w-72"
            {...register("blogname", {
              required: "Blog title is required",
              minLength: { value: 5, message: "Title must be at least 10 characters" }
            })}
            error={errors.blogname?.message}
          />

          <TextAreaEditor onChange={setBlogContent}/>

          {/* <TextareaInput
            label="Write your blog content here..."
            width="w-full"
            {...register("blogContent", {
              required: "Blog content is required",
              minLength: { value: 10, message: "Content must be at least 50 characters" }
            })}
            error={errors.blogContent?.message}
            rows={6}
          /> */}
          <ChipsInput
            value={tags}
            onChange={setTags}
            label="Blog Tags"
            maxChips={5}
            error={errors.tags?.message}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {imageContainers.map((container) => (
            <div key={container.id} className="relative group">
              <div className="aspect-video rounded-xl shadow-[0_6px_15px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.25)] overflow-hidden">
                {container.file ? (
                  <div className="relative h-full">
                    <img
                      src={URL.createObjectURL(container.file)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(container.id)}
                      className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div
                    onClick={() => document.getElementById(`image-upload-${container.id}`).click()}
                    className="h-full flex flex-col items-center justify-center cursor-pointer bg-gray-50"
                  >
                    <ImageUp className="w-8 h-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">Click to upload image</p>
                    <input
                      id={`image-upload-${container.id}`}
                      type="file"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, container.id)}
                      accept="image/*"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          {imageContainers.length < 6 && (
            <button
              type="button"
              onClick={addMoreImages}
              className="aspect-video rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors flex items-center justify-center"
            >
              <Plus className="w-8 h-8 text-gray-400" />
            </button>
          )}
        </div>



        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={closeDialog}
            className="px-6 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 rounded-xl bg-blue text-white hover:bg-blue-600 disabled:opacity-50 shadow-lg hover:shadow-xl transition-all"
          >
            {isSubmitting ? <Loader /> : 'Publish Blog'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogsForm;

