import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  addBanner,
  updateBanner,
  deleteBanner,
  getAllBanner,
  getAllBannerCategory,
} from "../../Utils/server";

// Thunk for adding a new banner
export const addBannerAsync = createAsyncThunk(
  "banners/addBanner",
  async (bannerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(addBanner, bannerData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in addBannerAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for fetching all banners
export const fetchBannersAsync = createAsyncThunk(
  "banners/fetchBanners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(getAllBanner, { withCredentials: true });
      return response.data.data;
    } catch (error) {
      console.error("Error in fetchBannersAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for updating a banner
export const updateBannerAsync = createAsyncThunk(
  "banners/updateBanner",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${updateBanner}/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in updateBannerAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const bannersSlice = createSlice({
  name: "banners",
  initialState: {
    banners: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Banner cases
      .addCase(addBannerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBannerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.banners.push(action.payload.data);
      })
      .addCase(addBannerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch Banners cases
      .addCase(fetchBannersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBannersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.banners = action.payload;
      })
      .addCase(fetchBannersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update Banner cases
      .addCase(updateBannerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateBannerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.banners.findIndex(
          (banner) => banner.id === action.payload.id
        );
        if (index !== -1) {
          state.banners[index] = action.payload.data;
        }
      })
      .addCase(updateBannerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default bannersSlice.reducer;
