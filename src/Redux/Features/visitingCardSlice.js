import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserToken } from "../../Utils/Helper";
import {
  createVisitingCard,
  deleteVisitingCard,
  updateVisitingCard,
} from "../../Utils/server";

// Thunk for creating a new visiting card
export const createVisitingCardAsync = createAsyncThunk(
  "visitingCards/createVisitingCard",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(createVisitingCard, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getUserToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in create visiting card:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// // Thunk for fetching all visiting cards
export const fetchVisitingCardsAsync = createAsyncThunk(
  "visitingCards/fetchVisitingCards",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(createVisitingCard, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error in fetch visiting cards:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for updating a visiting card
export const updateVisitingCardAsync = createAsyncThunk(
  "visitingCards/updateVisitingCard",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${updateVisitingCard}/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getUserToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in update visiting card:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for deleting a visiting card
export const deleteVisitingCardAsync = createAsyncThunk(
  "visitingCards/deleteVisitingCard",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${deleteVisitingCard}/${id}`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      });
      return { id, data: response.data };
    } catch (error) {
      console.error("Error in delete visiting card:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const visitingCardsSlice = createSlice({
  name: "visitingCards",
  initialState: {
    visitingCards: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    createStatus: "idle",
    updateStatus: "idle",
    deleteStatus: "idle",
    error: null,
  },
  reducers: {
    // Reset status actions
    resetCreateStatus: (state) => {
      state.createStatus = "idle";
      state.error = null;
    },
    resetUpdateStatus: (state) => {
      state.updateStatus = "idle";
      state.error = null;
    },
    resetDeleteStatus: (state) => {
      state.deleteStatus = "idle";
      state.error = null;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Visiting Card cases
      .addCase(createVisitingCardAsync.pending, (state) => {
        state.createStatus = "loading";
        state.error = null;
      })
      .addCase(createVisitingCardAsync.fulfilled, (state, action) => {
        state.createStatus = "succeeded";
        state.visitingCards.push(action.payload.data);
        state.error = null;
      })
      .addCase(createVisitingCardAsync.rejected, (state, action) => {
        state.createStatus = "failed";
        state.error = action.payload;
      })

      // Fetch Visiting Cards cases
      .addCase(fetchVisitingCardsAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVisitingCardsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.visitingCards = action.payload;
        state.error = null;
      })
      .addCase(fetchVisitingCardsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Update Visiting Card cases
      .addCase(updateVisitingCardAsync.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateVisitingCardAsync.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.visitingCards.findIndex(
          (visitingCard) => visitingCard.id === action.payload.data.id
        );
        if (index !== -1) {
          state.visitingCards[index] = action.payload.data;
        }
        state.error = null;
      })
      .addCase(updateVisitingCardAsync.rejected, (state, action) => {
        state.updateStatus = "failed";
        state.error = action.payload;
      })

      // Delete Visiting Card cases
      .addCase(deleteVisitingCardAsync.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
      })
      .addCase(deleteVisitingCardAsync.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.visitingCards = state.visitingCards.filter(
          (visitingCard) => visitingCard.id !== action.payload.id
        );
        state.error = null;
      })
      .addCase(deleteVisitingCardAsync.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  resetCreateStatus,
  resetUpdateStatus,
  resetDeleteStatus,
  resetError,
} = visitingCardsSlice.actions;

// Export selectors
export const selectVisitingCards = (state) =>
  state.visitingCards?.visitingCards || [];
export const selectVisitingCardsStatus = (state) =>
  state.visitingCards?.status || "idle";
export const selectCreateStatus = (state) =>
  state.visitingCards?.createStatus || "idle";
export const selectUpdateStatus = (state) =>
  state.visitingCards?.updateStatus || "idle";
export const selectDeleteStatus = (state) =>
  state.visitingCards?.deleteStatus || "idle";
export const selectVisitingCardsError = (state) =>
  state.visitingCards?.error || null;

export const getSelectedVisitingCard = ({ state, visitingCardId }) =>
  state.visitingCards?.visitingCards.find(
    (visitingCard) => visitingCard.id === visitingCardId
  );

export default visitingCardsSlice.reducer;
