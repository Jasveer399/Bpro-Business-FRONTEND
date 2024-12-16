import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createPlan,
  createWorkerAccount,
  deletePlan,
  deleteWorker,
  getAllPlans,
  getAllWorkers,
  updatePlan,
  updateWorker,
} from "../../Utils/server";

// Thunk for adding a new worker
export const addPlanAsync = createAsyncThunk(
  "plans/addPlan",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(createPlan, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in add plan:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for fetching all workers
export const fetchPlansAsync = createAsyncThunk(
  "plans/fetchPlans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(getAllPlans, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error in fetch plans:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for updating a worker
export const updatePlanAsync = createAsyncThunk(
  "plans/updatePlan",
  async ({ id, data }, { rejectWithValue }) => {
    try {
        console.log("data: ", data);
        console.log("id: ", id);
      const response = await axios.put(
        updatePlan,
        { id, ...data },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in update plan:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const deletePlanAsync = createAsyncThunk(
  "plans/deletePlan",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${deletePlan}/${id}`, { withCredentials: true });
      return id;
    } catch (error) {
      console.error("Error in delete plans:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const plansSlice = createSlice({
  name: "plans",
  initialState: {
    plans: [],
    plansStatus: "idle",
    error: null,
  },
  reducers: {
    setPlan: (state, action) => {
      state.plans = state.plans.find((p) => p.id === action.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add plans cases
      .addCase(addPlanAsync.pending, (state) => {
        state.plansStatus = "loading";
      })
      .addCase(addPlanAsync.fulfilled, (state, action) => {
        state.plansStatus = "succeeded";
        state.plans.push(action.payload.data);
      })
      .addCase(addPlanAsync.rejected, (state, action) => {
        state.plansStatus = "failed";
        state.error = action.payload;
      })
      // Fetch plans cases
      .addCase(fetchPlansAsync.pending, (state) => {
        state.plansStatus = "loading";
      })
      .addCase(fetchPlansAsync.fulfilled, (state, action) => {
        state.plansStatus = "succeeded";
        state.plans = action.payload;
      })
      .addCase(fetchPlansAsync.rejected, (state, action) => {
        state.plansStatus = "failed";
        state.error = action.payload;
      })
      // Update plans cases
      .addCase(updatePlanAsync.pending, (state) => {
        state.plansStatus = "loading";
      })
      .addCase(updatePlanAsync.fulfilled, (state, action) => {
        state.plansStatus = "succeeded";
        const index = state.plans.findIndex(
          (plan) => plan.id === action.payload.data.id
        );
        if (index !== -1) {
          state.plans[index] = action.payload.data;
        }
      })
      .addCase(updatePlanAsync.rejected, (state, action) => {
        state.plansStatus = "failed";
        state.error = action.payload;
      })
      // Delete plans cases
      .addCase(deletePlanAsync.pending, (state) => {
        state.plansStatus = "loading";
      })
      .addCase(deletePlanAsync.fulfilled, (state, action) => {
        state.plansStatus = "succeeded";
        state.plans = state.plans.filter((plan) => plan.id !== action.payload);
      })
      .addCase(deletePlanAsync.rejected, (state, action) => {
        state.plansStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default plansSlice.reducer;
