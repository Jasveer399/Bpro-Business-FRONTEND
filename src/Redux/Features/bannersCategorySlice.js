import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBannerCategory } from "../../Utils/server";
import axios from "axios";

export const fetchBannerCategoryAsync = createAsyncThunk(
  "bannersCategory/fetchBannerCategory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${getAllBannerCategory}`, { withCredentials: true });
      // console.log("Res: ", res);
      return res.data.data
    } catch (error) {
      console.error("Error in fetch banner category async", error);
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
      });
  },
});

export const { setCurrentBannerCategory } = bannersCategorySlice.actions;
export default bannersCategorySlice.reducer;
