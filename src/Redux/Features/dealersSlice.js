import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  deleteDealer,
  getAllDealers,
  createDealerAccount,
  updateDealerAccount,
  getCurrentDealer,
  dealerLogin,
  changePassword,
  approveDealer,
  updateProfileImg,
  requestUpdateProfile,
  getAllUpdateApprovalRequests,
  changeStatusUpdateProfile,
  getSpecificDealer,
} from "../../Utils/server";
import { getAdminAccessToken, getDealerAccessToken } from "../../Utils/Helper";

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
      return response.data;
    } catch (error) {
      console.error("Error in addDealerAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data.message : error.message
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

// Thunk for fetch specific dealer
export const fetchSpecificDealerAsync = createAsyncThunk(
  "dealers/fetchSpecificDealerAsync",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${getSpecificDealer}/${id}`, {
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
  async (dealerData, { rejectWithValue }) => {
    try {
      console.log("dealerData", dealerData);
      const response = await axios.put(updateDealerAccount, dealerData, {
        headers: {
          Authorization: `Bearer ${getDealerAccessToken()}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
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
          Authorization: `Bearer ${getDealerAccessToken()}`,
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

export const changePasswordAsync = createAsyncThunk(
  "dealers/changePassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await axios.put(changePassword, passwordData, {
        headers: {
          Authorization: `Bearer ${getDealerAccessToken()}`,
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in changePasswordAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const approveDealerAsync = createAsyncThunk(
  "dealers/approveDealer",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        approveDealer,
        { id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in approving Dealer:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const sendRequestAsync = createAsyncThunk(
  "dealers/sendRequest",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        requestUpdateProfile,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getDealerAccessToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in requesting Dealer:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const changeStatusUpdateProfileAsync = createAsyncThunk(
  "dealers/changeStatusUpdateProfile",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${changeStatusUpdateProfile}/${id}`,
        { status },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAdminAccessToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in requesting Dealer:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchRequestsAsync = createAsyncThunk(
  "dealers/getAllUpdateApprovalRequests",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(getAllUpdateApprovalRequests, {
        headers: {
          Authorization: `Bearer ${getAdminAccessToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in requesting Dealer:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const updateProfileImgAsync = createAsyncThunk(
  "dealers/updateProfileImg",
  async (data, { rejectWithValue }) => {
    console.log("data", data);
    try {
      const response = await axios.put(updateProfileImg, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getDealerAccessToken()}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error in updating profile:", error);
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
    dealer: null,
    status: "idle",
    specificDealer: null,
    specificDealerStatus: "idle",
    approvalDismissStatus: "idle",
    changePassStatus: "idle",
    updateStatus: "idle",
    fetchStatus: "idle",
    error: null,
  },
  reducers: {
    setDealer: (state, action) => {
      state.dealer = state.dealers.find((d) => d.id === action.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Dealer cases
      .addCase(addDealerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addDealerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action);
        state.dealers.push(action.payload.data);
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
        state.fetchStatus = "loading";
      })
      .addCase(fetchDealersAsync.fulfilled, (state, action) => {
        state.fetchStatus = "succeeded";
        state.dealers = action.payload;
      })
      .addCase(fetchDealersAsync.rejected, (state, action) => {
        state.fetchStatus = "failed";
        state.error = action.payload;
      })
      // Fetch Specific dealer cases
      .addCase(fetchSpecificDealerAsync.pending, (state) => {
        state.specificDealerStatus = "loading";
      })
      .addCase(fetchSpecificDealerAsync.fulfilled, (state, action) => {
        state.specificDealerStatus = "succeeded";
        state.specificDealer = action.payload;
      })
      .addCase(fetchSpecificDealerAsync.rejected, (state, action) => {
        state.specificDealerStatus = "failed";
        state.error = action.payload;
      })
      // Update Dealer cases
      .addCase(updateDealerAsync.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateDealerAsync.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.dealers.findIndex(
          (dealer) => dealer.id === action.payload.data.id
        );
        if (index !== -1) {
          state.dealers[index] = action.payload.data;
        }
        state.currentDealer = action.payload.data;
      })
      .addCase(updateDealerAsync.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      })
      // Delete Dealer cases
      .addCase(deleteDealerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteDealerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dealers.find((d) => d.id === action.payload).isSuspend = true;
      })
      .addCase(deleteDealerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // ... fetch current dealer ...
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
      })
      // ... change dealer password...
      .addCase(changePasswordAsync.pending, (state) => {
        state.changePassStatus = "loading";
      })
      .addCase(changePasswordAsync.fulfilled, (state, action) => {
        state.changePassStatus = "succeeded";
        state.changePass = action.payload;
      })
      .addCase(changePasswordAsync.rejected, (state, action) => {
        state.changePassStatus = "failed";
        state.error = action.payload;
        state.changePass = null;
      })
      // ... approve dealer...
      .addCase(approveDealerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(approveDealerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("action.payload.id", action.payload);
        state.dealers.find(
          (d) => d.id === action.payload.data.id
        ).verified = true;
      })
      .addCase(approveDealerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // ... send request ...
      .addCase(sendRequestAsync.pending, (state) => {
        state.sendReqStatus = "loading";
      })
      .addCase(sendRequestAsync.fulfilled, (state, action) => {
        state.sendReqStatus = "succeeded";
        state.currentDealer.isReqSent = true;
      })
      .addCase(sendRequestAsync.rejected, (state, action) => {
        state.sendReqStatus = "failed";
        state.error = action.payload;
      })
      // ... fetch requests ...
      .addCase(fetchRequestsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRequestsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.requests = action.payload.data;
      })
      .addCase(fetchRequestsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // ... accept request ...
      .addCase(changeStatusUpdateProfileAsync.pending, (state) => {
        state.approvalDismissStatus = "loading";
      })
      .addCase(changeStatusUpdateProfileAsync.fulfilled, (state, action) => {
        state.approvalDismissStatus = "succeeded";
        state.requests = state.requests.filter(
          (req) => req.id !== action.payload.data.id
        );
      })
      .addCase(changeStatusUpdateProfileAsync.rejected, (state, action) => {
        state.approvalDismissStatus = "failed";
        state.error = action.payload;
      })
      // ... update dealer profile....
      .addCase(updateProfileImgAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProfileImgAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log("action.payload.data.id", action.payload);
        // state.dealers.find((d) => d.id === action.payload.id).profileUrl =
        //   action.payload.profileUrl;
      })
      .addCase(updateProfileImgAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setDealer } = dealersSlice.actions;
export default dealersSlice.reducer;
