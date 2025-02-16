import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDashboardStats } from "../../Utils/server";
import axios from "axios";

export const fetchDashboardStatsAsync = createAsyncThunk(
  "dashboard/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(getDashboardStats);

      return response.data.data;
    } catch (error) {
      console.error("Error in fetchDashboardStatsAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboardStats: [],
    fetchStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch dashboard Analytics cases
      .addCase(fetchDashboardStatsAsync.pending, (state) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchDashboardStatsAsync.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.dashboardStats = action.payload;
      })
      .addCase(fetchDashboardStatsAsync.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;