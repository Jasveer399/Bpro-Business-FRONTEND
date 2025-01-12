import React, { useState } from "react";
import { ImageUp, Plus, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../../../ui/FormInput";
import TextareaInput from "../../../ui/TextareaInput";
import { addBlogAsync } from "../../../Redux/Features/blogsSlice";
import Loader from "../../../ui/Loader";
import ChipsInput from "./ChipsInput";
import { Alert, AlertTitle } from "@mui/material";
import { TextAreaEditor } from "../../../ui/TextAreaEditor";
import ImageInput from "../../../ui/ImageInput";
import { uploadFile } from "../../../Utils/Helper";

const AddBlogsForm = ({ closeDialog }) => {
  const dispatch = useDispatch();
  const [tags, setTags] = useState([]);
  const [imageContainers, setImageContainers] = useState([
    { id: 0, file: null },
  ]);
  const [notification, setNotification] = useState(null);
  const [blogContent, setBlogContent] = useState("");
  const { status, error } = useSelector((state) => state.blogs);
  const isSubmitting = status === "loading";

  console.log("blogContent =>", blogContent);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      status: "active",
      blogname: "",
      blogContent: "",
      tags: [],
    },
  });

  const handleImageUpload = (e, id) => {
    const file = e.target.files[0];
    if (file) {
      setImageContainers((prev) =>
        prev.map((container) =>
          container.id === id ? { ...container, file } : container
        )
      );
    }
  };

  const addMoreImages = () => {
    if (imageContainers.length < 6) {
      setImageContainers((prev) => [...prev, { id: prev.length, file: null }]);
    }
  };

  const removeImage = (id) => {
    setImageContainers((prev) => {
      const newContainers = prev.filter((container) => container.id !== id);
      return newContainers.length === 0
        ? [{ id: 0, file: null }]
        : newContainers;
    });
  };

  const onSubmit = async (data) => {
    // Validate if at least one image is uploaded

    if (data.image) {
      data.image = await uploadFile(data.image);
    }
    // Validate if tags are added
    if (tags.length === 0) {
      setNotification({
        type: "error",
        message: "Please add at least one tag",
      });
      return;
    }

    setValue("tags", tags);
    try {
      const resultAction = await dispatch(addBlogAsync(data));
      if (addBlogAsync.fulfilled.match(resultAction)) {
        setNotification({
          type: "success",
          message: "Blog posted successfully!",
        });
        reset(); // Reset form
        setTags([]); // Reset tags
        setImageContainers([{ id: 0, file: null }]); // Reset images
        if (closeDialog) closeDialog();
      } else {
        setNotification({ type: "error", message: "Failed to post blog!" });
        throw new Error(resultAction.error.message);
      }
    } catch (err) {
      setNotification({
        type: "error",
        message: err.message || "Failed to post blog",
      });
    }
  };

  return (
    <div className="w-full mx-auto p-8 bg-white rounded-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Create New Blog Post
        </h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-6 flex-wrap">
          <ImageInput
            register={register}
            setValue={setValue}
            error={errors?.image?.message}
          />
          <div className="flex gap-5 w-full">
            <FormInput
              label="Blog Title"
              width="w-full"
              {...register("blogname", {
                required: "Blog title is required",
                minLength: {
                  value: 2,
                  message: "Title must be at least 2 characters",
                },
              })}
              error={errors.blogname?.message}
            />
            <ChipsInput
              value={tags}
              onChange={setTags}
              label="Blog Tags"
              maxChips={5}
              error={errors.tags?.message}
              className="w-full"
            />
          </div>
          <TextAreaEditor
            onContentChange={(blogContent) =>
              setValue("blogContent", blogContent)
            }
          />
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
            {isSubmitting ? <Loader /> : "Publish Blog"}
          </button>
        </div>

        {notification && (
          <Alert
            className={`mb-6 ${
              notification.type === "error" ? "bg-red-500" : "bg-green-500"
            }`}
            onClick={() => setNotification(null)}
          >
            <h1>{notification.message}</h1>
          </Alert>
        )}
      </form>
    </div>
  );
};

export default AddBlogsForm;
