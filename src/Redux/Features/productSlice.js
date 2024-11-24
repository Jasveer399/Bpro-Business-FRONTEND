import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createProduct, getProducts } from "../../Utils/server";

export const addProductAsync = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(createProduct, productData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in addProductAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(getProducts);
      return response.data;
    } catch (error) {
      console.error("Error in fetchProductsAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addDefaultCase((state, action) => {});
  },
});

export default productSlice.reducer;
