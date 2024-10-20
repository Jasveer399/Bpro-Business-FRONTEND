import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../Redux/Features/themeSlice.js';
import blogsReducer from '../Redux/Features/blogsSlice.js';
import categoriesReducer from "../Redux/Features/categoriesSlice.js";
import bannersReducer from "../Redux/Features/bannersSlice.js";
import dealersReducer from "../Redux/Features/dealersSlice.js";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    blogs: blogsReducer,
    categories: categoriesReducer,
    banners: bannersReducer,
    dealers: dealersReducer,
  },
});
