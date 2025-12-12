import { createSlice } from "@reduxjs/toolkit";

export const productsSlice = createSlice({
  name: "mockapi",
  initialState: {
    page: 0,
    products: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    loadingProducts: (state) => {
      state.isLoading = true;
    },
    fetchProducts: (state, action) => {
      state.isLoading = false;
      state.page = action.payload.page;
      state.products = action.payload.products;
    },
    failedFetch: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.error;
    },
  },
});

export const { loadingProducts, fetchProducts, failedFetch } =
  productsSlice.actions;
