import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getAdminAccessToken,
  getDealerAccessToken,
  getUserToken,
} from "../../Utils/Helper";
import {
  createVisitingCard,
  createVisitingCardPriceAPI,
  deleteVisitingCard,
  deleteVisitingCardsListAPI,
  fetchVisitingCardsListAPI,
  getVisitingCard,
  updateVisitingCard,
  updateVisitingCardsListAPI,
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
export const fetchVisitingCardAsync = createAsyncThunk(
  "visitingCards/fetchVisitingCard",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${getVisitingCard}/${id}`);
      return response.data;
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

// Thunk for create a visiting card price
export const createVisitingCardPrice = createAsyncThunk(
  "visitingCards/createVisitingCardPrice",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(createVisitingCardPriceAPI, data, {
        headers: {
          Authorization: `Bearer ${getAdminAccessToken()}`,
        },
      });
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Error in delete visiting card:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for fetching a visiting card list
export const fetchVisitingCardsList = createAsyncThunk(
  "visitingCards/fetchVisitingCardsList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(fetchVisitingCardsListAPI, {
        headers: {
          Authorization: `Bearer ${
            getAdminAccessToken() || getDealerAccessToken()
          }`,
        },
      });
      console.log("response", response);
      return response.data;
    } catch (error) {
      console.error("Error in delete visiting card:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for deleting a visiting card price
export const deleteVisitingCardPricingAsync = createAsyncThunk(
  "visitingCards/deleteVisitingCardPricingAsync",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(
        `${deleteVisitingCardsListAPI}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getAdminAccessToken()}`,
          },
        }
      );
      return { id, data: response.data };
    } catch (error) {
      console.error("Error in delete visiting card:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk for update a visiting card price
export const updateVisitingCardPrice = createAsyncThunk(
  "visitingCards/updateVisitingCardPrice",
  async (data, { rejectWithValue }) => {
    try {
      console.log("Data", data);
      const response = await axios.put(
        `${updateVisitingCardsListAPI}/${data.id}`,
        data.passData,
        {
          headers: {
            Authorization: `Bearer ${getAdminAccessToken()}`,
          },
        }
      );
      console.log("Response", response);
      return response.data;
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
    visitingCard: null,
    visitingCardsList: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    createStatus: "idle",
    updateStatus: "idle",
    deleteStatus: "idle",
    selectedVisitingCardStatus: "idle",
    error: null,
  },
  reducers: {
    // Reset status actions
    resetCreateStatus: (state) => {
      state.createStatus = "idle";
      state.error = null;
    },
    resetSelectedVisitingCardStatus: (state) => {
      state.selectedVisitingCardStatus = "idle";
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

      // Fetch Visiting Card cases
      .addCase(fetchVisitingCardAsync.pending, (state) => {
        state.selectedVisitingCardStatus = "loading";
        state.error = null;
      })
      .addCase(fetchVisitingCardAsync.fulfilled, (state, action) => {
        state.selectedVisitingCardStatus = "succeeded";
        state.visitingCard = action.payload.data;
        state.error = null;
      })
      .addCase(fetchVisitingCardAsync.rejected, (state, action) => {
        state.selectedVisitingCardStatus = "failed";
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
      })

      // create Visiting Card Price cases
      .addCase(createVisitingCardPrice.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createVisitingCardPrice.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.visitingCardsList.push(action.payload.data);
        state.error = null;
      })
      .addCase(createVisitingCardPrice.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // fetch Visiting Card List cases
      .addCase(fetchVisitingCardsList.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVisitingCardsList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.visitingCardsList = action.payload.data;
        state.error = null;
      })
      .addCase(fetchVisitingCardsList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete Visiting Card Price cases
      .addCase(deleteVisitingCardPricingAsync.pending, (state) => {
        state.deleteStatus = "loading";
        state.error = null;
      })
      .addCase(deleteVisitingCardPricingAsync.fulfilled, (state, action) => {
        state.deleteStatus = "succeeded";
        state.visitingCardsList = state.visitingCardsList.filter(
          (visitingCard) => visitingCard.id !== action.payload.id
        );
        state.error = null;
      })
      .addCase(deleteVisitingCardPricingAsync.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.error = action.payload;
      })

      // Update Visiting Card Price cases
      .addCase(updateVisitingCardPrice.pending, (state) => {
        state.updateStatus = "loading";
        state.error = null;
      })
      .addCase(updateVisitingCardPrice.fulfilled, (state, action) => {
        state.updateStatus = "succeeded";
        const index = state.visitingCardsList.findIndex(
          (visitingCard) => visitingCard.id === action.payload.data.id
        );
        if (index !== -1) {
          state.visitingCardsList[index] = action.payload.data;
        }
        state.error = null;
      })
      .addCase(updateVisitingCardPrice.rejected, (state, action) => {
        state.updateStatus = "failed";
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
  resetSelectedVisitingCardStatus,
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
