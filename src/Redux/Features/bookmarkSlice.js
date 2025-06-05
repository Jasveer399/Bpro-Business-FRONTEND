import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createBookmark,
  deleteBookmark,
  getUserBookmarks,
} from "../../Utils/server";
import { getDealerAccessToken, getUserToken } from "../../Utils/Helper";

// Thunks
export const addBookmarkAsync = createAsyncThunk(
  "bookmarks/addBookmark",
  async (productid, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${createBookmark}/${productid}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getUserToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in addBookmarkAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const deleteBookmarkAsync = createAsyncThunk(
  "bookmarks/deleteBookmark",
  async (bookMarkId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${deleteBookmark}/${bookMarkId}`, {
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      });
      // Make sure the ID is properly returned
      return { id: bookMarkId, ...response.data };
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchUserBookmarksAsync = createAsyncThunk(
  "bookmarks/fetchUserBookmarks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(getUserBookmarks, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${getUserToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Slice
const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState: {
    items: [],
    bookmarkStatus: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Bookmark
      .addCase(addBookmarkAsync.pending, (state) => {
        state.bookmarkStatus = "loading";
      })
      .addCase(addBookmarkAsync.fulfilled, (state, action) => {
        state.bookmarkStatus = "succeeded";
        // Push just the data part, which should have the correct structure
        state.items.push(action.payload.data);
      })
      .addCase(addBookmarkAsync.rejected, (state, action) => {
        state.bookmarkStatus = "failed";
        state.error = action.payload;
      })

      // Delete Bookmark
      .addCase(deleteBookmarkAsync.pending, (state) => {
        state.bookmarkStatus = "loading";
      })
      .addCase(deleteBookmarkAsync.fulfilled, (state, action) => {
        state.bookmarkStatus = "succeeded";
        console.log("Removing bookmark from state:", action.payload);
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteBookmarkAsync.rejected, (state, action) => {
        state.bookmarkStatus = "failed";
        state.error = action.payload;
      })

      // Fetch User Bookmarks
      .addCase(fetchUserBookmarksAsync.pending, (state) => {
        state.bookmarkStatus = "loading";
      })
      .addCase(fetchUserBookmarksAsync.fulfilled, (state, action) => {
        state.bookmarkStatus = "succeeded";
        // Replace the entire items array instead of pushing
        state.items = action.payload.data;
      })
      .addCase(fetchUserBookmarksAsync.rejected, (state, action) => {
        state.bookmarkStatus = "failed";
        state.error = action.payload;
      });
  },
});

export default bookmarkSlice.reducer;
