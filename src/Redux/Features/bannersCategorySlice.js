import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addBanner,
  deleteBanner,
  getAllBannerCategory,
  updateBanner,
} from "../../Utils/server";
import axios from "axios";

export const fetchBannerCategoryAsync = createAsyncThunk(
  "bannersCategory/fetchBannerCategory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${getAllBannerCategory}`, {
        withCredentials: true,
      });
      // console.log("Res: ", res);
      return res.data.data;
    } catch (error) {
      console.error("Error in fetch banner category async", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const addBannerAsync = createAsyncThunk(
  "bannersCategory/addBanner",
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

export const deleteBannerAsync = createAsyncThunk(
  "banners/deleteBanner",
  async (id, { rejectWithValue }) => {
    try {
      console.log("id: ", id);
      await axios.delete(`${deleteBanner}/${id}`, { withCredentials: true });
      return id;
    } catch (error) {
      console.error("Error in deleteBannerAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const bannersCategorySlice = createSlice({
  name: "bannersCategory",
  initialState: {
    bannersCategory: [],
    currentBannerCategory: null,
    status: "idle",
    addBannerStatus: "idle",
    updateBannerStatus: "idle",
    deleteBannerStatus: "idle",
    error: null,
  },
  reducers: {
    setCurrentBannerCategory: (state, action) => {
      state.currentBannerCategory =
        state.bannersCategory.find(
          (category) => category.id === action.payload
        ) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Banner Category Cases
      .addCase(fetchBannerCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBannerCategoryAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bannersCategory = action.payload;
      })
      .addCase(fetchBannerCategoryAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Add Banner Cases
      .addCase(addBannerAsync.pending, (state) => {
        state.addBannerStatus = "loading";
      })
      .addCase(addBannerAsync.fulfilled, (state, action) => {
        state.addBannerStatus = "succeeded";
        state.currentBannerCategory.Banners.push(action.payload.data);
      })
      .addCase(addBannerAsync.rejected, (state, action) => {
        state.addBannerStatus = "failed";
        state.error = action.payload;
      })
      // Update Banner cases
      .addCase(updateBannerAsync.pending, (state) => {
        state.updateBannerStatus = "loading";
      })
      .addCase(updateBannerAsync.fulfilled, (state, action) => {
        state.updateBannerStatus = "succeeded";
        const bannerIndex = state.currentBannerCategory.Banners.findIndex(
          (banner) => banner.id === action.payload.data.id
        );
        if (bannerIndex !== -1) {
          state.currentBannerCategory.Banners[bannerIndex] =
            action.payload.data;
        }
      })
      .addCase(updateBannerAsync.rejected, (state, action) => {
        state.updateBannerStatus = "failed";
        state.error = action.payload;
      })
      // Delete Banner cases
      .addCase(deleteBannerAsync.pending, (state) => {
        state.deleteBannerStatus = "loading";
      })
      .addCase(deleteBannerAsync.fulfilled, (state, action) => {
        state.deleteBannerStatus = "succeeded";
        if (state.currentBannerCategory && state.currentBannerCategory.Banners) {
          state.currentBannerCategory.Banners = state.currentBannerCategory.Banners.filter(
            (banner) => banner.id !== action.payload
          );
        }
      })
      .addCase(deleteBannerAsync.rejected, (state, action) => {
        state.deleteBannerStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { setCurrentBannerCategory } = bannersCategorySlice.actions;
export default bannersCategorySlice.reducer;
