import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createWorkerAccount,
  deleteWorker,
  getAllWorkers,
  getWorkerIdAndName,
  updateWorker,
} from "../../Utils/server";

// Thunk for adding a new worker
export const addWorkerAsync = createAsyncThunk(
  "workers/addWorker",
  async (workerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(createWorkerAccount, workerData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in addWorkerAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for fetching all workers
export const fetchWorkersAsync = createAsyncThunk(
  "workers/fetchWorkers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(getAllWorkers, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error in fetchWorkersAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for updating a worker
export const updateWorkerAsync = createAsyncThunk(
  "workers/updateWorker",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log("on update worker: ", id, data);
      const response = await axios.put(
        updateWorker,
        { id, data },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in updateWorkerAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchWorkerIdAndNameAsync = createAsyncThunk(
  "workers/fetchWorkerIdAndName",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(getWorkerIdAndName, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      console.error("Error in fetchWorkerIdAndNameAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for deleting a worker
export const deleteWorkerAsync = createAsyncThunk(
  "workers/deleteWorker",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${deleteWorker}/${id}`, { withCredentials: true });
      return id;
    } catch (error) {
      console.error("Error in deleteWorkerAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const workersSlice = createSlice({
  name: "workers",
  initialState: {
    workers: [],
    worker: null,
    status: "idle",
    updateStatus: "idle",
    error: null,
  },
  reducers: {
    setWorker: (state, action) => {
      console.log("action.payload", action.payload);
      console.log("state.workers", state.workers);
      state.worker = state.workers.find((w) => w.id === action.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Worker cases
      .addCase(addWorkerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addWorkerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workers.push(action.payload.data);
      })
      .addCase(addWorkerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch Workers cases
      .addCase(fetchWorkersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workers = action.payload;
      })
      .addCase(fetchWorkersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update Worker cases
      .addCase(updateWorkerAsync.pending, (state) => {
        state.updateStatus = "loading";
      })
      .addCase(updateWorkerAsync.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.workers.findIndex(
          (worker) => worker.id === action.payload.data.id
        );
        if (index !== -1) {
          state.workers[index] = action.payload.data;
        }
      })
      .addCase(updateWorkerAsync.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      })
      // Delete Worker cases
      .addCase(deleteWorkerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteWorkerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workers = state.workers.filter(
          (worker) => worker.id !== action.payload
        );
      })
      .addCase(deleteWorkerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Fetch WorkerIdAndName cases
      .addCase(fetchWorkerIdAndNameAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWorkerIdAndNameAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.workers = action.payload;
      })
      .addCase(fetchWorkerIdAndNameAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setWorker } = workersSlice.actions;
export default workersSlice.reducer;
