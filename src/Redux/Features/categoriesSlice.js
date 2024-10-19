import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addCategory, deleteCategory, getAllCategories, updateCategory } from "../../Utils/server";

export const addCategoryAsync = createAsyncThunk(
  "categories/addCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axios.post(addCategory, categoryData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error in addCategoryAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);


// New thunk for fetching categories
export const fetchCategoriesAsync = createAsyncThunk(
    "categories/fetchCategories",
    async (_, { rejectWithValue }) => {
      try {
        const response = await axios.get(getAllCategories, { withCredentials: true });
        return response.data.data;
      } catch (error) {
        console.error("Error in fetchCategoriesAsync:", error);
        return rejectWithValue(
          error.response ? error.response.data : error.message
        );
      }
    }
  );
  
  // New thunk for updating a category
  export const updateCategoryAsync = createAsyncThunk(
    "categories/updateCategory",
    async ({id, formData}, { rejectWithValue }) => {
      try {
        console.log(id, formData)
        const response = await axios.put(`${updateCategory}/${id}`, formData, {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        return response.data.data;
      } catch (error) {
        console.error("Error in updateCategoryAsync:", error);
        return rejectWithValue(
          error.response ? error.response.data : error.message
        );
      }
    }
  );
  
  // New thunk for deleting a category
  export const deleteCategoryAsync = createAsyncThunk(
    "categories/deleteCategory",
    async (id, { rejectWithValue }) => {
      try {
        await axios.delete(`${deleteCategory}/${id}`, { withCredentials: true });
        return id;
      } catch (error) {
        console.error("Error in deleteCategoryAsync:", error);
        return rejectWithValue(
          error.response ? error.response.data : error.message
        );
      }
    }
  );

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Category cases
      .addCase(addCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories.push(action.payload);
      })
      .addCase(addCategoryAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch Categories cases
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategoriesAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update Category cases
      .addCase(updateCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.categories.findIndex(cat => cat.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategoryAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete Category cases
      .addCase(deleteCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = state.categories.filter(cat => cat.id !== action.payload);
      })
      .addCase(deleteCategoryAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;