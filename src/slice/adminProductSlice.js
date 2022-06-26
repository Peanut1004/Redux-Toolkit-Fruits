import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsApi from "../api/productsApi";

export const getProducts = createAsyncThunk("getProducts", async () => {
  const getProducts = await productsApi.getProducts();
  return getProducts;
});

const adminProductSlice = createSlice({
  name: "adminProductSlice",
  initialState: {
    products: [],
    loading: false,
  },
  reducers: {
    removeProduct(state, action) {
      console.log(action.payload);
      state.products = state.products.filter((el) => el.id !== action.payload);
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.loading = true;
    },

    [getProducts.rejected]: (state, action) => {
      state.loading = false;
    },

    [getProducts.fulfilled]: (state, action) => {
      state.products = action.payload;

      state.loading = false;
    },
  },
});

const { actions, reducer: adminProductReducer } = adminProductSlice;
export const { removeProduct } = actions;
export default adminProductReducer;
