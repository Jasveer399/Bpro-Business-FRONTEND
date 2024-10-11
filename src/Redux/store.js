import { configureStore } from '@reduxjs/toolkit';
import themeReducer from '../Redux/Features/themeSlice.js';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});
