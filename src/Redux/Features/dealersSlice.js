import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  deleteDealer,
  getAllDealers,
  createDealerAccount,
  updateDealerAccount,
  getCurrentDealer,
  dealerLogin,
} from "../../Utils/server";

// Thunk for adding a new dealer
export const addDealerAsync = createAsyncThunk(
  "dealers/addDealer",
  async (dealerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(createDealerAccount, dealerData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error in addDealerAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for Login a new dealer
export const loginDealerAsync = createAsyncThunk(
  "dealers/loginDealer",
  async (dealerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(dealerLogin, dealerData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in addDealerAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for fetching all dealers
export const fetchDealersAsync = createAsyncThunk(
  "dealers/fetchDealers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(getAllDealers, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error in fetchDealersAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for updating a dealer
export const updateDealerAsync = createAsyncThunk(
  "dealers/updateDealer",
  async ( dealerData, { rejectWithValue }) => {
    try {
      console.log("dealerData", dealerData);
      const response = await axios.put(updateDealerAccount, dealerData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error in updateDealerAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for deleting a dealer
export const deleteDealerAsync = createAsyncThunk(
  "dealers/deleteDealer",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${deleteDealer}/${id}`, { withCredentials: true });
      return id;
    } catch (error) {
      console.error("Error in deleteDealerAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchCurrentDealerAsync = createAsyncThunk(
  "dealers/fetchCurrentDealer",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(getCurrentDealer, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error fetching current dealer:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const dealersSlice = createSlice({
  name: "dealers",
  initialState: {
    dealers: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Dealer cases
      .addCase(addDealerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDealerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dealers.push(action.payload);
      })
      .addCase(addDealerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Login Dealer cases
      .addCase(loginDealerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginDealerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dealers.push(action.payload);
      })
      .addCase(loginDealerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch Dealers cases
      .addCase(fetchDealersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDealersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dealers = action.payload;
      })
      .addCase(fetchDealersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update Dealer cases
      .addCase(updateDealerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateDealerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.dealers.findIndex(
          (dealer) => dealer.id === action.payload.id
        );
        if (index !== -1) {
          state.dealers[index] = action.payload;
        }
      })
      .addCase(updateDealerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Delete Dealer cases
      .addCase(deleteDealerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDealerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dealers = state.dealers.filter(
          (dealer) => dealer.id !== action.payload
        );
      })
      .addCase(deleteDealerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // ... existing cases ...
      .addCase(fetchCurrentDealerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCurrentDealerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentDealer = action.payload;
      })
      .addCase(fetchCurrentDealerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.currentDealer = null;
      });
  },
});

export default dealersSlice.reducer;
