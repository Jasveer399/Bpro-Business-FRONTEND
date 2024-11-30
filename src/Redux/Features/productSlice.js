import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { createProduct, editProduct, getProducts } from "../../Utils/server";
import { getDealerAccessToken } from "../../Utils/Helper";
import { referenceLineClasses } from "@mui/x-charts";

export const addProductAsync = createAsyncThunk(
  "products/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const response = await axios.post(createProduct, productData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${getDealerAccessToken()}`,
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
  async (
    { page = 1, limit = 8, search = "", category = "", adminView = false } = {},
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(getProducts, {
        params: {
          page,
          limit,
          search,
          category,
          adminView,
        },
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${getDealerAccessToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in fetchProductsAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const editProductAsync = createAsyncThunk(
  "products/editProductAsync",
  async ({ productId, productData }, { rejectWithValue }) => {
    try {
      console.log("productData", productData);
      console.log("productId", productId);
      const response = await axios.put(
        `${editProduct}/${productId}`,
        productData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${getDealerAccessToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error in editProductAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "products/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await axios.delete(`${getProducts}/${productId}`, {
        withCredentials: true,
      });
      return productId;
    } catch (error) {
      console.error("Error in deleteProductAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: null,
    products: [],
    product: null,
    status: "idle",
    error: null,
    currentPage: 1,
    totalPages: 0,
    totalProducts: 0,
  },
  reducers: {
    resetProductStatus: (state) => {
      state.status = "idle";
      state.error = null;
    },
    setProduct: (state, action) => {
      state.product =
        state.products.find((p) => p.id === action.payload) || null;
    },
    referenceProduct: (state, action) => {
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.data && state.data.data) {
          state.data.data.push(action.payload);
        }
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
        state.data = action.payload;
        state.products = action.payload.data || action.payload || [];
        state.currentPage = action.payload.page || 1;
        state.totalPages = action.payload.totalPages || 1;
        state.totalProducts = action.payload.total || 0;
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // Update Product Cases
      .addCase(editProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update product in both data and products arrays
        const updatedProduct = action.payload;

        // Update in data.data if exists
        if (state.data && state.data.data) {
          const dataIndex = state.data.data.findIndex(
            (p) => p.id === updatedProduct.id
          );
          if (dataIndex !== -1) {
            state.data.data[dataIndex] = updatedProduct;
          }
        }

        // Update in products array
        const productIndex = state.products.findIndex(
          (p) => p.id === updatedProduct.id
        );
        if (productIndex !== -1) {
          state.products[productIndex] = updatedProduct;
        }
      })
      .addCase(editProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete Product Cases
      .addCase(deleteProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Remove product from both data and products arrays
        if (state.data && state.data.data) {
          state.data.data = state.data.data.filter(
            (p) => p.id !== action.payload
          );
        }
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetProductStatus, setProduct } = productSlice.actions;
export default productSlice.reducer;
