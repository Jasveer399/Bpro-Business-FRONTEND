import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createCustomerAndGetOTP,
  verifyOtp,
  completeProfile,
} from "../../Utils/server";
import {
  removeDealerAccessToken,
  storeCustomerAccessToken,
} from "../../Utils/Helper";

// Async thunk for creating customer and getting OTP
export const createCustomerAndGetOTPAsync = createAsyncThunk(
  "customer/createCustomerAndGetOTP",
  async (mobileNo, { rejectWithValue }) => {
    try {
      const response = await axios.post(createCustomerAndGetOTP, { mobileNo });
      return response.data;
    } catch (error) {
      console.error("Error in createCustomerAndGetOTPAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

// Async thunk for verifying OTP
export const verifyOTPAsync = createAsyncThunk(
  "customer/verifyOTP",
  async ({ mobileNo, otp }, { rejectWithValue }) => {
    try {
      const response = await axios.post(verifyOtp, { mobileNo, otp });
      if (response.data.data.isUserFillAllDetails) {
        storeCustomerAccessToken(response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      console.error("Error in verifyOTPAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

// Async thunk for updating customer information
export const updateCustomerInfoAsync = createAsyncThunk(
  "customer/updateCustomerInfo",
  async ({ name, location, mobileNo }, { rejectWithValue }) => {
    try {
      // Make API request to update customer information
      const response = await axios.post(completeProfile, {
        mobileNo,
        name,
        location,
      });
      if (response.data.success) {
        removeDealerAccessToken();
        storeCustomerAccessToken(response.data.accessToken);
      }
      return response.data;
    } catch (error) {
      console.error("Error in completing Profile:", error);
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
      );
    }
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customerData: null,
    isAuthenticated: false,
    isOTPVerified: false,
    isProfileComplete: false,
    status: "idle",
    error: null,
  },
  reducers: {
    logoutCustomer: (state) => {
      state.customerData = null;
      state.isAuthenticated = false;
      state.isOTPVerified = false;
      state.isProfileComplete = false;
      state.status = "idle";
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create customer and get OTP
      .addCase(createCustomerAndGetOTPAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCustomerAndGetOTPAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customerData = action.payload.data;
        state.error = null;
      })
      .addCase(createCustomerAndGetOTPAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Verify OTP
      .addCase(verifyOTPAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyOTPAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.customerData = action.payload.data;
        state.isOTPVerified = action.payload.data.isOTPVerified;
        state.isAuthenticated = action.payload.data.isOTPVerified;
        state.error = null;
      })
      .addCase(verifyOTPAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update customer information
      .addCase(updateCustomerInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCustomerInfoAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update customer data with the new information
        state.customerData = {
          ...state.customerData,
          ...action.payload.data,
        };
        state.isProfileComplete = true;
        state.error = null;
      })
      .addCase(updateCustomerInfoAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logoutCustomer, clearError } = customerSlice.actions;
export default customerSlice.reducer;
