import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../Redux/Features/themeSlice.js';
import blogsReducer from '../Redux/Features/blogsSlice.js';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    blogs: blogsReducer,
  },
});
