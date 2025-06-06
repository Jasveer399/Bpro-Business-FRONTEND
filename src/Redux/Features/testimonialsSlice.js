import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserToken } from "../../Utils/Helper";
import {
  createTestimonialsUrl,
  deleteTestimonialsUrl,
  getTestimonialsUrl,
  updateTestimonialsUrl,
} from "../../Utils/server";

// Thunk for creating a new testimonial
export const createTestimonialAsync = createAsyncThunk(
  "testimonials/createTestimonial",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(createTestimonialsUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getUserToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in create testimonial:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for fetching all testimonials
export const fetchTestimonialsAsync = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async ({ dealerId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${getTestimonialsUrl}/${dealerId}`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error in fetch testimonials:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for updating a testimonial
export const updateTestimonialAsync = createAsyncThunk(
  "testimonials/updateTestimonial",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${updateTestimonialsUrl}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getUserToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in update testimonial:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for deleting a testimonial
export const deleteTestimonialAsync = createAsyncThunk(
  "testimonials/deleteTestimonial",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${deleteTestimonialsUrl}/${id}`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      });
      return { id, data: response.data };
    } catch (error) {
      console.error("Error in delete testimonial:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState: {
    testimonials: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    createStatus: "idle",
    updateStatus: "idle",
    deleteStatus: "idle",
    selectedTestimonialsId: [],
    error: null,
  },
  reducers: {
    // Reset status actions
    resetCreateStatus: (state) => {
      state.createStatus = "idle";
      state.error = null;
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = "idle";
      state.error = null;
    },
    resetDeleteStatus: (state) => {
      state.deleteStatus = "idle";
      state.error = null;
    },
    resetError: (state) => {
      state.error = null;
    },
    toggleSelectedTestimonial: (state, action) => {
      const testimonialId = action.payload;
      if (state.selectedTestimonialsId.includes(testimonialId)) {
        state.selectedTestimonialsId = state.selectedTestimonialsId.filter(
          (id) => id !== testimonialId
        );
      } else {
        state.selectedTestimonialsId.push(testimonialId);
      }
    },

    // (Optional) clear all selected
    clearSelectedTestimonials: (state) => {
      state.selectedTestimonialsId = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Testimonial cases
      .addCase(createTestimonialAsync.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
      })
      .addCase(createTestimonialAsync.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.testimonials.push(action.payload.data);
        state.error = null;
      })
      .addCase(createTestimonialAsync.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload;
      })

      // Fetch Testimonials cases
      .addCase(fetchTestimonialsAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTestimonialsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.testimonials = action.payload;
        state.error = null;
      })
      .addCase(fetchTestimonialsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update Testimonial cases
      .addCase(updateTestimonialAsync.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateTestimonialAsync.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.testimonials.findIndex(
          (testimonial) => testimonial.id === action.payload.data.id
        );
        if (index !== -1) {
          state.testimonials[index] = action.payload.data;
        }
        state.error = null;
      })
      .addCase(updateTestimonialAsync.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      })

      // Delete Testimonial cases
      .addCase(deleteTestimonialAsync.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
      })
      .addCase(deleteTestimonialAsync.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.testimonials = state.testimonials.filter(
          (testimonial) => testimonial.id !== action.payload.id
        );
        state.error = null;
      })
      .addCase(deleteTestimonialAsync.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  resetCreateStatus,
  resetUpdateStatus,
  resetDeleteStatus,
  resetError,
  toggleSelectedTestimonial,
  clearSelectedTestimonials,
} = testimonialsSlice.actions;

// Export selectors
export const selectTestimonials = (state) =>
  state.testimonials?.testimonials || [];
export const selectTestimonialsStatus = (state) =>
  state.testimonials?.status || "idle";
export const selectCreateStatus = (state) =>
  state.testimonials?.createStatus || "idle";
export const selectUpdateStatus = (state) =>
  state.testimonials?.updateStatus || "idle";
export const selectDeleteStatus = (state) =>
  state.testimonials?.deleteStatus || "idle";
export const selectTestimonialsError = (state) =>
  state.testimonials?.error || null;

export const getSeletedTestimonial = ({ state, testimonialId }) =>
  state.testimonials?.testimonials.find(
    (testimonial) => testimonial.id === testimonialId
  );

export const selectedTestimonialId = (state) =>
  state.testimonials.selectedTestimonialsId || null;

export default testimonialsSlice.reducer;
