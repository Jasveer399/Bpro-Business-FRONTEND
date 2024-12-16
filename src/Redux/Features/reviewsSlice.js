import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createReview } from "../../Utils/server";
import { getDealerAccessToken } from "../../Utils/Helper";

// Thunk for adding a new worker
export const addReviewAsync = createAsyncThunk(
  "review/addReview",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(createReview, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getDealerAccessToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in add Review:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    addReviewStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Worker cases
      .addCase(addReviewAsync.pending, (state) => {
        state.addReviewStatus = "loading";
      })
      .addCase(addReviewAsync.fulfilled, (state, action) => {
        state.addReviewStatus = "succeeded";
        state.reviews.push(action.payload.data);
      })
      .addCase(addReviewAsync.rejected, (state, action) => {
        state.addReviewStatus = "failed";
        state.error = action.payload;
      });
    //   // Fetch Workers cases
    //   .addCase(fetchWorkersAsync.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(fetchWorkersAsync.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     state.workers = action.payload;
    //   })
    //   .addCase(fetchWorkersAsync.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.payload;
    //   });
    //   // Update Worker cases
    //   .addCase(updateWorkerAsync.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(updateWorkerAsync.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     const index = state.workers.findIndex(
    //       (worker) => worker.id === action.payload.id
    //     );
    //     if (index !== -1) {
    //       state.workers[index] = action.payload;
    //     }
    //   })
    //   .addCase(updateWorkerAsync.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.payload;
    //   })
    //   // Delete Worker cases
    //   .addCase(deleteWorkerAsync.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(deleteWorkerAsync.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     state.workers = state.workers.filter(
    //       (worker) => worker.id !== action.payload
    //     );
    //   })
    //   .addCase(deleteWorkerAsync.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.payload;
    //   })
    //   // Fetch WorkerIdAndName cases
    //   .addCase(fetchWorkerIdAndNameAsync.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(fetchWorkerIdAndNameAsync.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     state.workers = action.payload;
    //   })
    //   .addCase(fetchWorkerIdAndNameAsync.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.payload;
    //   });
  },
});

export default reviewsSlice.reducer;
