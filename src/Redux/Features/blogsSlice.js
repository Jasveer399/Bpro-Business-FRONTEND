import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createBlogs, getAllBlogs, getSingleBlog } from "../../Utils/server";

// Async thunk for adding a new blog
export const addBlogAsync = createAsyncThunk(
  "blogs/addBlog",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await axios.post(createBlogs, blogData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in addBlogAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk for fetching all blogs
export const fetchBlogsAsync = createAsyncThunk(
  "blogs/fetchBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(getAllBlogs, { withCredentials: true });
      return response.data.data;
    } catch (error) {
      console.error("Error in fetchBlogsAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk for updating a blog
export const updateBlogAsync = createAsyncThunk(
  "blogs/updateBlog",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await axios.put("updateBlog", blogData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in updateBlogAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk for deleting a blog
export const deleteBlogAsync = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${"deleteBlog"}/${id}`, { withCredentials: true });
      return id;
    } catch (error) {
      console.error("Error in deleteBlogAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getSingleBlogAsync = createAsyncThunk(
  "blogs/getSingleBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${getSingleBlog}/${id}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error in getSingleBlogAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const blogsSlice = createSlice({
  name: "blogs",
  initialState: {
    blogs: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Blog cases
      .addCase(addBlogAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBlogAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs.push(action.payload);
      })
      .addCase(addBlogAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch Blogs cases
      .addCase(fetchBlogsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update Blog cases
      .addCase(updateBlogAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBlogAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.blogs.findIndex(
          (blog) => blog.id === action.payload.id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(updateBlogAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete Blog cases
      .addCase(deleteBlogAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBlogAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      })
      .addCase(deleteBlogAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getSingleBlogAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSingleBlogAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const fetchedBlog = action.payload;
        const existingBlogIndex = state.blogs.findIndex(blog => blog.id === fetchedBlog.id);
        if (existingBlogIndex !== -1) {
          // Update existing blog
          state.blogs[existingBlogIndex] = fetchedBlog;
        } else {
          // Add new blog to the array
          state.blogs.push(fetchedBlog);
        }
      })
      .addCase(getSingleBlogAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default blogsSlice.reducer;
