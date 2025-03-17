import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createProduct,
  createReview,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProducts,
  getProductsStats,
} from "../../Utils/server";
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

export const fetchAllProductsAsync = createAsyncThunk(
  "products/allProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(getAllProducts, {
        withCredentials: true,
        // headers: {
        //   Authorization: `Bearer ${getDealerAccessToken()}`,
        //   "Content-Type": "multipart/form-data",
        // },
      });
      return response.data;
    } catch (error) {
      console.error("Error in allProducts async:", error);
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
      const response = await axios.get(getProducts, {
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
      console.log("access token", getDealerAccessToken());
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
      const response = await axios.delete(`${deleteProduct}/${productId}`, {
        headers: {
          Authorization: `Bearer ${getDealerAccessToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in deleteProductAsync:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const getProductsStatsAsync = createAsyncThunk(
  "products/getProductsStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${getProductsStats}`, {
        headers: {
          Authorization: `Bearer ${getDealerAccessToken()}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error in getProductsStats:", error);
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

export const addReviewAsync = createAsyncThunk(
  "review/addReview",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(createReview, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getDealerAccessToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in add Review:", error);
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
    allProducts: [],
    allProductStatus: "idle",
    productsStats: null,
    productsStatsStatus: "idle",
    product: null,
    productStatus: "idle",
    addReviewStatus: "idle",
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
      console.log("id: ", action.payload);
      state.product =
        state.allProducts.find((p) => p.id === action.payload) || null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.products) {
          state.products.push(action.payload.data);
        }
        state.productsStats.totalProducts =
          state.productsStats.totalProducts + 1;
        state.productsStats.activeProducts =
          state.productsStats.activeProducts + 1;
      })
      .addCase(addProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchProductsAsync.pending, (state) => {
        state.status = "loading";
        state.productStatus = "idle";
      })
      .addCase(fetchProductsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
        state.products = action.payload.data || action.payload || [];
      })
      .addCase(fetchProductsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // fetch all products
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.allProductStatus = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.allProductStatus = "succeeded";
        state.allProducts = action.payload.data || [];
      })
      .addCase(fetchAllProductsAsync.rejected, (state, action) => {
        state.allProductStatus = "failed";
        state.error = action.payload;
      })
      // Update Product Cases
      .addCase(editProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProductAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update product in both data and products arrays
        const updatedProduct = action.payload.data;
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
            (p) => p.id !== action.payload.data.id
          );
        }
        state.products = state.products.filter(
          (p) => p.id !== action.payload.data.id
        );
        state.productsStats.totalProducts =
          state.productsStats.totalProducts - 1;
        state.productsStats.activeProducts =
          state.productsStats.activeProducts - 1;
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getProductsStatsAsync.pending, (state) => {
        state.productsStatsStatus = "loading";
      })
      .addCase(getProductsStatsAsync.fulfilled, (state, action) => {
        state.productsStatsStatus = "succeeded";
        state.productsStats = action.payload;
      })
      .addCase(getProductsStatsAsync.rejected, (state, action) => {
        state.productsStatsStatus = "failed";
        state.error = action.payload;
      })
      // Add Review Status
      .addCase(addReviewAsync.pending, (state) => {
        state.addReviewStatus = "loading";
      })
      .addCase(addReviewAsync.fulfilled, (state, action) => {
        state.addReviewStatus = "succeeded";
        state.product.Reviews.push(action.payload.data);
      })
      .addCase(addReviewAsync.rejected, (state, action) => {
        state.addReviewStatus = "failed";
        state.error = action.payload;
      });
  },
});

export const { resetProductStatus, setProduct } = productSlice.actions;
export default productSlice.reducer;
